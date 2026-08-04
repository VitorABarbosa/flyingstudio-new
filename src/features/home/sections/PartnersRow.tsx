'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { revealItem, staggerContainer, VIEWPORT_ONCE } from '@/features/home/lib/revealAnimation';

type Partner = {
  id: string;
  src: string;
  width: number;
  /** Altura de exibição (px). O marquee usa 40 por padrão; os canvases da
      leva nova têm margem interna, então pedem mais para a ARTE empatar. */
  h?: number;
};

const PARTNERS: Partner[] = [
  { id: 'ascen', src: '/home/parceiros/partner-ascen.png', width: 120 },
  { id: 'msh', src: '/home/parceiros/partner-msh.png', width: 110 },
  { id: 'zats', src: '/home/parceiros/partner-zats.png', width: 110 },
  { id: 'cury', src: '/home/parceiros/partner-cury.png', width: 120 },
  { id: 'tarraf', src: '/home/parceiros/partner-tarraf.png', width: 130 },
  { id: 'artesano', src: '/home/parceiros/partner-artesano.png', width: 130 },
  { id: 'logica', src: '/home/parceiros/partner-logica.png', width: 120 },
  { id: 'rsf', src: '/home/parceiros/partner-rsf.png', width: 100 },
  { id: 'sulplan', src: '/home/parceiros/partner-sulplan.png', width: 130 },
  /* Leva de agosto/2026: canvas padronizado 3:2 (quadrado nos marcados). */
  { id: 'ldinc', src: '/home/parceiros/LDinc.png', width: 120, h: 56 },
  { id: 'engecastro', src: '/home/parceiros/Engecastro.png', width: 120, h: 56 },
  { id: 'soedil', src: '/home/parceiros/soedil.png', width: 120, h: 56 },
  { id: 'chaincorp', src: '/home/parceiros/chaincorp.png', width: 120, h: 56 },
  { id: 'bcanton', src: '/home/parceiros/b.canton.png', width: 120, h: 56 },
  { id: 'five5', src: '/home/parceiros/five_5.png', width: 95, h: 52 },
  { id: 'dalle', src: '/home/parceiros/dalle.png', width: 95, h: 52 },
  { id: 'tseng', src: '/home/parceiros/ts_eng.png', width: 120, h: 56 },
  { id: 'integra', src: '/home/parceiros/integra.png', width: 120, h: 56 },
  { id: 'granlote', src: '/home/parceiros/granlote.png', width: 120, h: 56 },
  { id: 'argo', src: '/home/parceiros/argo.png', width: 120, h: 56 },
  { id: 'reacty', src: '/home/parceiros/reacty.png', width: 120, h: 56 },
  { id: 'oxe', src: '/home/parceiros/oxe.png', width: 120, h: 56 },
  { id: 'casaviva', src: '/home/parceiros/casa_viva.png', width: 120, h: 56 },
  { id: 'ftm', src: '/home/parceiros/ftm.png', width: 120, h: 56 },
  { id: 'canopus', src: '/home/parceiros/canopus.png', width: 120, h: 56 },
  { id: 'construlike', src: '/home/parceiros/constru_like.png', width: 120, h: 56 },
  { id: 'queromeuape', src: '/home/parceiros/Quero_meu_ape.png', width: 120, h: 56 },
];

export default function PartnersRow() {
  const t = useTranslations('Home.partners');

  return (
    <section
      id="parceiros"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] pt-[clamp(2rem,4vh,3rem)] pb-[clamp(2.5rem,5vh,3.5rem)] transition-colors duration-200"
    >
      <motion.div
        className="mx-auto w-full max-w-[1400px] px-[clamp(1.5rem,5vw,5rem)]"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
      >
        <div className="text-center">
          <motion.h2
            variants={revealItem}
            className="font-semibold tracking-[-0.02em] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15] text-[var(--theme-text)]"
          >
            {t('title')}
            <span className="text-[var(--theme-accent)]">!</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-[12px] text-[clamp(0.95rem,1.1vw,1.1rem)] text-[var(--theme-muted)]"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div
          variants={revealItem}
          className="mt-[clamp(2.5rem,6vh,4rem)] ml-[calc(50%-50vw)] w-screen"
        >
          <div className="hr-marquee">
            <div className="hr-marquee-track items-center gap-[clamp(3rem,6vw,5.5rem)] pr-[clamp(3rem,6vw,5.5rem)]">
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <Image
                  key={`${partner.id}-${index}`}
                  src={partner.src}
                  alt={index < PARTNERS.length ? partner.id : ''}
                  aria-hidden={index >= PARTNERS.length}
                  width={partner.width}
                  height={48}
                  style={{ height: `${partner.h ?? 40}px` }}
                  className="theme-icon-adaptive w-auto shrink-0 opacity-55 transition-opacity duration-300 hover:opacity-100"
                />
              ))}
            </div>
          </div>
          <div className="hr-marquee mt-[clamp(1.75rem,4vh,2.75rem)]">
            <div className="hr-marquee-track hr-marquee-reverse items-center gap-[clamp(3rem,6vw,5.5rem)] pr-[clamp(3rem,6vw,5.5rem)]">
              {[...PARTNERS, ...PARTNERS].reverse().map((partner, index) => (
                <Image
                  key={`${partner.id}-reverse-${index}`}
                  src={partner.src}
                  alt=""
                  aria-hidden
                  width={partner.width}
                  height={48}
                  style={{ height: `${partner.h ?? 40}px` }}
                  className="theme-icon-adaptive w-auto shrink-0 opacity-55 transition-opacity duration-300 hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
