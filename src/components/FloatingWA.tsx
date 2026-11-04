import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';

export function FloatingWA() {
  const waUrl = buildWhatsAppLink({
    phone: DEFAULT_SITE_SETTINGS.whatsapp_number,
    customMessage: 'Halo Javentra Group, saya ingin informasi reservasi dan ketersediaan paket.',
  });

  return (
    <aside aria-label="Bantuan Langsung WhatsApp">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
        aria-label="Hubungi Javentra Group via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </aside>
  );
}
