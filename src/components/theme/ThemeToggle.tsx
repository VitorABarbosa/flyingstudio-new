'use client';

import { useEffect, useState } from 'react';
import {
  getResolvedTheme,
  type SiteTheme,
  THEME_STORAGE_KEY,
  THEME_TOGGLE_EVENT,
} from '@/components/theme/theme';

function applyTheme(theme: SiteTheme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle('dark', theme === 'dark');
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_TOGGLE_EVENT, { detail: theme }));
}

type ThemeToggleProps = {
  color?: string;
};

export default function ThemeToggle({ color = 'var(--theme-accent)' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<SiteTheme>('light');

  useEffect(() => {
    const syncTheme = () => {
      const rootTheme = document.documentElement.dataset.theme as SiteTheme | undefined;
      setTheme(getResolvedTheme(rootTheme));
    };

    syncTheme();

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<SiteTheme>).detail;
      setTheme(getResolvedTheme(nextTheme));
    };

    window.addEventListener(THEME_TOGGLE_EVENT, handleThemeChange);
    return () => {
      window.removeEventListener(THEME_TOGGLE_EVENT, handleThemeChange);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
      onClick={() => {
        const nextTheme = isDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
      className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center [filter:drop-shadow(0px_0px_4px_var(--theme-accent-glow-soft))_drop-shadow(0px_0px_10px_var(--theme-accent-glow))]"
      style={{ color }}
    >
      {isDark ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
