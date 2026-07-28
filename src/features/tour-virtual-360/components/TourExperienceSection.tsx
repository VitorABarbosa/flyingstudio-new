'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

const sectionAnimation = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

type TourExperienceSectionProps = {
  /** Tour em exibição — definido pelo card escolhido na vitrine acima. */
  tourUrl: string;
  tourLabel: string;
};

export default function TourExperienceSection({
  tourUrl,
  tourLabel,
}: TourExperienceSectionProps) {
  const t = useTranslations('Tour360Page.experience');
  const screenRef = useRef<HTMLDivElement>(null);

  /* O tour só passa a receber o ponteiro depois de um clique. Sem isso a
     rolagem morre dentro do iframe: o tour captura a roda do mouse e a página
     para de descer quando a seção entra na tela. */
  const [interactiveMode, setInteractiveMode] = useState(false);

  /* Outro tour, começa desarmado de novo. */
  useEffect(() => {
    setInteractiveMode(false);
  }, [tourUrl]);

  /* Ao sair de vista, devolve o controle da rolagem — senão, quem já clicou
     uma vez volta a ficar preso ao passar pela seção de novo. */
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setInteractiveMode(false);
        }
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: 0 },
    );

    observer.observe(screen);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      id="experimente"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionAnimation}
      className="w-full"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-[40px] font-semibold text-[var(--theme-text)] md:text-[64px]">
            {t('titlePre')}{' '}
            <span className="text-[var(--theme-accent)]">{t('titleHighlight')}</span>
          </h2>

          {/* O empreendimento em cartaz: sem isso, trocar de card muda a cena
              sem dizer de quem ela é. */}
          <p className="mt-3 font-['Outfit'] text-[clamp(0.95rem,1.2vw,1.15rem)] text-[var(--theme-muted)]">
            {tourLabel}
          </p>
        </div>

        <div
          ref={screenRef}
          className="relative mt-8 overflow-hidden rounded-[24px] bg-black"
        >
          <div style={{ pointerEvents: interactiveMode ? 'auto' : 'none' }}>
            <iframe
              /* `key` amarrado à URL: sem ele o React reaproveita o mesmo iframe
                 e o histórico do tour anterior continua vivo dentro dele. */
              key={tourUrl}
              src={tourUrl}
              title={tourLabel}
              className="h-[420px] w-full border-0 md:h-[650px] lg:h-[850px]"
              allow="fullscreen; gyroscope; accelerometer"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {!interactiveMode ? (
            <button
              type="button"
              onClick={() => setInteractiveMode(true)}
              className="absolute inset-0 z-30 flex cursor-pointer items-center justify-center bg-transparent"
            >
              <span className="rounded-[99px] bg-[var(--theme-tooltip-bg)] px-[16px] py-[9px] font-['Outfit'] text-[13px] font-medium tracking-[0.2px] text-white backdrop-blur-sm">
                {t('interactHint')}
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}
