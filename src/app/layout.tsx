import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Javentra Group | Wisata Petualangan Magelang & Yogyakarta',
  description:
    'Spesialis wisata outdoor resmi: Arung Jeram Sungai Elo & Progo, Jeep Adventure Lava Tour Merapi, VW Safari Borobudur, Outbound & Gathering dengan standar keselamatan bersertifikat.',
  keywords: [
    'Rafting Magelang',
    'Arung Jeram Elo',
    'Jeep Merapi',
    'Lava Tour',
    'VW Borobudur',
    'Javentra Group',
    'Outbound Magelang',
  ],
  openGraph: {
    title: 'Javentra Group — Adventure & Outdoor Specialist',
    description:
      'Arung Jeram Sungai Elo, Jeep Lava Tour Merapi, VW Safari Borobudur, Outbound Gathering. Standar rescue resmi, pemandu bersertifikat, dan asuransi penuh.',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-headline font-display antialiased flex flex-col selection:bg-ochre-amber selection:text-white">
        {children}
      </body>
    </html>
  );
}
