'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Mesma cascata do hero de Junte-se a Nós: olho-de-boi e depois o título. */
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const revealText: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** A última palavra sai em accent — é ela que fecha a frase. */
type HeadingWord = { key: 'w1' | 'w2' | 'w3' | 'w4' | 'w5'; accent?: boolean };

const HEADING_WORDS: HeadingWord[] = [
  { key: 'w1' }, // Vamos
  { key: 'w2' }, // começar
  { key: 'w3' }, // um
  { key: 'w4' }, // projeto
  { key: 'w5', accent: true }, // juntos.
];

export default function ContatoHero() {
  const t = useTranslations('Contato');

  return (
    /* Sem `bg` opaco: o campo de linhas da página vive atrás e precisa
       aparecer no respiro das laterais da faixa. */
    <section className="w-full">
      {/* Banner — mesma faixa de Junte-se a Nós e das páginas de serviço. */}
      <div className="relative w-full px-[8px] md:px-[20px]">
        <div
          className="
            relative h-[clamp(240px,34vh,360px)] w-full overflow-hidden
            [border-bottom-left-radius:80px_60px] [border-bottom-right-radius:80px_60px]
          "
        >
          {/* O fade + zoom-out fica só na foto: o título por cima não deve
              entrar escalando junto. */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src="/home/sobre/sobre-office-02.png"
              alt={t('hero.bannerAlt')}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>

          {/* Camada preta: garante leitura do título sobre qualquer trecho da
              foto, nos dois temas. */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

          {/* Título dentro da imagem, um pouco abaixo do centro: o respiro de
              cima empurra o bloco para baixo sem tirá-lo do eixo. */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pt-[clamp(32px,8vh,64px)] text-center"
          >
            {/* Trilha no padrão das páginas de serviço: Home vira link e a
                etapa atual acende em lima. */}
            <motion.div
              variants={revealText}
              className="flex items-center justify-center gap-2 font-['Outfit'] text-[13px] font-medium tracking-[0.04em] text-white md:text-[16px]"
            >
              <Link href="/" className="transition-opacity hover:opacity-70">
                {t('hero.home')}
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-[var(--theme-accent)]">{t('hero.label')}</span>
            </motion.div>

            <motion.h1
              variants={revealText}
              aria-label={t('hero.ariaHeading')}
              className="mt-3 max-w-[16ch] font-['Outfit'] text-[32px] leading-[1.2] font-semibold text-balance text-white md:text-[48px]"
            >
              {HEADING_WORDS.map((word, index) => (
                <Fragment key={word.key}>
                  {index > 0 ? ' ' : null}
                  <span
                    aria-hidden="true"
                    className={word.accent ? 'text-[var(--theme-accent)]' : undefined}
                  >
                    {t(`hero.words.${word.key}`)}
                  </span>
                </Fragment>
              ))}
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
