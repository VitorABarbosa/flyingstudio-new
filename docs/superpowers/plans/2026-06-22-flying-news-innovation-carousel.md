# Flying News Innovation Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar a seção Inovação & Tendências reutilizando o carrossel editorial existente.

**Architecture:** A nova seção fornece dados e traduções próprios à segunda instância de `FlyingNewsCarouselSection`. Cada instância mantém estado local, portanto os carrosséis operam de forma independente sem nova lógica visual.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, next-intl e Vitest.

## Global Constraints

- Não duplicar componentes do carrossel.
- Não modificar o visual das três seções anteriores.
- Não baixar assets nem usar validação visual automatizada.
- Usar três páginas de quatro cards.

---

### Task 1: Dados de inovação

**Files:**
- Create: `src/features/flying-news/data/flyingNewsInnovationArticles.test.ts`
- Create: `src/features/flying-news/data/flyingNewsInnovationArticles.ts`

- [ ] Criar teste exigindo 12 IDs únicos de inovação.
- [ ] Executar e confirmar falha por módulo inexistente.
- [ ] Implementar os IDs mínimos e confirmar aprovação.

### Task 2: Integração localizada

**Files:**
- Modify: `src/features/flying-news/FlyingNewsPage.tsx`
- Modify: `src/messages/pt-BR.json`
- Modify: `src/messages/en.json`

- [ ] Construir artigos temporários a partir das traduções.
- [ ] Renderizar a segunda instância com `id="inovacao-tendencias"`.
- [ ] Executar testes, type-check e lint.
- [ ] Entregar a rota para validação visual do usuário.
