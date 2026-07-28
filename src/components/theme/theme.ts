export const THEME_STORAGE_KEY = 'flyingstudio-theme';

export type SiteTheme = 'light' | 'dark';

export const THEME_TOGGLE_EVENT = 'flyingstudio-theme-change';

export function getResolvedTheme(theme: SiteTheme | null | undefined): SiteTheme {
  return theme === 'light' ? 'light' : 'dark';
}
