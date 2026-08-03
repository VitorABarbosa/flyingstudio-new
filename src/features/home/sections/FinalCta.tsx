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
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] pt-[clamp(2.5rem,5vh,3.5rem)] pb-[clamp(3rem,6vh,4.5rem)] transition-colors duration-200"
    >
      {/* Âncora legada para CTAs que apontam para /#contato */}
      <span id="contato" className="absolute top-0" aria-hidden="true" />

      <div className="absolute inset-0" aria-hidden="true">
        {/* Traço fino de propósito: o `scale={2}` multiplica a espessura, então
            o padrão saía com 3px de linha. Com `strokeWidth` em 0.8 ele volta
            a ~1.6px — o mesmo desenho, desta vez em fio. */}
        <LinhasFluidas
          opacity={0.07}
          scale={2}
          lineCount={18}
          strokeWidth={0.8}
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
