/**
 * Format nomor telepon lokal (08xx) menjadi format internasional (628xx)
 */
export function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    return '62' + cleaned.slice(1);
  }
  if (cleaned.startsWith('62')) {
    return cleaned;
  }
  return '62' + cleaned;
}

/**
 * Buat tautan WhatsApp booking dengan teks terstruktur
 */
export function buildWhatsAppLink(options: {
  phone: string;
  packageName?: string;
  pax?: number;
  date?: string;
  customMessage?: string;
}): string {
  const targetPhone = formatWhatsAppNumber(options.phone);

  if (options.customMessage) {
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(options.customMessage)}`;
  }

  const parts: string[] = ['Halo Javentra Group, saya ingin reservasi:'];

  if (options.packageName) {
    parts.push(`- Paket: ${options.packageName}`);
  }
  if (options.pax) {
    parts.push(`- Perkiraan Peserta: ${options.pax} orang`);
  }
  if (options.date) {
    parts.push(`- Rencana Tanggal: ${options.date}`);
  }

  parts.push('', 'Apakah slot jadwal tersebut masih tersedia? Terima kasih.');

  const message = parts.join('\n');
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}
