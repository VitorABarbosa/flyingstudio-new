'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { sectionAnimation, VIEWPORT_SECTION } from '../lib/animations';

const WHATSAPP_CTA_URL =
  'https://wa.me/5511993443369?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Flying%20Studio%20e%20quero%20uma%20demonstra%C3%A7%C3%A3o%20do%20D.sbrave!';

/**
 * Fecho da página — mesmo desenho do fecho da galeria de Imagens: uma frase
 * curta e o botão. Depois de conhecer o hub e os projetos, o único próximo
 * passo é a demonstração guiada.
 */
export default function DSbraveDemoCta() {
  const t = useTranslations('DSbravePage.demo');

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_SECTION}
      variants={sectionAnimation}
      className="w-full"
    >
      <div className="mx-auto flex w-full max-w-[1800px] flex-col items-center gap-6 px-4 text-center md:px-6">
        <p className="max-w-[46ch] font-['Outfit'] text-[clamp(1.05rem,1.7vw,1.5rem)] leading-[1.3] font-semibold text-[var(--theme-text)]">
          {t('headline')}
        </p>

        <button
          type="button"
          onClick={() => {
            window.open(WHATSAPP_CTA_URL, '_blank');
          }}
          className="inline-flex cursor-pointer items-center gap-[10px] rounded-full bg-[var(--theme-btn-default)] px-[30px] py-[16px] font-['Outfit'] text-[15px] leading-none font-medium text-[var(--theme-btn-text-default)] shadow-[0_18px_44px_-14px_var(--theme-accent-glow-soft)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
        >
          {t('button')}
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.section>
  );
}
