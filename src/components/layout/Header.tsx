'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import BrandLogo from '@/components/layout/BrandLogo';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { futurePageHrefs } from '@/lib/site-navigation';

// Autônimo do idioma — cada idioma é exibido escrito nele mesmo.
const LANGUAGE_LABELS: Record<string, string> = {
  'pt-BR': 'Português',
  en: 'English',
};

type ServiceLinkKey = 'images3d' | 'videos3d' | 'apps' | 'dsbrave' | 'tour360';

const serviceLinks: { key: ServiceLinkKey; href: string }[] = [
  { key: 'images3d', href: futurePageHrefs.images3d },
  { key: 'videos3d', href: futurePageHrefs.videos3d },
  { key: 'apps', href: futurePageHrefs.apps },
  { key: 'tour360', href: futurePageHrefs.tour360 },
  { key: 'dsbrave', href: futurePageHrefs.dsbrave },
];

type HeaderNavEntry =
  | { kind: 'link'; key: 'dna' | 'cases' | 'join' | 'news'; href: string }
  | { kind: 'dropdown' };

const headerNav: HeaderNavEntry[] = [
  { kind: 'link', key: 'dna', href: futurePageHrefs.dna },
  { kind: 'dropdown' },
  { kind: 'link', key: 'cases', href: futurePageHrefs.cases },
  { kind: 'link', key: 'join', href: futurePageHrefs.join },
  /* Flying News fica oculta até existir automação de conteúdo — reative
     descomentando a linha abaixo (e o item em site-navigation.ts). */
  // { kind: 'link', key: 'news', href: futurePageHrefs.news },
];

/** Ícone de envelope — extraído do Figma (node 162:1983), viewBox 16x12. */
function MailIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path
        d="M16 1.5C16 0.675 15.28 0 14.4 0H1.6C0.72 0 0 0.675 0 1.5V10.5C0 11.325 0.72 12 1.6 12H14.4C15.28 12 16 11.325 16 10.5V1.5ZM14.4 1.5L8 5.25L1.6 1.5H14.4ZM14.4 10.5H1.6V3L8 6.75L14.4 3V10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Item "Serviços" — abre um submenu com as 5 páginas de serviço. */
