"""
GAUVAANI AMRIT - Dairy Sathi ERP backend
FastAPI + SQLite + JWT auth + server-side Gemma proxy.

Run:  uvicorn main:app --reload --port 8000
"""
import json
import os
import re
import secrets
import sqlite3
import time
from collections import defaultdict, deque
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Optional

import bcrypt
import httpx
import jwt
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

load_dotenv()

# ----------------------------------------------------------------------------
# Config
# ----------------------------------------------------------------------------
GEMMA_API_KEY = os.getenv("GEMMA_API_KEY", "").strip()
GEMMA_MODEL = os.getenv("GEMMA_MODEL", "gemma-3-27b-it").strip()
ALLOWED_MODELS = [
    m.strip()
    for m in os.getenv("ALLOWED_MODELS", f"{GEMMA_MODEL}").split(",")
    if m.strip()
]
if GEMMA_MODEL not in ALLOWED_MODELS:
    ALLOWED_MODELS.append(GEMMA_MODEL)

JWT_SECRET = os.getenv("JWT_SECRET", "").strip()
if not JWT_SECRET:
    JWT_SECRET = secrets.token_urlsafe(48)
    print("WARNING: JWT_SECRET not set - using a temporary one. Logins reset on restart.")
JWT_ALG = "HS256"
TOKEN_TTL = timedelta(days=7)

CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",") if o.strip()]
DB_PATH = os.getenv("DATABASE_PATH", "./gauvaani.db")

