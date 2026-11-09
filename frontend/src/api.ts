// Thin client for the FastAPI backend. All auth + AI calls go through here,
// so no API keys ever reach the browser.

const BASE: string = (import.meta as any).env?.VITE_API_BASE || '';
const TOKEN_KEY = 'ga_token';

export type User = { id: number; email: string; name: string; business_name: string };

export const tokenStore = {
  get: () => {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
  },
  set: (t: string) => {
    try { localStorage.setItem(TOKEN_KEY, t); } catch { /* storage blocked */ }
  },
  clear: () => {
    try { localStorage.removeItem(TOKEN_KEY); } catch { /* storage blocked */ }
  }
};

async function request<T>(path: string, init: RequestInit = {}, auth = true): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = tokenStore.get();
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, { ...init, headers: { ...headers, ...(init.headers as any) } });
  } catch {
    throw new Error('Cannot reach the server. Check your connection and try again.');
  }

  if (res.status === 401 && auth) {
    tokenStore.clear();
    window.dispatchEvent(new Event('ga-unauthorized'));
  }
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (typeof body.detail === 'string') msg = body.detail;
      else if (Array.isArray(body.detail) && body.detail[0]?.msg) msg = body.detail[0].msg;
    } catch { /* non-JSON error */ }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export const api = {
  register: (b: { name: string; email: string; password: string; business_name: string }) =>
    request<{ token: string; user: User }>('/api/auth/register', { method: 'POST', body: JSON.stringify(b) }, false),

  login: (b: { email: string; password: string }) =>
    request<{ token: string; user: User }>('/api/auth/login', { method: 'POST', body: JSON.stringify(b) }, false),

  me: () => request<{ user: User }>('/api/auth/me'),

  getData: () => request<Record<string, any>>('/api/data'),

  saveData: (key: string, value: unknown) =>
    request<{ ok: boolean }>(`/api/data/${key}`, { method: 'PUT', body: JSON.stringify({ value }) }),

  saveBatch: (value: unknown) =>
    request<{ ok: boolean; id: number }>('/api/batches', { method: 'POST', body: JSON.stringify({ value }) }),

  listBatches: () => request<any[]>('/api/batches'),

  ai: (b: { prompt: string; system?: string; model?: string; json?: boolean }) =>
    request<{ text: string; json: any | null; model: string; latency_ms: number }>('/api/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: b.prompt, system: b.system, model: b.model, json_mode: !!b.json })
    })
};
