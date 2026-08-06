// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import { routing } from '@/i18n/routing';
import DesignScaleProvider from '@/components/layout/DesignScaleProvider';
import Header from '@/components/layout/Header';
import SectionScrollRail from '@/components/layout/SectionScrollRail';
import ScrollToTopButton from '@/components/layout/ScrollToTopButton';
import SmoothScroll from '@/components/layout/SmoothScroll';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import AcervoZoomPrefetch from '@/components/common/AcervoZoomPrefetch';
import ThemeScript from '@/components/theme/ThemeScript';
import ThemeRestore from '@/components/theme/ThemeRestore';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyingstudio.com.br';

/* Dados estruturados (schema.org) — o Google monta o painel da empresa a
   partir daqui: nome, logo, contato e as redes oficiais conectadas. */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Flying Studio',
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-flying-studio.png`,
  email: 'studio@flyingstudio.com.br',
  telephone: '+55-11-2351-4138',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Engenheiro Luís Carlos Berrini',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  sameAs: [
    'https://www.instagram.com/flyingstudio3d/',
    'https://www.behance.net/flyingstudio3d',
    'https://www.linkedin.com/company/flyingstudio3d/',
    'https://www.tiktok.com/@flyingstudio_3d',
    'https://www.youtube.com/@FlyingStudio.3D',
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Garante width=device-width no mobile — sem isso alguns navegadores
// assumem 980px e o canvas escalado fica deslocado.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  /* Pinch-zoom desativado: a pinça re-rasterizava canvases/blurs no iOS e
     matava a aba por memória. O touch-action no CSS cobre o Safari (que
     ignora estas flags); estas cobrem os demais navegadores. */
  maximumScale: 1,
  userScalable: false,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeScript />
        {/* Antes da Header: o efeito dele corrige o <html> antes do sync do
            ThemeToggle (ver comentário no componente). */}
        <ThemeRestore />
        <DesignScaleProvider />
        <NextIntlClientProvider>
          <SmoothScroll>
            {/* A header vive no LAYOUT, não nas páginas: layouts persistem
                entre navegações, então ela não remonta a cada troca de rota
                — sem replay da animação de entrada (o "aparece transparente
                e depois vitrifica"). A entrada anima só no primeiro load. */}
            <Header />
            <SectionScrollRail />
            <ScrollToTopButton />
            <WhatsAppButton />
            {/* Baixa os mestres do zoom da galeria em segundo plano desde a
                primeira página — o clique no zoom encontra tudo no cache. */}
            <AcervoZoomPrefetch />
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
