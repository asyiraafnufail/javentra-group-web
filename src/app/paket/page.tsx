import { Metadata } from 'next';
import { connection } from 'next/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingWA } from '@/components/FloatingWA';
import { FALLBACK_PACKAGES } from '@/data/fallback';
import { Package } from '@/types/database';
import { createPublicClient } from '@/lib/supabase/public';
import { getSiteSettings } from '@/lib/site-settings';
import { PackagesCatalogClient } from './PackagesCatalogClient';

export const metadata: Metadata = {
  title: 'Katalog Paket Petualangan | Javentra Group Magelang & Yogyakarta',
  description:
    'Daftar lengkap paket arung jeram Sungai Elo & Progo, Jeep Adventure Lava Tour Merapi, VW Safari Borobudur, dan Outbound Gathering dengan harga transparan dan standar keselamatan rescue.',
};

async function getAllPackages(): Promise<Package[]> {
  try {
    await connection();
    const supabase = createPublicClient();
    if (!supabase) return FALLBACK_PACKAGES;

    const { data: anyPackage } = await supabase
      .from('packages')
      .select('id')
      .eq('is_active', true)
      .limit(1);

    if (!anyPackage || anyPackage.length === 0) {
      return FALLBACK_PACKAGES;
    }

    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('is_featured', { ascending: false });

    if (error || !data) {
      return [];
    }
    return data as Package[];
  } catch {
    return FALLBACK_PACKAGES;
  }
}

export default async function PaketPage() {
  const [packages, settings] = await Promise.all([
    getAllPackages(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <main className="min-h-screen bg-stone-muted pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-river-teal">
              Katalog Wisata Terbuka
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-headline mt-2 mb-3">
              Pilihan Paket Petualangan
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-body leading-relaxed">
              Seluruh paket telah mencakup peralatan standar internasional bersertifikasi, instruktur rescue berpengalaman, dan perlindungan asuransi resmi.
            </p>
          </div>

          {/* Interactive Catalog Grid & Filter */}
          <PackagesCatalogClient initialPackages={packages} />
        </div>
      </main>
      <Footer settings={settings} />
      <FloatingWA phone={settings.whatsapp_number} />
    </>
  );
}
