'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { CompanyId } from '../types/cases.types';

const SIZE = 760;
const C = SIZE / 2;
const DRAW_DURATION = 1;
const DRAW_EASE = [0.65, 0, 0.35, 1] as const;
const START_DELAY = 0.25;
// Quanto tempo o preenchimento + logo ficam visíveis antes de recolher
const FILL_HOLD = 0.7;
// Respiro entre o recolhimento de uma empresa e o traçado da próxima
const FILL_GAP = 0.15;
// Ciclo completo de cada empresa: linha → preenche + logo → vira só linha
const CYCLE = DRAW_DURATION + FILL_HOLD + FILL_GAP;
// Folga entre o preenchimento e a linha do anel, para a linha continuar visível
const FILL_INSET = 6;
// Raio do mini planeta que orbita cada linha
const PLANET_R = 30;
// Largura da logo dentro do planeta
const PLANET_LOGO_WIDTH = PLANET_R * 1.55;
// Duração da órbita por anel (internas mais rápidas, como um sistema solar)
const ORBIT_DURATIONS = [28, 37, 47, 58];
// Ângulo inicial de cada planeta, para as órbitas nunca ficarem sincronizadas
const ORBIT_OFFSETS = [0, 130, 235, 320];

interface EcosystemRing {
  id: CompanyId;
  r: number;
  color: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  /** Símbolo exibido no mini planeta (dimensões em unidades do viewBox); sem ele, usa a logo completa */
  symbol?: { src: string; width: number; height: number };
}

// Ordem de desenho: de dentro para fora, cada anel com a cor da sua empresa
const rings: EcosystemRing[] = [
  { id: 'ogdi', r: 134, color: '#0d506a', logo: '/cases/logo-ogdi.png', logoWidth: 160, logoHeight: 61 },
  {
    id: 'nid',
    r: 200,
    color: '#e68643',
    logo: '/cases/logo-nid.png',
    logoWidth: 248,
    logoHeight: 71,
    symbol: { src: '/cases/simbolo-nid.png', width: 48, height: 35.4 },
  },
  {
    id: 'flying',
    r: 287,
    color: '#7e52ff',
    logo: '/cases/logo-flying.png',
    logoWidth: 354,
    logoHeight: 70,
    symbol: { src: '/cases/simbolo-flying.png', width: 40, height: 43.7 },
  },
  {
    id: 'rinno',
    r: 377,
    color: '#ff00a9',
    logo: '/cases/logo-rinno.png',
    logoWidth: 427,
    logoHeight: 84,
    symbol: { src: '/cases/simbolo-rinno.png', width: 44, height: 42 },
  },
];

const ringById = new Map<CompanyId, EcosystemRing>(rings.map((ring) => [ring.id, ring]));
const ogdi = ringById.get('ogdi') as EcosystemRing;

const ringDelay = (index: number) => START_DELAY + index * CYCLE;

// Largura da logo quando preenche o espaço delimitado pela linha do anel
const fillLogoWidth = (ring: EcosystemRing) => Math.min(ring.logoWidth, (ring.r - FILL_INSET) * 1.24);

interface OrbitingPlanetProps {
  ring: EcosystemRing;
  index: number;
  hidden: boolean;
  skipMotion: boolean;
}

