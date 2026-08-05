'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { dnaQgImage } from '../data/dnaData';
import { EASE, SPRING_SOFT, VIEWPORT_SECTION } from '../lib/animations';

type RevealWordProps = {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
};

function RevealWord({ word, progress, range, accent = false }: RevealWordProps) {
  const opacity = useTransform(progress, range, [0.12, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={accent ? 'inline-block text-[var(--theme-accent)]' : 'inline-block'}
    >
      {word}&nbsp;
    </motion.span>
  );
}

const textItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const textCascade = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const photoReveal = {
  hidden: { opacity: 0, x: -60, scale: 0.95 },
  show: { opacity: 1, x: 0, scale: 1, transition: SPRING_SOFT },
};

/**
 * Frase-manifesto em tipografia gigante revelada palavra por palavra no
 * scroll, fechando no QG da Berrini: a foto do estúdio à esquerda e o
 * "epicentro da tecnologia imobiliária" à direita.
 */
export default function DnaStatementSection() {
  const t = useTranslations('DnaPage.statement');
  const qgT = useTranslations('DnaPage.qg');
  const headlineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ['start 0.9', 'start 0.3'],
  });

  const words = t('headline').split(' ');

  return (
    <section className="w-full">
      <div ref={headlineRef} className="mx-auto w-full max-w-[1500px] px-4 text-center md:px-6">
        <p className="font-['Outfit'] text-[clamp(36px,6vw,96px)] leading-[1.1] font-semibold text-[var(--theme-text)]">
          {words.map((word, index) => (
            <RevealWord
              key={`${word}-${index}`}
              word={word}
              progress={scrollYProgress}
              range={[index / words.length, (index + 1) / words.length]}
              accent={index === words.length - 1}
            />
          ))}
        </p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mx-auto mt-8 max-w-[900px] text-justify [text-align-last:center] text-[16px] leading-[1.65] text-[var(--theme-muted)] md:mt-10 md:text-[22px]"
        >
          {t('complement')}
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid w-full max-w-[1592px] items-center gap-10 px-4 md:mt-24 md:px-6 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={photoReveal}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_SECTION}
          className="relative h-[320px] w-full overflow-hidden rounded-[28px] shadow-[0_16px_45px_var(--theme-border-soft)] md:h-[460px]"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <Image
              src={dnaQgImage.src}
              alt={dnaQgImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={textCascade}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_SECTION}
          className="text-center lg:text-left"
        >
          <motion.span
            variants={textItem}
            className="block text-[24px] font-bold uppercase tracking-[0.04em] text-[var(--theme-accent)]"
          >
            {qgT('eyebrow')}
          </motion.span>

          <motion.h2
            variants={textItem}
            className="mt-1 text-[34px] leading-tight font-semibold text-[var(--theme-text)] md:text-[56px]"
          >
            {qgT('title')}
          </motion.h2>

          <motion.p
            variants={textItem}
            className="mt-6 inline-flex items-center rounded-[99px] border-2 border-[var(--theme-chip-border)] bg-[var(--theme-surface)] px-6 py-2.5 text-[14px] font-medium text-[var(--theme-text)] md:text-[16px]"
          >
            {qgT('address')}
          </motion.p>

          <motion.p
            variants={textItem}
            className="mt-6 text-justify text-[16px] leading-[1.75] text-[var(--theme-muted)] md:text-[20px]"
          >
            {qgT('description')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
