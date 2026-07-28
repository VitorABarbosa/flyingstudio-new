'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { revealItem, staggerContainer, VIEWPORT_ONCE } from '@/features/home/lib/revealAnimation';
import { Link } from '@/i18n/navigation';

/**
 * Estrutura da home antiga, melhorada: título centralizado + pill,
 * e um telão grande com a demo VR ao vivo direto no fundo da página,
 * com o seletor Loteamento/Prédio flutuando na base do telão.
 */

const DSBRAVE_VIEWS = [
  { key: 'loteamento', src: 'https://flyingstudio.com.br/vr/vr-crear-montblanc-r12/?mute=1' },
  { key: 'predio', src: 'https://flyingstudio.com.br/vr/vr-archtech-consolacao-vt/' },
] as const;

type ViewKey = (typeof DSBRAVE_VIEWS)[number]['key'];

export default function DsbraveShowcase() {
  const t = useTranslations('Home.dsbrave');
  const frameRef = useRef<HTMLDivElement>(null);
  const [demoMounted, setDemoMounted] = useState(false);
  const [demoReady, setDemoReady] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [view, setView] = useState<ViewKey>('loteamento');

  const activeView = DSBRAVE_VIEWS.find((entry) => entry.key === view) ?? DSBRAVE_VIEWS[0];

  // "Conheça o D.sbrave" → o "D." vira o logo, seguido de "sbrave".
  const titleBase = t('title').replace('D.sbrave', '').trim();

  // Monta o iframe apenas quando o telão se aproxima do viewport.
  useEffect(() => {
    const node = frameRef.current;
    if (!node || demoMounted) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDemoMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [demoMounted]);

  function handleViewChange(key: ViewKey) {
    if (key === view) {
      return;
    }
    // Troca o app: zera o "pronto" para o telão escurecer durante o
    // carregamento do novo iframe e sai do modo interativo.
    setView(key);
    setDemoReady(false);
    setInteractive(false);
  }

  return (
    <section
      id="dsbrave"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] pt-0 pb-[clamp(4rem,10vh,7.5rem)] transition-colors duration-200"
    >
      <motion.div
        className="mx-auto w-full max-w-[1760px] px-[clamp(1rem,2.5vw,2.5rem)]"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer}
      >
        {/* Cabeçalho centralizado, como na home antiga */}
        <div className="pointer-events-none relative z-30 mt-[clamp(1rem,3vh,2rem)] text-center">
          <motion.h2
            variants={revealItem}
            className="-mt-[18px] font-semibold tracking-[-0.02em] text-[clamp(2.6rem,6vw,5.25rem)] leading-[1.05] text-[var(--theme-text)]"
          >
            {titleBase}{' '}
            <span className="whitespace-nowrap">
              <Image
                src="/home/Logo_Desbrave.png"
                alt="D."
                width={681}
                height={568}
                className="inline-block h-[1.5em] w-auto translate-x-[0.12em] translate-y-[0.22em] align-baseline"
              />
              sbrave
            </span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mx-auto mt-[60px] inline-flex rounded-full border border-[var(--theme-text)] px-[26px] py-[12px] text-[clamp(0.9rem,1vw,1.05rem)] text-[var(--theme-text)] backdrop-blur-[8px]"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Telão */}
        <motion.div variants={revealItem} className="relative -mt-[clamp(1.8rem,2vh,4rem)]">
          {/* Glow atrás do telão */}
          <div
            className="pointer-events-none absolute -inset-[8%]"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(60% 55% at 50% 50%, var(--theme-accent-glow-soft) 0%, transparent 70%)',
            }}
          />

          <motion.div
            ref={frameRef}
            initial={{ opacity: 0, y: 56, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-[calc(50%-50vw)] h-[clamp(420px,85vh,1000px)] w-screen overflow-hidden border-y border-[var(--theme-border-soft)] bg-[#0b0a10] shadow-[0_60px_140px_-50px_rgba(0,0,0,0.75)]"
          >
            {demoMounted ? (
              <iframe
                key={activeView.key}
                src={activeView.src}
                title={`D.sbrave — ${t(`views.${activeView.key}`)}`}
                loading="lazy"
                className={`h-full w-full border-0 transition-[opacity,filter] duration-700 ${
                  demoReady ? 'opacity-100 brightness-100' : 'opacity-0 brightness-50'
                }`}
                style={{ pointerEvents: interactive ? 'auto' : 'none' }}
                onLoad={() => setDemoReady(true)}
              />
            ) : null}

            {/* Carregando: shimmer escuro */}
            {!demoReady ? (
              <div
                className="absolute inset-0 animate-pulse"
                aria-hidden="true"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(126,82,255,0.14) 0%, rgba(11,10,16,0.92) 60%)',
                }}
              />
            ) : null}

            {/* Convite para interagir (some ao ativar) */}
            {demoReady && !interactive ? (
              <button
                type="button"
                onClick={() => setInteractive(true)}
                className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-transparent focus-visible:ring-2 focus-visible:ring-[var(--hr-lime)] focus-visible:ring-inset focus-visible:outline-none"
              >
                <span className="rounded-full border border-[rgba(255,255,255,0.35)] bg-[rgba(11,10,16,0.72)] px-[26px] py-[13px] text-[14px] font-medium text-white backdrop-blur-[8px] transition-colors duration-200 hover:border-[var(--hr-lime)] hover:text-[var(--hr-lime)]">
                  {t('demoHint')}
                </span>
              </button>
            ) : null}

            {/* Status do modo interativo */}
            {interactive ? (
              <span
                className="pointer-events-none absolute top-[16px] left-1/2 z-10 -translate-x-1/2 rounded-full bg-[rgba(11,10,16,0.72)] px-[16px] py-[8px] text-[11px] tracking-[0.08em] whitespace-nowrap text-[var(--hr-lime)] backdrop-blur-[8px]"
                role="status"
              >
                {t('demoActive')}
              </span>
            ) : null}

            {/* Seletor Loteamento / Prédio — flutuando na base do telão */}
            <div
              role="group"
              aria-label="Escolher demonstração"
              className="absolute bottom-[18px] left-1/2 z-20 flex -translate-x-1/2 items-center rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgba(11,10,16,0.72)] p-[4px] backdrop-blur-[10px]"
            >
              {DSBRAVE_VIEWS.map((entry) => {
                const isActive = entry.key === view;
                return (
                  <button
                    key={entry.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleViewChange(entry.key)}
                    className={`cursor-pointer rounded-full px-[22px] py-[9px] text-[13px] font-medium whitespace-nowrap transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[var(--hr-lime)] focus-visible:outline-none ${
                      isActive
                        ? 'bg-[var(--hr-lime)] text-[#141118]'
                        : 'text-[rgba(255,255,255,0.7)] hover:text-white'
                    }`}
                  >
                    {t(`views.${entry.key}`)}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA para a página do produto */}
        <motion.div variants={revealItem} className="mt-[clamp(2rem,5vh,3rem)] text-center">
          <Link
            href="/dsbrave"
            className="inline-flex items-center gap-[10px] rounded-full bg-[var(--theme-btn-default)] px-[32px] py-[16px] text-[15px] font-medium text-[var(--theme-btn-text-default)] shadow-[0_18px_44px_-14px_var(--theme-accent-glow-soft)] transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
          >
            {t('cta')}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 13 13 3M5 3h8v8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