// Mini planeta orbitando a linha via atributo transform do SVG
// (rotate com centro explícito, imune a diferenças de transform-origin CSS)
function OrbitingPlanet({ ring, index, hidden, skipMotion }: OrbitingPlanetProps) {
  const orbitRef = useRef<SVGGElement>(null);
  const counterRef = useRef<SVGGElement>(null);
  const planetY = C - ring.r;
  const offset = ORBIT_OFFSETS[index];
  const logoSrc = ring.symbol?.src ?? ring.logo;
  const logoWidth = ring.symbol?.width ?? PLANET_LOGO_WIDTH;
  const logoHeight = ring.symbol?.height ?? logoWidth * (ring.logoHeight / ring.logoWidth);

  useAnimationFrame((time) => {
    if (skipMotion) return;
    const angle = offset + (time / 1000 / ORBIT_DURATIONS[index]) * 360;
    orbitRef.current?.setAttribute('transform', `rotate(${angle} ${C} ${C})`);
    // Contra-rotação para a logo permanecer na vertical
    counterRef.current?.setAttribute('transform', `rotate(${-angle} ${C} ${planetY})`);
  });

  return (
    <g ref={orbitRef} transform={`rotate(${offset} ${C} ${C})`}>
      <g ref={counterRef} transform={`rotate(${-offset} ${C} ${planetY})`}>
        <motion.circle
          cx={C}
          cy={planetY}
          fill={ring.color}
          opacity={0.35}
          filter="url(#ecosystem-ring-glow)"
          initial={skipMotion ? false : { r: 0 }}
          animate={{ r: hidden ? 0 : PLANET_R + 6 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />
        <motion.circle
          cx={C}
          cy={planetY}
          fill={ring.color}
          initial={skipMotion ? false : { r: 0 }}
          animate={{ r: hidden ? 0 : PLANET_R }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        />
        <motion.image
          href={logoSrc}
          x={C - logoWidth / 2}
          y={planetY - logoHeight / 2}
          width={logoWidth}
          height={logoHeight}
          initial={skipMotion ? false : { opacity: 0 }}
          animate={{ opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </g>
    </g>
  );
}

interface CasesEcosystemRingsProps {
  /** Empresa em destaque — controlada pelo pai para sincronizar com o índice ao lado */
  hovered: CompanyId | null;
  onHoveredChange: (id: CompanyId | null) => void;
}

export default function CasesEcosystemRings({ hovered, onHoveredChange }: CasesEcosystemRingsProps) {
  const t = useTranslations('CasesPage.ecosystem');
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-25% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const [buildActive, setBuildActive] = useState<CompanyId | null>(null);
  const [built, setBuilt] = useState(false);
  const [planets, setPlanets] = useState<ReadonlySet<CompanyId>>(new Set());

  const skipMotion = Boolean(prefersReducedMotion);

  useEffect(() => {
    if (!inView) return;
    if (skipMotion) {
      setBuilt(true);
      setPlanets(new Set(rings.map((ring) => ring.id)));
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    rings.forEach((ring, index) => {
      const fillOn = ringDelay(index) + DRAW_DURATION - 0.1;
      const fillOff = fillOn + FILL_HOLD;
      timers.push(setTimeout(() => setBuildActive(ring.id), fillOn * 1000));
      timers.push(setTimeout(() => setBuildActive((current) => (current === ring.id ? null : current)), fillOff * 1000));
      // O preenchimento recolhe e vira um mini planeta orbitando a linha
      timers.push(setTimeout(() => setPlanets((current) => new Set(current).add(ring.id)), (fillOff + 0.2) * 1000));
    });
    const end = ringDelay(rings.length - 1) + DRAW_DURATION + FILL_HOLD + 0.45;
    timers.push(setTimeout(() => setBuilt(true), end * 1000));
    return () => timers.forEach(clearTimeout);
  }, [inView, skipMotion]);

  // Preenchimento ativo: durante a construção segue a linha do tempo; depois, o hover
  const fillRing = built ? (hovered ? ringById.get(hovered) : null) : buildActive ? ringById.get(buildActive) : null;
  // Logo central: só acompanha o preenchimento; em repouso, os planetas assumem
  const activeRing = fillRing ?? null;
  const glowColor = fillRing ? fillRing.color : ogdi.color;

  return (
    <div ref={sectionRef} className="w-full">
      <div className="relative mx-auto aspect-square w-full">
        {/* Brilho ambiente atrás do centro */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: `radial-gradient(circle, ${glowColor}66 0%, transparent 68%)` }}
          initial={skipMotion ? false : { opacity: 0 }}
          animate={built ? { opacity: [0.55, 1, 0.55], scale: fillRing ? (fillRing.r - FILL_INSET) / ogdi.r : 1 } : { opacity: 0 }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 170, damping: 22 },
          }}
        />

        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full overflow-visible" role="presentation">
          <defs>
            <filter id="ecosystem-comet-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <filter id="ecosystem-ring-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Início do traçado no topo */}
          <g transform={`rotate(-90 ${C} ${C})`}>
            {rings.map((ring, index) => {
              const delay = ringDelay(index);
              const isHovered = built && hovered === ring.id;
              return (
                <g key={ring.id}>
                  {/* Halo do anel no hover */}
                  <motion.circle
                    cx={C}
                    cy={C}
                    r={ring.r}
                    fill="none"
                    stroke={ring.color}
                    strokeWidth={9}
                    filter="url(#ecosystem-ring-glow)"
                    initial={false}
                    animate={{ opacity: isHovered ? 0.55 : 0 }}
                    transition={{ duration: 0.35 }}
                  />
                  {/* A linha que se desenha */}
                  <motion.circle
                    cx={C}
                    cy={C}
                    r={ring.r}
                    fill="none"
                    stroke={ring.color}
                    strokeWidth={isHovered ? 4.5 : 3}
                    strokeLinecap="round"
                    initial={skipMotion ? false : { pathLength: 0 }}
                    animate={
                      inView
                        ? built
                          ? { pathLength: 1, opacity: isHovered ? 1 : [1, 0.78, 1] }
                          : { pathLength: 1 }
                        : undefined
                    }
                    transition={
                      built
                        ? { opacity: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.7 } }
                        : { pathLength: { duration: DRAW_DURATION, delay, ease: DRAW_EASE } }
                    }
                  />
                  {/* Pulso ao completar o traçado */}
                  {!skipMotion && (
                    <motion.circle
                      cx={C}
                      cy={C}
                      r={ring.r}
                      fill="none"
                      stroke={ring.color}
                      strokeWidth={3}
                      style={{ transformOrigin: `${C}px ${C}px` }}
                      initial={{ opacity: 0, scale: 1 }}
                      animate={inView ? { opacity: [0, 0.5, 0], scale: [1, 1.055, 1.07] } : undefined}
                      transition={{ duration: 1, delay: delay + DRAW_DURATION, times: [0, 0.25, 1] }}
                    />
                  )}
                  {/* Cometa que lidera o desenho da linha */}
                  {!skipMotion && (
                    <motion.g
                      style={{ transformOrigin: `${C}px ${C}px` }}
                      initial={{ rotate: 0, opacity: 0 }}
                      animate={inView ? { rotate: 360, opacity: [0, 1, 1, 0] } : undefined}
                      transition={{
                        rotate: { duration: DRAW_DURATION, delay, ease: DRAW_EASE },
                        opacity: { duration: DRAW_DURATION, delay, times: [0, 0.06, 0.88, 1] },
                      }}
                    >
                      <circle cx={C + ring.r} cy={C} r={13} fill={ring.color} opacity={0.6} filter="url(#ecosystem-comet-glow)" />
                      <circle cx={C + ring.r} cy={C} r={4.5} fill="#ffffff" />
                    </motion.g>
                  )}
                </g>
              );
            })}
          </g>

          {/* Mini planetas: cada empresa orbita a sua linha depois do seu ciclo */}
          {rings.map((ring, index) =>
            planets.has(ring.id) ? (
              <OrbitingPlanet
                key={`planet-${ring.id}`}
                ring={ring}
                index={index}
                hidden={built && hovered === ring.id}
                skipMotion={skipMotion}
              />
            ) : null,
          )}

          {/* Preenchimento: cresce do centro até a linha do anel, na cor da empresa */}
          <AnimatePresence>
            {fillRing && (
              <motion.circle
                key={fillRing.id}
                cx={C}
                cy={C}
                fill={fillRing.color}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: fillRing.r - FILL_INSET, opacity: 1 }}
                exit={{ r: 0, opacity: 0 }}
                transition={{
                  r: { type: 'spring', stiffness: 170, damping: 22 },
                  opacity: { duration: 0.25 },
                }}
              />
            )}
          </AnimatePresence>

          {/* Áreas de hover (invisíveis) sobre cada anel */}
          {built &&
            rings.map((ring) => (
              <circle
                key={`hit-${ring.id}`}
                cx={C}
                cy={C}
                r={ring.r}
                fill="none"
                stroke="transparent"
                strokeWidth={34}
                style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
                onMouseEnter={() => onHoveredChange(ring.id)}
                onMouseLeave={() => onHoveredChange(null)}
                onClick={() => onHoveredChange(hovered === ring.id ? null : ring.id)}
              />
            ))}
        </svg>

        {/* Logo central em crossfade, acompanhando o preenchimento */}
        <div className="pointer-events-none absolute inset-0">
          <AnimatePresence initial={false}>
            {activeRing && (
              <motion.div
                key={`${activeRing.id}-${fillRing ? 'fill' : 'rest'}`}
                className="absolute inset-0 flex items-center justify-center"
                initial={skipMotion ? false : { opacity: 0, scale: 0.82, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={activeRing.logo}
                  alt={t(`${activeRing.id}.name`)}
                  width={activeRing.logoWidth}
                  height={activeRing.logoHeight}
                  style={{ width: `${(fillLogoWidth(activeRing) / SIZE) * 100}%` }}
                  className="h-auto"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
