'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import DSbraveDeviceScreen from '../components/DSbraveDeviceScreen';
import {
  EASE,
  screenAnimation,
  textAnimation,
  VIEWPORT_SCREEN,
  VIEWPORT_TEXT,
} from '../lib/animations';

export default function DSbraveHero() {
  const t = useTranslations('DSbravePage.hero');
  const bannerRef = useRef<HTMLDivElement>(null);

  // "Conheça o D.sbrave" → o "D." vira o logo, seguido de "sbrave".
  const screenTitleBase = t('screenTitle').replace('D.sbrave', '').trim();

  /* Paralaxe: a foto sobe mais devagar que a página. O `scale` extra existe
     para o deslocamento nunca revelar a borda de baixo da imagem. */
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <section className="relative w-full">
      <div
        ref={bannerRef}
        className="relative h-[clamp(240px,34vh,360px)] w-full overflow-hidden rounded-b-[clamp(24px,3vw,44px)]"
      >
        <motion.div style={{ y: bannerY }} className="absolute inset-0 scale-[1.16]">
          <Image
            src="https://img.flyingstudio.com.br/site-flying/LIVING/Macuco_Grand_Canal_Beauty_HR.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Scrim escuro: garante leitura do título em cima de qualquer render,
            claro ou escuro, sem depender da cor do tema. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.05) 72%, transparent 100%)',
          }}
        />

        {/* Título dentro da imagem, alinhado à esquerda: o serviço se apresenta
            sobre a própria obra, não numa faixa separada acima dela. */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1800px] px-6 pb-[clamp(26px,4vh,44px)] md:px-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-[12px] font-['Outfit'] text-[clamp(0.66rem,0.8vw,0.78rem)] font-semibold tracking-[0.3em] text-white/75 uppercase"
          >
            <span className="hr-live-dot" aria-hidden="true" />
            {t('eyebrow')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            className="mt-[clamp(0.5rem,1.5vh,1rem)] font-['Outfit'] text-[clamp(2rem,4.8vw,3.6rem)] leading-[0.95] font-bold tracking-[-0.03em] text-white"
          >
            D.sbrave
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            className="mt-[clamp(0.6rem,1.6vh,1rem)] max-w-[56ch] font-['Outfit'] text-[clamp(0.98rem,1.3vw,1.3rem)] leading-[1.55] text-white/80"
          >
            {t('description')}
          </motion.p>
        </div>
      </div>

      {/* A central rodando de verdade — o conteúdo próprio desta página. */}
      <div id="conteudo-dsbrave" className="relative w-full pt-[clamp(28px,5vh,56px)] pb-10">
        <div className="relative z-10 mx-auto w-full max-w-[1800px] px-4 md:px-6">
          {/* Mesmo tratamento da home: o "D." é o logo, "sbrave" segue em texto. */}
          <div className="mb-[clamp(1.5rem,4vh,2.5rem)] text-center">
            <motion.h2
              variants={textAnimation}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_TEXT}
              className="font-semibold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.05] text-[var(--theme-text)]"
            >
              {screenTitleBase}{' '}
              <span className="whitespace-nowrap">
                <Image
                  src="/home/Logo_Desbrave.png"
                  alt="D."
                  width={681}
                  height={568}
                  className="inline-block h-[1.5em] w-auto translate-x-[0.12em] translate-y-[0.22em] align-baseline"
                />
                sbrave
              </span>
            </motion.h2>

            <motion.p
              variants={textAnimation}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_TEXT}
              className="mx-auto mt-[clamp(1.25rem,3vh,2rem)] inline-flex rounded-full border border-[var(--theme-text)] px-[26px] py-[12px] text-[clamp(0.9rem,1vw,1.05rem)] text-[var(--theme-text)] backdrop-blur-[8px]"
            >
              {t('screenSubtitle')}
            </motion.p>
          </div>

          <motion.div
            variants={screenAnimation}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_SCREEN}
            className="relative mx-auto w-full max-w-[1580px]"
          >
            <DSbraveDeviceScreen />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
