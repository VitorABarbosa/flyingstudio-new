import type { Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT_TEXT = { once: true, amount: 0.35 } as const;
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

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

export const SPRING_SOFT = {
  type: 'spring',
  stiffness: 130,
  damping: 17,
  mass: 0.9,
} as const;

/** Entrada com física de mola: itens "nascem" com peso e assentam suave. */
export const staggerItemSpring: Variants = {
  hidden: { opacity: 0, y: 70, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_SOFT,
  },
};
