'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';
import ExpandedCardContent from '@/features/home/components/ExpandedCardContent';
import { GRUPO_CARDS, type GrupoCardKey } from '@/features/home/data/nossoGrupoData';
import {
  revealItem,
  revealItemCentered,
  staggerContainer,
  VIEWPORT_ONCE,
} from '@/features/home/lib/revealAnimation';

const GRUPO_SECTION_HEIGHT = 1100;
const CARDS_TOP = 181;
const CARDS_HEIGHT = 813;
const CARDS_STRIP_WIDTH = 1920;
const LABEL_TOP_IDLE = 726;
const LABEL_TOP_HOVER = 300;
const BAR_HEIGHT = 8;

// Ratio aproximado do Figma (estado aberto): card hovered ~1.63x dos demais.
// Total = 1.5 + 4*0.875 = 5, preserva o espaço ocupado.
const FLEX_HOVERED = 1.5;
const FLEX_DIMMED = 0.875;
const FLEX_IDLE = 1;

export default function NossoGrupoSection() {
  const t = useTranslations('NossoGrupo');
  const [hovered, setHovered] = useState<GrupoCardKey | null>(null);

  return (
    <section
      id="nosso-grupo"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] transition-colors duration-200"
    >
      <SectionScaleFrame designHeight={GRUPO_SECTION_HEIGHT}>
        <motion.div
          className="absolute inset-0"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          <motion.h2
            variants={revealItemCentered}
            className="absolute left-1/2 z-10 text-center font-['Outfit'] text-[96px] leading-[1.2] font-semibold whitespace-nowrap"
            style={{ top: '0px' }}
          >
            <span className="text-[var(--theme-text)]">{t('title')} </span>
            <span className="text-[var(--theme-accent)]">{t('titleHighlight')}</span>
          </motion.h2>

          <motion.div
            variants={revealItemCentered}
            className="absolute left-1/2 z-10 flex items-center justify-center rounded-full border border-[var(--theme-text)] px-[36px] py-[16px] backdrop-blur-[8px]"
            style={{ top: '142px' }}
          >
            <p className="font-['Outfit'] text-[20px] leading-[1.5] font-normal whitespace-nowrap text-[var(--theme-text)]">
              {t('subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="absolute flex"
            style={{
              top: `${CARDS_TOP}px`,
              left: '0px',
              width: `${CARDS_STRIP_WIDTH}px`,
              height: `${CARDS_HEIGHT}px`,
            }}
            onMouseLeave={() => setHovered(null)}
          >
            {GRUPO_CARDS.map((card, index) => {
              const isHovered = hovered === card.key;
              const someHovered = hovered !== null;
              const flexValue = isHovered ? FLEX_HOVERED : someHovered ? FLEX_DIMMED : FLEX_IDLE;
              const hasExpanded = Boolean(card.expanded);
              const showExpanded = isHovered && hasExpanded;
              const labelTop = showExpanded ? LABEL_TOP_HOVER : LABEL_TOP_IDLE;

              return (
                <motion.div
                  key={card.key}
                  variants={revealItem}
                  onMouseEnter={() => setHovered(card.key)}
                  className="group relative h-full cursor-pointer overflow-hidden transition-[flex-grow] duration-500 ease-out"
                  style={{ flexGrow: flexValue, flexShrink: 1, flexBasis: 0 }}
                >
                  {card.video ? (
                    <video
                      src={card.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-label={t(`cards.${card.key}.name`)}
                      className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-500 ease-out"
                      style={{
                        filter: showExpanded ? 'brightness(0.55) blur(2px)' : 'none',
                      }}
                    />
                  ) : card.image ? (
                    <Image
                      src={card.image}
                      alt={t(`cards.${card.key}.name`)}
                      fill
                      className="object-cover transition-[filter] duration-500 ease-out"
                      sizes="(max-width: 1920px) 25vw, 480px"
                      priority={index < 2}
                      style={{
                        filter: showExpanded ? 'brightness(0.55) blur(2px)' : 'none',
                      }}
                    />
                  ) : null}

                  {/* Gradiente bottom para legibilidade do label em estado idle. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 bottom-0 left-0 transition-opacity duration-500"
                    style={{
                      height: '320px',
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
                      opacity: showExpanded ? 0 : 1,
                    }}
                  />

                  {/* Label (nome + descrição). Sobe quando o card expandido tem
                    conteúdo a mostrar. Transição mais lenta para o título
                    chegar ao topo ANTES do conteúdo começar a aparecer. */}
                  <div
                    className="absolute z-20 font-['Outfit'] text-white transition-[top] duration-[600ms] ease-out"
                    style={{ top: `${labelTop}px`, left: '38px', right: '24px' }}
                  >
                    <p className="text-[32px] leading-[1.2] font-medium">
                      {t(`cards.${card.key}.name`)}
                    </p>
                    <p className="text-[22px] leading-[1.2] font-extralight">
                      {t(`cards.${card.key}.description`)}
                    </p>
                  </div>

                  {card.expanded ? (
                    <ExpandedCardContent content={card.expanded} visible={showExpanded} />
                  ) : null}

                  <div
                    className="absolute right-0 bottom-0 left-0 z-20"
                    style={{ height: `${BAR_HEIGHT}px`, background: card.barColor }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </SectionScaleFrame>
    </section>
  );
}
