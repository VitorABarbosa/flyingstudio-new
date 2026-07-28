import type { Variants } from 'framer-motion';

/**
 * Variants de "scroll reveal" compartilhadas pelas seções da home.
 *
 * Padrão: fade + slide-up suave, em cascata (stagger) entre os elementos
 * de cada seção. Segue a mesma curva/duração já usada nas demais páginas
 * do site (ex.: aplicativos/BeneficiosSection) para manter consistência.
 *
 * Uso típico:
 *   <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT_ONCE}
 *               variants={staggerContainer}>
 *     <motion.h2 variants={revealItemCentered} className="... left-1/2 ...">…</motion.h2>
 *     <motion.div variants={revealItem}>…</motion.div>
 *   </motion.div>
 *
 * Atenção: para elementos centralizados que usavam `-translate-x-1/2`,
 * remova essa classe e use `revealItemCentered` — o framer controla o
 * `transform`, então o `translateX(-50%)` precisa vir pela variant (x: '-50%')
 * para não ser sobrescrito.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.7;
const SLIDE_DISTANCE = 28;

/** Disparo único quando ~20% da seção entra na viewport. */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

/** Container que cascateia os filhos diretos (título → subtítulo → cards…). */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Item padrão: sobe e dá fade-in. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: SLIDE_DISTANCE },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

/** Igual ao item padrão, preservando o `translateX(-50%)` de elementos centralizados. */
export const revealItemCentered: Variants = {
  hidden: { opacity: 0, y: SLIDE_DISTANCE, x: '-50%' },
  show: { opacity: 1, y: 0, x: '-50%', transition: { duration: DURATION, ease: EASE } },
};
