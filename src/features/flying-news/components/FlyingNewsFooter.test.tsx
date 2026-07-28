import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import ptBR from '@/messages/pt-BR.json';
import FlyingNewsFooter from './FlyingNewsFooter';

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('FlyingNewsFooter', () => {
  it('reutiliza os contatos institucionais e a imagem final do site', () => {
    render(
      <NextIntlClientProvider locale="pt-BR" messages={{ Footer: ptBR.Footer }}>
        <FlyingNewsFooter />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText(ptBR.Footer.phone)).toBeInTheDocument();
    expect(screen.getByText(ptBR.Footer.email)).toBeInTheDocument();
    expect(screen.getByAltText('Flying Studio - Escritório')).toHaveAttribute(
      'src',
      expect.stringContaining('foto-empresa.jpg'),
    );
  });
});
