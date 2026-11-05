import { CalendarCheck, MessageCircle, Flag } from 'lucide-react';

export function BookingSteps() {
  const steps = [
    {
      step: '01',
      title: 'Pilih Aktivitas & Tanggal',
      description:
        'Tentukan rute arung jeram (Elo/Progo), jeep adventure, atau VW safari, serta estimasi rombongan peserta Anda.',
      icon: CalendarCheck,
    },
    {
      step: '02',
      title: 'Konfirmasi via WhatsApp',
      description:
        'Admin kami mengonfirmasi ketersediaan slot, jam pengarungan optimal, dan rincian konsumsi tanpa repot isi form panjang.',
      icon: MessageCircle,
    },
    {
      step: '03',
      title: 'Tiba di Basecamp & Mulai',
      description:
        'Registrasi ulang di basecamp, briefing keselamatan standar rescue bersama instruktur, fitting perlengkapan, dan nikmati petualangan.',
      icon: Flag,
    },
  ];

  return (
    <section id="cara-pesan" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-muted border-t border-b border-border-subtle">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-river-teal">
            Alur Reservasi Cepat
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-headline mt-1">
            Reservasi Mudah Tanpa Birokrasi Rumit
          </h2>
          <p className="text-xs sm:text-sm text-slate-body mt-2">
            Pesan langsung dengan operator lokal tanpa perantara agen. Konfirmasi instan dalam hitungan menit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-border-subtle relative flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-slate-300">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-stone-muted flex items-center justify-center">
                      <Icon className="w-5 h-5 text-river-teal" strokeWidth={1.75} />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-headline mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-body leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
