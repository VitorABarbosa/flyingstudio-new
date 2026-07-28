import { describe, expect, it } from 'vitest';
import en from '@/messages/en.json';
import ptBR from '@/messages/pt-BR.json';
import { sidebarNavigationItems } from './site-navigation';

describe('sidebarNavigationItems', () => {
  it.each([
    ['pt-BR', ptBR.Sidebar.links],
    ['en', en.Sidebar.links],
  ])('possui tradução para todos os links em %s', (_locale, links) => {
    const missingKeys = sidebarNavigationItems
      .map((item) => item.key)
      .filter((key) => !(key in links));

    expect(missingKeys).toEqual([]);
  });
});
