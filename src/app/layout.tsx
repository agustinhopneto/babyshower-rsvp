import type { Metadata } from 'next';
import { Lexend as DMSans } from 'next/font/google';

import '../styles/global.css';

const dmSans = DMSans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carolina Lira RSVP',
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
