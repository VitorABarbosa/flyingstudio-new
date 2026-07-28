'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/navigation';

const SCROLL_VISIBILITY_THRESHOLD = 420;

export default function ScrollToTopButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);

    // Na Home o gatilho é sair do hero; nas demais páginas, a distância rolada.
    const hero = document.getElementById('hero');
    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(!entry.isIntersecting);
        },
        {
          threshold: 0.05,
          rootMargin: '-80px 0px 0px 0px',
        },
      );

      observer.observe(hero);
      return () => {
        observer.disconnect();
      };
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_VISIBILITY_THRESHOLD);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const handleClick = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.15 });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={handleClick}
      className={[
        'fixed right-8 bottom-8 z-[60] flex h-12 w-12 items-center justify-center rounded-full',
        'bg-[var(--theme-accent)] text-[var(--theme-accent-contrast)] shadow-[0px_10px_24px_0px_var(--theme-accent-glow)]',
        'transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[var(--theme-accent-hover)]',
        'focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none',
        isVisible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      ].join(' ')}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M9 14.25V3.75M9 3.75L4.5 8.25M9 3.75L13.5 8.25"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
