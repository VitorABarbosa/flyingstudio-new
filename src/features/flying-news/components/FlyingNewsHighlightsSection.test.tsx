import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FlyingNewsHighlightsSection from './FlyingNewsHighlightsSection';
import type { FlyingNewsArticle, FlyingNewsHighlightId } from '../types/flyingNews.types';

const articleIds: FlyingNewsHighlightId[] = [
  'entrada-residencial',
  'area-comercial',
  'fachada-residencial',
  'area-de-lazer',
];

const articles: FlyingNewsArticle[] = articleIds.map((id, index) => ({
  id,
  imageSrc: `/flying-news/destaques/article-${index + 1}.jpg`,
  imageAlt: `Destaque ${index + 1}`,
  imagePosition: 'center',
  href: '#destaques',
  title: `Notícia em destaque ${index + 1}`,
  date: 'São Paulo, 02.04.2026',
  excerpt: 'Resumo temporário da notícia.',
}));

describe('FlyingNewsHighlightsSection', () => {
  it('apresenta o título, quatro artigos e o CTA de todas as edições', () => {
    render(
      <FlyingNewsHighlightsSection
        eyebrow="DESTAQUES"
        title="Flying News"
        readMoreLabel="Continue Lendo"
        allEditionsLabel="Ver Todas as Edições"
        articles={articles}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Flying News' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByRole('link', { name: /Ver Todas as Edições/i })).toHaveAttribute(
      'href',
      '#noticias-mercado',
    );
  });
});
