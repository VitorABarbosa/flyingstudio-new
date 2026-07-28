'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import BrandMark from '@/components/layout/BrandMark';
import { sidebarNavigationItems, type SidebarIconKey } from '@/lib/site-navigation';

type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
  onSwitchLanguage: () => void;
  isLanguagePending: boolean;
  targetLocale: string;
};

function SidebarIcon({ icon }: { icon: SidebarIconKey }) {
  const commonProps = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
    className: 'shrink-0',
  } as const;

  switch (icon) {
    case 'home':
      return (
        <svg {...commonProps}>
          <path d="M4 11.5L12 5L20 11.5V19H4V11.5Z" fill="currentColor" />
          <path d="M10 19V13H14V19" fill="var(--theme-surface)" />
        </svg>
      );
    case 'dna':
      return (
        <svg {...commonProps}>
          <path
            d="M8 4C8 7 16 7 16 10C16 13 8 13 8 16C8 19 16 19 16 22M16 4C16 7 8 7 8 10C8 13 16 13 16 16C16 19 8 19 8 22"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'images3d':
      return (
        <svg {...commonProps}>
          <rect x="4" y="6" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="9" cy="11" r="1.5" fill="currentColor" />
          <path
            d="M7 17L11 13L14 15L17 12L19 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'videos3d':
      return (
        <svg {...commonProps}>
          <path d="M8 6L18 12L8 18V6Z" fill="currentColor" />
        </svg>
      );
    case 'apps':
      return (
        <svg {...commonProps}>
          <rect
            x="7"
            y="3.5"
            width="10"
            height="17"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="17.5" r="1" fill="currentColor" />
        </svg>
      );
    case 'tour360':
      return (
        <svg {...commonProps}>
          <rect
            x="3.5"
            y="6"
            width="17"
            height="12"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="9" cy="12" r="2" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M16 9.5L19 12L16 14.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'dsbrave':
      return (
        <svg {...commonProps}>
          <rect
            x="4"
            y="5"
            width="16"
            height="12"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8 20H16M12 17V20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8.5 11.5L11 9L13.5 11.5L16 9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'join':
      return (
        <svg {...commonProps}>
          <path
            d="M7 12C7 9.79086 8.79086 8 11 8H14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M17 12C17 14.2091 15.2091 16 13 16H10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M10 6L14 8L10 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L10 16L14 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'news':
      return (
        <svg {...commonProps}>
          <rect
            x="5"
            y="4.5"
            width="14"
            height="15"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8 9H16M8 12H16M8 15H13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'cases':
      return (
        <svg {...commonProps}>
          <path d="M5 9H19V18H5V9Z" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M9 9V7.5C9 6.11929 10.1193 5 11.5 5H12.5C13.8807 5 15 6.11929 15 7.5V9"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case 'contact':
      return (
        <svg {...commonProps}>
          <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M5 7.5L12 12L19 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function SidebarMenu({
  open,
  onClose,
  onSwitchLanguage,
  isLanguagePending,
  targetLocale,
}: SidebarMenuProps) {
  const t = useTranslations('Sidebar');
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 transition-all duration-300 ease-out ${
          open
            ? 'bg-[var(--theme-backdrop)] backdrop-blur-[10px]'
            : 'backdrop-blur-0 bg-transparent'
        }`}
      />

      <aside
        aria-label={t('ariaLabel')}
        className={`absolute top-0 left-0 flex h-full w-[320px] flex-col bg-[var(--theme-surface)] px-[20px] pt-[18px] pb-[24px] shadow-[0px_24px_60px_0px_var(--theme-border-soft)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-[20px]">
          <Link href="/" onClick={onClose} aria-label="Flying Studio - Home">
            <BrandMark className="h-[56px] w-[56px]" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="mt-[6px] flex h-[28px] w-[28px] items-center justify-center rounded-full text-[var(--theme-muted)] transition-colors hover:bg-[var(--theme-surface-alt)] hover:text-[var(--theme-accent)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-[8px]">
            {sidebarNavigationItems.map((item) => {
              const isHome = item.href === '/';
              const isActive = isHome ? pathname === '/' : pathname === item.href;

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex h-[40px] items-center gap-[14px] rounded-[18px] px-[14px] font-['Outfit'] text-[15px] leading-none font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--theme-surface-alt)] text-[var(--theme-accent)]'
                        : 'text-[var(--theme-muted)] hover:bg-[var(--theme-surface-alt)] hover:text-[var(--theme-accent)]'
                    }`}
                  >
                    <SidebarIcon icon={item.key} />
                    <span>{t(`links.${item.key}`)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-[12px]">
          <button
            type="button"
            onClick={onSwitchLanguage}
            disabled={isLanguagePending}
            className="w-full rounded-[18px] border border-[var(--theme-border-strong)] px-[16px] py-[10px] font-['Outfit'] text-[13px] font-medium text-[var(--theme-accent)] transition-colors hover:bg-[var(--theme-surface-alt)] disabled:opacity-60"
          >
            {t('languageLabel', { locale: targetLocale.toUpperCase() })}
          </button>

          <div className="rounded-[24px] bg-[var(--theme-surface-alt)] px-[16px] py-[18px] text-center">
            <p className="font-['Outfit'] text-[15px] leading-[1.35] font-medium text-[var(--theme-muted)]">
              {t('ctaTitle')}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                window.setTimeout(() => {
                  const target = document.getElementById('contato');
                  if (!target) {
                    router.push('/#contato', { locale });
                    return;
                  }

                  if (window.__lenis) {
                    window.__lenis.scrollTo(target, { duration: 1.15, lerp: 0.09 });
                  } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 60);
              }}
              className="mt-[14px] flex h-[44px] items-center justify-center gap-[10px] rounded-[999px] bg-[var(--theme-accent)] px-[18px] font-['Outfit'] text-[15px] font-semibold text-[var(--theme-accent-contrast)] shadow-[0px_10px_24px_0px_var(--theme-accent-glow)] transition-transform hover:-translate-y-0.5"
            >
              <span>{t('ctaButton')}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
