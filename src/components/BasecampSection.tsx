import { MapPin, Clock, Bus, ExternalLink } from 'lucide-react';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';

export function BasecampSection() {
  return (
    <section id="lokasi" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Basecamp Details */}
          <div className="lg:col-span-5">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-river-teal">
              Titik Kumpul & Fasilitas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-headline mt-1 mb-3 leading-tight">
              Basecamp Utama Javentra Group
            </h2>
            <p className="text-xs sm:text-sm text-slate-body leading-relaxed mb-5">
              Terletak di lokasi strategis jalur wisata Magelang & Borobudur. Akses jalan aspal lebar mulus dan mudah dijangkau bus besar maupun kendaraan pribadi.
            </p>

            <div className="space-y-3.5 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-river-teal shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <span className="block text-[11px] font-bold text-slate-headline uppercase tracking-wider">
                    Alamat Fisik
                  </span>
                  <span className="text-xs sm:text-sm text-slate-body">
                    {DEFAULT_SITE_SETTINGS.basecamp_address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-river-teal shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <span className="block text-[11px] font-bold text-slate-headline uppercase tracking-wider">
                    Jam Operasional Layanan
                  </span>
                  <span className="text-xs sm:text-sm text-slate-body">
                    {DEFAULT_SITE_SETTINGS.operational_hours}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Bus className="w-4 h-4 text-river-teal shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <span className="block text-[11px] font-bold text-slate-headline uppercase tracking-wider">
                    Fasilitas Rombongan
                  </span>
                  <span className="text-xs sm:text-sm text-slate-body">
                    Parkir 10+ bus besar, 15+ kamar bilas bersih, mushola, resto transit.
                  </span>
                </div>
              </div>
            </div>

            <a
              href={DEFAULT_SITE_SETTINGS.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-headline hover:bg-black px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-colors shadow-sm"
            >
              <span>Buka Petunjuk Google Maps</span>
              <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
            </a>
          </div>

          {/* Map Preview Visual Container */}
          <div className="lg:col-span-7 rounded-2xl md:rounded-3xl overflow-hidden border border-border-subtle bg-stone-muted aspect-[16/10] max-h-[380px] relative shadow-sm">
            <iframe
              title="Peta Lokasi Javentra Group Basecamp"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63278.47253597361!2d110.1830501!3d-7.5843468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a898953184d09%3A0x4027a76e352f200!2sKabupaten%20Magelang%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-90 contrast-95"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
