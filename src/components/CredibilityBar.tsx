import { ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export function CredibilityBar() {
  return (
    <section id="keselamatan" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative & Real Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-river-teal">
                Standar Javentra Group
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-headline mt-2 mb-3.5 leading-tight">
                Prioritas Keselamatan di Alam Bebas, Kenyamanan di Basecamp.
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-slate-body leading-relaxed mb-6 sm:mb-8">
                Kegiatan luar ruang menuntut kehati-hatian teknis tinggi. Kami menggabungkan perlengkapan teruji, instruktur bersertifikasi rescue arung jeram, serta armada terawat untuk memastikan setiap detik petualangan Anda aman dan berkesan.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-border-subtle">
              <div>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-headline tracking-tight">
                  12k+
                </span>
                <span className="text-xs sm:text-sm text-slate-body font-medium">
                  Peserta Terlayani
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-headline tracking-tight">
                  10 Th
                </span>
                <span className="text-xs sm:text-sm text-slate-body font-medium">
                  Pengalaman Jalur
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-headline tracking-tight">
                  100%
                </span>
                <span className="text-xs sm:text-sm text-slate-body font-medium">
                  Guide Berlisensi
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Safety Cards (Vertical Stack) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
            {/* Card 1 */}
            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-muted border border-border-subtle flex flex-col sm:flex-row items-start gap-4 hover:border-river-teal/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-white border border-border-subtle flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-river-teal" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-headline mb-1">
                  Instruktur & Skipper Berlisensi Rescue
                </h3>
                <p className="text-xs sm:text-sm text-slate-body leading-relaxed">
                  Seluruh pemandu arung jeram mengantongi sertifikasi kompetensi BNSP dan pelatihan evakuasi air deras (white water rescue). Paham karakter jeram Sungai Elo dan Progo di segala musim.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-muted border border-border-subtle flex flex-col sm:flex-row items-start gap-4 hover:border-river-teal/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-white border border-border-subtle flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-river-teal" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-headline mb-1">
                  Peralatan Standar Internasional & Armada Mandiri
                </h3>
                <p className="text-xs sm:text-sm text-slate-body leading-relaxed">
                  Perahu karet tebal multi-chamber, helm bersertifikasi CE, pelampung daya apung tinggi (PFD), serta armada Jeep 4x4 dan VW klasik yang melewati inspeksi kelayakan rutin sebelum jalan.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-muted border border-border-subtle flex flex-col sm:flex-row items-start gap-4 hover:border-river-teal/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-white border border-border-subtle flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-river-teal" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-headline mb-1">
                  Proteksi Asuransi Resmi di Seluruh Paket
                </h3>
                <p className="text-xs sm:text-sm text-slate-body leading-relaxed">
                  Transparansi tanpa biaya tersembunyi. Semua peserta terdaftar otomatis dalam polis asuransi keselamatan resmi sejak registrasi di basecamp hingga kembali ke titik kumpul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
