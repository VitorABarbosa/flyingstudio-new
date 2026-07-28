import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import FlyingNewsHeroSection from './components/FlyingNewsHeroSection';
import FlyingNewsHighlightsSection from './components/FlyingNewsHighlightsSection';
import FlyingNewsCarouselSection from './components/FlyingNewsCarouselSection';
import FlyingNewsFooter from './components/FlyingNewsFooter';
import { flyingNewsHighlights } from './data/flyingNewsHighlights';
import { flyingNewsMarketArticleIds } from './data/flyingNewsMarketArticles';
import { flyingNewsInnovationArticleIds } from './data/flyingNewsInnovationArticles';
import type {
  FlyingNewsArticle,
  FlyingNewsHeroCopy,
  FlyingNewsTextArticle,
} from './types/flyingNews.types';

export default async function FlyingNewsPage() {
  const t = await getTranslations('FlyingNews.hero');
  const highlightsT = await getTranslations('FlyingNews.highlights');
  const marketT = await getTranslations('FlyingNews.market');
  const innovationT = await getTranslations('FlyingNews.innovation');
  const copy: FlyingNewsHeroCopy = {
    title: t('title'),
    tagline: t('tagline'),
    categories: {
      market: {
        title: t('categories.market.title'),
        description: t('categories.market.description'),
      },
      innovation: {
        title: t('categories.innovation.title'),
        description: t('categories.innovation.description'),
      },
    },
  };
  const articles: FlyingNewsArticle[] = flyingNewsHighlights.map((article) => ({
    ...article,
    imageAlt: highlightsT(`articles.${article.id}.imageAlt`),
    title: highlightsT(`articles.${article.id}.title`),
    date: highlightsT('articleDate'),
    excerpt: highlightsT('articleExcerpt'),
  }));
  const marketArticles: FlyingNewsTextArticle[] = flyingNewsMarketArticleIds.map((id) => ({
    id,
    title: marketT('articleTitle'),
    date: marketT('articleDate'),
    excerpt: marketT('articleExcerpt'),
    href: '#noticias-mercado',
  }));
  const innovationArticles: FlyingNewsTextArticle[] = flyingNewsInnovationArticleIds.map((id) => ({
    id,
    title: innovationT('articleTitle'),
    date: innovationT('articleDate'),
    excerpt: innovationT('articleExcerpt'),
    href: '#inovacao-tendencias',
  }));

  return (
    <main>
      <Header />
      <FlyingNewsHeroSection copy={copy} />
      <FlyingNewsHighlightsSection
        eyebrow={highlightsT('eyebrow')}
        title={highlightsT('title')}
        readMoreLabel={highlightsT('readMore')}
        allEditionsLabel={highlightsT('allEditions')}
        articles={articles}
      />
      <FlyingNewsCarouselSection
        id="noticias-mercado"
        title={marketT('title')}
        subtitle={marketT('subtitle')}
        articles={marketArticles}
        readMoreLabel={marketT('readMore')}
        previousLabel={marketT('previous')}
        nextLabel={marketT('next')}
        pageLabel={marketT('pageLabel')}
      />
      <FlyingNewsCarouselSection
        id="inovacao-tendencias"
        title={innovationT('title')}
        subtitle={innovationT('subtitle')}
        articles={innovationArticles}
        readMoreLabel={innovationT('readMore')}
        previousLabel={innovationT('previous')}
        nextLabel={innovationT('next')}
        pageLabel={innovationT('pageLabel')}
      />
      <FlyingNewsFooter />
    </main>
  );
}
