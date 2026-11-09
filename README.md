# Gauvaani Amrit - Dairy Sathi ERP (login + backend + frontend)

```
backend/   FastAPI + SQLite + JWT login + Gemma proxy
frontend/  React + Vite + Tailwind (login page + your dashboard)
```

## 1. Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # then edit .env (see below)
uvicorn main:app --reload --port 8000
```
Edit `backend/.env`:
- `GEMMA_API_KEY=` your Google AI Studio key (paste it HERE, not in chat or in frontend code)
- `JWT_SECRET=` run `python -c "import secrets; print(secrets.token_urlsafe(48))"`

Check it: http://localhost:8000/api/health  (shows `ai_configured: true` once the key is set)

## 2. Frontend
```bash
cd frontend
npm install
npm run dev                 # http://localhost:5173
```
Open the site -> "Create account" -> you land in the dashboard. Each account only ever sees its own data.

## 3. Production (single server)
```bash
cd frontend && npm run build        # creates frontend/dist
cd ../backend && uvicorn main:app --host 0.0.0.0 --port 8000
```
The backend serves `frontend/dist` automatically. Put it behind HTTPS (Nginx/Caddy), set `CORS_ORIGINS` to your domain.

## What is stored per user
`pnlData`, `loans`, `inventory`, `farm`, `settings` (auto-saved ~0.6 s after any change) and every milk batch you "Save to Ledger".
New accounts start with the sample data from your original file; edit it freely.
