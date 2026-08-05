'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LinhasFluidas from '@/components/common/LinhasFluidas';
import { scrollToElement } from '@/lib/scroll-to-element';
import DecodeText from '@/components/common/DecodeText';
import { EASE } from '../lib/animations';

const HERO_LINES_OPACITY = 0.12;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** O filete sob o título é traçado, não aparece: entra desenhando de dentro. */
const rule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE, delay: 0.75 } },
};

export default function DnaHero() {
  const t = useTranslations('DnaPage.hero');

  return (
    /*
      Sem `min-h`: a altura vem do conteúdo. Com uma altura mínima em `svh` a
      seção sobrava várias centenas de pixels vazios abaixo da seta e empurrava
      a próxima seção para fora da dobra.
    */
    <section className="relative isolate w-full overflow-hidden bg-[var(--theme-bg)] px-4 pt-[clamp(104px,13vh,140px)] pb-[clamp(28px,4vh,48px)]">
      {/* As linhas fluidas são a textura da marca — o fundo do site inteiro.
          São elas que dão o ambiente aqui, sem adereço nenhum por cima. */}
      <LinhasFluidas
        className="pointer-events-none absolute inset-0 z-0"
        opacity={HERO_LINES_OPACITY}
        scale={1.4}
        fps={32}
        fadeEdges={20}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center text-center"
      >
        <motion.p
          variants={rise}
          className="flex flex-wrap items-center justify-center gap-x-[14px] gap-y-[6px] font-['Outfit'] text-[clamp(0.62rem,0.78vw,0.74rem)] font-medium tracking-[0.32em] text-[var(--theme-muted)] uppercase"
        >
          <span className="hr-live-dot" aria-hidden="true" />
          <span>{t('metaSince')}</span>
          <span aria-hidden="true" className="text-[var(--theme-accent)]">
            /
          </span>
          <span>{t('metaPlace')}</span>
        </motion.p>

        <motion.h1
          variants={rise}
          className="mt-[clamp(1.25rem,3vh,2rem)] font-['Outfit'] text-[clamp(1.5rem,4.6vw,4.6rem)] leading-[1.1] font-semibold text-[var(--theme-text)]"
        >
          <DecodeText text="DNA FLYING STUDIO" />
        </motion.h1>

        <motion.span
          variants={rule}
          aria-hidden="true"
          className="mt-[clamp(0.9rem,2vh,1.4rem)] block h-px w-full max-w-[720px] origin-center bg-[var(--theme-accent)] opacity-70"
        />

        <motion.p
          variants={rise}
          className="mt-[clamp(1rem,2.5vh,1.6rem)] font-['Outfit'] text-[clamp(1.15rem,2.1vw,2rem)] leading-[1.25] font-semibold text-[var(--theme-accent)]"
        >
          {t('subtitle')}
        </motion.p>

        <motion.p
          variants={rise}
          className="mx-auto mt-[14px] max-w-[68ch] text-justify [text-align-last:center] font-['Outfit'] text-[clamp(0.95rem,1.2vw,1.2rem)] leading-[1.6] text-[var(--theme-muted)]"
        >
          {t('description')}
        </motion.p>

        <motion.div variants={rise} className="mt-[clamp(1.5rem,3.5vh,2.5rem)]">
          <a
            href="#nossa-historia"
            onClick={(event) => {
              /* Âncora nativa briga com o Lenis — a rolagem vai para ele. */
              event.preventDefault();
              scrollToElement('nossa-historia');
            }}
            aria-label={t('scrollLabel')}
            className="flex size-[58px] items-center justify-center rounded-full bg-[var(--theme-accent)] shadow-[0_18px_44px_-14px_var(--theme-accent-glow-soft)] transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
          >
            <Image
              src="/shared/icons/ui/icon-arrow-down-purple.svg"
              alt=""
              width={20}
              height={20}
              className="theme-icon-on-accent"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
