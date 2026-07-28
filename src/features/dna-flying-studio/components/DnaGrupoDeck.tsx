'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, SPRING_SOFT } from '../lib/animations';
import type { DnaCompany } from '../types/dna.types';

/** Inclinação máxima do painel aberto, em graus. */
const TILT = 4.5;
const FOLLOW = 0.14;

/** Grão fino por cima de tudo — tira o "chapado" do gradiente. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Recorta o preenchimento deixando só a moldura de 1px — luz de borda. */
const BORDER_ONLY = {
  padding: '1px',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
} as const;

type Copy = {
  name: string;
  role: string;
  description: string;
  services: string[];
};

type DnaGrupoDeckProps = {
  companies: DnaCompany[];
  copy: Record<string, Copy>;
  visitLabel: string;
  openLabel: string;
  closeLabel: string;
};

/** A cor de identidade é opcional no dado; sem ela, cai na accent do tema. */
function brandColor(company: DnaCompany) {
  return company.color ?? 'var(--theme-accent)';
}

/** Lavagem de cor da empresa, compartilhada pelo card e pelo painel. */
function wash(color: string, angle = '150deg') {
  return `linear-gradient(${angle}, rgba(0,0,0,0.20) 0%, color-mix(in srgb, ${color} 58%, transparent) 55%, ${color} 100%)`;
}

/**
 * Filme em modo background cobrindo o container (min-w/min-h + aspecto
 * reproduzem o object-cover). Nasce invisível e só aparece em fade quando o
 * player carregou — a foto por baixo segura o visual, inclusive durante o
 * morph de abrir/fechar (o iframe recriado ali recomeçaria com flash preto).
 */
function VimeoBackdrop({ vimeoId }: { vimeoId: string }) {
  const [ready, setReady] = useState(false);

  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&autopause=0`}
        title=""
        tabIndex={-1}
        allow="autoplay"
        onLoad={() => setReady(true)}
        className={`absolute top-1/2 left-1/2 aspect-video min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity delay-200 duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </span>
  );
}

/**
 * Vitrine das empresas do grupo.
 *
 * Fechados, os quatro cards são iguais e inteiros — nenhum vira tira estreita
 * esperando o mouse. Ao abrir um, ele NÃO some para dar lugar a outro
 * elemento: o próprio card se transforma no painel, crescendo e viajando até
 * ocupar a faixa toda. Isso é `layoutId` do framer — o mesmo id no card e no
 * painel faz a biblioteca interpolar posição, tamanho e cantos entre os dois.
 *
 * Abre por clique ou Enter (não por hover: uma tomada de tela inteira no
 * passar do mouse seria acidental). Fecha no botão, no Esc ou clicando fora.
 */
