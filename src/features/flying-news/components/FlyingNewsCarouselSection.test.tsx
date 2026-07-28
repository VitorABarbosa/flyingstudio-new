import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FlyingNewsCarouselSection from './FlyingNewsCarouselSection';
import type { FlyingNewsTextArticle } from '../types/flyingNews.types';

const articles: FlyingNewsTextArticle[] = Array.from({ length: 12 }, (_, index) => ({
  id: `market-${index + 1}`,
  title: `Notícia ${index + 1}`,
  date: 'São Paulo, 02.04.2026',
  excerpt: 'Resumo temporário da notícia.',
  href: '#noticias-mercado',
}));

describe('FlyingNewsCarouselSection', () => {
  it('exibe quatro artigos por página e avança pelos controles', () => {
    render(
      <FlyingNewsCarouselSection
        id="noticias-mercado"
        title="Notícias & Mercado"
        subtitle="NOVIDADES E MERCADO IMOBILIÁRIO"
        articles={articles}
        readMoreLabel="Continue Lendo"
        previousLabel="Página anterior"
        nextLabel="Próxima página"
        pageLabel="Ir para a página"
      />,
    );

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByText('Notícia 1')).toBeInTheDocument();
    expect(screen.queryByText('Notícia 5')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByText('Notícia 5')).toBeInTheDocument();
    expect(screen.queryByText('Notícia 1')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ir para a página 2' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  it('mantém o estado independente entre duas instâncias', () => {
    const innovationArticles: FlyingNewsTextArticle[] = articles.map((article, index) => ({
      ...article,
      id: `innovation-${index + 1}`,
      title: `Inovação ${index + 1}`,
      href: '#inovacao-tendencias',
    }));

    render(
      <>
        <FlyingNewsCarouselSection
          id="noticias-mercado"
          title="Notícias & Mercado"
          subtitle="MERCADO"
          articles={articles}
          readMoreLabel="Continue Lendo"
          previousLabel="Página anterior"
          nextLabel="Próxima página"
          pageLabel="Ir para a página"
        />
        <FlyingNewsCarouselSection
          id="inovacao-tendencias"
          title="Inovação & Tendências"
          subtitle="INOVAÇÃO"
          articles={innovationArticles}
          readMoreLabel="Continue Lendo"
          previousLabel="Página anterior de inovação"
          nextLabel="Próxima página de inovação"
          pageLabel="Ir para a página de inovação"
        />
      </>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Próxima página de inovação' }));

    expect(screen.getByText('Notícia 1')).toBeInTheDocument();
    expect(screen.getByText('Inovação 5')).toBeInTheDocument();
    expect(screen.queryByText('Inovação 1')).not.toBeInTheDocument();
  });
});
