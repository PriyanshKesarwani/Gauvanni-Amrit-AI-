import React, { useState } from 'react';
import { Milk, Eye, EyeOff, Loader2, AlertCircle, Thermometer, Languages } from 'lucide-react';
import { api, tokenStore } from './api';
import type { User } from './api';

type Lang = 'hi' | 'en';

const COPY = {
  en: {
    brand: 'GAUVAANI AMRIT',
    sub: 'Dairy Sathi ERP',
    heroTitle: 'Every litre, recorded and accounted for.',
    heroBody: 'Test milk, settle farmer payments, track credit and feed stock in one place. Your data stays private to your account.',
    slipTitle: 'Batch slip',
    slipRows: [
      ['Supplier', 'Rameshwar Yadav'],
      ['Volume', '45 L'],
      ['Fat / SNF', '6.2% / 8.8%'],
      ['Grade', 'A+']
    ],
    slipPayable: 'Net payable',
    slipChill: 'Chill to 4°C within 14 h',
    loginTitle: 'Sign in to your dairy',
    registerTitle: 'Create your dairy account',
    loginTab: 'Sign in',
    registerTab: 'Create account',
    name: 'Your name',
    business: 'Dairy or society name',
    optional: 'optional',
    email: 'Email address',
    password: 'Password',
    passwordHint: 'At least 8 characters',
    show: 'Show password',
    hide: 'Hide password',
    loginBtn: 'Sign in',
    registerBtn: 'Create account',
    working: 'Please wait…',
    switchToRegister: 'New here?',
    switchToLogin: 'Already have an account?',
    langBtn: 'हिन्दी'
  },
  hi: {
    brand: 'गौवाणी अमृत',
    sub: 'डेयरी साथी ERP',
    heroTitle: 'हर लीटर का हिसाब, एक जगह।',
    heroBody: 'दूध की जांच, किसान भुगतान, उधार खाता और चारे का स्टॉक — सब एक ही जगह। आपका डेटा सिर्फ आपके अकाउंट में सुरक्षित रहता है।',
    slipTitle: 'बैच पर्ची',
    slipRows: [
      ['सप्लायर', 'रामेश्वर यादव'],
      ['मात्रा', '45 L'],
      ['फैट / SNF', '6.2% / 8.8%'],
      ['ग्रेड', 'A+']
    ],
    slipPayable: 'कुल भुगतान',
    slipChill: '14 घंटे में 4°C तक ठंडा करें',
    loginTitle: 'अपनी डेयरी में साइन इन करें',
    registerTitle: 'अपना डेयरी अकाउंट बनाएं',
    loginTab: 'साइन इन',
    registerTab: 'अकाउंट बनाएं',
    name: 'आपका नाम',
    business: 'डेयरी या समिति का नाम',
    optional: 'वैकल्पिक',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    passwordHint: 'कम से कम 8 अक्षर',
    show: 'पासवर्ड दिखाएं',
    hide: 'पासवर्ड छुपाएं',
    loginBtn: 'साइन इन करें',
    registerBtn: 'अकाउंट बनाएं',
    working: 'कृपया प्रतीक्षा करें…',
    switchToRegister: 'पहली बार आए हैं?',
    switchToLogin: 'पहले से अकाउंट है?',
    langBtn: 'English'
  }
} as const;

