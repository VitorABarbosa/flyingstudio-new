export type FlyingNewsCategoryKey = 'market' | 'innovation';

export type FlyingNewsCategoryCopy = {
  title: string;
  description: string;
};

export type FlyingNewsHeroCopy = {
  title: string;
  tagline: string;
  categories: Record<FlyingNewsCategoryKey, FlyingNewsCategoryCopy>;
};

export type FlyingNewsCategory = {
  key: FlyingNewsCategoryKey;
  href: `#${string}`;
  icon: 'megaphone' | 'fingerprint';
};

export type FlyingNewsHighlightId =
  | 'entrada-residencial'
  | 'area-comercial'
  | 'fachada-residencial'
  | 'area-de-lazer';

export type FlyingNewsHighlightMeta = {
  id: FlyingNewsHighlightId;
  imageSrc: string;
  imagePosition: string;
  href: `#${string}`;
};

export type FlyingNewsArticle = FlyingNewsHighlightMeta & {
  imageAlt: string;
  title: string;
  date: string;
  excerpt: string;
};

export type FlyingNewsTextArticle = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: `#${string}`;
};
