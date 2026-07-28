import { THEME_STORAGE_KEY } from '@/components/theme/theme';

const themeScript = `
(() => {
  const storageKey = '${THEME_STORAGE_KEY}';
  const root = document.documentElement;
  const stored = window.localStorage.getItem(storageKey);
  const theme = stored === 'light' ? 'light' : 'dark';
  root.dataset.theme = theme;
  root.classList.toggle('dark', theme === 'dark');
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
