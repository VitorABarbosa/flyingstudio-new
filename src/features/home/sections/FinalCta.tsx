'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LinhasFluidas from '@/components/common/LinhasFluidas';
import { revealItem, staggerContainer, VIEWPORT_ONCE } from '@/features/home/lib/revealAnimation';
import { Link } from '@/i18n/navigation';

const WHATSAPP_HREF = 'https://wa.me/5511993443369';
const EMAIL = 'studio@flyingstudio.com.br';

export default function FinalCta() {
  const t = useTranslations('Home.cta');

  return (
    <section
      id="de-o-proximo-passo"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] py-[clamp(6rem,16vh,11rem)] transition-colors duration-200"
    >
      {/* Âncora legada para CTAs que apontam para /#contato */}
      <span id="contato" className="absolute top-0" aria-hidden="true" />

      <div className="absolute inset-0" aria-hidden="true">
        <LinhasFluidas
          opacity={0.2}
          scale={2}
          lineCount={18}
          waveAmplitude={140}
          fps={30}
          fadeEdges={18}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center px-[clamp(1.5rem,5vw,5rem)] text-center"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
      >
        <motion.h2
          variants={revealItem}
          className="font-semibold tracking-[-0.03em] text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] text-[var(--theme-text)]"
        >
          {t('titleStart')} <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>.
        </motion.h2>

        <motion.p
          variants={revealItem}
          className="mt-[20px] max-w-[44ch] text-[clamp(1rem,1.25vw,1.2rem)] leading-[1.6] text-[var(--theme-muted)]"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          variants={revealItem}
          className="mt-[clamp(2rem,5vh,3rem)] flex flex-wrap items-center justify-center gap-[16px]"
        >
          <Link
            href="/contato"
            className="inline-flex items-center gap-[10px] rounded-full bg-[var(--theme-btn-default)] px-[36px] py-[18px] text-[16px] font-medium text-[var(--theme-btn-text-default)] shadow-[0_18px_44px_-14px_var(--theme-accent-glow-soft)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
          >
            {t('primary')}
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 13 13 3M5 3h8v8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-[var(--theme-border-strong)] px-[36px] py-[18px] text-[16px] font-medium text-[var(--theme-text)] transition-colors duration-200 hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
          >
            {t('whatsapp')}
          </a>
        </motion.div>

        <motion.p
          variants={revealItem}
          className="mt-[28px] text-[14px] text-[var(--theme-muted)]"
        >
          {t('emailLabel')}{' '}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-[var(--theme-text)] underline decoration-[var(--theme-accent)] decoration-2 underline-offset-4 transition-opacity hover:opacity-75"
          >
            {EMAIL}
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
