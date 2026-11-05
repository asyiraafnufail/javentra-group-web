import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connection } from 'next/server';
import {
  Clock,
  Users,
  Check,
  X as CloseIcon,
  ShieldCheck,
  CalendarCheck,
  PhoneCall,
  ChevronRight,
  ArrowRight,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingWA } from '@/components/FloatingWA';
import { FALLBACK_PACKAGES } from '@/data/fallback';
import { Package } from '@/types/database';
import { createPublicClient } from '@/lib/supabase/public';
import { getSiteSettings } from '@/lib/site-settings';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface PackageDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getPackageBySlug(slug: string): Promise<Package | null> {
  try {
    await connection();
    const supabase = createPublicClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (!error && data) {
        return data as Package;
      }
    }

    const fallback = FALLBACK_PACKAGES.find((p) => p.slug === slug);
    return fallback || null;
  } catch {
    const fallback = FALLBACK_PACKAGES.find((p) => p.slug === slug);
    return fallback || null;
  }
}

async function getRelatedPackages(currentSlug: string): Promise<Package[]> {
  try {
    const supabase = createPublicClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .neq('slug', currentSlug)
        .eq('is_active', true)
        .limit(3);

      if (!error && data && data.length > 0) {
        return data as Package[];
      }
    }
    return FALLBACK_PACKAGES.filter((p) => p.slug !== currentSlug).slice(0, 3);
  } catch {
    return FALLBACK_PACKAGES.filter((p) => p.slug !== currentSlug).slice(0, 3);
  }
}

export async function generateMetadata({ params }: PackageDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    return {
      title: 'Paket Tidak Ditemukan | Javentra Group',
    };
  }

  return {
    title: `${pkg.name} | Javentra Group`,
    description: pkg.description.slice(0, 160),
  };
}

