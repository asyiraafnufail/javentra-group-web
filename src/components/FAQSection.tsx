import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Apakah pemula atau yang tidak bisa berenang aman ikut arung jeram?',
    a: 'Sangat aman. Jalur Sungai Elo adalah grade II-III (tingkat pemula & keluarga). Setiap peserta wajib mengenakan pelampung PFD berdaya apung tinggi bersertifikasi internasional dan helm pelindung. Setiap perahu didampingi oleh instruktur (skipper) bersertifikat rescue yang memandu dayungan dari start hingga finish.',
  },
  {
    q: 'Berapa batasan usia untuk peserta arung jeram dan jeep tour?',
    a: 'Untuk arung jeram Sungai Elo, usia minimal adalah 6 tahun dan maksimal 65 tahun dalam kondisi fisik prima/sehat. Untuk Jeep Adventure Lava Tour Merapi dan VW Safari, dapat diikuti oleh seluruh usia termasuk anak-anak dan lansia.',
  },
  {
    q: 'Bagaimana jika saat jadwal trip turun hujan?',
    a: 'Arung jeram tetap berjalan saat hujan rintik hingga sedang karena aktivitas di air memang basah. Pemandu memantau debit air bendungan hulu setiap saat. Jika debit melebihi batas toleransi keselamatan (banjir), jadwal akan dialihkan ke jam aman atau opsi penjadwalan ulang penuh.',
  },
  {
    q: 'Perlengkapan apa saja yang wajib dibawa dari rumah?',
    a: 'Baju ganti lengkap, peralatan mandi, pakaian olahraga/santai yang nyaman dan mudah kering, serta alas kaki bertali (sandal gunung atau sepatu air). Hindari memakai celana jeans tebal saat arung jeram.',
  },
  {
    q: 'Apakah basecamp memiliki fasilitas bilas dan parkir bus besar?',
    a: 'Ya. Basecamp Javentra memiliki lebih dari 15 kamar mandi bilas bersih, mushola, restoran transit prasmanan, dan area parkir luas yang dapat menampung hingga 10 bus pariwisata ukuran besar.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-stone-muted border-t border-border-subtle">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-river-teal">
            Informasi Praktis
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-headline mt-1.5">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-body mt-2">
            Panduan persiapan sebelum Anda dan rombongan tiba di lokasi basecamp.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-3.5">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white rounded-xl sm:rounded-2xl border border-border-subtle p-4 sm:p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer open:ring-1 open:ring-river-teal/40 transition-all"
            >
              <summary className="flex items-center justify-between text-xs sm:text-sm md:text-base font-bold text-slate-headline select-none gap-2">
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-slate-body shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="text-xs sm:text-sm text-slate-body leading-relaxed mt-3 pt-3 border-t border-border-subtle/60">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
