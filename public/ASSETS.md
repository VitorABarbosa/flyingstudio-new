# Assets Inventory - Flying Studio

Extraidos do Figma via MCP (lGOuy1AGPpq2VEANwudKv1)
Estrutura atual organizada por dominio: brand, shared e home.

## Brand

| File | Usage |
|------|-------|
| `brand/logo-flying-studio.png` | Logo principal global |

## Shared Icons

| File | Usage |
|------|-------|
| `shared/icons/social/*` | Redes sociais de Header/Footer |
| `shared/icons/ui/*` | CTA, setas e elementos de interface reutilizaveis |
| `shared/icons/devices/*` | Icones de dispositivos compartilhados |

## Home Assets

| Segment | Path |
|--------|------|
| Hero | `home/hero/*` |
| Sobre | `home/sobre/*` |
| Parceiros | `home/parceiros/*` |
| Footer | `home/footer/*` |

## Contato Assets

| Segment | File | Usage |
|--------|------|-------|
| Hero | `contato/hero/hero-bg-poster.png` | Poster/fallback do fundo do hero (linhas fluidas) |
| 1º Passo | `contato/passo-1/icon-personalizado-light.svg` | Ícone "Personalizado" (brush) do card |

> Os outros 4 ícones de tipo de projeto reaproveitam `home/hero/icon-*-light.svg`.

> O fundo animado do hero usa o componente `LinhasFluidas` (canvas), nao um video.
> Caso queira o `.mp4` original do Figma, dropar em `contato/hero/hero-bg.mp4`
> (o GIF exportado pelo Figma tinha 52MB e foi descartado).

## Junte-se a Nós Assets

| Segment | File | Usage |
|--------|------|-------|
| Hero | `junte-se-a-nos/hero/banner.png` | Banner de foto do estúdio (cantos arredondados) |

> Demais elementos (ícones de upload/seta, dropzone) são SVG/CSS inline.

## Flying News Assets

| Segment | File | Usage |
|--------|------|-------|
| Hero | `flying-news/hero/flying-wordmark.svg` | Lettering principal FLYING |
| Hero | `flying-news/hero/news-wordmark.svg` | Lettering principal NEWS |
| Hero | `flying-news/hero/flying-wordmark-muted.svg` | Repeticao decorativa FLYING |
| Hero | `flying-news/hero/news-wordmark-muted.svg` | Repeticao decorativa NEWS |
| Destaques | `flying-news/destaques/entrada-residencial.jpg` | Imagem do primeiro card |
| Destaques | `flying-news/destaques/area-comercial.jpg` | Imagem do segundo card |
| Destaques | `flying-news/destaques/fachada-residencial.jpg` | Imagem do terceiro card |
| Destaques | `flying-news/destaques/area-de-lazer.jpg` | Imagem do quarto card |
