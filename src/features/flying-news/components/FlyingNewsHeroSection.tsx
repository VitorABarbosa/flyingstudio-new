'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';
import { flyingNewsCategories } from '../data/flyingNewsCategories';
import { EASE } from '../lib/animations';
import type { FlyingNewsHeroCopy } from '../types/flyingNews.types';

const HERO_HEIGHT = 973;

type FlyingNewsHeroSectionProps = {
  copy: FlyingNewsHeroCopy;
};

/**
 * Wordmarks decorativos (SVG) cortados nas laterais. Tratados como UM conjunto:
 * um unico rastreador de mouse (no wrapper do hero) define a posicao do cursor,
 * e cada overlay calcula o glow relativo a si a partir da MESMA coordenada — por
 * isso o brilho flui continuamente ao passar o mouse entre as palavras.
 */
const MUTED_WORDMARKS = [
  {
    src: '/flying-news/hero/flying-wordmark-muted.svg',
    width: 909,
    height: 192,
    className: 'absolute top-[242px] left-[-717px] h-[192.192px] w-[908.934px]',
  },
  {
    src: '/flying-news/hero/flying-wordmark-muted.svg',
    width: 909,
    height: 192,
    className: 'absolute top-[242px] left-[1197px] h-[192.192px] w-[908.934px]',
  },
  {
    src: '/flying-news/hero/news-wordmark-muted.svg',
    width: 742,
    height: 192,
    className: 'absolute top-[473px] left-[-383px] h-[192.192px] w-[741.621px]',
  },
  {
    src: '/flying-news/hero/news-wordmark-muted.svg',
    width: 742,
    height: 192,
    className: 'absolute top-[473px] left-[1197px] h-[192.192px] w-[741.621px]',
  },
] as const;

function CategoryIcon({ icon }: { icon: 'megaphone' | 'fingerprint' }) {
  if (icon === 'megaphone') {
    return (
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 11v2a2 2 0 0 0 2 2h2l2 5h3l-2-5 8-3V6L7 10H5a2 2 0 0 0-2 1Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M18 8a3 3 0 0 1 0 4" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5.5 11.5A6.5 6.5 0 0 1 18 9M7 16c1.2-1.8 1.6-4.2 1-6.4M10 20c2-3 2.7-7.1 1.5-10.8M13.5 20c1.4-3.1 2-6.6 1.1-9.8M17 18c.8-2.3 1.1-4.7.7-7.2M8.2 6.5A6.5 6.5 0 0 1 18.5 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FlyingNewsHeroSection({ copy }: FlyingNewsHeroSectionProps) {
  const glowRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const updateGlow = (clientX: number, clientY: number) => {
    for (const el of glowRefs.current) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--glow-x', `${((clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--glow-y', `${((clientY - rect.top) / rect.height) * 100}%`);
    }
  };

  const setGlowVisible = (visible: boolean) => {
    for (const el of glowRefs.current) {
      el?.style.setProperty('--glow-opacity', visible ? '1' : '0');
    }
  };

  return (
    <section
      aria-labelledby="flying-news-title"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] transition-colors duration-200"
    >
      <SectionScaleFrame designHeight={HERO_HEIGHT}>
        {/* Um unico rastreador para o conjunto de wordmarks (glow continuo). */}
        <div
          className="relative h-full w-full"
          onMouseEnter={(event) => {
            setGlowVisible(true);
            updateGlow(event.clientX, event.clientY);
          }}
          onMouseMove={(event) => updateGlow(event.clientX, event.clientY)}
          onMouseLeave={() => setGlowVisible(false)}
        >
          <h1 id="flying-news-title" className="sr-only">
            {copy.title}
          </h1>

          {MUTED_WORDMARKS.map((wordmark, index) => (
            <div key={index} aria-hidden="true" className={wordmark.className}>
              <Image
                src={wordmark.src}
                alt=""
                width={wordmark.width}
                height={wordmark.height}
                className="h-full w-full"
              />
              <span
                ref={(el) => {
                  glowRefs.current[index] = el;
                }}
                className="wordmark-glow absolute inset-0"
                style={{ ['--wordmark-src' as string]: `url(${wordmark.src})` }}
              />
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -60, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="absolute top-[161px] left-[240px] h-[192.192px] w-[908.934px]"
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
              className="h-full w-full"
            >
              <Image
                aria-hidden="true"
                src="/flying-news/hero/flying-wordmark.svg"
                alt=""
                width={909}
                height={192}
                priority
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
            className="absolute top-[389px] left-[424px] h-[192.192px] w-[741.621px]"
          >
            <motion.div
              animate={{ y: [0, -22, 0] }}
              transition={{ duration: 6.2, ease: 'easeInOut', repeat: Infinity, delay: 1.4 }}
              className="h-full w-full"
            >
              <Image
                aria-hidden="true"
                src="/flying-news/hero/news-wordmark.svg"
                alt=""
                width={742}
                height={192}
                priority
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="absolute top-[617px] left-[436px] font-['Outfit'] text-[40px] leading-[1.2] font-medium tracking-[0.8px] whitespace-nowrap text-[var(--theme-text)]"
          >
            {copy.tagline}
          </motion.p>

          <div className="absolute top-[767px] left-[377px] flex gap-[20px]">
            {flyingNewsCategories.map((category, index) => {
              const categoryCopy = copy.categories[category.key];

              return (
                <motion.a
                  key={category.key}
                  href={category.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.55 + index * 0.12 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex h-[144px] w-[573.333px] items-center justify-center gap-[24px] rounded-[24px] bg-[var(--theme-surface)] px-[24px] py-[40px] transition-colors duration-200"
                >
                  <span className="grid size-[64px] shrink-0 place-items-center rounded-full bg-[var(--theme-panel-soft)] text-white">
                    <CategoryIcon icon={category.icon} />
                  </span>
                  <span className="flex flex-col gap-[8px] font-['Outfit'] leading-[1.2] whitespace-nowrap">
                    <span className="text-[28px] font-semibold text-[var(--theme-text)]">
                      {categoryCopy.title}
                    </span>
                    <span className="text-[16px] font-semibold text-[var(--theme-accent)]">
                      {categoryCopy.description}
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </SectionScaleFrame>
    </section>
  );
}
