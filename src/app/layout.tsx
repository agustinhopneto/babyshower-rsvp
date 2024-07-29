import type { Metadata } from 'next';
import { Lexend as DMSans } from 'next/font/google';

import '../styles/global.css';
import { data } from '@/config/data';
import { ConfirmationTypeEnum } from '@/lib/constants';

const dmSans = DMSans({ subsets: ['latin'] });

const confirmationType = String(
  process.env.NEXT_PUBLIC_RSVP_TYPE,
) as ConfirmationTypeEnum;

const config = data[confirmationType];

export const metadata: Metadata = {
  title: config.title,
  description: 'Estou chegando pessoal!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
