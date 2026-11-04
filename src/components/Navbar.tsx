'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, PhoneCall, Compass, ShieldCheck, Star, MapPin, ChevronRight, PackageCheck } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waUrl = buildWhatsAppLink({
    phone: DEFAULT_SITE_SETTINGS.whatsapp_number,
    customMessage: 'Halo Javentra Group, saya ingin informasi paket wisata petualangan.',
  });

  // Kunci scroll halaman saat mobile menu terbuka
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Aktivitas Petualangan', href: '/#aktivitas', icon: Compass },
    { label: 'Paket Bundling Favorit', href: '/#paket', icon: PackageCheck },
    { label: 'Standar Keselamatan', href: '/#keselamatan', icon: ShieldCheck },
    { label: 'Ulasan Tamu & Klien', href: '/#testimoni', icon: Star },
    { label: 'Lokasi Basecamp', href: '/#lokasi', icon: MapPin },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-subtle">
      {/* Top Bar Bar Navigasi */}
      <div className="h-16 md:h-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-obsidian text-white flex items-center justify-center font-bold tracking-tighter shrink-0 shadow-sm">
            <Compass className="w-5 h-5 text-ochre-amber" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-headline group-hover:text-river-teal transition-colors">
              JAVENTRA
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-body -mt-1">
              Group Adventure
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#aktivitas"
            className="text-sm font-semibold text-slate-headline hover:text-river-teal transition-colors"
          >
            Aktivitas
          </Link>
          <Link
            href="/#paket"
            className="text-sm font-semibold text-slate-headline hover:text-river-teal transition-colors"
          >
            Paket Favorit
          </Link>
          <Link
            href="/#keselamatan"
            className="text-sm font-semibold text-slate-headline hover:text-river-teal transition-colors"
          >
            Standar Safety
          </Link>
          <Link
            href="/#testimoni"
            className="text-sm font-semibold text-slate-headline hover:text-river-teal transition-colors"
          >
            Ulasan
          </Link>
          <Link
            href="/#lokasi"
            className="text-sm font-semibold text-slate-headline hover:text-river-teal transition-colors"
          >
            Basecamp
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${DEFAULT_SITE_SETTINGS.whatsapp_number}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-body hover:text-slate-headline py-2 px-3 rounded-lg border border-border-subtle hover:bg-stone-muted transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-river-teal" strokeWidth={1.75} />
            {DEFAULT_SITE_SETTINGS.whatsapp_display}
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-sm font-bold text-white bg-ochre-amber hover:bg-ochre-amber-hover px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Konsultasi WA
          </a>
        </div>

        {/* Mobile Right Controls */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-white bg-ochre-amber hover:bg-ochre-amber-hover px-3.5 py-2 rounded-lg shadow-sm"
          >
            WhatsApp
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-headline hover:bg-stone-muted focus:outline-none border border-border-subtle"
            aria-label="Toggle Menu Navigasi"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-headline" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5 text-slate-headline" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs md:hidden z-[-1] animate-in fade-in duration-200"
        />
      )}

      {/* Mobile Dropdown Menu Container */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border-subtle shadow-2xl px-4 pt-3 pb-6 max-h-[calc(100dvh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 pb-4 border-b border-border-subtle">
            {navLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-headline hover:bg-stone-muted active:bg-stone-muted/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-muted flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-river-teal" strokeWidth={1.75} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                </Link>
              );
            })}
          </div>

          {/* Mobile Direct Contacts */}
          <div className="pt-4 space-y-3">
            <a
              href={`tel:${DEFAULT_SITE_SETTINGS.whatsapp_number}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-border-subtle text-xs font-bold text-slate-headline bg-stone-muted hover:bg-stone-200 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-river-teal" strokeWidth={1.75} />
              <span>Hotline Operator: {DEFAULT_SITE_SETTINGS.whatsapp_display}</span>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-ochre-amber hover:bg-ochre-amber-hover shadow-sm transition-colors"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
