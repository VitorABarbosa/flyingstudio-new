'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getResolvedTheme, THEME_STORAGE_KEY, type SiteTheme } from '@/components/theme/theme';

/**
 * Re-aplica o tema depois de cada navegação.
 *
 * O porquê: trocar o idioma remonta o segmento [locale] inteiro — o React
 * re-renderiza o <html> e zera o data-theme e a classe `dark`, que só o
 * ThemeScript tinha aplicado (e scripts inline não re-executam em navegação
 * client-side). Sem o atributo, o CSS cai no tema claro sozinho.
 *
 * Este componente vive ANTES da Header no layout: o efeito dele roda primeiro
 * que o sync do ThemeToggle, então o botão sempre lê o DOM já corrigido.
 */
export default function ThemeRestore() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as SiteTheme | null;
    const theme = getResolvedTheme(stored ?? (root.dataset.theme as SiteTheme | undefined));

    root.dataset.theme = theme;
    root.classList.toggle('dark', theme === 'dark');
  }, [pathname]);

  return null;
}
