'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';
import LinhasFluidas from '@/components/common/LinhasFluidas';
import {
  revealItem,
  revealItemCentered,
  staggerContainer,
  VIEWPORT_ONCE,
} from '@/features/home/lib/revealAnimation';
import { homeCtaHrefs } from '@/lib/site-navigation';

/**
 * "O que fazemos" — a seção original de serviços, fiel ao Figma
 * (node 379:1490): cinco cards com o badge do ícone montado na borda de cima,
 * descrição com trechos em negrito e o CTA "Quero saber mais". O título, a
 * pílula e a copy dos cards saem do Manifesto Flying Studio.
 *
 * Único desvio do original: a superfície do card é vidro acinzentado
 * (véu translúcido + desfoque do que está atrás) em vez de cor chapada,
 * para as linhas fluidas continuarem passando por baixo.
 */

type HeroCardKey = 'images' | 'video' | 'tech' | 'tour' | 'dsbrave';

type HeroCard = {
  key: HeroCardKey;
  left: number;
  icon: string;
  iconSize: number;
};

const SECTION_TOP_OFFSET = 90;
const SECTION_BOTTOM_SPACE = 30;
const TITLE_TOP = SECTION_TOP_OFFSET + 0;
/* O título do manifesto ocupa duas linhas (2 × 115px a 96px/1.2), contra a
   única do "Tecnologia Artística 3D". A pílula desce para depois delas e os
   cards acompanham, senão o badge encostaria nela. */
const SUBTITLE_TOP = SECTION_TOP_OFFSET + 264;
const CARD_TOP = SECTION_TOP_OFFSET + 440;
// Layout de 5 cards (Figma node 379:1490): cards de 312.618px, passo 343px,
// centralizados no canvas 1920 (margem ~118px de cada lado).
const CARD_WIDTH = 312.618;
const CARD_HEIGHT = 487;
const CARD_RADIUS = 40;
// Offsets do conteudo dentro do card (Figma, relativos ao topo do card).
const TITLE_OFFSET = 79;
const DESC_OFFSET = 202;
/* Caixa da descrição: uma largura só para os cinco. As do Figma eram
   recortadas para a copy antiga, mais curta. */
const DESC_WIDTH = 248;
const BADGE_SIZE = 80;
const BADGE_LEFT = (CARD_WIDTH - BADGE_SIZE) / 2;
// Badge centralizado na borda superior do card (Figma: y=-40 de um circulo 80).
const BADGE_TOP = -BADGE_SIZE / 2;
const CTA_WIDTH = 201.815;
const CTA_HEIGHT = 41.62;
const CTA_LEFT = (CARD_WIDTH - CTA_WIDTH) / 2;
const CTA_TOP = 466;
const SECTION_HEIGHT = CARD_TOP + CTA_TOP + CTA_HEIGHT + SECTION_BOTTOM_SPACE;
// Opacidade da animacao de linhas ao fundo — ponto de partida para ajuste fino.
const BACKGROUND_LINES_OPACITY = 0.08;

const EASE_CLASS = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

/**
 * Flutuação em repouso: os cards sobem e descem de leve, cada um com sua
 * fase, para a fileira nunca ficar parada. Amplitude pequena de propósito —
 * é respiração, não balanço. Vive numa camada só dela, separada do
 * levantar do hover, senão os dois disputam o mesmo transform.
 */
const FLOAT_DISTANCE = 5;
const FLOAT_DURATION = 7;
const FLOAT_PHASE = 0.55;

/* O vidro do card vem de `--theme-card-glass*` (globals.css): branco
   translúcido no tema claro, véu claro no escuro — translúcido nos dois para
   as linhas fluidas continuarem passando por trás. */

const heroCards: HeroCard[] = [
  {
    key: 'images',
    left: 118,
    icon: '/home/hero/icon-criar-imagem-light.svg',
    iconSize: 32,
  },
  {
    key: 'video',
    left: 461,
    icon: '/home/hero/icon-criar-videos-light.svg',
    iconSize: 34.832,
  },
  {
    key: 'tech',
    left: 803.617,
    icon: '/home/hero/icon-apps-light.svg',
    iconSize: 35.317,
  },
  {
    key: 'tour',
    left: 1146.234,
    icon: '/home/hero/icon-tour360-light.svg',
    iconSize: 34,
  },
  {
    key: 'dsbrave',
    left: 1489,
    icon: '/home/hero/icon-dsbrave-light.png',
    iconSize: 36,
  },
];

