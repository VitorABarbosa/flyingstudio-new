// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import { routing } from '@/i18n/routing';
import DesignScaleProvider from '@/components/layout/DesignScaleProvider';
import SectionScrollRail from '@/components/layout/SectionScrollRail';
import ScrollToTopButton from '@/components/layout/ScrollToTopButton';
import SmoothScroll from '@/components/layout/SmoothScroll';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import ThemeScript from '@/components/theme/ThemeScript';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyingstudio.com.br';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Garante width=device-width no mobile — sem isso alguns navegadores
// assumem 980px e o canvas escalado fica deslocado.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  // localePrefix 'as-needed': pt-BR é servido em '/', en em '/en'
  const isDefaultLocale = locale === routing.defaultLocale;
  const canonicalUrl = isDefaultLocale ? `${SITE_URL}/` : `${SITE_URL}/${locale}`;

  return {
    title: {
      default: t('title'),
      template: `%s | Flying Studio`,
    },
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: 'Flying Studio',
      locale: isDefaultLocale ? 'pt_BR' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pt-BR': `${SITE_URL}/`,
        en: `${SITE_URL}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Valida o locale — retorna 404 para locales inválidos (ex: /fr, /de)
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // DEVE ser chamado antes de qualquer hook next-intl neste componente e seus filhos
  setRequestLocale(locale);

  return (
    <html lang={locale} className={outfit.variable} suppressHydrationWarning>
      <body>
        <ThemeScript />
        <DesignScaleProvider />
        <NextIntlClientProvider>
          <SmoothScroll>
            <SectionScrollRail />
            <ScrollToTopButton />
            <WhatsAppButton />
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
