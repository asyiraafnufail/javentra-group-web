'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, Check, ArrowRight, Search, MessageSquare } from 'lucide-react';
import { Package, PackageCategory } from '@/types/database';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';

interface PackagesCatalogClientProps {
  initialPackages: Package[];
}

export function PackagesCatalogClient({ initialPackages }: PackagesCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: string; value: string }[] = [
    { label: 'Semua Aktivitas', value: 'all' },
    { label: 'Arung Jeram (Rafting)', value: 'rafting' },
    { label: 'Jeep Lava Tour', value: 'jeep' },
    { label: 'VW Safari Borobudur', value: 'vw' },
    { label: 'Outbound Gathering', value: 'outbound' },
  ];

  const filteredPackages = initialPackages.filter((pkg) => {
    const matchCategory =
      selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-border-subtle shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-obsidian text-white shadow-sm'
                  : 'text-slate-headline hover:bg-stone-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari rute atau aktivitas..."
            className="w-full bg-stone-muted border border-border-subtle rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-headline placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-river-teal/40"
          />
        </div>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border-subtle p-12 text-center">
          <p className="text-sm font-bold text-slate-headline">
            Tidak ada paket yang sesuai dengan pencarian Anda.
          </p>
          <p className="text-xs text-slate-body mt-1">
            Coba ganti kata kunci atau pilih kategori lain.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-stone-muted hover:bg-stone-200 text-xs font-bold text-slate-headline rounded-xl transition-colors"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map((pkg) => {
            const bookingUrl = buildWhatsAppLink({
              phone: DEFAULT_SITE_SETTINGS.whatsapp_number,
              packageName: pkg.name,
              pax: pkg.min_pax,
            });

            const coverImage =
              pkg.images && pkg.images.length > 0
                ? pkg.images[0]
                : 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-border-subtle overflow-hidden flex flex-col justify-between hover:border-river-teal/50 hover:shadow-lg transition-all group"
              >
                <div>
                  {/* Photo Container */}
                  <Link
                    href={`/paket/${pkg.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-obsidian"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${coverImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-black/20" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white border border-white/10">
                        {pkg.category.toUpperCase()}
                      </span>
                      {pkg.is_featured && (
                        <span className="px-2.5 py-1 rounded-md bg-ochre-amber text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                          Favorit
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-body mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-river-teal" />
                        <span>{pkg.duration}</span>
                      </div>
                      <span>&bull;</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-river-teal" />
                        <span>Min. {pkg.min_pax} orang</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-headline mb-2 leading-snug group-hover:text-river-teal transition-colors">
                      <Link href={`/paket/${pkg.slug}`}>{pkg.name}</Link>
                    </h3>

                    <p className="text-xs text-slate-body line-clamp-2 mb-4 leading-relaxed font-normal">
                      {pkg.description}
                    </p>

                    <div className="mb-4 pb-4 border-b border-border-subtle">
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-headline tracking-tight">
                        Rp {pkg.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-xs text-slate-body font-medium ml-1">
                        / {pkg.price_unit}
                      </span>
                    </div>

                    {/* Includes Checklist Preview */}
                    <ul className="space-y-1.5 mb-2">
                      {pkg.includes.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-body">
                          <Check className="w-3.5 h-3.5 text-river-teal shrink-0 mt-0.5" strokeWidth={2} />
                          <span className="line-clamp-1">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom Action Buttons */}
                <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2.5">
                  <Link
                    href={`/paket/${pkg.slug}`}
                    className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl border border-border-subtle text-xs font-bold text-slate-headline hover:bg-stone-muted transition-colors min-h-[44px]"
                  >
                    <span>Rincian</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-ochre-amber hover:bg-ochre-amber-hover transition-colors shadow-sm min-h-[44px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Booking WA</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
