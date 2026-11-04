import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CredibilityBar } from '@/components/CredibilityBar';
import { PillarsSection } from '@/components/PillarsSection';
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

export const instant = false;

async function getFeaturedPackages(): Promise<Package[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) return FALLBACK_PACKAGES;

    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .limit(6);

    if (error || !data || data.length === 0) {
      return FALLBACK_PACKAGES;
    }
    return data as Package[];
  } catch {
    return FALLBACK_PACKAGES;
  }
}

async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) return FALLBACK_TESTIMONIALS;

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .limit(3);

    if (error || !data || data.length === 0) {
      return FALLBACK_TESTIMONIALS;
    }
    return data as Testimonial[];
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export default async function HomePage() {
  const [packages, testimonials] = await Promise.all([
    getFeaturedPackages(),
    getFeaturedTestimonials(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CredibilityBar />
        <PillarsSection />
        <FeaturedPackages packages={packages} />
        <BookingSteps />
        <TestimonialsSection testimonials={testimonials} />
        <FAQSection />
        <BasecampSection />
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
