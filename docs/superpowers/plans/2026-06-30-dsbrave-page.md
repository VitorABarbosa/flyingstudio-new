# D.sbrave Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `/dsbrave` page that demonstrates D.sbrave as a unified immersive module for real estate tours.

**Architecture:** Add a focused `src/features/dsbrave` feature with data, sections, and one page composer. Register the page in the existing localized slug route and update service navigation to point to `/dsbrave` without changing HOME content.

**Tech Stack:** Next.js App Router, React 19, TypeScript, next-intl, Framer Motion, Tailwind CSS tokens.

## Global Constraints

- Do not modify the current HOME D.sbrave section.
- Use existing semantic theme tokens from `src/app/globals.css`.
- Keep D.sbrave demo URLs in a data file, not inside page layout code.
- Keep copy translated in `src/messages/pt-BR.json` and `src/messages/en.json`.
- Validate with `npm run type-check`, `npm test`, and `npm run build`.

---

### Task 1: Feature Structure And Data

**Files:**
- Create: `src/features/dsbrave/data/dsbraveData.ts`
- Create: `src/features/dsbrave/types/dsbrave.types.ts`

**Interfaces:**
- Produces: `dsbraveDemos`, `dsbraveExperienceKeys`, `dsbraveStepKeys`, `dsbraveIntegrationKeys`.

- [ ] Create typed demo and section key data for the page.
- [ ] Keep iframe URLs in `dsbraveData.ts`.

### Task 2: Page Sections

**Files:**
- Create: `src/features/dsbrave/DSbravePage.tsx`
- Create: `src/features/dsbrave/sections/DSbraveHero.tsx`
- Create: `src/features/dsbrave/sections/DSbraveConceptSection.tsx`
- Create: `src/features/dsbrave/sections/DSbraveExplainerSection.tsx`
- Create: `src/features/dsbrave/sections/DSbraveModuleSection.tsx`

**Interfaces:**
- Consumes: `dsbraveDemos`, section key arrays, and `next-intl` namespace `DSbravePage`.
- Produces: default `DSbravePage` component.

- [ ] Build the page as a sequence of focused sections.
- [ ] Use a service-page hero banner and a large iframe preview with tabs.
- [ ] Reuse site footer and scroll-to-top pattern.

### Task 3: Routing And Navigation

**Files:**
- Modify: `src/lib/site-navigation.ts`
- Modify: `src/app/[locale]/[slug]/page.tsx`

**Interfaces:**
- Consumes: `DSbravePage`.
- Produces: localized `/dsbrave` static route.

- [ ] Add `dsbrave` to navigation slug data.
- [ ] Point header service item to `futurePageHrefs.dsbrave`.
- [ ] Return `<DSbravePage />` when `slug === 'dsbrave'`.

### Task 4: Translations

**Files:**
- Modify: `src/messages/pt-BR.json`
- Modify: `src/messages/en.json`

**Interfaces:**
- Produces: `DSbravePage` message namespace in both locales.

- [ ] Add hero, explainer, module, and CTA copy.
- [ ] Add sidebar label for `dsbrave` if the item is shown in sidebar navigation.

### Task 5: Verification

**Files:**
- No code files.

**Interfaces:**
- Consumes: complete implementation.
- Produces: validation results.

- [ ] Run `npm run type-check`.
- [ ] Run `npm test`.
- [ ] Run `npm run build`.
