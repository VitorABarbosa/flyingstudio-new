# Flying News Destaques Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar a seção Destaques da Flying News com quatro cards de conteúdo temporário, fiel ao frame Figma e pronta para receber notícias reais.

**Architecture:** `FlyingNewsHighlightsSection` compõe o cabeçalho, a grade e o CTA; `FlyingNewsArticleCard` concentra a apresentação reutilizável de cada notícia. Metadados visuais ficam em `data`, contratos em `types` e textos em `next-intl`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, next-intl, Vitest e Testing Library.

## Global Constraints

- Escopo restrito à seção Destaques.
- Não alterar a Hero validada.
- Não usar Playwright ou validação visual automatizada.
- Reutilizar tokens existentes sem modificar `globals.css`.
- Assets em `public/flying-news/destaques/` com nomes semânticos.

---

### Task 1: Assets e dados

**Files:**
- Create: `public/flying-news/destaques/*.jpg`
- Modify: `public/ASSETS.md`
- Create: `src/features/flying-news/data/flyingNewsHighlights.ts`
- Modify: `src/features/flying-news/types/flyingNews.types.ts`

- [ ] Baixar e validar as quatro imagens do Figma.
- [ ] Definir IDs, imagens, posição de recorte e âncoras dos cards.
- [ ] Registrar os assets no inventário.

### Task 2: Contrato da seção

**Files:**
- Create: `src/features/flying-news/components/FlyingNewsHighlightsSection.test.tsx`

- [ ] Escrever teste que exige título, quatro artigos e CTA final.
- [ ] Executar e confirmar falha por componente inexistente.

### Task 3: Componentes e traduções

**Files:**
- Create: `src/features/flying-news/components/FlyingNewsArticleCard.tsx`
- Create: `src/features/flying-news/components/FlyingNewsHighlightsSection.tsx`
- Modify: `src/features/flying-news/FlyingNewsPage.tsx`
- Modify: `src/messages/pt-BR.json`
- Modify: `src/messages/en.json`

- [ ] Implementar o card reutilizável.
- [ ] Implementar a composição 1920 px da seção.
- [ ] Conectar dados e traduções na página.
- [ ] Executar o teste e confirmar aprovação.

### Task 4: Verificação técnica

- [ ] Executar todos os testes.
- [ ] Executar type-check.
- [ ] Executar lint e garantir ausência de novos avisos.
- [ ] Entregar `http://localhost:3000/flying-news` para validação visual do usuário.