export default function Login({ onAuth }: { onAuth: (user: User) => void }) {
  const [lang, setLang] = useState<Lang>(() => {
    try { return (localStorage.getItem('ga_lang') as Lang) || 'en'; } catch { return 'en'; }
  });
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const c = COPY[lang];
  const isRegister = mode === 'register';

  const toggleLang = () => {
    const next: Lang = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    try { localStorage.setItem('ga_lang', next); } catch { /* ignore */ }
  };

  const switchMode = (m: 'login' | 'register') => {
    setMode(m);
    setError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const res = isRegister
        ? await api.register({ name: name.trim(), email: email.trim(), password, business_name: business.trim() })
        : await api.login({ email: email.trim(), password });
      tokenStore.set(res.token);
      onAuth(res.user);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 placeholder:text-slate-400 ' +
    'focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/25';
  const labelCls = 'block text-sm font-semibold text-slate-700 mb-1.5';

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-[#F5F8F6] text-slate-900">
      {/* ---------- Brand panel ---------- */}
      <aside className="relative hidden lg:flex flex-col justify-between bg-[#0B1F1A] text-emerald-50 p-12 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500 text-[#0B1F1A] flex items-center justify-center">
            <Milk className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight text-lg">{c.brand}</div>
            <div className="text-sm text-emerald-200/70">{c.sub}</div>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] tracking-tight">{c.heroTitle}</h1>
          <p className="mt-5 text-emerald-100/75 text-lg leading-relaxed">{c.heroBody}</p>
        </div>

        {/* The memorable element: a milk batch slip */}
        <div
          className="self-start w-full max-w-sm rotate-[-2deg] rounded-md bg-[#FBFBF8] text-slate-900 shadow-2xl"
          style={{ clipPath: 'polygon(0 0,100% 0,100% calc(100% - 10px),96% 100%,92% calc(100% - 10px),88% 100%,84% calc(100% - 10px),80% 100%,76% calc(100% - 10px),72% 100%,68% calc(100% - 10px),64% 100%,60% calc(100% - 10px),56% 100%,52% calc(100% - 10px),48% 100%,44% calc(100% - 10px),40% 100%,36% calc(100% - 10px),32% 100%,28% calc(100% - 10px),24% 100%,20% calc(100% - 10px),16% 100%,12% calc(100% - 10px),8% 100%,4% calc(100% - 10px),0 100%)' }}
          aria-hidden="true"
        >
          <div className="px-6 pt-5 pb-7">
            <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-3">
              <span className="font-bold">{c.slipTitle}</span>
              <span className="font-mono text-xs text-slate-500">#GA-104</span>
            </div>
            <dl className="py-3 space-y-1.5 text-sm">
              {c.slipRows.map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex items-center gap-2 rounded bg-sky-50 text-sky-800 text-xs font-semibold px-2.5 py-1.5">
              <Thermometer className="w-3.5 h-3.5" />
              {c.slipChill}
            </div>
            <div className="mt-3 pt-3 border-t border-dashed border-slate-300 flex items-baseline justify-between">
              <span className="font-semibold">{c.slipPayable}</span>
              <span className="text-2xl font-extrabold text-emerald-700">₹2,529</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- Form panel ---------- */}
      <main className="flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Milk className="w-4 h-4" />
            </div>
            <span className="font-extrabold tracking-tight">{c.brand}</span>
          </div>
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <Languages className="w-4 h-4" />
            {c.langBtn}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-extrabold tracking-tight">{isRegister ? c.registerTitle : c.loginTitle}</h2>

            <div role="tablist" className="mt-6 grid grid-cols-2 rounded-lg bg-slate-200/70 p-1">
              {(['login', 'register'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => switchMode(m)}
                  className={`rounded-md py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 ${
                    mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {m === 'login' ? c.loginTab : c.registerTab}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              {isRegister && (
                <>
                  <div>
                    <label htmlFor="name" className={labelCls}>{c.name}</label>
                    <input id="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required minLength={2} />
                  </div>
                  <div>
                    <label htmlFor="biz" className={labelCls}>
                      {c.business} <span className="font-normal text-slate-500">({c.optional})</span>
                    </label>
                    <input id="biz" className={inputCls} value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className={labelCls}>{c.email}</label>
                <input id="email" type="email" inputMode="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
              </div>

              <div>
                <label htmlFor="password" className={labelCls}>{c.password}</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    className={`${inputCls} pr-11`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    required
                    minLength={isRegister ? 8 : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? c.hide : c.show}
                    className="absolute inset-y-0 right-0 px-3 text-slate-500 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-emerald-600 rounded-r-lg"
                  >
                    {showPw ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
                {isRegister && <p className="mt-1.5 text-sm text-slate-500">{c.passwordHint}</p>}
              </div>

              <div aria-live="polite">
                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-800">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 disabled:opacity-70 text-white font-bold py-3 text-base inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                {busy ? c.working : isRegister ? c.registerBtn : c.loginBtn}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600 text-center">
              {isRegister ? c.switchToLogin : c.switchToRegister}{' '}
              <button
                type="button"
                onClick={() => switchMode(isRegister ? 'login' : 'register')}
                className="font-semibold text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
              >
                {isRegister ? c.loginTab : c.registerTab}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
