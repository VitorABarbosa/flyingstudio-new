# Flying News Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar somente a Hero da página Flying News conforme o frame Figma `2621:2208`, preservando a arquitetura, o tema e a navegação existentes.

**Architecture:** A rota dedicada renderiza `FlyingNewsPage`, que compõe o `Header` global e uma `FlyingNewsHeroSection`. O lettering decorativo é mantido como SVG exportado do Figma; conteúdo textual e categorias permanecem em traduções e dados tipados. A seção usa o sistema `SectionScaleFrame` já adotado nas páginas institucionais, limitado à Hero.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript estrito, Tailwind CSS 4, next-intl, Vitest e Testing Library.

## Global Constraints

- Escopo restrito à Hero; não implementar Destaques ou seções posteriores.
- Reutilizar `Header`, tokens de `globals.css`, `SectionScaleFrame` e navegação existentes.
- Não duplicar o logo do Header nem ícones que possam ser desenhados semanticamente em SVG.
- Assets exclusivos em `public/flying-news/hero/`, com nomes em kebab-case.
- Preservar todas as alterações locais preexistentes.

---

### Task 1: Assets e contrato visual

**Files:**
- Create: `public/flying-news/hero/flying-wordmark.svg`
- Create: `public/flying-news/hero/news-wordmark.svg`
- Modify: `public/ASSETS.md`

**Interfaces:**
- Produces: assets decorativos acessíveis por `/flying-news/hero/*.svg`.

- [ ] Baixar somente os vetores `Fly` e `New` do frame da Hero.
- [ ] Confirmar formato, dimensões e ausência de arquivos duplicados.
- [ ] Registrar os dois arquivos no inventário de assets.

### Task 2: Teste de contrato da Hero

**Files:**
- Create: `src/features/flying-news/FlyingNewsHeroSection.test.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: componente `FlyingNewsHeroSection` e mensagens do provider.
- Produces: contrato para heading, tagline e dois links de categoria.

- [ ] Configurar o runner de teste mínimo para React.
- [ ] Criar teste que exige heading “Flying News”, tagline e categorias acessíveis.
- [ ] Executar o teste e confirmar falha por componente inexistente.

### Task 3: Hero modular da Flying News

**Files:**
- Create: `src/features/flying-news/FlyingNewsPage.tsx`
- Create: `src/features/flying-news/components/FlyingNewsHeroSection.tsx`
- Create: `src/features/flying-news/data/flyingNewsCategories.ts`
- Create: `src/features/flying-news/types/flyingNews.types.ts`
- Create: `src/app/[locale]/flying-news/page.tsx`
- Modify: `src/messages/pt-BR.json`
- Modify: `src/messages/en.json`

**Interfaces:**
- Produces: rota localizada `/flying-news` e Hero com categorias tipadas.

- [ ] Implementar dados tipados das duas categorias.
- [ ] Implementar a composição visual da Hero com lettering decorativo e conteúdo semântico.
- [ ] Conectar os textos ao namespace `FlyingNews` do next-intl.
- [ ] Criar a rota dedicada e remover o placeholder da resolução prática da URL.
- [ ] Executar o teste e confirmar aprovação.

### Task 4: Verificação

**Files:**
- Modify somente arquivos da Task 3 quando uma correção comprovada for necessária.

- [ ] Executar `npm run type-check`.
- [ ] Executar `npm run lint`.
- [ ] Renderizar `/flying-news` em desktop e viewport móvel.
- [ ] Comparar a Hero com o Figma e corrigir apenas divergências da seção.

