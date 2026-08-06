import type { Variants } from 'framer-motion';
import { entryBlur } from '@/lib/entryBlur';

/** Curva padrao do site (mesma de revealAnimation da home). */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Container que escalona a entrada dos filhos. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/** Entrada "elaborada": sobe, escala e desfoca suavemente. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 38, scale: 0.96, filter: entryBlur(8) },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: entryBlur(0),
    transition: { duration: 0.75, ease: EASE },
  },
};

/** Variacao sem scale, para textos (titulo/subtitulo). */
export const revealText: Variants = {
  hidden: { opacity: 0, y: 28, filter: entryBlur(6) },
  show: {
    opacity: 1,
    y: 0,
    filter: entryBlur(0),
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Entrada deslizando da esquerda (usada em titulos de destaque). */
export const revealFromLeft: Variants = {
  hidden: { opacity: 0, x: -48, filter: entryBlur(6) },
  show: {
    opacity: 1,
    x: 0,
    filter: entryBlur(0),
    transition: { duration: 0.8, ease: EASE },
  },
};

export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

/** Micro-interacoes reutilizaveis. */
export const cardHover = { y: -8, scale: 1.025, transition: { duration: 0.25, ease: EASE } };
export const pressTap = { scale: 0.97 };
export const buttonHover = { y: -3, scale: 1.03, transition: { duration: 0.2, ease: EASE } };
