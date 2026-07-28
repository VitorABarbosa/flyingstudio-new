export type SidebarIconKey =
  | 'home'
  | 'dna'
  | 'images3d'
  | 'videos3d'
  | 'apps'
  | 'tour360'
  | 'dsbrave'
  | 'join'
  | 'news'
  | 'cases'
  | 'contact';

export type SidebarNavigationItem = {
  key: SidebarIconKey;
  href: string;
  slug?: string;
};

export const sidebarNavigationItems: SidebarNavigationItem[] = [
  { key: 'home', href: '/' },
  { key: 'dna', href: '/dna-flying-studio', slug: 'dna-flying-studio' },
  { key: 'images3d', href: '/imagens-3d', slug: 'imagens-3d' },
  { key: 'videos3d', href: '/videos-3d', slug: 'videos-3d' },
  { key: 'apps', href: '/aplicativos', slug: 'aplicativos' },
  { key: 'tour360', href: '/tour-virtual-360', slug: 'tour-virtual-360' },
  { key: 'dsbrave', href: '/dsbrave', slug: 'dsbrave' },
  { key: 'join', href: '/junte-se-a-nos', slug: 'junte-se-a-nos' },
  /* Flying News fica oculta até existir automação de conteúdo — a rota
     /flying-news continua no ar, só sai das navegações. */
  // { key: 'news', href: '/flying-news', slug: 'flying-news' },
  { key: 'cases', href: '/cases', slug: 'cases' },
  { key: 'contact', href: '/contato', slug: 'contato' },
];

export const futurePageSlugs = sidebarNavigationItems
  .map((item) => item.slug)
  .filter((slug): slug is string => Boolean(slug));

export function getSidebarItemBySlug(slug: string) {
  return sidebarNavigationItems.find((item) => item.slug === slug);
}

export const futurePageHrefs = {
  dna: '/dna-flying-studio',
  images3d: '/imagens-3d',
  videos3d: '/videos-3d',
  apps: '/aplicativos',
  tour360: '/tour-virtual-360',
  dsbrave: '/dsbrave',
  join: '/junte-se-a-nos',
  news: '/flying-news',
  cases: '/cases',
  contact: '/contato',
} as const;

export const homeCtaHrefs = {
  hero: {
    images: futurePageHrefs.images3d,
    video: futurePageHrefs.videos3d,
    tech: futurePageHrefs.apps,
    tour: futurePageHrefs.tour360,
    dsbrave: '/#dsbrave',
  },
  immersiveSolutions: futurePageHrefs.apps,
  personalizedSolutions: futurePageHrefs.cases,
  about: futurePageHrefs.dna,
} as const;
