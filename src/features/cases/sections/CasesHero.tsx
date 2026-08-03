'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { scrollToElement } from '@/lib/scroll-to-element';
import CasesArrow from '../components/CasesArrow';
import { EASE, revealItem, staggerContainer } from '../lib/animations';

/**
 * Altura do botão "Explorar cases", medida do pé do hero para cima.
 *
 * É AQUI que se ajusta: valor MAIOR sobe, MENOR desce. Negativo joga o botão
 * para FORA do hero (é o caso atual: ele monta sobre a borda arredondada).
 */
const CTA_BOTTOM = '-25px';

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
      /* Sem `overflow-hidden` aqui: o botão pode passar do pé do hero (margem
         negativa). O recorte vive na moldura abaixo, que segura só a foto.
         `z-20` mantém o que transborda por cima da seção seguinte. */
      className="relative z-20 mx-auto h-[760px] w-[calc(100%-32px)] max-w-[1838px] md:h-[863px] md:w-[calc(100%-82px)]"
    >
      {/* Moldura: é ela que arredonda e corta a foto.
          `contain:paint` + `transform-gpu` não são enfeite: o conteúdo de
          dentro anda por transform (paralaxe) e vira camada própria no
          compositor — sem forçar a moldura a ser camada também, o navegador
          desenha o filho fora do recorte por um quadro, e o título "pisca"
          reaparecendo depois de já ter sumido. */}
      <div className="absolute inset-0 transform-gpu overflow-hidden rounded-b-[48px] [contain:paint] md:rounded-b-[99px]">
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

        {/* Trilha e título continuam DENTRO da moldura: eles sobem com o
            paralaxe e precisam ser cortados pela borda, como antes. */}
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
            <span className="text-[var(--theme-accent)]">{t('label')}</span>
          </motion.div>

          <h1 className="mt-[105px] max-w-[1450px] text-[clamp(48px,5.75vw,110px)] leading-[1.01] font-semibold tracking-[-0.035em]">
            {t.rich('title', {
              strong: (chunks) => <>{renderTitleWords(chunks, '')}</>,
              light: (chunks) => <>{renderTitleWords(chunks, 'font-light')}</>,
              br: () => <br />,
            })}
          </h1>
        </motion.div>
      </div>

      {/* O botão vive FORA da moldura e fora do paralaxe: ancorado no pé do
          hero, ele fica parado onde foi posicionado enquanto o resto desliza.
          O `div` externo centraliza — o `translate` não pode dividir o
          transform com o `scale` do hover. */}
      <div
        className="absolute left-1/2 z-30 -translate-x-1/2"
        style={{ bottom: CTA_BOTTOM }}
      >
        <motion.a
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          href="#projetos"
          onClick={(event) => {
            /* Âncora nativa briga com o Lenis — a rolagem vai para ele. */
            event.preventDefault();
            scrollToElement('projetos');
          }}
          className="inline-flex h-14 items-center gap-5 rounded-full bg-[#b6ff00] px-6 text-[16px] font-medium tracking-[0.02em] text-[#201c2c]"
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
      </div>
    </section>
  );
}
