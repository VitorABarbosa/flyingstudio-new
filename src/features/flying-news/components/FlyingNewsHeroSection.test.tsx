import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FlyingNewsHeroSection from './FlyingNewsHeroSection';
import type { FlyingNewsHeroCopy } from '../types/flyingNews.types';

const copy: FlyingNewsHeroCopy = {
  title: 'Flying News',
  tagline: 'O Studio que muda suas perspectivas',
  categories: {
    market: {
      title: 'Notícias & Mercado',
      description: 'Novidades e Mercado Imobiliário',
    },
    innovation: {
      title: 'Inovação & Tendências',
      description: 'O que tem de novo para inovar!',
    },
  },
};

describe('FlyingNewsHeroSection', () => {
  it('apresenta a identidade e as duas categorias como links acessíveis', () => {
    render(<FlyingNewsHeroSection copy={copy} />);

    expect(screen.getByRole('heading', { name: 'Flying News' })).toBeInTheDocument();
    expect(screen.getByText(copy.tagline)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Notícias & Mercado/i })).toHaveAttribute(
      'href',
      '#noticias-mercado',
    );
    expect(screen.getByRole('link', { name: /Inovação & Tendências/i })).toHaveAttribute(
      'href',
      '#inovacao-tendencias',
    );
  });
});
