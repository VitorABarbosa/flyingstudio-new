'use client';

import { motion } from 'framer-motion';
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
  | { kind: 'link'; key: 'home' | 'about' | 'cases' | 'join' | 'news'; href: string }
  | { kind: 'dropdown' };

/* Ordem oficial: Home · Sobre Nós · Serviços · Cases · Junte-se a Nós.
   "Sobre Nós" leva à página DNA Flying Studio — a institucional do site. */
const headerNav: HeaderNavEntry[] = [
  { kind: 'link', key: 'home', href: '/' },
  { kind: 'link', key: 'about', href: futurePageHrefs.dna },
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
          className={`flex w-[224px] flex-col overflow-hidden rounded-[18px] border border-[var(--theme-border-soft)] bg-[var(--theme-header-glass)] py-[8px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_20px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur-[9px] backdrop-saturate-[1.25] transition-opacity duration-200 ${
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

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const targetLocale = locale === 'pt-BR' ? 'en' : 'pt-BR';

  function handleSwitchLanguage() {
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  }

  function handleContactClick() {
    router.push(futurePageHrefs.contact, { locale });
  }

  return (
    /* A header é SEMPRE a pílula flutuante — em todas as páginas, do topo ao
       fim do scroll. Só a entrada é animada (desce suave no primeiro paint). */
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      className="fixed top-[14px] right-[12px] left-[12px] z-50 mx-auto flex max-w-[1280px] items-center justify-between gap-[16px] rounded-full pt-[9px] pr-[10px] pb-[9px] pl-[22px]"
    >
      {/* Camada de vidro — separada para o backdrop-filter do dropdown
          continuar amostrando a página (mesma translucidez nos dois).
          Vidro CLARO: blur curto só para dar corpo, saturação leve e um fio
          de luz na borda superior — o conteúdo atrás permanece reconhecível. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[inherit] border border-[var(--theme-border-soft)] bg-[var(--theme-header-glass)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_18px_50px_-24px_rgba(0,0,0,0.45)] backdrop-blur-[9px] backdrop-saturate-[1.25]"
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
