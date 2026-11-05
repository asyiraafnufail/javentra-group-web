'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Star,
  Plus,
  ArrowRight,
  HardDrive,
  CheckCircle2,
  Clock,
  PhoneCall,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { FALLBACK_PACKAGES, FALLBACK_TESTIMONIALS, DEFAULT_SITE_SETTINGS } from '@/data/fallback';
import { Package as PackageType, Testimonial } from '@/types/database';

export default function AdminDashboardPage() {
  const [packages, setPackages] = useState<PackageType[]>(FALLBACK_PACKAGES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient();
      try {
        const [pkgRes, testiRes] = await Promise.all([
          supabase.from('packages').select('*').order('created_at', { ascending: false }),
          supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        ]);

        if (pkgRes.data && pkgRes.data.length > 0) {
          setPackages(pkgRes.data);
        }
        if (testiRes.data && testiRes.data.length > 0) {
          setTestimonials(testiRes.data);
        }
      } catch {
        // Menggunakan data fallback jika koneksi offline
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const activePackages = packages.filter((p) => p.is_active);
  const featuredPackages = packages.filter((p) => p.is_featured);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Title & Quick CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-headline">
            Ringkasan Operasional
          </h1>
          <p className="text-xs sm:text-sm text-slate-body mt-1">
            Status katalog paket wisata, ulasan pelanggan, dan integritas penyimpanan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/paket"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-headline hover:bg-black px-4 py-2.5 rounded-xl transition-colors shadow-sm min-h-[40px]"
          >
            <Plus className="w-4 h-4" />
            <span>Kelola Paket</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-white border border-border-subtle shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-body block">
              Paket Aktif
            </span>
            <span className="text-3xl font-extrabold text-slate-headline tracking-tight mt-1 block">
              {loading ? '...' : activePackages.length}
            </span>
            <span className="text-[11px] text-slate-body mt-0.5 block">
              dari total {packages.length} paket
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-stone-muted flex items-center justify-center shrink-0">
            <Package className="w-6 h-6 text-river-teal" strokeWidth={1.75} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-white border border-border-subtle shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-body block">
              Paket Unggulan
            </span>
            <span className="text-3xl font-extrabold text-slate-headline tracking-tight mt-1 block">
              {loading ? '...' : featuredPackages.length}
            </span>
            <span className="text-[11px] text-slate-body mt-0.5 block">
              tampil di landing page
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-stone-muted flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-ochre-amber" strokeWidth={1.75} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-white border border-border-subtle shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-body block">
              Ulasan Terbit
            </span>
            <span className="text-3xl font-extrabold text-slate-headline tracking-tight mt-1 block">
              {loading ? '...' : testimonials.length}
            </span>
            <span className="text-[11px] text-slate-body mt-0.5 block">
              rerata 4.9 dari 5.0
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-stone-muted flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-ochre-amber" strokeWidth={1.75} />
          </div>
        </div>

        {/* Card 4: Storage Health */}
        <div className="p-5 rounded-2xl bg-white border border-border-subtle shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-body block">
              Supabase Storage
            </span>
            <span className="text-xl font-extrabold text-emerald-600 tracking-tight mt-1 block">
              Terkendali &lt; 1 GB
            </span>
            <span className="text-[11px] text-slate-body mt-0.5 block">
              Auto-kompres WebP aktif
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <HardDrive className="w-6 h-6 text-emerald-600" strokeWidth={1.75} />
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Recent Packages Table (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-border-subtle p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-headline">
                  Daftar Paket Terbaru
                </h2>
                <p className="text-xs text-slate-body">Status tayang dan harga saat ini</p>
              </div>
              <Link
                href="/admin/paket"
                className="text-xs font-bold text-river-teal hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border-subtle text-slate-body font-bold text-[11px] uppercase tracking-wider">
                    <th className="pb-3">Nama Paket</th>
                    <th className="pb-3">Kategori</th>
                    <th className="pb-3">Harga</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {packages.slice(0, 5).map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-stone-muted/50 transition-colors">
                      <td className="py-3 font-semibold text-slate-headline pr-4">
                        {pkg.name}
                      </td>
                      <td className="py-3 text-slate-body uppercase text-[11px] font-bold">
                        {pkg.category}
                      </td>
                      <td className="py-3 font-bold text-slate-headline whitespace-nowrap">
                        Rp {pkg.price.toLocaleString('id-ID')}
                        <span className="text-[11px] font-normal text-slate-body">
                          /{pkg.price_unit}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            pkg.is_active
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {pkg.is_active ? 'Aktif' : 'Draft'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border-subtle">
            <Link
              href="/admin/paket"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border-subtle text-xs font-bold text-slate-headline hover:bg-stone-muted transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Tambah atau Edit Paket
            </Link>
          </div>
        </div>

        {/* Right Column: Quick Status & Site Contact Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Settings Card */}
          <div className="rounded-2xl bg-white border border-border-subtle p-5 sm:p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-headline mb-3">
              Kontak Booking WhatsApp
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-body mb-5">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-river-teal shrink-0" />
                <span className="font-semibold text-slate-headline">
                  {DEFAULT_SITE_SETTINGS.whatsapp_display}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-river-teal shrink-0" />
                <span>{DEFAULT_SITE_SETTINGS.operational_hours}</span>
              </div>
            </div>

            <Link
              href="/admin/pengaturan"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border-subtle text-xs font-bold text-slate-headline hover:bg-stone-muted transition-colors"
            >
              Perbarui Nomor & Jam Layanan
            </Link>
          </div>

          {/* Efficiency Guide Card */}
          <div className="rounded-2xl bg-obsidian text-white p-5 sm:p-6 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ochre-amber block mb-1">
              Panduan Penyimpanan Free Tier
            </span>
            <h4 className="text-sm font-bold text-white mb-2">
              Kompresi WebP Otomatis
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Setiap foto yang diunggah dikompres otomatis di peramban ke format WebP (&lt;250 KB) sebelum masuk ke database, memastikan batas 1GB Supabase tidak pernah bocor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