export default async function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { slug } = await params;
  const [pkg, relatedPackages, settings] = await Promise.all([
    getPackageBySlug(slug),
    getRelatedPackages(slug),
    getSiteSettings(),
  ]);

  if (!pkg) {
    notFound();
  }

  const bookingUrl = buildWhatsAppLink({
    phone: settings.whatsapp_number,
    packageName: pkg.name,
    pax: pkg.min_pax,
  });

  const coverImage =
    pkg.images && pkg.images.length > 0
      ? pkg.images[0]
      : 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1600&q=85';

  return (
    <>
      <Navbar settings={settings} />

      <main className="min-h-screen bg-stone-muted pt-20 sm:pt-24 pb-16 sm:pb-24">
        {/* Breadcrumb Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center gap-1.5 text-xs text-slate-body overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-slate-headline transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/paket" className="hover:text-slate-headline transition-colors">
              Paket Wisata
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-headline truncate max-w-[200px] sm:max-w-none">
              {pkg.name}
            </span>
          </nav>
        </div>

        {/* Hero Photographic Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-obsidian text-white min-h-[340px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 border border-white/10 shadow-xl">
            <div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-55"
              style={{ backgroundImage: `url('${coverImage}')` }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-black/30" />

            <div className="relative z-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                  {pkg.category.toUpperCase()}
                </span>
                {pkg.is_featured && (
                  <span className="px-3 py-1 rounded-md bg-ochre-amber text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                    Favorit Wisatawan
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                {pkg.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-stone-200">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-ochre-amber" strokeWidth={2} />
                  <span>Durasi: {pkg.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-ochre-amber" strokeWidth={2} />
                  <span>Kapasitas: Min. {pkg.min_pax} orang</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-ochre-amber" strokeWidth={2} />
                  <span>Asuransi Termasuk</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: 8-col detail vs 4-col sticky booking card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Description Card */}
              <div className="bg-white rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-slate-headline mb-3">
                  Deskripsi & Daya Tarik Paket
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-body leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Includes & Excludes Card */}
              <div className="bg-white rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg sm:text-xl font-bold text-slate-headline mb-6">
                  Fasilitas & Rincian Layanan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Included */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-river-teal mb-3 flex items-center gap-1.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                      Sudah Termasuk (Include)
                    </h3>
                    <ul className="space-y-2.5">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-headline">
                          <Check className="w-4 h-4 text-river-teal shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded */}
                  {pkg.excludes && pkg.excludes.length > 0 && (
                    <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-8 border-border-subtle">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                        <CloseIcon className="w-4 h-4 stroke-[2.5]" />
                        Belum Termasuk (Exclude)
                      </h3>
                      <ul className="space-y-2.5">
                        {pkg.excludes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-body">
                            <CloseIcon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" strokeWidth={2} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Itinerary Timeline */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <div className="bg-white rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-sm">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-headline mb-2">
                    Rundown & Jadwal Trip
                  </h2>
                  <p className="text-xs text-slate-body mb-6">
                    Waktu bersifat acuan dan dapat disesuaikan dengan ritme kedatangan rombongan Anda.
                  </p>

                  <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-subtle">
                    {pkg.itinerary.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-4 pl-8">
                        <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-river-teal border-2 border-white shadow-xs" />
                        <div>
                          <span className="text-xs font-bold font-mono text-river-teal block">
                            {step.time} WIB
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-headline">
                            {step.activity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preparation & Safety Notice */}
              <div className="bg-stone-muted border border-border-subtle rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-border-subtle flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-river-teal" />
                </div>
                <div className="text-xs sm:text-sm text-slate-body leading-relaxed">
                  <h4 className="font-bold text-slate-headline mb-1">
                    Persiapan Menuju Basecamp
                  </h4>
                  <p>
                    Harap membawa pakaian ganti santai yang mudah kering, peralatan mandi, dan sandal bertali. Seluruh perlengkapan rescue (pelampung, helm) disediakan langsung di basecamp setelah proses registrasi.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sticky Booking Box (4 cols) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-border-subtle p-6 sm:p-7 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-body block mb-1">
                  Biaya Resmi Paket
                </span>
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-headline tracking-tight">
                    Rp {pkg.price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-body font-medium ml-1">
                    / {pkg.price_unit}
                  </span>
                </div>

                <div className="space-y-2.5 pb-6 mb-6 border-b border-border-subtle text-xs text-slate-body">
                  <div className="flex items-center justify-between">
                    <span>Durasi Trip:</span>
                    <strong className="text-slate-headline font-semibold">{pkg.duration}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Kapasitas Minimal:</span>
                    <strong className="text-slate-headline font-semibold">{pkg.min_pax} Peserta</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Asuransi Keselamatan:</span>
                    <strong className="text-emerald-700 font-semibold">Termasuk Resmi</strong>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-ochre-amber hover:bg-ochre-amber-hover transition-colors shadow-sm min-h-[46px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Pesan via WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${settings.whatsapp_number}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border-subtle text-xs font-bold text-slate-headline hover:bg-stone-muted transition-colors min-h-[42px]"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-river-teal" />
                    <span>Hotline: {settings.whatsapp_display}</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-400 text-center mt-4">
                  Reservasi instan tanpa perlu kartu kredit. Pembayaran DP aman via rekening resmi operator.
                </p>
              </div>

              {/* Guarantees Box */}
              <div className="bg-white rounded-2xl border border-border-subtle p-5 text-xs space-y-3">
                <div className="flex items-center gap-2.5 text-slate-headline font-semibold">
                  <ShieldCheck className="w-4 h-4 text-river-teal shrink-0" />
                  <span>Pemandu Berlisensi BNSP & Rescue</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-headline font-semibold">
                  <CalendarCheck className="w-4 h-4 text-river-teal shrink-0" />
                  <span>Jadwal Pengarungan Terpantau Aman</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Packages Carousel / Grid */}
        {relatedPackages.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 pt-12 border-t border-border-subtle">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-river-teal">
                  Rekomendasi Lain
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-headline mt-1">
                  Paket Petualangan Pilihan Lainnya
                </h3>
              </div>
              <Link
                href="/paket"
                className="text-xs font-bold text-river-teal hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPackages.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-border-subtle p-5 flex flex-col justify-between hover:border-river-teal/50 hover:shadow-md transition-all"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-muted text-slate-headline">
                      {rel.category.toUpperCase()}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-headline mt-2 mb-1 line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-body line-clamp-2 mb-3">
                      {rel.description}
                    </p>
                    <div className="text-base font-extrabold text-slate-headline">
                      Rp {rel.price.toLocaleString('id-ID')}
                      <span className="text-xs font-normal text-slate-body ml-1">
                        /{rel.price_unit}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/paket/${rel.slug}`}
                    className="mt-4 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-border-subtle text-xs font-bold text-slate-headline hover:bg-stone-muted transition-colors"
                  >
                    <span>Rincian Paket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer settings={settings} />
      <FloatingWA phone={settings.whatsapp_number} />
    </>
  );
}
