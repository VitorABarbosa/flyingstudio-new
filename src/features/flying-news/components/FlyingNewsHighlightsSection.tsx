'use client';

import { motion } from 'framer-motion';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';
import FlyingNewsArticleCard from './FlyingNewsArticleCard';
import {
  staggerContainer,
  revealItem,
  revealText,
  VIEWPORT_ONCE,
  cardHover,
  buttonHover,
  pressTap,
} from '../lib/animations';
import type { FlyingNewsArticle } from '../types/flyingNews.types';

const SECTION_HEIGHT = 973;

type FlyingNewsHighlightsSectionProps = {
  eyebrow: string;
  title: string;
  readMoreLabel: string;
  allEditionsLabel: string;
  articles: FlyingNewsArticle[];
};

export default function FlyingNewsHighlightsSection({
  eyebrow,
  title,
  readMoreLabel,
  allEditionsLabel,
  articles,
}: FlyingNewsHighlightsSectionProps) {
  return (
    <section
      id="destaques"
      aria-labelledby="flying-news-highlights-title"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] transition-colors duration-200"
    >
      <SectionScaleFrame designHeight={SECTION_HEIGHT}>
        {/* Wrappers externos mantem o posicionamento/centralizacao; o motion
            interno anima sem conflitar com o -translate-x-1/2. */}
        <div className="absolute top-[40px] left-1/2 -translate-x-1/2">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            className="font-['Outfit'] text-[24px] leading-none font-bold tracking-[0.96px] whitespace-nowrap text-[var(--theme-accent)]"
          >
            {eyebrow}
          </motion.p>
        </div>
        <div className="absolute top-[72px] left-1/2 -translate-x-1/2">
          <motion.h2
            id="flying-news-highlights-title"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: 0.08 }}
            className="font-['Outfit'] text-[64px] leading-[1.2] font-semibold whitespace-nowrap text-[var(--theme-text)]"
          >
            {title}
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="absolute top-[189px] left-[80px] flex gap-[24px]"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={revealItem} whileHover={cardHover}>
              <FlyingNewsArticleCard article={article} readMoreLabel={readMoreLabel} />
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute top-[817px] left-1/2 -translate-x-1/2">
          <motion.a
            href="#noticias-mercado"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            whileHover={buttonHover}
            whileTap={pressTap}
            className="flex items-center justify-center gap-[8px] rounded-[99px] bg-[var(--theme-text)] px-[24px] py-[16px] text-[var(--theme-bg)]"
          >
            <span className="font-['Outfit'] text-[16px] leading-[1.5] font-medium tracking-[0.32px] whitespace-nowrap">
              {allEditionsLabel}
            </span>
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="m7 9 5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </SectionScaleFrame>
    </section>
  );
}
