import { connection } from 'next/server';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CredibilityBar } from '@/components/CredibilityBar';
import { FeaturedPackages } from '@/components/FeaturedPackages';
import { BookingSteps } from '@/components/BookingSteps';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { BasecampSection } from '@/components/BasecampSection';
import { Footer } from '@/components/Footer';
import { FloatingWA } from '@/components/FloatingWA';
import { FALLBACK_PACKAGES, FALLBACK_TESTIMONIALS } from '@/data/fallback';
import { Package, Testimonial } from '@/types/database';
import { createPublicClient } from '@/lib/supabase/public';
import { getSiteSettings } from '@/lib/site-settings';

async function getFeaturedPackages(): Promise<Package[]> {
  try {
    await connection();
    const supabase = createPublicClient();
    if (!supabase) return FALLBACK_PACKAGES;

    // Cek apakah tabel packages sudah terisi data
    const { data: anyPackage } = await supabase
      .from('packages')
      .select('id')
      .eq('is_active', true)
      .limit(1);

    if (!anyPackage || anyPackage.length === 0) {
      // Tabel belum di-seed / kosong sama sekali: tampilkan fallback
      return FALLBACK_PACKAGES;
    }

    // Tabel sudah ada: ambil HANYA paket yang is_featured = true
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(4);

    if (error || !data) {
      return [];
    }
    return data as Package[];
  } catch {
    return FALLBACK_PACKAGES;
  }
}

async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    await connection();
    const supabase = createPublicClient();
    if (!supabase) return FALLBACK_TESTIMONIALS;

    const { data: anyTesti } = await supabase
      .from('testimonials')
      .select('id')
      .eq('is_active', true)
      .limit(1);

    if (!anyTesti || anyTesti.length === 0) {
      return FALLBACK_TESTIMONIALS;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(3);

    if (error || !data) {
      return [];
    }
    return data as Testimonial[];
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export default async function HomePage() {
  const [packages, testimonials, settings] = await Promise.all([
    getFeaturedPackages(),
    getFeaturedTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Navbar settings={settings} />
      <main className="flex-1">
        <HeroSection />
        <CredibilityBar />
        <FeaturedPackages packages={packages} />
        <BookingSteps />
        <TestimonialsSection testimonials={testimonials} />
        <FAQSection />
        <BasecampSection settings={settings} />
      </main>
      <Footer settings={settings} />
      <FloatingWA phone={settings.whatsapp_number} />
    </>
  );
}
