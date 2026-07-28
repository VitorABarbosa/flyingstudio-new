'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { scrollToElement } from '@/lib/scroll-to-element';
import CasesArrow from '../components/CasesArrow';
import { EASE, revealItem, staggerContainer } from '../lib/animations';

const titleWordVariants: Variants = {
  hidden: { y: '112%', opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, delay: 0.25 + index * 0.09, ease: EASE },
  }),
};

const chunkText = (chunks: ReactNode) =>
  Array.isArray(chunks) ? chunks.join('') : typeof chunks === 'string' ? chunks : '';

export default function CasesHero() {
  const t = useTranslations('CasesPage.hero');
  let wordIndex = 0;

  // Cada palavra do título sobe de dentro da própria máscara, na ordem de leitura
  const renderTitleWords = (chunks: ReactNode, className: string) =>
    chunkText(chunks)
      .split(' ')
      .filter(Boolean)
      .map((word, index, words) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={titleWordVariants} custom={wordIndex++} className={`inline-block ${className}`}>
            {index < words.length - 1 ? `${word} ` : word}
          </motion.span>
        </span>
      ));
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '42%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto h-[760px] w-[calc(100%-32px)] max-w-[1838px] overflow-hidden rounded-b-[48px] md:h-[863px] md:w-[calc(100%-82px)] md:rounded-b-[99px]"
    >
      {/* Ken Burns na entrada + parallax no scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image src="/cases/hero.jpg" alt={t('imageAlt')} fill priority className="object-cover object-[center_44%]" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex h-full flex-col items-center px-5 pt-[112px] text-center text-white md:pt-[151px]"
      >
        <motion.div variants={revealItem} className="flex items-center gap-2 text-[14px] font-medium tracking-[0.04em] md:text-[20px]">
          <Link href="/" className="transition-opacity hover:opacity-70">{t('home')}</Link>
          <span aria-hidden="true">›</span>
          <span className="text-[#b6ff00]">Cases</span>
        </motion.div>

        <h1 className="mt-[105px] max-w-[1450px] text-[clamp(48px,5.75vw,110px)] leading-[1.01] font-semibold tracking-[-0.035em]">
          {t.rich('title', {
            strong: (chunks) => <>{renderTitleWords(chunks, '')}</>,
            light: (chunks) => <>{renderTitleWords(chunks, 'font-light')}</>,
            br: () => <br />,
          })}
        </h1>

        <motion.p variants={revealItem} className="mt-9 max-w-[1036px] text-[18px] leading-[1.35] font-normal md:mt-12 md:text-[32px] md:leading-[1.2]">
          {t('description')}
        </motion.p>

        <motion.a
          variants={revealItem}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          href="#projetos"
          onClick={(event) => {
            /* Âncora nativa briga com o Lenis — a rolagem vai para ele. */
            event.preventDefault();
            scrollToElement('projetos');
          }}
          className="mt-9 inline-flex h-14 items-center gap-5 rounded-full bg-[#b6ff00] px-6 text-[16px] font-medium tracking-[0.02em] text-[#201c2c] md:mt-10"
        >
          {t('cta')}
          {/* Seta quicando para convidar o scroll */}
          <motion.span
            aria-hidden
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <CasesArrow direction="down" className="size-5" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
