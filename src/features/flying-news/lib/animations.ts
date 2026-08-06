import type { Variants } from 'framer-motion';
import { entryBlur } from '@/lib/entryBlur';

/** Curva padrao do site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
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

/** Reveal apenas opacidade + subida (para textos centralizados). */
export const revealText: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

export const cardHover = { y: -8, scale: 1.025, transition: { duration: 0.25, ease: EASE } };
export const pressTap = { scale: 0.95 };
export const buttonHover = { y: -3, scale: 1.04, transition: { duration: 0.2, ease: EASE } };
