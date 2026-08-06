// src/app/sitemap.ts
// Sitemap nativo Next.js 15 App Router — sem next-sitemap
// Gera /sitemap.xml com hreflang para localePrefix 'as-needed'
// pt-BR = '/' (sem prefixo), en = '/en'
import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { futurePageSlugs } from '@/lib/site-navigation';
import { caseDetails } from '@/features/cases/data/caseDetailsData';

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

type RouteDef = {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
};

export default function sitemap(): MetadataRoute.Sitemap {
  /* Todas as rotas públicas do site: home, páginas de conteúdo e os cases.
     Prioridade guia o Google no que importa: home > serviços/institucional
     > cases individuais > páginas de apoio. */
  const routes: RouteDef[] = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/dna-flying-studio', priority: 0.9, changeFrequency: 'monthly' },
    ...['/imagens-3d', '/videos-3d', '/aplicativos', '/tour-virtual-360', '/dsbrave'].map(
      (path) => ({ path, priority: 0.9, changeFrequency: 'monthly' as const }),
    ),
    { path: '/cases', priority: 0.8, changeFrequency: 'monthly' },
    ...Object.keys(caseDetails).map((caseId) => ({
      path: `/cases/${caseId}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
    { path: '/contato', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/junte-se-a-nos', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/flying-news', priority: 0.4, changeFrequency: 'weekly' },
  ];

  /* Sanidade: toda página registrada na navegação precisa estar aqui — se
     uma nova entrar em site-navigation e faltar acima, ela ainda aparece
     no sitemap com valores padrão. */
  for (const slug of futurePageSlugs) {
    if (!routes.some((route) => route.path === `/${slug}`)) {
      routes.push({ path: `/${slug}`, priority: 0.5, changeFrequency: 'monthly' });
    }
  }

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: localeUrl(locale, route.path),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alt) => [alt, localeUrl(alt, route.path)]),
        ),
      },
    })),
  );
}
