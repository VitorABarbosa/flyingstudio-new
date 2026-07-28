// src/app/sitemap.ts
// Sitemap nativo Next.js 15 App Router — sem next-sitemap
// Gera /sitemap.xml com hreflang para localePrefix 'as-needed'
// pt-BR = '/' (sem prefixo), en = '/en'
import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://flyingstudio.com.br';

/**
 * Para localePrefix 'as-needed':
 * - defaultLocale (pt-BR) → sem prefixo → URL é SITE_URL + path
 * - demais locales (en)   → com prefixo → URL é SITE_URL + '/en' + path
 */
function localeUrl(locale: string, path = ''): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}${path || '/'}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // v1 tem apenas a Home page — adicionar rotas aqui nas phases seguintes
  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((alt) => [alt, localeUrl(alt)])),
    },
  }));
}
