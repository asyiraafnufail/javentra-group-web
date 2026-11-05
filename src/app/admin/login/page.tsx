'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/admin');
      }
    });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url || url.includes('your-project-id')) {
      setIsConfigured(false);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || 'Login gagal. Periksa kembali email dan password.');
        setLoading(false);
        return;
      }

      router.replace('/admin');
    } catch {
      setErrorMsg('Terjadi kendala jaringan saat otentikasi.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-muted flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-obsidian text-white flex items-center justify-center font-bold shadow-sm">
              <Compass className="w-5 h-5 text-ochre-amber" strokeWidth={2} />
            </div>
            <div className="text-left">
              <span className="block text-xl font-extrabold tracking-tight text-slate-headline">
                JAVENTRA
              </span>
              <span className="block text-[10px] tracking-widest uppercase font-semibold text-slate-body -mt-1">
                Admin Console
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-headline tracking-tight">
            Masuk ke Panel Pengelola
          </h1>
          <p className="text-xs sm:text-sm text-slate-body mt-1">
            Kelola paket wisata, review tamu, dan pengaturan kontak.
          </p>
        </div>

        {/* Demo Mode / Configuration Warning */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-ochre-amber shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Koneksi Supabase Belum Dikonfigurasi</strong>
              Isi <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">NEXT_PUBLIC_SUPABASE_URL</code> dan <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> di <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env.local</code> untuk mengaktifkan sesi login riil.
            </div>
          </div>
        )}

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-sm">
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                Email Operator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@javentra.com"
                  className="w-full bg-stone-muted border border-border-subtle rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-headline placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-river-teal/40 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-muted border border-border-subtle rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-headline placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-river-teal/40 min-h-[44px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-slate-headline hover:bg-black py-3 rounded-xl transition-colors shadow-sm disabled:opacity-60 min-h-[44px]"
            >
              {loading ? 'Memverifikasi...' : 'Masuk Panel Admin'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border-subtle text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-body hover:text-slate-headline transition-colors"
            >
              &larr; Kembali ke Website Utama
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
