// src/app/layout.tsx
// Root layout minimal — <html> e <body> ficam em [locale]/layout.tsx
// para permitir lang={locale} dinâmico por idioma.
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyingstudio.com.br'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
