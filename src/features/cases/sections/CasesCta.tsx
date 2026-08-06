'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';
import CasesArrow from '../components/CasesArrow';
import { groupCompanies } from '../data/casesData';
import { EASE, revealBlur, revealItem, staggerContainer } from '../lib/animations';

/**
 * O fecho da página devolve a metáfora da abertura: o sistema solar do
 * ecossistema reaparece — mas agora quem ocupa o centro é o lançamento do
 * cliente. As quatro órbitas (uma por casa, cada uma na sua cor e no seu
 * ritmo) giram ao redor do convite, e a copy vem do manifesto: um universo
 * inteiro conspirando a favor da próxima grande venda.
 */

// Diâmetro, ritmo e fase de cada órbita — de dentro (OGDI) para fora (Rinno),
// como na seção do ecossistema; internas mais rápidas, como um sistema solar.
const ORBIT_CONFIG = [
  { size: 640, duration: 46, offset: 30 },
  { size: 850, duration: 58, offset: 150 },
  { size: 1060, duration: 72, offset: 250 },
  { size: 1270, duration: 88, offset: 335 },
];

const orbits = groupCompanies.map((company, index) => ({
  id: company.id,
  color: company.accentColor,
  ...ORBIT_CONFIG[index],
}));

export default function CasesCta() {
  const t = useTranslations('CasesPage.cta');
  const prefersReducedMotion = useReducedMotion();
  /* Celular: as órbitas ficam paradas — 4 camadas de até 1270px girando em
     loop eterno (na lista de cases E em cada case) pesavam demais no iPhone. */
  const [orbitMotion, setOrbitMotion] = useState(false);

  useEffect(() => {
    setOrbitMotion(window.matchMedia('(min-width: 1024px)').matches);
  }, []);

  return (
    <section className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden px-5 py-24 text-center md:min-h-[660px]">
      {/* Brilho ambiente atrás do centro — o "sol" da composição */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute aspect-square w-[min(72vw,760px)] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(var(--theme-accent-rgb), 0.12) 0%, transparent 62%)' }}
      />

      {/* As órbitas das quatro casas, girando ao redor do conteúdo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        {orbits.map((orbit) => (
          <motion.div
            key={orbit.id}
            className="absolute rounded-full border"
            style={{
              width: `${orbit.size}px`,
              height: `${orbit.size}px`,
              borderColor: `${orbit.color}59`,
            }}
            initial={{ rotate: orbit.offset }}
            animate={
              prefersReducedMotion || !orbitMotion
                ? undefined
                : { rotate: [orbit.offset, orbit.offset + 360] }
            }
            transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
          >
            {/* O planeta da casa, viajando na própria linha */}
            <span
              className="absolute top-0 left-1/2 h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: orbit.color, boxShadow: `0 0 16px 3px ${orbit.color}66` }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p
          variants={revealItem}
          className="text-[12px] font-semibold tracking-[0.3em] text-[var(--theme-accent)] uppercase md:text-[13px]"
        >
          {t('eyebrow')}
        </motion.p>
        <motion.h2
          variants={revealBlur}
          className="mt-5 max-w-[1000px] text-[clamp(36px,4vw,68px)] leading-[1.05] font-semibold tracking-[-0.035em] text-[var(--theme-text)]"
        >
          {t.rich('title', { accent: (chunks) => <span className="text-[var(--theme-accent)]">{chunks}</span> })}
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="mt-6 max-w-[760px] text-[16px] leading-[1.5] text-[var(--theme-text)] md:text-[19px] md:leading-[1.45]"
        >
          {t('description')}
        </motion.p>
        <motion.div variants={revealItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={futurePageHrefs.contact}
            className="group mt-10 inline-flex min-h-[56px] items-center gap-5 rounded-full bg-[var(--theme-cta-bg)] px-7 text-[16px] font-medium tracking-[0.02em] text-[var(--theme-cta-text)] transition-shadow duration-300 hover:shadow-[0_20px_55px_-14px_rgba(var(--theme-accent-rgb),0.6)] md:min-h-[64px] md:text-[17px]"
          >
            {t('button')}
            <CasesArrow className="size-7 -rotate-[36deg] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
