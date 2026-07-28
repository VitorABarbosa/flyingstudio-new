'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { revealItem, staggerContainer, VIEWPORT_ONCE } from '@/features/home/lib/revealAnimation';

type ExperimenteSectionProps = {
  /** Aplicativo em exibição — definido pelo card escolhido na vitrine acima. */
  appUrl: string;
  appLabel: string;
};

/**
 * Um aplicativo de verdade rodando dentro da página, num contêiner de cantos
 * arredondados — mesma apresentação do Tour Virtual.
 *
 * O iframe é montado só quando a seção se aproxima e desmontado ao sair, e a
 * "tela" acende quando ela entra de fato no campo de visão. Isso evita manter
 * uma aplicação WebGL de terceiros viva enquanto ninguém está olhando.
 */
export default function ExperimenteSection({ appUrl, appLabel }: ExperimenteSectionProps) {
  const t = useTranslations('AplicativosPage.experimente');
  const screenRef = useRef<HTMLDivElement>(null);
  const [monitorOn, setMonitorOn] = useState(false);
  const [iframeMounted, setIframeMounted] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(false);

  /* Novo aplicativo: a tela escurece até ele carregar e a interação é
     retomada do zero. */
  useEffect(() => {
    setIframeReady(false);
    setInteractiveMode(false);
  }, [appUrl]);
  const monitorOnRef = useRef(false);
  const turnOffTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) {
      return;
    }

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (unmountTimeoutRef.current) {
            clearTimeout(unmountTimeoutRef.current);
            unmountTimeoutRef.current = null;
          }
          setIframeMounted(true);
          return;
        }

        if (!unmountTimeoutRef.current) {
          unmountTimeoutRef.current = setTimeout(() => {
            setIframeMounted(false);
            setIframeReady(false);
            setInteractiveMode(false);
            unmountTimeoutRef.current = null;
          }, 760);
        }
      },
      { rootMargin: '10% 0px 10% 0px', threshold: 0 },
    );

    const powerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (turnOffTimeoutRef.current) {
            clearTimeout(turnOffTimeoutRef.current);
            turnOffTimeoutRef.current = null;
          }
          if (!monitorOnRef.current) {
            monitorOnRef.current = true;
            setMonitorOn(true);
          }
          return;
        }

        if (monitorOnRef.current && !turnOffTimeoutRef.current) {
          turnOffTimeoutRef.current = setTimeout(() => {
            monitorOnRef.current = false;
            setMonitorOn(false);
            setInteractiveMode(false);
            turnOffTimeoutRef.current = null;
          }, 220);
        }
      },
      { rootMargin: '-28% 0px -28% 0px', threshold: 0 },
    );

    mountObserver.observe(screen);
    powerObserver.observe(screen);

    return () => {
      if (turnOffTimeoutRef.current) {
        clearTimeout(turnOffTimeoutRef.current);
      }
      if (unmountTimeoutRef.current) {
        clearTimeout(unmountTimeoutRef.current);
      }
      mountObserver.disconnect();
      powerObserver.disconnect();
    };
  }, []);

  return (
    <section id="experimente" className="relative w-full">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
        className="mx-auto flex w-full max-w-[1560px] flex-col items-center px-4 md:px-6"
      >
        <motion.h2
          variants={revealItem}
          className="text-center font-['Outfit'] text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] font-semibold text-[var(--theme-text)]"
        >
          {t('titlePre')} <span className="text-[var(--theme-accent)]">{t('titleAccent')}</span>
        </motion.h2>

        <motion.p
          variants={revealItem}
          className="mt-[clamp(1rem,2.5vh,1.75rem)] rounded-[99px] border-2 border-[var(--theme-chip-border)] bg-[var(--theme-chip-bg)] px-[clamp(24px,4vw,64px)] py-[clamp(10px,1.4vh,16px)] text-center font-['Outfit'] text-[clamp(0.95rem,1.4vw,1.4rem)] leading-[1.4] text-[var(--theme-text)] backdrop-blur-[10px]"
        >
          {t('subtitle')}
        </motion.p>

        {/* ── O app: contêiner simples de cantos arredondados. */}
        <motion.div
          variants={revealItem}
          ref={screenRef}
          className="relative mt-[clamp(1.5rem,4vh,2.5rem)] w-full overflow-hidden rounded-[24px] bg-black"
        >
          <div
            className={`transition-[filter,opacity] duration-700 ${
              monitorOn && iframeReady ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: monitorOn ? 'brightness(1) contrast(1)' : 'brightness(0.3) contrast(0.8)',
              pointerEvents: interactiveMode ? 'auto' : 'none',
            }}
          >
            {iframeMounted ? (
              <iframe
                src={appUrl}
                title={appLabel}
                className="h-[420px] w-full border-0 md:h-[650px] lg:h-[820px]"
                loading="lazy"
                /* Sem `allowFullScreen` e sem `fullscreen` na policy: a
                   aplicação embutida fica impedida de tomar a tela inteira
                   ao ser tocada — a API de fullscreen é negada ao iframe. */
                allow="autoplay; gyroscope; accelerometer"
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setIframeReady(true)}
              />
            ) : (
              <div className="h-[420px] w-full md:h-[650px] lg:h-[820px]" />
            )}
          </div>

          {monitorOn && iframeReady && !interactiveMode ? (
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

          {/* Vinheta de "tela desligada": acende e apaga com a rolagem. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
              monitorOn ? 'monitor-power-on opacity-0' : 'monitor-power-off opacity-100'
            }`}
            style={{ background: 'var(--theme-screen-overlay)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