export default function ServicesIndex() {
  const t = useTranslations('Hero');
  /* A flutuação infinita dos 5 cards fica só no desktop: 5 transforms em
     loop sobre superfícies de vidro re-rasterizavam sem parar no iPhone. */
  const [float, setFloat] = useState(false);

  useEffect(() => {
    setFloat(window.matchMedia('(min-width: 1024px)').matches);
  }, []);

  return (
    <section
      id="tecnologia-artistica-3d"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] transition-colors duration-200"
    >
      {/* Desktop: o canvas de 1920px fiel ao Figma. No celular ele fica
          escondido — escalado a ~20%, os 5 cards viravam uma fileira
          horizontal ilegível; lá embaixo há um layout empilhado próprio. */}
      <div className="hidden lg:block">
      <SectionScaleFrame designHeight={SECTION_HEIGHT}>
        {/* Animacao de linhas fluidas ao fundo (substitui o grafismo estatico).
            Acompanha a accent do tema automaticamente. */}
        <LinhasFluidas
          className="pointer-events-none absolute inset-0 z-0"
          opacity={BACKGROUND_LINES_OPACITY}
          scale={1.3}
          fps={32}
          fadeEdges={15}
        />

        <motion.div
          className="absolute inset-0"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          <motion.h2
            variants={revealItemCentered}
            className="absolute left-1/2 z-10 w-[1080px] text-center font-['Outfit'] text-[96px] leading-[1.2] font-semibold text-[var(--theme-text)]"
            style={{ top: `${TITLE_TOP}px` }}
          >
            <span>{t('titleStart')} </span>
            <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>
          </motion.h2>

          <motion.div
            variants={revealItemCentered}
            className="absolute left-1/2 z-10 flex flex-col items-center justify-center rounded-[99px] border-2 border-white bg-[var(--theme-chip-bg)] px-[80px] py-[16px] lg:backdrop-blur-[10px]"
            style={{ top: `${SUBTITLE_TOP}px` }}
          >
            <p className="font-['Outfit'] text-[24px] leading-[1.5] font-normal whitespace-nowrap text-[var(--theme-text)]">
              {t('subtitle')}
            </p>
          </motion.div>

          {heroCards.map((card, index) => (
            /* A caixa do card vira o alvo do hover (`group`): badge e CTA
               ficam pendurados fora dela, mas continuam descendentes, então
               acompanham o gesto. */
            <motion.div
              key={card.key}
              variants={revealItem}
              className="group absolute z-10"
              style={{
                left: `${card.left}px`,
                top: `${CARD_TOP}px`,
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={float ? { y: [0, -FLOAT_DISTANCE, 0] } : undefined}
                transition={{
                  duration: FLOAT_DURATION,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * FLOAT_PHASE,
                }}
              >
                <div
                  className={`absolute inset-0 transition-transform duration-500 ${EASE_CLASS} group-hover:-translate-y-[10px]`}
                >
                  {/* Superfície de vidro. A borda acende em accent no hover e o
                      véu fecha um pouco — o card "ganha corpo" ao ser mirado. */}
                  <div
                    className={`absolute inset-0 border border-[var(--theme-card-glass-edge)] bg-[var(--theme-card-glass)] shadow-[0_18px_44px_-30px_rgba(0,0,0,0.45)] transition-[background-color,border-color,box-shadow] duration-500 lg:backdrop-blur-[16px] ${EASE_CLASS} group-hover:border-[color-mix(in_srgb,var(--theme-accent)_55%,transparent)] group-hover:bg-[var(--theme-card-glass-strong)] group-hover:shadow-[0_34px_66px_-30px_rgba(0,0,0,0.55)]`}
                    style={{ borderRadius: `${CARD_RADIUS}px` }}
                  />

                  <p
                    className="absolute left-0 z-10 w-full text-center font-['Outfit'] text-[38px] leading-[1.2] font-semibold whitespace-pre-line text-[var(--theme-text)] transition-colors duration-200"
                    style={{ top: `${TITLE_OFFSET}px` }}
                  >
                    {t(`cards.${card.key}.title`)}
                  </p>

                  <p
                    className="absolute z-10 -translate-x-1/2 text-center font-['Outfit'] text-[16px] leading-[1.5] font-normal text-[var(--theme-text)] transition-colors duration-200"
                    style={{
                      left: `${CARD_WIDTH / 2}px`,
                      top: `${DESC_OFFSET}px`,
                      width: `${DESC_WIDTH}px`,
                    }}
                  >
                    {t.rich(`cards.${card.key}.description`, {
                      b: (chunks) => <span className="font-bold">{chunks}</span>,
                    })}
                  </p>

                  {/* Badge: cresce e ganha halo — é ele que anuncia o serviço. */}
                  <div
                    className={`absolute z-20 grid place-items-center rounded-[99px] bg-[var(--theme-accent)] shadow-[0_0_0_0_var(--theme-accent-glow-soft)] transition-[transform,box-shadow] duration-500 ${EASE_CLASS} group-hover:scale-[1.09] group-hover:shadow-[0_16px_34px_-10px_var(--theme-accent-glow-soft)]`}
                    style={{
                      left: `${BADGE_LEFT}px`,
                      top: `${BADGE_TOP}px`,
                      width: `${BADGE_SIZE}px`,
                      height: `${BADGE_SIZE}px`,
                    }}
                  >
                    <Image
                      src={card.icon}
                      alt=""
                      width={card.iconSize}
                      height={card.iconSize}
                      className="theme-icon-on-accent"
                    />
                  </div>

                  <Link
                    href={homeCtaHrefs.hero[card.key]}
                    className={`absolute z-20 flex items-center justify-center gap-[8px] rounded-[99px] bg-[var(--theme-accent)] text-[16px] leading-[1.5] font-medium tracking-[0.32px] text-[var(--theme-accent-contrast)] transition-[transform,box-shadow] duration-500 ${EASE_CLASS} group-hover:scale-[1.04] group-hover:shadow-[0_16px_32px_-14px_var(--theme-accent-glow-soft)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none`}
                    style={{
                      left: `${CTA_LEFT}px`,
                      top: `${CTA_TOP}px`,
                      width: `${CTA_WIDTH}px`,
                      height: `${CTA_HEIGHT}px`,
                    }}
                  >
                    <span className="font-['Outfit'] text-[16px] leading-[1.5] font-medium">
                      {t(`cards.${card.key}.cta`)}
                    </span>
                    <span
                      className={`inline-flex transition-transform duration-500 ${EASE_CLASS} group-hover:translate-x-[5px]`}
                    >
                      <Image
                        src="/shared/icons/ui/icon-cta-arrow.svg"
                        alt=""
                        width={15}
                        height={15}
                        className="theme-icon-on-accent"
                      />
                    </span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </SectionScaleFrame>
      </div>

      {/* Celular: os mesmos 5 serviços empilhados, um card por linha — badge
          na borda de cima, título e descrição em tamanho de leitura e o CTA
          inteiro. Sem vidro/flutuação (regra de memória do iPhone). */}
      <div className="px-5 pt-16 pb-14 lg:hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
          className="mx-auto flex w-full max-w-[460px] flex-col items-center"
        >
          <motion.h2
            variants={revealItem}
            className="text-center font-['Outfit'] text-[30px] leading-[1.25] font-semibold text-[var(--theme-text)]"
          >
            <span>{t('titleStart')} </span>
            <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mt-5 rounded-[99px] border-2 border-white bg-[var(--theme-chip-bg)] px-6 py-2.5 text-center font-['Outfit'] text-[13px] leading-[1.5] text-[var(--theme-text)]"
          >
            {t('subtitle')}
          </motion.p>

          <div className="mt-14 flex w-full flex-col gap-12">
            {heroCards.map((card) => (
              <motion.article
                key={card.key}
                variants={revealItem}
                className="relative rounded-[28px] border border-[var(--theme-card-glass-edge)] bg-[var(--theme-card-glass)] px-6 pt-12 pb-7 text-center shadow-[0_18px_44px_-30px_rgba(0,0,0,0.45)]"
              >
                <div className="absolute -top-[28px] left-1/2 grid size-[56px] -translate-x-1/2 place-items-center rounded-full bg-[var(--theme-accent)] shadow-[0_10px_24px_-10px_var(--theme-accent-glow-soft)]">
                  <Image
                    src={card.icon}
                    alt=""
                    width={Math.round(card.iconSize * 0.7)}
                    height={Math.round(card.iconSize * 0.7)}
                    className="theme-icon-on-accent"
                  />
                </div>

                <h3 className="font-['Outfit'] text-[24px] leading-[1.25] font-semibold whitespace-pre-line text-[var(--theme-text)]">
                  {t(`cards.${card.key}.title`)}
                </h3>

                <p className="mx-auto mt-3 max-w-[36ch] font-['Outfit'] text-[15px] leading-[1.55] text-[var(--theme-text)]">
                  {t.rich(`cards.${card.key}.description`, {
                    b: (chunks) => <span className="font-bold">{chunks}</span>,
                  })}
                </p>

                <Link
                  href={homeCtaHrefs.hero[card.key]}
                  className="mt-6 inline-flex items-center justify-center gap-[8px] rounded-[99px] bg-[var(--theme-accent)] px-7 py-3 font-['Outfit'] text-[15px] leading-[1.5] font-medium tracking-[0.32px] text-[var(--theme-accent-contrast)]"
                >
                  {t(`cards.${card.key}.cta`)}
                  <Image
                    src="/shared/icons/ui/icon-cta-arrow.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="theme-icon-on-accent"
                  />
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
