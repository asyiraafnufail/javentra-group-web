'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  LayoutDashboard,
  Package,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLiveSupabase, setIsLiveSupabase] = useState(true);
  const [adminStatus, setAdminStatus] = useState<{
    isChecked: boolean;
    isAdmin: boolean;
    uid?: string;
    email?: string;
  }>({ isChecked: false, isAdmin: true });

  useEffect(() => {
    const supabase = createClient();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!url || url.includes('your-project-id')) {
      setIsLiveSupabase(false);
      setUserEmail('demo@javentra.local');
      return;
    }

    const verifyAdmin = async (userId: string, email: string) => {
      try {
        const { data } = await supabase
          .from('admins')
          .select('id')
          .eq('id', userId)
          .maybeSingle();

        setAdminStatus({
          isChecked: true,
          isAdmin: Boolean(data),
          uid: userId,
          email,
        });
      } catch {
        setAdminStatus({
          isChecked: true,
          isAdmin: false,
          uid: userId,
          email,
        });
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        const email = session.user?.email || 'admin';
        setUserEmail(email);
        verifyAdmin(session.user.id, email);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        const email = session.user?.email || 'admin';
        setUserEmail(email);
        verifyAdmin(session.user.id, email);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  const navItems = [
    { label: 'Ringkasan', href: '/admin', icon: LayoutDashboard },
    { label: 'Kelola Paket', href: '/admin/paket', icon: Package },
    { label: 'Ulasan Klien', href: '/admin/testimoni', icon: Star },
    { label: 'Pengaturan Kontak', href: '/admin/pengaturan', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-muted flex flex-col md:flex-row">
      {/* Mobile Top Navbar */}
      <header className="md:hidden h-16 bg-white border-b border-border-subtle px-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-obsidian text-white flex items-center justify-center font-bold">
            <Compass className="w-4 h-4 text-ochre-amber" strokeWidth={2} />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-headline">
            JAVENTRA CMS
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-slate-headline hover:bg-stone-muted border border-border-subtle"
          aria-label="Buka Menu Navigasi Admin"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-border-subtle flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 md:h-18 px-6 border-b border-border-subtle flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-obsidian text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                <Compass className="w-4 h-4 text-ochre-amber" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-slate-headline">
                  JAVENTRA
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-body -mt-0.5">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-obsidian text-white shadow-sm'
                      : 'text-slate-headline hover:bg-stone-muted'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-ochre-amber' : 'text-slate-500'
                    }`}
                    strokeWidth={1.75}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border-subtle space-y-2">
          {/* User Status Bar */}
          <div className="px-3 py-2 rounded-xl bg-stone-muted text-xs text-slate-headline">
            <span className="block text-[10px] uppercase font-bold text-slate-body">
              Operator Masuk:
            </span>
            <span className="font-semibold truncate block" title={userEmail || ''}>
              {userEmail || 'Memuat...'}
            </span>
          </div>

          {/* Back to Live Site Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-slate-body hover:text-slate-headline hover:bg-stone-muted rounded-lg transition-colors"
          >
            <span>Lihat Website Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {!isLiveSupabase && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-6 py-2.5 text-xs text-amber-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-ochre-amber shrink-0" />
            <span>
              <strong>Mode Demo Pratayang:</strong> Kredensial Supabase belum terisi di <code>.env.local</code>. Menampilkan data fallback lokal untuk keperluan peninjauan UI.
            </span>
          </div>
        )}
        {isLiveSupabase && adminStatus.isChecked && !adminStatus.isAdmin && (
          <div className="bg-amber-50 border-b border-amber-300 px-4 sm:px-6 py-3 text-xs text-amber-950 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1">
              <div className="font-bold text-amber-900">
                Perhatian: Akun {adminStatus.email} Belum Terdaftar di Tabel public.admins
              </div>
              <p className="text-amber-800 leading-relaxed">
                Sesi login Anda valid, tetapi akun ini belum dimasukkan ke tabel <code>public.admins</code>.
                Kebijakan keamanan Supabase (Row Level Security) akan <strong>menolak</strong> setiap aksi penyimpanan/perubahan data.
              </p>
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-amber-900 block mb-1">
                  Jalankan SQL berikut di Supabase SQL Editor untuk memberikan izin admin penuh:
                </span>
                <pre className="bg-amber-100/90 border border-amber-200 text-amber-900 font-mono text-[11px] p-2 rounded-lg overflow-x-auto select-all">
{`INSERT INTO public.admins (id, email, full_name)
VALUES ('${adminStatus.uid}', '${adminStatus.email}', 'Admin Javentra')
ON CONFLICT (id) DO NOTHING;`}
                </pre>
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
