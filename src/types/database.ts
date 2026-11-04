export type PackageCategory = 'rafting' | 'jeep' | 'vw' | 'outbound' | 'custom';
export type PriceUnit = 'pax' | 'jeep' | 'mobil' | 'paket';

export interface Package {
  id: string;
  slug: string;
  name: string;
  category: PackageCategory;
  price: number;
  price_unit: PriceUnit;
  duration: string;
  min_pax: number;
  description: string;
  includes: string[];
  excludes: string[];
  itinerary: { time: string; activity: string }[];
  images: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  origin: string;
  rating: number;
  review: string;
  avatar_url?: string | null;
  package_id?: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface SiteSettings {
  whatsapp_number: string;
  whatsapp_display: string;
  basecamp_address: string;
  maps_url: string;
  instagram_url?: string;
  tiktok_url?: string;
  operational_hours: string;
}
