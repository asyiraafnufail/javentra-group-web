import Link from 'next/link';
import { Compass, PhoneCall, MapPin } from 'lucide-react';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';
import { SiteSettings } from '@/types/database';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps = {}) {
  const activeSettings = settings || DEFAULT_SITE_SETTINGS;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian text-white border-t border-white/10 pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white text-obsidian flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-ochre-amber" strokeWidth={2} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                JAVENTRA GROUP
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm mb-6">
              Penyedia resmi aktivitas luar ruang arung jeram Sungai Elo & Progo, Jeep Adventure Merapi, VW Safari Borobudur, dan Outbound Gathering Magelang — Yogyakarta.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={activeSettings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                aria-label="Instagram Javentra Group"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300 mb-4">
              Layanan Petualangan
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/paket/arung-jeram-sungai-elo" className="hover:text-white transition-colors">
                  Arung Jeram Sungai Elo
                </Link>
              </li>
              <li>
                <Link href="/paket" className="hover:text-white transition-colors">
                  Arung Jeram Sungai Progo
                </Link>
              </li>
              <li>
                <Link href="/paket/jeep-lava-tour-merapi-medium" className="hover:text-white transition-colors">
                  Jeep Lava Tour Merapi
                </Link>
              </li>
              <li>
                <Link href="/paket/vw-safari-borobudur-heritage" className="hover:text-white transition-colors">
                  VW Safari Wisata Borobudur
                </Link>
              </li>
              <li>
                <Link href="/paket/outbound-team-building-gathering" className="hover:text-white transition-colors">
                  Outbound & Team Building
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-300 mb-4">
              Kontak & Basecamp
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ochre-amber shrink-0 mt-1" strokeWidth={1.75} />
                <span>{activeSettings.basecamp_address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-ochre-amber shrink-0" strokeWidth={1.75} />
                <span>{activeSettings.whatsapp_display}</span>
              </li>
              <li className="text-xs text-stone-500 pt-2">
                Jam Pelayanan: {activeSettings.operational_hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>&copy; {currentYear} Javentra Group. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-4">
            <span>Standar Keselamatan BNSP</span>
            <span>&bull;</span>
            <span>Asuransi Resmi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
