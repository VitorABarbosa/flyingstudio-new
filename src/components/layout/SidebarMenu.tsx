'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import BrandLogo from '@/components/layout/BrandLogo';
import { futurePageHrefs } from '@/lib/site-navigation';

const EASE = [0.22, 1, 0.36, 1] as const;

/* Mesma ordem da header: Home · Sobre Nós · Serviços · Nosso Grupo ·
   Junte-se a Nós — os rótulos saem do MESMO namespace (Header), então
   menu lateral e header nunca divergem. */
const primaryLinks = [
  { key: 'home', href: '/' },
  { key: 'about', href: futurePageHrefs.dna },
] as const;

const serviceLinks = [
  { key: 'images3d', href: futurePageHrefs.images3d },
  { key: 'videos3d', href: futurePageHrefs.videos3d },
  { key: 'apps', href: futurePageHrefs.apps },
  { key: 'tour360', href: futurePageHrefs.tour360 },
  { key: 'dsbrave', href: futurePageHrefs.dsbrave },
] as const;

const secondaryLinks = [
  { key: 'cases', href: futurePageHrefs.cases },
  { key: 'join', href: futurePageHrefs.join },
] as const;

const panelAnimation = {
  hidden: { x: '110%' },
  show: { x: '0%', transition: { duration: 0.55, ease: EASE } },
  exit: { x: '110%', transition: { duration: 0.35, ease: EASE } },
};

/* Os itens entram em cascata depois que o painel desliza. */
const listAnimation = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.18 } },
};

const itemAnimation = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
  onSwitchLanguage: () => void;
  isLanguagePending: boolean;
  targetLocale: string;
};

/**
 * Menu lateral (mobile/tablet) — o mesmo vidro da pílula da header, em
 * painel flutuante que desliza da direita. Links grandes em Outfit, os
 * serviços agrupados sob o eyebrow, e o fecho com idioma + Contato.
 */
export default function SidebarMenu({
  open,
  onClose,
  onSwitchLanguage,
  isLanguagePending,
  targetLocale,
}: SidebarMenuProps) {
  const t = useTranslations('Header');
  const tSidebar = useTranslations('Sidebar');
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    /* Cada abertura do menu começa com a sanfona de serviços recolhida. */
    setServicesOpen(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname === href;
  }

  function linkClasses(href: string, base: string) {
    return `${base} transition-colors duration-200 ${
      isActive(href)
        ? 'text-[var(--theme-accent)]'
        : 'text-[var(--theme-text)] hover:text-[var(--theme-accent)]'
    }`;
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" onClick={onClose}>
          {/* Backdrop: escurece e desfoca a página atrás do painel. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[var(--theme-backdrop)] backdrop-blur-[10px]"
          />

          {/* Painel flutuante — mesma linguagem da pílula da header:
              vidro com borda suave, fio de luz em cima e cantos generosos. */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={tSidebar('ariaLabel')}
            variants={panelAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
            className="absolute top-[10px] right-[10px] bottom-[10px] flex w-[min(86vw,380px)] flex-col overflow-hidden rounded-[28px] border border-[var(--theme-border-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_24px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-[18px] backdrop-saturate-[1.25]"
            style={{ backgroundColor: 'color-mix(in srgb, var(--theme-bg) 88%, transparent)' }}
          >
            {/* Topo: logo + fechar, no mesmo respiro da pílula. */}
            <div className="flex shrink-0 items-center justify-between px-[24px] pt-[20px] pb-[10px]">
              <Link href="/" onClick={onClose} aria-label="Flying Studio - Home">
                <BrandLogo width={214} height={27} className="block h-[18px] w-auto object-contain" />
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label={tSidebar('close')}
                className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-[var(--theme-border-soft)] text-[var(--theme-text)] transition-colors duration-200 hover:text-[var(--theme-accent)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Navegação: links grandes; serviços agrupados sob o eyebrow. */}
            <motion.nav
              variants={listAnimation}
              initial="hidden"
              animate="show"
              className="flex-1 overflow-y-auto px-[24px] pt-[18px]"
            >
              <ul className="flex flex-col gap-[4px]">
                {primaryLinks.map((link) => (
                  <motion.li key={link.key} variants={itemAnimation}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={linkClasses(
                        link.href,
                        "block py-[9px] font-['Outfit'] text-[24px] leading-none font-semibold tracking-[-0.01em]",
                      )}
                    >
                      {t(`nav.${link.key}`)}
                    </Link>
                  </motion.li>
                ))}

                {/* Serviços: item do MESMO peso dos demais, em sanfona —
                    fecha por padrão e abre no toque, com a seta girando. */}
                <motion.li variants={itemAnimation}>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((value) => !value)}
                    className={`flex w-full cursor-pointer items-center justify-between py-[9px] font-['Outfit'] text-[24px] leading-none font-semibold tracking-[-0.01em] transition-colors duration-200 ${
                      servicesOpen
                        ? 'text-[var(--theme-accent)]'
                        : 'text-[var(--theme-text)] hover:text-[var(--theme-accent)]'
                    }`}
                  >
                    <span>{t('nav.services')}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
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

                  <AnimatePresence initial={false}>
                    {servicesOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        {serviceLinks.map((service) => (
                          <li
                            key={service.key}
                            className="ml-[4px] border-l border-[var(--theme-border-soft)] pl-[18px]"
                          >
                            <Link
                              href={service.href}
                              onClick={onClose}
                              className={linkClasses(
                                service.href,
                                "block py-[9px] font-['Outfit'] text-[17px] leading-none font-normal",
                              )}
                            >
                              {t(`services.${service.key}`)}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>

                <motion.li
                  variants={itemAnimation}
                  aria-hidden="true"
                  className="my-[14px] h-px w-full bg-[var(--theme-border-soft)]"
                />

                {secondaryLinks.map((link) => (
                  <motion.li key={link.key} variants={itemAnimation}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={linkClasses(
                        link.href,
                        "block py-[9px] font-['Outfit'] text-[24px] leading-none font-semibold tracking-[-0.01em]",
                      )}
                    >
                      {t(`nav.${link.key}`)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* Fecho: idioma + Contato, nos mesmos botões-pílula da header. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.3 } }}
              className="flex shrink-0 items-center gap-[10px] border-t border-[var(--theme-border-soft)] px-[24px] pt-[16px] pb-[20px]"
            >
              <button
                type="button"
                onClick={onSwitchLanguage}
                disabled={isLanguagePending}
                aria-label={t('switchLanguageLabel', {
                  language: targetLocale === 'en' ? 'English' : 'Português',
                })}
                className="flex h-[46px] shrink-0 cursor-pointer items-center rounded-full border border-[var(--theme-border-soft)] px-[18px] font-['Outfit'] text-[14px] leading-none font-medium whitespace-nowrap text-[var(--theme-text)] transition-colors duration-200 hover:text-[var(--theme-accent)] disabled:opacity-50"
              >
                PT / EN
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push(futurePageHrefs.contact, { locale });
                }}
                className="flex h-[46px] flex-1 cursor-pointer items-center justify-center gap-[8px] rounded-full bg-[var(--theme-btn-default)] font-['Outfit'] text-[15px] leading-none font-medium text-[var(--theme-btn-text-default)] transition-transform duration-200 hover:-translate-y-[1px]"
              >
                <span>{t('contact')}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
