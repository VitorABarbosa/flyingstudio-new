'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';

type ServicePageKey = 'images3d' | 'videos3d' | 'apps' | 'tour360' | 'dsbrave';

/**
 * Ponte narrativa entre os serviços, em uma linha discreta: cada página
 * termina puxando a ideia da seguinte (imagem → movimento → interação →
 * imersão → ecossistema → imagem). A copy vem de `ServiceBridge.<página>`.
 */
const BRIDGE_HREFS: Record<ServicePageKey, string> = {
  images3d: futurePageHrefs.videos3d,
  videos3d: futurePageHrefs.apps,
  apps: futurePageHrefs.tour360,
  tour360: futurePageHrefs.dsbrave,
  dsbrave: futurePageHrefs.images3d,
};

export default function ServiceBridgeCta({ page }: { page: ServicePageKey }) {
  const t = useTranslations(`ServiceBridge.${page}`);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex w-full max-w-[1800px] flex-wrap items-baseline justify-center gap-x-[10px] gap-y-[6px] px-6 pb-[clamp(40px,7vh,64px)] text-center"
    >
      <p className="font-['Outfit'] text-[clamp(0.95rem,1.2vw,1.15rem)] text-[var(--theme-muted)]">
        {t('question')}
      </p>

      <Link
        href={BRIDGE_HREFS[page]}
        className="group inline-flex items-baseline gap-[7px] font-['Outfit'] text-[clamp(0.95rem,1.2vw,1.15rem)] font-semibold text-[var(--theme-text)] transition-colors duration-200 hover:text-[var(--theme-accent)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
      >
        {t('action')}
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="self-center transition-transform duration-300 group-hover:translate-x-[3px]"
        >
          <path
            d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </motion.section>
  );
}
