'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Compass, Users } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';

export function HeroSection() {
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [paxCount, setPaxCount] = useState('4');

  const waUrl = buildWhatsAppLink({
    phone: DEFAULT_SITE_SETTINGS.whatsapp_number,
    customMessage: `Halo Javentra Group, saya ingin tanya ketersediaan trip kategori ${selectedCategory} untuk ${paxCount} orang.`,
  });

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Hero Photographic Container */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-obsidian text-white min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 border border-white/10 shadow-xl">
          {/* Background Image with Dark Contrast Overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=2000&q=85')",
            }}
          />
          {/* Subtle gradient overlay to guarantee text legibility */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/40" />

          {/* Top Tagline / Category Indicator */}
          <div className="relative z-10 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-stone-200">
              <ShieldCheck className="w-3.5 h-3.5 text-ochre-amber" strokeWidth={2} />
              Operator Wisata Outdoor Berizin & Teruji
            </span>
          </div>

          {/* Center / Hero Copy */}
          <div className="relative z-10 my-auto py-6 sm:py-8 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none text-white mb-3 sm:mb-4 uppercase">
              JAVENTRA<span className="text-ochre-amber">.</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-stone-100 mb-3 sm:mb-4">
              Arung Jeram Elo & Progo, Jeep Merapi, VW Safari, dan Outbound Gathering.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed max-w-2xl font-normal">
              Pengalaman luar ruang di Magelang dan Yogyakarta dengan standar keselamatan rescue internasional, armada terawat, dan instruktur bersertifikasi.
            </p>

            {/* Direct Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/#paket"
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-ochre-amber hover:bg-ochre-amber-hover px-5 sm:px-6 py-3 rounded-xl transition-colors shadow-sm min-h-[44px]"
              >
                Pilih Paket Petualangan
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-5 sm:px-6 py-3 rounded-xl transition-colors min-h-[44px]"
              >
                Konsultasi Jadwal Langsung
              </a>
            </div>
          </div>

          {/* Integrated Quick Filter Bar */}
          <div className="relative z-10 w-full mt-4 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 text-slate-headline shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end">
              {/* Category Select (iPad: 5 cols) */}
              <div className="sm:col-span-5 flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider font-bold text-slate-body flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-river-teal" strokeWidth={2} />
                  Kategori Petualangan
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-stone-muted border border-border-subtle rounded-lg sm:rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40 min-h-[44px]"
                >
                  <option value="semua">Semua Aktivitas</option>
                  <option value="Arung Jeram (Rafting)">Arung Jeram (Elo / Progo)</option>
                  <option value="Jeep Adventure">Jeep Lava Tour Merapi</option>
                  <option value="VW Safari Borobudur">VW Safari Borobudur</option>
                  <option value="Outbound Gathering">Outbound & Team Building</option>
                </select>
              </div>

              {/* Pax Count (iPad: 4 cols) */}
              <div className="sm:col-span-4 flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider font-bold text-slate-body flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-river-teal" strokeWidth={2} />
                  Jumlah Rombongan
                </label>
                <select
                  value={paxCount}
                  onChange={(e) => setPaxCount(e.target.value)}
                  className="w-full bg-stone-muted border border-border-subtle rounded-lg sm:rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40 min-h-[44px]"
                >
                  <option value="2-4">2 - 4 Orang (Keluarga / Pasangan)</option>
                  <option value="5-10">5 - 10 Orang (Grup / Teman)</option>
                  <option value="11-30">11 - 30 Orang (Komunitas / Divisi)</option>
                  <option value="30+">30+ Orang (Rombongan Perusahaan)</option>
                </select>
              </div>

              {/* Action Button (iPad: 3 cols) */}
              <div className="sm:col-span-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-river-teal hover:bg-river-teal-dark px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-colors min-h-[44px]"
                >
                  Cek Slot & Harga
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
