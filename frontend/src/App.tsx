import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Login from './Login';
import Dashboard from './Dashboard';
import { api, tokenStore } from './api';
import type { User } from './api';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState<boolean>(() => !!tokenStore.get());

  // Restore session on page load
  useEffect(() => {
    if (!tokenStore.get()) return;
    api
      .me()
      .then((r) => setUser(r.user))
      .catch(() => tokenStore.clear())
      .finally(() => setChecking(false));
  }, []);

  // Any 401 from the API drops back to the login page
  useEffect(() => {
    const onUnauthorized = () => setUser(null);
    window.addEventListener('ga-unauthorized', onUnauthorized);
    return () => window.removeEventListener('ga-unauthorized', onUnauthorized);
  }, []);

  const logout = () => {
    tokenStore.clear();
    setUser(null);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090D16] text-emerald-400">
        <Loader2 className="w-6 h-6 animate-spin" aria-label="Loading" />
      </div>
    );
  }

  if (!user) return <Login onAuth={setUser} />;

  // key={user.id} guarantees a fresh dashboard state when a different user signs in
  return <Dashboard key={user.id} user={user} onLogout={logout} />;
}
