import Link from 'next/link';
import { Clock, Users, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { Package } from '@/types/database';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';

interface FeaturedPackagesProps {
  packages: Package[];
}

export function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const consultWaUrl = buildWhatsAppLink({
    phone: DEFAULT_SITE_SETTINGS.whatsapp_number,
    customMessage:
      'Halo Javentra Group, saya ingin konsultasi paket custom (kombinasi Rafting / Jeep / Outbound) untuk rombongan.',
  });

  const displayPackages = packages.slice(0, 4);

  return (
    <section id="paket" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Asymmetrical Highlight Card (iPad: full width top, Desktop: 4 cols) */}
          <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl bg-obsidian text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-border-subtle relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-ochre-amber">
                Pilihan Terbaik Wisatawan
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-2 mb-3.5 leading-tight">
                Paket Bundling & Rute Favorit
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
                Paling sering dipilih oleh rombongan keluarga, instansi BUMN, maupun komunitas. Dilengkapi instruktur, makan siang lokal, kelapa muda, dan asuransi.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-stone-200">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-ochre-amber shrink-0" strokeWidth={2} />
                  <span>Jadwal fleksibel (Pagi / Siang / Weekend)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-ochre-amber shrink-0" strokeWidth={2} />
                  <span>Tersedia fasilitas bilas & parkir bus luas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-ochre-amber shrink-0" strokeWidth={2} />
                  <span>Kombinasi paket custom (Rafting + Jeep)</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
              <p className="text-xs text-stone-400 mb-3">Butuh paket khusus untuk rombongan &gt; 30 orang?</p>
              <a
                href={consultWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-river-teal hover:bg-river-teal-dark py-3 px-4 rounded-xl transition-colors shadow-sm min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                Konsultasi Paket Khusus
              </a>
            </div>
          </div>

          {/* Right Column: Grid of Packages (iPad: 2 cols, Desktop: 8 cols) */}
          {displayPackages.length === 0 ? (
            <div className="lg:col-span-8 rounded-2xl sm:rounded-3xl border border-dashed border-border-subtle p-8 sm:p-12 text-center flex flex-col items-center justify-center bg-stone-muted min-h-[360px]">
              <p className="text-base font-bold text-slate-headline mb-1.5">
                Belum ada paket favorit yang diatur.
              </p>
              <p className="text-xs sm:text-sm text-slate-body max-w-sm mb-6">
                Seluruh petualangan arung jeram, jeep lava tour, dan outbound siap dilihat di katalog lengkap kami.
              </p>
              <Link
                href="/paket"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-headline hover:bg-black px-5 py-3 rounded-xl transition-colors shadow-sm"
              >
                <span>Buka Katalog Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {displayPackages.map((pkg) => {
                const bookingUrl = buildWhatsAppLink({
                  phone: DEFAULT_SITE_SETTINGS.whatsapp_number,
                  packageName: pkg.name,
                  pax: pkg.min_pax,
                });

                return (
                  <div
                    key={pkg.id}
                    className="rounded-xl sm:rounded-2xl border border-border-subtle bg-white flex flex-col justify-between p-5 sm:p-6 hover:border-river-teal/50 hover:shadow-lg transition-all"
                  >
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-stone-muted text-slate-headline">
                          {pkg.category.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-body font-medium">
                          <Clock className="w-3.5 h-3.5 text-river-teal" strokeWidth={1.75} />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>

                      {/* Title & Price */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-headline mb-2 leading-snug hover:text-river-teal transition-colors">
                        <Link href={`/paket/${pkg.slug}`}>{pkg.name}</Link>
                      </h3>

                      <div className="mb-4 pb-4 border-b border-border-subtle">
                        <span className="text-xl sm:text-2xl font-extrabold text-slate-headline tracking-tight">
                          Rp {pkg.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-xs text-slate-body font-medium ml-1">
                          / {pkg.price_unit}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-body mt-1">
                          <Users className="w-3.5 h-3.5 text-river-teal" strokeWidth={1.75} />
                          <span>Kapasitas ideal: min. {pkg.min_pax} orang</span>
                        </div>
                      </div>

                      {/* Includes Checklist */}
                      <ul className="space-y-2 mb-6">
                        {pkg.includes.slice(0, 3).map((inc, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-body">
                            <Check className="w-3.5 h-3.5 text-river-teal shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="line-clamp-1">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/paket/${pkg.slug}`}
                        className="inline-flex items-center justify-center gap-1 text-xs font-bold text-slate-headline bg-stone-muted hover:bg-stone-200 py-3 rounded-lg sm:rounded-xl border border-border-subtle transition-colors min-h-[44px]"
                      >
                        <span>Rincian</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-ochre-amber hover:bg-ochre-amber-hover py-3 rounded-lg sm:rounded-xl transition-colors shadow-sm min-h-[44px]"
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

        {/* View All Packages Footer Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/paket"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-headline hover:bg-black px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            <span>Lihat Semua Paket (Katalog Lengkap)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