# Keys of per-user data the dashboard may store
ALLOWED_DATA_KEYS = {"pnlData", "loans", "inventory", "farm", "settings"}
MAX_VALUE_BYTES = 1_000_000

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# ----------------------------------------------------------------------------
# Database
# ----------------------------------------------------------------------------
@contextmanager
def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db() -> None:
    with db() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id            INTEGER PRIMARY KEY AUTOINCREMENT,
                email         TEXT NOT NULL UNIQUE,
                name          TEXT NOT NULL,
                business_name TEXT NOT NULL DEFAULT '',
                password_hash TEXT NOT NULL,
                created_at    TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS user_data (
                user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                key        TEXT NOT NULL,
                value      TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                PRIMARY KEY (user_id, key)
            );
            CREATE TABLE IF NOT EXISTS batches (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                created_at TEXT NOT NULL,
                payload    TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_batches_user ON batches(user_id, id DESC);
            """
        )


init_db()

# ----------------------------------------------------------------------------
# Auth helpers
# ----------------------------------------------------------------------------
bearer = HTTPBearer(auto_error=False)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


def make_token(user_id: int) -> str:
    payload = {"sub": str(user_id), "exp": datetime.now(timezone.utc) + TOKEN_TTL}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)


def public_user(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "email": row["email"],
        "name": row["name"],
        "business_name": row["business_name"],
    }


def current_user(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer)) -> sqlite3.Row:
    if not creds:
        raise HTTPException(401, "Not authenticated")
    try:
        data = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALG])
        user_id = int(data["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        raise HTTPException(401, "Invalid or expired session")
    with db() as conn:
        row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    if not row:
        raise HTTPException(401, "User no longer exists")
    return row


# ----------------------------------------------------------------------------
# Tiny in-memory rate limiter (per process). Use Redis for multi-server setups.
# ----------------------------------------------------------------------------
_hits: dict[str, deque] = defaultdict(deque)


def rate_limit(key: str, limit: int, window_s: int) -> None:
    now = time.time()
    q = _hits[key]
    while q and q[0] < now - window_s:
        q.popleft()
    if len(q) >= limit:
        raise HTTPException(429, "Too many requests. Please wait a moment and try again.")
    q.append(now)


# ----------------------------------------------------------------------------
# App
# ----------------------------------------------------------------------------
app = FastAPI(title="Gauvaani Amrit - Dairy Sathi ERP API", version="4.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,  # we use Authorization headers, not cookies
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---- Schemas ----------------------------------------------------------------
class RegisterBody(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: str = Field(max_length=120)
    password: str = Field(min_length=8, max_length=128)
    business_name: str = Field(default="", max_length=120)


class LoginBody(BaseModel):
    email: str = Field(max_length=120)
    password: str = Field(max_length=128)


class AiBody(BaseModel):
    prompt: str = Field(min_length=1, max_length=8000)
    system: Optional[str] = Field(default=None, max_length=8000)
    model: Optional[str] = None
    json_mode: bool = False


class DataBody(BaseModel):
    value: Any


# ---- Auth routes --------------------------------------------------------------
@app.post("/api/auth/register")
def register(body: RegisterBody, request: Request):
    rate_limit(f"reg:{request.client.host if request.client else 'x'}", 10, 3600)
    email = body.email.strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(422, "Please enter a valid email address")
    try:
        with db() as conn:
            cur = conn.execute(
                "INSERT INTO users (email, name, business_name, password_hash, created_at) VALUES (?,?,?,?,?)",
                (email, body.name.strip(), body.business_name.strip(), hash_password(body.password), now_iso()),
            )
            row = conn.execute("SELECT * FROM users WHERE id = ?", (cur.lastrowid,)).fetchone()
    except sqlite3.IntegrityError:
        raise HTTPException(409, "An account with this email already exists")
    return {"token": make_token(row["id"]), "user": public_user(row)}


@app.post("/api/auth/login")
def login(body: LoginBody, request: Request):
    email = body.email.strip().lower()
    ip = request.client.host if request.client else "x"
    rate_limit(f"login:{ip}:{email}", 8, 300)  # 8 attempts / 5 min per ip+email
    with db() as conn:
        row = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    # Same error for unknown email and wrong password (no account enumeration)
    if not row or not verify_password(body.password, row["password_hash"]):
        raise HTTPException(401, "Incorrect email or password")
    return {"token": make_token(row["id"]), "user": public_user(row)}


@app.get("/api/auth/me")
def me(user: sqlite3.Row = Depends(current_user)):
    return {"user": public_user(user)}


# ---- Per-user data --------------------------------------------------------------
@app.get("/api/data")
def get_all_data(user: sqlite3.Row = Depends(current_user)):
    with db() as conn:
        rows = conn.execute("SELECT key, value FROM user_data WHERE user_id = ?", (user["id"],)).fetchall()
    return {r["key"]: json.loads(r["value"]) for r in rows}


@app.put("/api/data/{key}")
def put_data(key: str, body: DataBody, user: sqlite3.Row = Depends(current_user)):
    if key not in ALLOWED_DATA_KEYS:
        raise HTTPException(404, "Unknown data key")
    raw = json.dumps(body.value, ensure_ascii=False)
    if len(raw.encode("utf-8")) > MAX_VALUE_BYTES:
        raise HTTPException(413, "Data too large")
    with db() as conn:
        conn.execute(
            """INSERT INTO user_data (user_id, key, value, updated_at) VALUES (?,?,?,?)
               ON CONFLICT(user_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at""",
            (user["id"], key, raw, now_iso()),
        )
    return {"ok": True}


@app.post("/api/batches")
def save_batch(body: DataBody, user: sqlite3.Row = Depends(current_user)):
    raw = json.dumps(body.value, ensure_ascii=False)
    if len(raw.encode("utf-8")) > 50_000:
        raise HTTPException(413, "Batch too large")
    with db() as conn:
        cur = conn.execute(
            "INSERT INTO batches (user_id, created_at, payload) VALUES (?,?,?)",
            (user["id"], now_iso(), raw),
        )
    return {"ok": True, "id": cur.lastrowid}


@app.get("/api/batches")
def list_batches(limit: int = 50, user: sqlite3.Row = Depends(current_user)):
    limit = max(1, min(limit, 200))
    with db() as conn:
        rows = conn.execute(
            "SELECT id, created_at, payload FROM batches WHERE user_id = ? ORDER BY id DESC LIMIT ?",
            (user["id"], limit),
        ).fetchall()
    return [{"id": r["id"], "created_at": r["created_at"], **json.loads(r["payload"])} for r in rows]


# ---- Gemma proxy ----------------------------------------------------------------
def extract_json(text: str) -> Optional[dict]:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.I)
    start, end = cleaned.find("{"), cleaned.rfind("}")
    if start == -1 or end <= start:
        return None
    try:
        return json.loads(cleaned[start : end + 1])
    except json.JSONDecodeError:
        return None


@app.post("/api/ai/generate")
async def ai_generate(body: AiBody, user: sqlite3.Row = Depends(current_user)):
    if not GEMMA_API_KEY:
        raise HTTPException(503, "AI is not configured on the server (GEMMA_API_KEY missing)")
    rate_limit(f"ai:{user['id']}", 30, 60)

    model = body.model if body.model in ALLOWED_MODELS else GEMMA_MODEL

    # Gemma models do not support systemInstruction / JSON mode, so we fold both into the prompt.
    text = body.prompt
    if body.system:
        text = f"{body.system}\n\n--- USER REQUEST ---\n{body.prompt}"
    if body.json_mode:
        text += "\n\nRespond with ONLY one valid JSON object. No markdown, no code fences, no commentary."

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    started = time.perf_counter()
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                url,
                headers={"x-goog-api-key": GEMMA_API_KEY, "Content-Type": "application/json"},
                json={"contents": [{"parts": [{"text": text}]}]},
            )
    except httpx.HTTPError:
        raise HTTPException(502, "Could not reach the AI service")

    latency_ms = round((time.perf_counter() - started) * 1000)
    if resp.status_code != 200:
        # Don't leak upstream details (could include key hints); log server-side only
        print("Gemma upstream error", resp.status_code, resp.text[:300])
        raise HTTPException(502, f"AI service returned an error ({resp.status_code})")

    try:
        out = resp.json()["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError, ValueError):
        raise HTTPException(502, "AI returned an empty response")

    return {
        "text": out,
        "json": extract_json(out) if body.json_mode else None,
        "model": model,
        "latency_ms": latency_ms,
    }


@app.get("/api/health")
def health():
    return {"status": "ok", "ai_configured": bool(GEMMA_API_KEY), "models": ALLOWED_MODELS, "default_model": GEMMA_MODEL}


@app.exception_handler(Exception)
async def unhandled(_: Request, exc: Exception):
    print("Unhandled error:", repr(exc))
    return JSONResponse({"detail": "Internal server error"}, status_code=500)


# ---- Serve the built frontend (single-server deploys) ----------------------------
DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if DIST.exists():
    app.mount("/", StaticFiles(directory=DIST, html=True), name="frontend")
