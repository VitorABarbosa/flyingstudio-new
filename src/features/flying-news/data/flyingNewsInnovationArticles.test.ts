import { describe, expect, it } from 'vitest';
import { flyingNewsInnovationArticleIds } from './flyingNewsInnovationArticles';

describe('flyingNewsInnovationArticleIds', () => {
  it('define três páginas com quatro artigos únicos', () => {
    expect(flyingNewsInnovationArticleIds).toHaveLength(12);
    expect(new Set(flyingNewsInnovationArticleIds).size).toBe(12);
    expect(flyingNewsInnovationArticleIds.every((id) => id.startsWith('innovation-'))).toBe(
      true,
    );
  });
});
