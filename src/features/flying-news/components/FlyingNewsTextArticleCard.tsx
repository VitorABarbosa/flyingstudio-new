import type { FlyingNewsTextArticle } from '../types/flyingNews.types';

type FlyingNewsTextArticleCardProps = {
  article: FlyingNewsTextArticle;
  readMoreLabel: string;
};

export default function FlyingNewsTextArticleCard({
  article,
  readMoreLabel,
}: FlyingNewsTextArticleCardProps) {
  return (
    <article className="h-[314px] w-[392px] shrink-0 overflow-hidden rounded-[24px] bg-[var(--theme-surface)] px-[24px] py-[32px] transition-colors duration-200">
      <div className="flex h-full flex-col gap-[16px]">
        <div className="flex flex-col gap-[12px]">
          <h3 className="line-clamp-3 min-h-[102px] font-['Outfit'] text-[28px] leading-[1.2] font-semibold text-[var(--theme-text)]">
            {article.title}
          </h3>
          <p className="font-['Outfit'] text-[16px] leading-none font-medium whitespace-nowrap text-[var(--theme-accent)]">
            {article.date}
          </p>
        </div>

        <p className="line-clamp-2 min-h-[48px] font-['Outfit'] text-[16px] leading-[1.5] font-normal text-[var(--theme-text)]">
          {article.excerpt}
        </p>

        <a
          href={article.href}
          className="inline-flex w-fit items-center gap-[16px] py-[8px] font-['Outfit'] text-[16px] leading-[1.5] font-medium tracking-[0.32px] text-[var(--theme-text)] transition-opacity hover:opacity-75"
        >
          <span>{readMoreLabel}</span>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}
