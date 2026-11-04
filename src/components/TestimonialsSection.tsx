import { Star } from 'lucide-react';
import { Testimonial } from '@/types/database';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section id="testimoni" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-river-teal">
              Ulasan Tamu
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-headline mt-1.5">
              Pengalaman Nyata Bersama Javentra
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-body">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-ochre-amber text-ochre-amber" />
              ))}
            </div>
            <span className="font-bold text-slate-headline">4.9 / 5.0</span>
            <span>(500+ ulasan wisatawan)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-muted border border-border-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-ochre-amber text-ochre-amber" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-body leading-relaxed mb-5 font-normal line-clamp-4">
                  &ldquo;{testi.review}&rdquo;
                </p>
              </div>

              <div className="pt-3.5 border-t border-border-subtle flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-river-teal/10 text-river-teal font-bold flex items-center justify-center text-xs">
                  {testi.client_name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-headline">{testi.client_name}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-body">{testi.origin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
