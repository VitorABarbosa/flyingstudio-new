# Flying News Market Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar a seção Notícias & Mercado como carrossel acessível de quatro cards por página.

**Architecture:** Um `FlyingNewsCarouselSection` cliente recebe conteúdo e artigos, divide-os em páginas de quatro itens e controla setas e indicadores. O componente será reutilizado posteriormente em Inovação & Tendências; os dados editoriais permanecem fora da camada visual.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, next-intl, Vitest e Testing Library.

## Global Constraints

- Escopo restrito a Notícias & Mercado.
- Não modificar Hero ou Destaques.
- Não usar assets externos, Playwright ou validação visual automatizada.
- Reutilizar tokens existentes sem alterar `globals.css`.
- Exibir quatro cards por página e três indicadores conforme o Figma.

---

### Task 1: Contrato do carrossel

**Files:**
- Create: `src/features/flying-news/components/FlyingNewsCarouselSection.test.tsx`

- [ ] Criar teste para título, quatro cards visíveis e navegação para a página seguinte.
- [ ] Executar e confirmar falha por componente inexistente.

### Task 2: Tipos, dados e componente

**Files:**
- Modify: `src/features/flying-news/types/flyingNews.types.ts`
- Create: `src/features/flying-news/data/flyingNewsMarketArticles.ts`
- Create: `src/features/flying-news/components/FlyingNewsTextArticleCard.tsx`
- Create: `src/features/flying-news/components/FlyingNewsCarouselSection.tsx`

- [ ] Definir contrato do artigo textual.
- [ ] Criar três páginas temporárias com quatro artigos cada.
- [ ] Implementar card e navegação circular acessível.
- [ ] Executar o teste até aprovação.

### Task 3: Integração e verificação

**Files:**
- Modify: `src/features/flying-news/FlyingNewsPage.tsx`
- Modify: `src/messages/pt-BR.json`
- Modify: `src/messages/en.json`

- [ ] Integrar traduções e dados na página.
- [ ] Executar testes, type-check e lint.
- [ ] Entregar a rota local para validação visual do usuário.
