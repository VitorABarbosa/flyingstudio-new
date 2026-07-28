# D.sbrave Page Design

## Goal

Create a standalone `/dsbrave` page that presents D.sbrave as an immersive real estate experience module. The page must not modify the current HOME content.

## Positioning

D.sbrave is a module that can work as its own product or be embedded inside an application. It gathers the virtual tours of a development into one continuous journey, letting users explore leisure areas, covered spaces, livings, and other environments as a connected preview of their future home.

## Page Approach

Follow the visual hierarchy of the existing service pages. Use a rounded image banner hero, a short title/copy block, a large interactive D.sbrave preview, and concise explanatory sections.

## Page Sections

1. Hero banner image with rounded bottom corners, matching Aplicativos and Tour Virtual.
2. Service title/copy and a large iframe preview with demo tabs.
3. Explainer section describing D.sbrave as a unified hub for virtual tours.
4. Module section comparing standalone use and app integration, with CTA.

## Technical Scope

- Create `src/features/dsbrave`.
- Reuse the existing site layout components: `Header`, `Footer`, `SectionScaleFrame`, and scroll-to-top button pattern.
- Add `/dsbrave` to slug routing.
- Point the header service item `D.sbrave` to `/dsbrave`.
- Keep the current HOME D.sbrave section unchanged.
- Use `next-intl` messages in `pt-BR` and `en`.

## Validation

- `npm run type-check`
- `npm test`
- `npm run build`
