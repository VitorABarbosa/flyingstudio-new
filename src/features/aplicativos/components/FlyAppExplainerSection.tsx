'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import BeneficioIcon from './BeneficioIcon';
import { beneficiosItems } from '../data/aplicativosData';

const EASE = [0.22, 1, 0.36, 1] as const;

const sectionAnimation = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

const VISIBLE_CARDS_DESKTOP = 3;
const VISIBLE_CARDS_TABLET = 2;
const VISIBLE_CARDS_MOBILE = 1;

/**
 * Seta do carrossel — mesmo desenho das demais do site, na calha lateral.
 */
function CarouselArrow({
  direction,
  onClick,
  label,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  label: string;
}) {
  const isLeft = direction === 'left';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`group absolute top-1/2 z-20 -translate-y-1/2 cursor-pointer focus-visible:outline-none ${
        isLeft ? 'left-[-10px] md:left-0' : 'right-[-10px] md:right-0'
      }`}
    >
      <span
        className="relative flex h-[74px] w-[38px] items-center justify-center overflow-hidden rounded-full border backdrop-blur-md transition-all duration-300 group-hover:h-[92px] group-focus-visible:ring-2 group-focus-visible:ring-[var(--theme-accent)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[var(--theme-ring-offset)] md:h-[86px] md:w-[42px] md:group-hover:h-[106px]"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--theme-surface) 74%, transparent)',
          borderColor: 'color-mix(in srgb, var(--theme-text) 14%, transparent)',
          boxShadow: '0 18px 40px -22px rgba(0,0,0,0.45)',
        }}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 scale-x-0 bg-[var(--theme-accent)] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 ${
            isLeft ? 'origin-left' : 'origin-right'
          }`}
        />

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`relative text-[var(--theme-text)] transition-all duration-300 group-hover:text-[var(--theme-accent-contrast)] ${
            isLeft ? 'group-hover:-translate-x-[2px]' : 'group-hover:translate-x-[2px]'
          }`}
        >
          <path
            d={isLeft ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

/**
 * "O que é o Aplicativo" — mesmo modelo da seção do D.sbrave: informações à
 * esquerda (eyebrow centralizado sobre o título, descrição alinhada com o
 * primeiro card), o aplicativo rodando num laptop à direita, e os
 * diferenciais numa fileira única em carrossel.
 */
export default function FlyAppExplainerSection() {
  const t = useTranslations('AplicativosPage.explainer');
  const tBenefits = useTranslations('AplicativosPage.benefits');

  const [visibleCards, setVisibleCards] = useState(VISIBLE_CARDS_DESKTOP);
  const [currentIndex, setCurrentIndex] = useState(VISIBLE_CARDS_DESKTOP);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(VISIBLE_CARDS_MOBILE);
      } else if (window.innerWidth < 1280) {
        setVisibleCards(VISIBLE_CARDS_TABLET);
      } else {
        setVisibleCards(VISIBLE_CARDS_DESKTOP);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => {
      window.removeEventListener('resize', updateVisibleCards);
    };
  }, []);

  const carouselItems = useMemo(() => {
    const clonesBefore = beneficiosItems.slice(-visibleCards);
    const clonesAfter = beneficiosItems.slice(0, visibleCards);

    return [...clonesBefore, ...beneficiosItems, ...clonesAfter];
  }, [visibleCards]);

  useEffect(() => {
    setIsAnimating(false);
    setCurrentIndex(visibleCards);

    const timeout = setTimeout(() => {
      setIsAnimating(true);
    }, 40);

    return () => clearTimeout(timeout);
  }, [visibleCards]);

  const handlePrev = () => {
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex <= visibleCards - 1) {
      setIsAnimating(false);
      setCurrentIndex(beneficiosItems.length + currentIndex);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    }

    if (currentIndex >= beneficiosItems.length + visibleCards) {
      setIsAnimating(false);
      setCurrentIndex(currentIndex - beneficiosItems.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    }
  };

  const translateX = `${(100 / visibleCards) * currentIndex}%`;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionAnimation}
      className="w-full"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        {/* Duas colunas: as informações à esquerda, o aplicativo rodando num
            laptop à direita. O padding esquerdo espelha a calha do carrossel
            (64px) + respiro do card (8px): o texto nasce na MESMA vertical
            do primeiro card de diferencial. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-left lg:pl-[72px]">
            {/* O eyebrow é centralizado em relação AO TÍTULO (não à página):
                o inline-flex encolhe para a largura do título, e o eyebrow
                se centra dentro dela. */}
            <div className="inline-flex flex-col items-center">
              <span className="font-['Outfit'] text-[13px] font-bold tracking-[0.22em] uppercase text-[var(--theme-accent)] md:text-[14px]">
                {t('eyebrow')}
              </span>
              <h2 className="mt-3 font-['Outfit'] text-[32px] leading-tight font-semibold text-[var(--theme-text)] md:text-[48px]">
                {t('title')}
              </h2>
            </div>

            <p className="mt-5 max-w-[58ch] font-['Outfit'] text-[15px] leading-[1.65] text-[var(--theme-muted)] md:text-[18px]">
              {t('description')}
            </p>
          </div>

          {/* O Aplicativo de verdade rodando na tela do laptop — vídeo, não
              aplicação navegável. */}
          <div className="relative mx-auto w-full max-w-[720px]">
            <Image
              src="/aplicativos/hero/laptop.png"
              alt=""
              width={620}
              height={400}
              className="relative z-10 h-auto w-full object-contain"
            />

            <div className="absolute top-[7.2%] left-[11.3%] z-20 h-[80.6%] w-[77.7%] overflow-hidden bg-black">
              {/* Exemplo_Aplicativo hospedado no Vimeo em modo background
                  (autoplay mudo em loop) — o vídeo não embarca no site. */}
              <iframe
                src="https://player.vimeo.com/video/1215470231?background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1&transparent=0"
                title=""
                allow="autoplay"
                loading="lazy"
                aria-hidden="true"
                className="pointer-events-none h-full w-full border-0"
              />
            </div>
          </div>
        </div>

        {/* Calhas laterais (padding) reservam o espaço das setas FORA dos
            cards — a seta fica na calha, nunca por cima do conteúdo. */}
        <div className="relative mt-10 md:mt-12 md:px-[64px]">
          <CarouselArrow direction="left" onClick={handlePrev} label={tBenefits('prevLabel')} />
          <CarouselArrow direction="right" onClick={handleNext} label={tBenefits('nextLabel')} />

          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${translateX}` }}
              transition={
                isAnimating
                  ? {
                      duration: 0.55,
                      ease: EASE,
                    }
                  : {
                      duration: 0,
                    }
              }
              onAnimationComplete={handleTransitionEnd}
              className="flex items-stretch"
            >
              {carouselItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="shrink-0 px-[6px] md:px-[8px]"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <article className="flex h-full min-h-[220px] flex-col items-start gap-5 rounded-[24px] border border-[color-mix(in_srgb,var(--theme-text)_10%,transparent)] bg-[var(--theme-surface)] p-7 text-left shadow-[0_18px_44px_-26px_rgba(0,0,0,0.55)] md:p-8">
                    <span
                      className="flex size-[52px] shrink-0 items-center justify-center rounded-[16px] text-[var(--theme-accent)]"
                      style={{
                        backgroundColor: 'color-mix(in srgb, var(--theme-accent) 14%, transparent)',
                      }}
                    >
                      <BeneficioIcon icon={item.icon} />
                    </span>

                    <div>
                      <h3 className="font-['Outfit'] text-[21px] leading-tight font-semibold text-[var(--theme-text)] md:text-[23px]">
                        {tBenefits(`items.${item.id}.title`)}
                      </h3>
                      <p className="mt-2 font-['Outfit'] text-[15px] leading-[1.6] text-[var(--theme-muted)] md:text-[16px]">
                        {tBenefits(`items.${item.id}.description`)}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