export default function DnaGrupoDeck({
  companies,
  copy,
  visitLabel,
  openLabel,
  closeLabel,
}: DnaGrupoDeckProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const open = companies.find((company) => company.key === openKey) ?? null;

  // ── Paralaxe do painel aberto (mesma mecânica que você aprovou nos cards).
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const target = useRef({ x: 0, y: 0, glow: 0 });
  const current = useRef({ x: 0, y: 0, glow: 0 });

  const tick = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) {
      frameRef.current = 0;
      return;
    }
    const cur = current.current;
    const tar = target.current;
    cur.x += (tar.x - cur.x) * FOLLOW;
    cur.y += (tar.y - cur.y) * FOLLOW;
    cur.glow += (tar.glow - cur.glow) * FOLLOW;

    panel.style.setProperty('--rx', `${(-cur.y * TILT).toFixed(3)}deg`);
    panel.style.setProperty('--ry', `${(cur.x * TILT).toFixed(3)}deg`);
    panel.style.setProperty('--mx', `${((cur.x + 1) * 50).toFixed(2)}%`);
    panel.style.setProperty('--my', `${((cur.y + 1) * 50).toFixed(2)}%`);
    panel.style.setProperty('--glow', cur.glow.toFixed(3));

    const settled =
      Math.abs(tar.x - cur.x) + Math.abs(tar.y - cur.y) + Math.abs(tar.glow - cur.glow) < 0.001;
    frameRef.current = settled ? 0 : requestAnimationFrame(tick);
  }, []);

  const wake = useCallback(() => {
    if (!frameRef.current) {
      frameRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const handlePanelMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    target.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    target.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    target.current.glow = 1;
    wake();
  };

  const handlePanelLeave = () => {
    target.current = { x: 0, y: 0, glow: 0 };
    wake();
  };

  useEffect(() => {
    if (!openKey) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenKey(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openKey]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return (
    /*
      A faixa cresce quando um painel abre. `layout` no wrapper faz a altura ser
      interpolada junto com o card que se transforma — sem isso, o conteúdo
      abaixo saltaria de posição no meio da animação.
    */
    <motion.div
      layout
      transition={SPRING_SOFT}
      className={`relative mx-auto mt-10 max-w-[1400px] md:mt-14 ${
        open ? 'h-[640px] lg:h-[520px]' : 'h-[430px] lg:h-[340px]'
      }`}
    >
      <div className="grid h-full grid-cols-2 gap-4 lg:grid-cols-4">
        {companies.map((company) => {
          const item = copy[company.key];
          return (
            <div key={company.key} className="relative h-full">
              {openKey !== company.key && (
                <motion.button
                  type="button"
                  layoutId={`company-${company.key}`}
                  transition={SPRING_SOFT}
                  onClick={() => setOpenKey(company.key)}
                  aria-label={`${openLabel} — ${item.name}`}
                  className="group absolute inset-0 cursor-pointer overflow-hidden rounded-[24px] text-left focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
                  style={{
                    boxShadow: '0 26px 60px -32px rgba(0,0,0,0.55)',
                  }}
                >
                  {company.photoSrc && (
                    <Image
                      src={company.photoSrc}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                    />
                  )}

                  {company.videoVimeoId && (
                    <VimeoBackdrop vimeoId={company.videoVimeoId} />
                  )}

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-[0.35]"
                    style={{ background: wash(brandColor(company)), opacity: 0.45 }}
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
                    style={{ backgroundImage: GRAIN, backgroundSize: '140px 140px' }}
                  />

                  {/* Fechado: logo e função. Já é a identidade inteira — o card
                      não depende do hover para dizer o que é. */}
                  <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-5">
                    {company.logoSrc && (
                      <Image
                        src={company.logoSrc}
                        alt={item.name}
                        width={company.logoWidth}
                        height={company.logoHeight}
                        className="w-auto object-contain brightness-0 invert"
                        style={{ height: Math.min(company.logoDisplayHeight ?? 26, 30) }}
                      />
                    )}
                    <span className="font-['Outfit'] text-[11px] font-bold tracking-[0.14em] text-white/80 uppercase">
                      {item.role}
                    </span>
                  </span>

                  {/* Afordância: o card cresce a partir daqui. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 flex size-[36px] items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-[3px] transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-[var(--theme-panel)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1.5v11M1.5 7h11"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[6px] transition-all duration-300 group-hover:h-[10px]"
                    style={{ backgroundColor: brandColor(company) }}
                  />
                </motion.button>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Clique fora fecha. Fica sob o painel e sobre os cards. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenKey(null)}
              className="absolute -inset-6 z-10 cursor-pointer bg-[var(--theme-bg)]/70 backdrop-blur-[2px]"
            />

            <motion.div
              ref={panelRef}
              layoutId={`company-${open.key}`}
              transition={SPRING_SOFT}
              onPointerMove={handlePanelMove}
              onPointerLeave={handlePanelLeave}
              className="absolute inset-0 z-20 overflow-hidden rounded-[28px]"
              style={{ boxShadow: '0 40px 90px -40px rgba(0,0,0,0.6)' }}
            >
              <div
                className="pointer-events-none absolute inset-0 [transform-style:preserve-3d] transition-transform duration-300 ease-out"
                style={{
                  transform:
                    'perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
                }}
              >
                {/* Foto atrás do plano: é a distância em Z que gera o paralaxe. */}
                <div
                  className="absolute inset-0"
                  style={{ transform: 'translateZ(-70px) scale(1.12)' }}
                >
                  {/* Mesmo `sizes` do card fechado: o navegador reaproveita a
                      imagem já em cache e o painel pinta na hora — pedir outra
                      largura aqui deixava o fundo vazio durante o morph. */}
                  {open.photoSrc && (
                    <Image
                      src={open.photoSrc}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      className="object-cover"
                    />
                  )}

                  {open.videoVimeoId && <VimeoBackdrop vimeoId={open.videoVimeoId} />}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: wash(brandColor(open), '110deg'), opacity: 0.9 }}
                  />
                </div>

                {/* Dossiê num painel de vidro, à frente do plano. */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.16 }}
                  className="absolute inset-x-4 bottom-4 flex flex-col gap-4 rounded-[22px] border border-white/25 bg-black/30 p-6 backdrop-blur-[16px] md:inset-x-6 md:bottom-6 md:max-w-[620px] md:p-8"
                  style={{ transform: 'translateZ(55px)' }}
                >
                  {open.logoSrc && (
                    <Image
                      src={open.logoSrc}
                      alt={copy[open.key].name}
                      width={open.logoWidth}
                      height={open.logoHeight}
                      className="w-auto object-contain brightness-0 invert"
                      style={{ height: Math.min(open.logoDisplayHeight ?? 34, 40) }}
                    />
                  )}

                  <span
                    className="font-['Outfit'] text-[12px] font-bold tracking-[0.14em] uppercase"
                    style={{ color: `color-mix(in srgb, ${brandColor(open)} 62%, white)` }}
                  >
                    {copy[open.key].role}
                  </span>

                  <p className="font-['Outfit'] text-[14px] leading-[1.65] text-white/85 md:text-[16px]">
                    {copy[open.key].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {copy[open.key].services.map((service) => (
                      <span
                        key={service}
                        className="rounded-[99px] border border-white/30 bg-white/5 px-3 py-1 font-['Outfit'] text-[11px] font-medium text-white/90"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Luz de borda: acende do lado de onde vem o cursor. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
                style={{
                  ...BORDER_ONLY,
                  background:
                    'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.75), rgba(255,255,255,0.10) 55%, transparent 75%)',
                  opacity: 'calc(0.35 + var(--glow, 0) * 0.65)',
                }}
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay"
                style={{
                  background:
                    'radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.28), transparent 62%)',
                  opacity: 'var(--glow, 0)',
                }}
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 opacity-[0.13] mix-blend-overlay"
                style={{ backgroundImage: GRAIN, backgroundSize: '140px 140px' }}
              />

              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setOpenKey(null)}
                aria-label={closeLabel}
                className="absolute top-5 right-5 z-30 flex size-[42px] cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-[3px] transition-all duration-200 hover:scale-105 hover:bg-white hover:text-[var(--theme-panel)] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 2l10 10M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>

              {open.siteUrl && (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  href={open.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-5 right-[74px] z-30 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 font-['Outfit'] text-[13px] font-semibold text-white backdrop-blur-[3px] transition-all duration-200 hover:bg-white hover:text-[var(--theme-panel)] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  {visitLabel}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 12 12 4M5.5 4H12v6.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              )}

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 z-30 h-[10px]"
                style={{ backgroundColor: brandColor(open) }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
