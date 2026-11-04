'use client';

import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';

interface PillarItem {
  title: string;
  category: string;
  location: string;
  startingPrice: string;
  image: string;
  description: string;
  slug: string;
}

const PILLARS: PillarItem[] = [
  {
    title: 'Arung Jeram Sungai Elo & Progo',
    category: 'Rafting',
    location: 'Magelang, Jawa Tengah',
    startingPrice: 'Mulai Rp 750k / Boat',
    image:
      'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
    description: 'Jalur 12.5 KM ramah pemula & keluarga dengan jeram grade II-III.',
    slug: 'arung-jeram-sungai-elo',
  },
  {
    title: 'Jeep Lava Tour Merapi',
    category: 'Jeep 4x4',
    location: 'Kaliurang, Yogyakarta',
    startingPrice: 'Mulai Rp 450k / Jeep',
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'Sensasi offroad bebatuan vulkanik dan manuver basah Kalikuning.',
    slug: 'jeep-lava-tour-merapi-medium',
  },
  {
    title: 'VW Safari Borobudur Heritage',
    category: 'Klasik Tour',
    location: 'Borobudur, Magelang',
    startingPrice: 'Mulai Rp 450k / Mobil',
    image:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    description: 'Keliling desa wisata dan cagar budaya dengan mobil antik atap terbuka.',
    slug: 'vw-safari-borobudur-heritage',
  },
  {
    title: 'Outbound & Gathering Perusahaan',
    category: 'Team Building',
    location: 'Magelang & Yogyakarta',
    startingPrice: 'Mulai Rp 185k / Pax',
    image:
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    description: 'Program dinamika tim, fun games, sound system, dan konsumsi lengkap.',
    slug: 'outbound-team-building-gathering',
  },
];

export function PillarsSection() {
  return (
    <section id="aktivitas" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-stone-muted">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-river-teal">
              Katalog Aktivitas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-headline mt-1.5">
              Petualangan Pilihan di Jalur Wisata
            </h2>
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-slate-body max-w-md">
            Pilih jalur petualangan sungai, lereng gunung Merapi, atau keindahan pedesaan Borobudur dengan fasilitas lengkap.
          </p>
        </div>

        {/* Responsive Grid: Horizontal Scroll on Mobile, 2 Columns on iPad, 4 Columns on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {PILLARS.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[270px] sm:min-w-0 snap-center rounded-2xl overflow-hidden relative group aspect-[3/4] bg-obsidian flex flex-col justify-between p-5 border border-border-subtle shadow-sm hover:shadow-md transition-all"
            >
              {/* Background Photographic Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              {/* Dark Scrim Gradient for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-black/30" />

              {/* Top Tags */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white border border-white/10">
                  {item.category}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-headline shadow-sm">
                  {item.startingPrice}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-1.5 text-xs text-stone-300 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-ochre-amber" strokeWidth={2} />
                  <span>{item.location}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-snug mb-1.5 text-white group-hover:text-stone-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 mb-4 font-normal">
                  {item.description}
                </p>

                <Link
                  href="/#paket"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ochre-amber hover:text-white transition-colors uppercase tracking-wider min-h-[36px]"
                >
                  Lihat Rincian
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
