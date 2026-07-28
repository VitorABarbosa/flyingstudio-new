'use client';

import { Fragment } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LinhasFluidas from '@/components/common/LinhasFluidas';

const ease = [0.22, 1, 0.36, 1] as const;

/** Cascata palavra a palavra (mesma estetica das demais secoes do site). */
const headingContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease },
  },
};

/** O brilho atras da palavra em accent acende depois que ela ja assentou. */
const glowReveal: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease, delay: 0.58 } },
};

/**
 * Titulo em leitura horizontal: as palavras correm em linha, sem posicionamento
 * absoluto. O `clamp` do font-size mantem a frase inteira numa linha so ate
 * ~768px de viewport; abaixo disso ela quebra naturalmente.
 */
type HeadingWord = { key: 'w1' | 'w2' | 'w3' | 'w4' | 'w5'; accent?: boolean };

const HEADING_WORDS: HeadingWord[] = [
  { key: 'w1' }, // Vamos
  { key: 'w2' }, // comecar
  { key: 'w3' }, // um
  { key: 'w4' }, // projeto
  { key: 'w5', accent: true }, // juntos?
];

export default function ContatoHero() {
  const t = useTranslations('Contato');

  return (
    /* Faixa curta: a altura vem do conteudo (sem `min-h`) e o `pt` so abre
       espaco para a header fixa. O formulario entra logo abaixo, na dobra. */
    <section className="relative w-full overflow-hidden bg-[var(--theme-bg)] px-4 pt-[clamp(96px,12vh,124px)] pb-[clamp(40px,6vh,64px)]">
      {/* Fundo decorativo: linhas fluidas animadas (acompanham a accent do tema). */}
      <LinhasFluidas
        className="pointer-events-none absolute inset-0 z-0"
        opacity={0.16}
        scale={1.4}
        fps={30}
        fadeEdges={12}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <motion.h1
          variants={headingContainer}
          initial="hidden"
          animate="show"
          aria-label={t('hero.ariaHeading')}
          /* `max-w` em `em` (nao em px) escala junto com o font-size: a frase
             mede ~16.6em, entao o teto de 10em forca a quebra em duas linhas em
             qualquer viewport. O `text-balance` divide as duas o mais parelho
             possivel — "Vamos comecar um" / "projeto juntos?". */
          className="mx-auto max-w-[10em] text-center font-['Outfit'] text-[clamp(30px,5vw,76px)] leading-[1.05] font-bold tracking-[-0.02em] text-balance text-[var(--theme-text)]"
        >
          {HEADING_WORDS.map((word, index) => (
            <Fragment key={word.key}>
              {index > 0 ? ' ' : null}
              <motion.span
                variants={wordReveal}
                aria-hidden="true"
                className={`relative inline-block ${
                  word.accent ? 'text-[var(--theme-accent)]' : ''
                }`}
              >
                {/* Halo da palavra em accent — mesma linguagem de luz do resto
                    do site. Fica dentro do span para acompanhar a palavra em
                    qualquer quebra de linha. */}
                {word.accent ? (
                  <motion.span
                    aria-hidden="true"
                    variants={glowReveal}
                    className="pointer-events-none absolute -inset-x-[0.25em] -inset-y-[0.15em] -z-10 rounded-full"
                    style={{
                      background:
                        'radial-gradient(closest-side, var(--theme-accent-glow-soft), transparent 72%)',
                      filter: 'blur(26px)',
                    }}
                  />
                ) : null}
                {t(`hero.words.${word.key}`)}
              </motion.span>
            </Fragment>
          ))}
        </motion.h1>
      </div>
    </section>
  );
}
