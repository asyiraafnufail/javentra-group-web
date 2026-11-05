'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  PhoneCall,
  Compass,
  ShieldCheck,
  Star,
  MapPin,
  ChevronRight,
  PackageCheck,
  CalendarCheck,
  HelpCircle,
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';
import { SiteSettings } from '@/types/database';

interface NavbarProps {
  settings?: SiteSettings;
}

export function Navbar({ settings }: NavbarProps = {}) {
  const activeSettings = settings || DEFAULT_SITE_SETTINGS;
  const [menuOpen, setMenuOpen] = useState(false);
  const waUrl = buildWhatsAppLink({
    phone: activeSettings.whatsapp_number,
    customMessage: 'Halo Javentra Group, saya ingin informasi paket wisata petualangan.',
  });

  // Kunci scroll halaman saat menu terbuka & tutup dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Jelajahi', href: '/', icon: Compass, desc: 'Paling atas halaman utama' },
    { label: 'Standar Keselamatan', href: '/#keselamatan', icon: ShieldCheck, desc: 'Sertifikasi rescue & SOP keamanan' },
    { label: 'Paket Favorit', href: '/#paket', icon: PackageCheck, desc: 'Pilihan rafting, jeep & outbound' },
    { label: 'Cara Reservasi', href: '/#cara-pesan', icon: CalendarCheck, desc: 'Panduan booking 3 langkah mudah' },
    { label: 'Ulasan Tamu', href: '/#testimoni', icon: Star, desc: 'Pengalaman nyata klien & wisatawan' },
    { label: 'FAQ', href: '/#faq', icon: HelpCircle, desc: 'Pertanyaan yang sering diajukan' },
    { label: 'Lokasi Basecamp', href: '/#lokasi', icon: MapPin, desc: 'Titik kumpul & fasilitas rest area' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-subtle">
      {/* Top Bar Navigasi */}
      <div className="h-16 md:h-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-obsidian text-white flex items-center justify-center font-bold tracking-tighter shrink-0 shadow-sm">
            <Compass className="w-5 h-5 text-ochre-amber" strokeWidth={2} />
          </div>

          {/* Mobile view (< md): Atas bawah dengan gap sangat rapat */}
          <div className="flex md:hidden flex-col justify-center h-10 select-none -space-y-0.5">
            <span className="text-[17px] font-black tracking-tight text-slate-headline leading-none group-hover:text-river-teal transition-colors">
              JAVENTRA
            </span>
            <span className="text-[12.5px] font-black tracking-[0.2em] text-slate-headline leading-none group-hover:text-river-teal transition-colors">
              GROUP
            </span>
          </div>

          {/* iPad & Desktop view (>= md): Memanjang 1 baris */}
          <span className="hidden md:inline-block text-lg lg:text-xl font-extrabold tracking-tight text-slate-headline group-hover:text-river-teal transition-colors whitespace-nowrap">
            JAVENTRA GROUP
          </span>
        </Link>

        {/* Right Controls: Hotline + Konsultasi WA + Box Strip 3 "Menu" */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${activeSettings.whatsapp_number}`}
            className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-slate-body hover:text-slate-headline py-2 px-3 rounded-lg border border-border-subtle hover:bg-stone-muted transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 text-river-teal" strokeWidth={1.75} />
            <span>{activeSettings.whatsapp_display}</span>
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-xs sm:text-sm font-bold text-white bg-ochre-amber hover:bg-ochre-amber-hover px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-colors shadow-sm whitespace-nowrap"
          >
            Konsultasi WA
          </a>

          {/* Box Strip 3 dengan nama "Menu" */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border transition-colors font-bold text-xs sm:text-sm shadow-xs ${
              menuOpen
                ? 'bg-obsidian text-white border-obsidian'
                : 'bg-white hover:bg-stone-muted text-slate-headline border-border-subtle'
            }`}
            aria-label="Toggle Menu Navigasi"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-4 h-4 text-inherit" strokeWidth={2.5} />
            ) : (
              <Menu className="w-4 h-4 text-inherit" strokeWidth={2.5} />
            )}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 top-16 md:top-18 bg-black/40 backdrop-blur-xs z-40 animate-in fade-in duration-200"
        />
      )}

      {/* Flyout Menu Dropdown (Desktop & Mobile) */}
      {menuOpen && (
        <div className="absolute top-full right-0 left-0 md:left-auto md:right-4 lg:right-8 md:mt-2 md:max-w-md w-full bg-white border-b md:border md:rounded-2xl border-border-subtle shadow-2xl p-4 sm:p-5 z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Navigasi Halaman
            </span>
            <span className="text-[11px] text-river-teal font-semibold">
              Javentra Group
            </span>
          </div>

          <div className="space-y-1">
            {navLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-muted active:bg-stone-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-muted group-hover:bg-white flex items-center justify-center shrink-0 transition-colors border border-transparent group-hover:border-border-subtle">
                      <Icon className="w-4 h-4 text-river-teal" strokeWidth={1.75} />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-headline group-hover:text-river-teal transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-[11px] text-slate-500">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors"
                    strokeWidth={1.75}
                  />
                </Link>
              );
            })}
          </div>

          {/* Direct Contact inside Menu */}
          <div className="pt-4 mt-3 border-t border-border-subtle space-y-2">
            <a
              href={`tel:${activeSettings.whatsapp_number}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-border-subtle text-xs font-bold text-slate-headline bg-stone-muted hover:bg-stone-200 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-river-teal" strokeWidth={1.75} />
              <span>Hotline Operator: {activeSettings.whatsapp_display}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
