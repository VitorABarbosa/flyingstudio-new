'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import TourProjetoCard from './TourProjetoCard';
import { tourProjectCards } from '../data/tourData';

const sectionAnimation = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const VISIBLE_CARDS_DESKTOP = 4;
const VISIBLE_CARDS_TABLET = 2;
const VISIBLE_CARDS_MOBILE = 1;

/**
 * Seta do carrossel — mesmo desenho das de Filmes e Aplicativos.
 *
 * Cápsula VERTICAL, não círculo: navegação e reprodução precisam de silhuetas
 * diferentes. No hover a cápsula se alonga e o accent sobe a partir da borda
 * externa, como uma aba puxada para fora do trilho.
 *
 * A divisa é SVG, não o caractere "←": glifo de seta muda de desenho conforme
 * a fonte e não alinha igual em todo sistema.
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
        className="relative flex h-[74px] w-[38px] items-center justify-center overflow-hidden rounded-full border transition-all duration-300 lg:backdrop-blur-md group-hover:h-[92px] group-focus-visible:ring-2 group-focus-visible:ring-[var(--theme-accent)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[var(--theme-ring-offset)] md:h-[86px] md:w-[42px] md:group-hover:h-[106px]"
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

export default function TourProjetosSection() {
  const t = useTranslations('Tour360Page.projects');
  const [visibleCards, setVisibleCards] = useState(VISIBLE_CARDS_DESKTOP);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const filteredProjects = tourProjectCards;

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
    if (filteredProjects.length === 0) return [];

    const clonesBefore = filteredProjects.slice(-visibleCards);
    const clonesAfter = filteredProjects.slice(0, visibleCards);

    return [...clonesBefore, ...filteredProjects, ...clonesAfter];
  }, [filteredProjects, visibleCards]);

  useEffect(() => {
    setIsAnimating(false);
    setCurrentIndex(visibleCards);

    const timeout = setTimeout(() => {
      setIsAnimating(true);
    }, 40);

    return () => clearTimeout(timeout);
  }, [visibleCards]);

  const handlePrev = () => {
    if (!carouselItems.length) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!carouselItems.length) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (!filteredProjects.length) return;

    if (currentIndex <= visibleCards - 1) {
      setIsAnimating(false);
      setCurrentIndex(filteredProjects.length + currentIndex);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    }

    if (currentIndex >= filteredProjects.length + visibleCards) {
      setIsAnimating(false);
      setCurrentIndex(currentIndex - filteredProjects.length);

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
        <div className="text-center">
          <span className="text-[24px] font-bold text-[var(--theme-accent)] uppercase">
            {t('eyebrow')}
          </span>

          <h2 className="mt-3 text-[34px] font-bold text-[var(--theme-text)] md:text-[64px]">
            {t('title')}
          </h2>
        </div>

        {/* Calhas laterais (padding) reservam o espaço das setas FORA dos
            cards — a seta fica na calha, nunca por cima do conteúdo. */}
        <div className="relative mt-10 md:mt-12 md:px-[64px]">
          <CarouselArrow direction="left" onClick={handlePrev} label={t('prevLabel')} />
          <CarouselArrow direction="right" onClick={handleNext} label={t('nextLabel')} />

          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${translateX}` }}
              transition={
                isAnimating
                  ? {
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }
                  : {
                      duration: 0,
                    }
              }
              onAnimationComplete={handleTransitionEnd}
              className="flex"
            >
              {carouselItems.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="shrink-0 px-[6px] md:px-[8px]"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <TourProjetoCard
                    client={project.client}
                    project={project.project}
                    image={project.image}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}