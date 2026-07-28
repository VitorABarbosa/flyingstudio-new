'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { revealItem, staggerContainer, VIEWPORT_ONCE } from '@/features/home/lib/revealAnimation';

type Partner = {
  id: string;
  src: string;
  width: number;
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
];

export default function PartnersRow() {
  const t = useTranslations('Home.partners');

  return (
    <section
      id="parceiros"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] py-[clamp(4rem,9vh,6.5rem)] transition-colors duration-200"
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
                  className="theme-icon-adaptive h-[40px] w-auto shrink-0 opacity-55 transition-opacity duration-300 hover:opacity-100"
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
                  className="theme-icon-adaptive h-[40px] w-auto shrink-0 opacity-55 transition-opacity duration-300 hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
