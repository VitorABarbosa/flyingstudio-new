import type { Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT_TEXT = { once: true, amount: 0.35 } as const;
export const VIEWPORT_SCREEN = { once: true, amount: 0.25 } as const;
export const VIEWPORT_SECTION = { once: true, amount: 0.2 } as const;

export const textAnimation: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

export const screenAnimation: Variants = {
  hidden: { opacity: 0, y: 70, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: EASE,
    },
  },
};

export const sectionAnimation: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};