function ServicesDropdown() {
  const t = useTranslations('Header');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer items-center gap-[6px] rounded-full px-[14px] py-[8px] whitespace-nowrap text-[var(--theme-text)] hover:text-[var(--theme-accent)]"
      >
        <span>{t('nav.services')}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* O fade fica no PRÓPRIO painel de vidro: opacidade animada em um
          ancestral criaria um backdrop root e o blur soltaria da página
          durante a transição (flash sem translucidez). */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-[14px] ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`flex w-[224px] flex-col overflow-hidden rounded-[18px] border border-[var(--theme-border-soft)] bg-[var(--theme-header-glass)] py-[8px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur-[20px] transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {serviceLinks.map((service) => (
            <Link
              key={service.key}
              href={service.href}
              onClick={() => setOpen(false)}
              className="px-[22px] py-[11px] font-['Outfit'] text-[15px] leading-none text-[var(--theme-text)] hover:text-[var(--theme-accent)]"
            >
              {t(`services.${service.key}`)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Folga a partir do topo antes de a barra virar pílula. */
const BASE_THRESHOLD = 24;

export default function Header() {
  const [floating, setFloating] = useState(false);
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const targetLocale = locale === 'pt-BR' ? 'en' : 'pt-BR';

  const { scrollY } = useScroll();

  /**
   * Ponto em que a barra vira pílula.
   *
   * Não pode ser um valor fixo: a home tem um hero preso na viewport que
   * consome vários viewports de scroll: quando ele solta, o scroll já está
   * muito além de qualquer limiar pequeno, e a header apareceria flutuante
   * enquanto o hero ainda está na tela. Então o limiar é o fim do hero — se
   * houver um. Nas demais páginas cai no valor de sempre.
   */
  const [threshold, setThreshold] = useState(BASE_THRESHOLD);

  useEffect(() => {
    const hero = document.getElementById('hero');

    if (!hero) {
      setThreshold(BASE_THRESHOLD);
      return;
    }

    const measure = () => {
      const end = hero.offsetTop + hero.offsetHeight - window.innerHeight;
      setThreshold(Math.max(BASE_THRESHOLD, end + BASE_THRESHOLD));
    };

    measure();

    /* A pista do hero muda de altura fora do ciclo do React — voo já visto
       encolhe para 100svh, fontes/vídeo reacomodam o layout. Sem observar o
       elemento, um refresh no meio da página media a pista longa e exigia
       rolar muito além do hero real para a barra virar pílula. */
    const observer = new ResizeObserver(measure);
    observer.observe(hero);

    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pathname]);

  /* Refresh no meio da página não dispara evento de scroll — reavalia o
     estado assim que o limiar é conhecido (ou remedido). */
  useEffect(() => {
    setFloating(window.scrollY > threshold);
  }, [threshold]);

  // Enquanto o hero está na tela a header é uma barra integrada à página; ao
  // passar dele vira a pílula flutuante. Ela permanece SEMPRE visível.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setFloating(latest > threshold);
  });

  /* A barra transparente integrada só faz sentido na home, deitada sobre o
     hero imersivo. Nas páginas internas a header já nasce como pílula. */
  const isHome = pathname === '/';
  const isFloating = !isHome || floating;

  function handleSwitchLanguage() {
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  }

  function handleContactClick() {
    router.push(futurePageHrefs.contact, { locale });
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={isFloating ? 'pill' : 'bar'}
      variants={{
        bar: {
          y: 0,
          opacity: 1,
          top: 0,
          left: 0,
          right: 0,
          maxWidth: 2400,
          borderRadius: 0,
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 36,
          paddingRight: 28,
        },
        pill: {
          y: 0,
          opacity: 1,
          top: 14,
          left: 12,
          right: 12,
          maxWidth: 1280,
          borderRadius: 999,
          paddingTop: 9,
          paddingBottom: 9,
          paddingLeft: 22,
          paddingRight: 10,
        },
      }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      className="fixed top-0 right-0 left-0 z-50 mx-auto flex items-center justify-between gap-[16px]"
    >
      {/* Camada de vidro — separada para o backdrop-filter do dropdown
          continuar amostrando a página (mesma translucidez nos dois). */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isFloating ? 1 : 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="absolute inset-0 -z-10 rounded-[inherit] border border-[var(--theme-border-soft)] bg-[var(--theme-header-glass)] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] backdrop-blur-[20px]"
      />
      <Link
        href="/"
        aria-label="Flying Studio - página inicial"
        className="flex h-[40px] shrink-0 items-center"
      >
        <BrandLogo
          width={214}
          height={27}
          priority
          className="block h-[22px] w-auto object-contain"
        />
      </Link>

      <nav
        aria-label={t('navLabel')}
        className="hidden items-center gap-[2px] font-['Outfit'] text-[15px] leading-none font-normal text-[var(--theme-text)] lg:flex"
      >
        {headerNav.map((entry) =>
          entry.kind === 'dropdown' ? (
            <ServicesDropdown key="services" />
          ) : (
            <Link
              key={entry.key}
              href={entry.href}
              className="rounded-full px-[14px] py-[8px] whitespace-nowrap hover:text-[var(--theme-accent)]"
            >
              {t(`nav.${entry.key}`)}
            </Link>
          ),
        )}
      </nav>

      <div className="flex shrink-0 items-center gap-[8px]">
        <button
          type="button"
          onClick={handleSwitchLanguage}
          disabled={isPending}
          aria-label={t('switchLanguageLabel', { language: LANGUAGE_LABELS[targetLocale] })}
          className="hidden h-[36px] cursor-pointer items-center rounded-full px-[12px] font-['Outfit'] text-[14px] leading-none font-normal whitespace-nowrap text-[var(--theme-text)] hover:text-[var(--theme-accent)] disabled:opacity-50 sm:flex"
        >
          PT / EN
        </button>

        <span className="flex h-[36px] items-center">
          <ThemeToggle />
        </span>

        <button
          type="button"
          onClick={handleContactClick}
          className="flex h-[40px] cursor-pointer items-center gap-[7px] rounded-full bg-[var(--theme-btn-default)] px-[20px] font-['Outfit'] text-[14px] leading-none font-medium whitespace-nowrap text-[var(--theme-btn-text-default)] transition-transform duration-200 hover:-translate-y-[1px] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
        >
          <MailIcon />
          <span>{t('contact')}</span>
        </button>
      </div>
    </motion.header>
  );
}
