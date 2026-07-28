'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';
import FlyingNewsTextArticleCard from './FlyingNewsTextArticleCard';
import {
  staggerContainer,
  revealItem,
  VIEWPORT_ONCE,
  cardHover,
} from '../lib/animations';
import type { FlyingNewsTextArticle } from '../types/flyingNews.types';

const SECTION_HEIGHT = 652;
const ARTICLES_PER_PAGE = 4;

type FlyingNewsCarouselSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  articles: FlyingNewsTextArticle[];
  readMoreLabel: string;
  previousLabel: string;
  nextLabel: string;
  pageLabel: string;
};

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d={direction === 'left' ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FlyingNewsCarouselSection({
  id,
  title,
  subtitle,
  articles,
  readMoreLabel,
  previousLabel,
  nextLabel,
  pageLabel,
}: FlyingNewsCarouselSectionProps) {
  const pageCount = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));
  const [currentPage, setCurrentPage] = useState(0);
  const visibleArticles = articles.slice(
    currentPage * ARTICLES_PER_PAGE,
    (currentPage + 1) * ARTICLES_PER_PAGE,
  );

  const goToPreviousPage = () => {
    setCurrentPage((page) => (page - 1 + pageCount) % pageCount);
  };

  const goToNextPage = () => {
    setCurrentPage((page) => (page + 1) % pageCount);
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] transition-colors duration-200"
    >
      <SectionScaleFrame designHeight={SECTION_HEIGHT}>
        <div className="absolute top-[25px] left-1/2 -translate-x-1/2">
          <motion.h2
            id={`${id}-title`}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            className="font-['Outfit'] text-[64px] leading-[1.2] font-semibold whitespace-nowrap text-[var(--theme-text)]"
          >
            {title}
          </motion.h2>
        </div>
        <div className="absolute top-[118px] left-1/2 -translate-x-1/2">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: 0.08 }}
            className="font-['Outfit'] text-[24px] leading-[1.2] font-bold tracking-[0.96px] whitespace-nowrap text-[var(--theme-accent)]"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          key={currentPage}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="absolute top-[187px] left-[140px] flex gap-[24px]"
          aria-live="polite"
        >
          {visibleArticles.map((article) => (
            <motion.div key={article.id} variants={revealItem} whileHover={cardHover}>
              <FlyingNewsTextArticleCard article={article} readMoreLabel={readMoreLabel} />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          type="button"
          onClick={goToPreviousPage}
          aria-label={previousLabel}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-[307px] left-[56px] z-10 flex h-[72px] w-[48px] cursor-pointer items-center justify-center rounded-[99px] bg-[var(--theme-text)] text-[var(--theme-bg)]"
        >
          <ArrowIcon direction="left" />
        </motion.button>
        <motion.button
          type="button"
          onClick={goToNextPage}
          aria-label={nextLabel}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-[307px] right-[56px] z-10 flex h-[72px] w-[48px] cursor-pointer items-center justify-center rounded-[99px] bg-[var(--theme-text)] text-[var(--theme-bg)]"
        >
          <ArrowIcon direction="right" />
        </motion.button>

        <div className="absolute top-[541px] left-1/2 flex -translate-x-1/2 gap-[24px]">
          {Array.from({ length: pageCount }, (_, pageIndex) => {
            const isActive = currentPage === pageIndex;
            return (
              <button
                key={pageIndex}
                type="button"
                onClick={() => setCurrentPage(pageIndex)}
                aria-label={`${pageLabel} ${pageIndex + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`size-[12px] cursor-pointer rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-[var(--theme-text)]' : 'bg-[var(--theme-rail-inactive)]'
                }`}
              />
            );
          })}
        </div>
      </SectionScaleFrame>
    </section>
  );
}
