'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Campo de partículas guiado por ruído de Perlin.
 *
 * Adaptado do componente original em três pontos que importam aqui:
 *
 * 1. COR — o original pinta preto no claro e branco no escuro. Aqui a cor sai
 *    de `--theme-accent-rgb`, então acompanha o tema por construção: roxo no
 *    claro, lima no escuro, e troca sozinha quando o tema muda.
 *
 * 2. TRAÇO — o original desenha pontos e deixa rastro pintando um retângulo
 *    semitransparente por cima a cada quadro (o que exige fundo opaco e
 *    cobriria a página). Aqui não há pontos nem rastro: cada linha de fluxo é
 *    percorrida inteira e desenhada como um traço só, e o canvas é limpo a
 *    cada quadro. Nada acumula.
 *
 * 3. CICLO DE VIDA — o original nunca cancela o `requestAnimationFrame` e
 *    recria a tabela de ruído a cada render (o que reinicia o efeito sem
 *    parar). Aqui o laço é cancelado na limpeza, pausa com a aba em segundo
 *    plano e não roda sob `prefers-reduced-motion`.
 */

const PERMUTATION = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69,
  142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219,
  203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
  74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230,
  220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76,
  132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173,
  186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
  59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163,
  70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162,
  241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204,
  176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141,
  128, 195, 78, 66, 215, 61, 156, 180,
];

/** Tabela duplicada uma única vez, no escopo do módulo. */
const P = new Array<number>(512);
for (let i = 0; i < 256; i++) {
  P[i] = PERMUTATION[i];
  P[256 + i] = PERMUTATION[i];
}

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t: number, a: number, b: number) {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number, z: number) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function noise3(x: number, y: number, z: number) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;

  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);

  const u = fade(x);
  const v = fade(y);
  const w = fade(z);

  const A = P[X] + Y;
  const AA = P[A] + Z;
  const AB = P[A + 1] + Z;
  const B = P[X + 1] + Y;
  const BA = P[B] + Z;
  const BB = P[B + 1] + Z;

  return lerp(
    w,
    lerp(
      v,
      lerp(u, grad(P[AA], x, y, z), grad(P[BA], x - 1, y, z)),
      lerp(u, grad(P[AB], x, y - 1, z), grad(P[BB], x - 1, y - 1, z)),
    ),
    lerp(
      v,
      lerp(u, grad(P[AA + 1], x, y, z - 1), grad(P[BA + 1], x - 1, y, z - 1)),
      lerp(u, grad(P[AB + 1], x, y - 1, z - 1), grad(P[BB + 1], x - 1, y - 1, z - 1)),
    ),
  );
}

const FALLBACK_ACCENT_RGB = '126, 82, 255';

type FlowLine = {
  x: number;
  y: number;
  /** Peso próprio: dá profundidade sem custo, variando a presença da linha. */
  alpha: number;
};

type FluidParticlesBackgroundProps = {
  /** Uma linha a cada N px² de viewport. Menor = mais denso. */
  density?: number;
  /** Teto de linhas, para telas grandes não virarem uma malha fechada. */
  maxLines?: number;
  /** Quantos passos cada linha percorre. Mais passos = linha mais longa. */
  steps?: number;
  /** Comprimento de cada passo, em px. */
  stepLength?: number;
  /** Zoom do campo de ruído. Menor = correntes mais longas e suaves. */
  noiseIntensity?: number;
  /** Opacidade do traço (0-1). */
  opacity?: number;
  lineWidth?: number;
  className?: string;
};

/** O campo evolui devagar; 30fps sobra e corta o custo pela metade. */
const FPS = 30;

export function FluidParticlesBackground({
  density = 26000,
  maxLines = 130,
  steps = 68,
  stepLength = 15,
  noiseIntensity = 0.0013,
  opacity = 0.08,
  lineWidth = 0.9,
  className,
}: FluidParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    /* Celular: um canvas de viewport inteira redesenhando a 30fps em 9
       páginas não cabe no orçamento de memória do Safari/iPhone. O efeito
       tem opacidade 0.08 e mal aparece na tela pequena — o fundo fica liso. */
    if (window.matchMedia('(max-width: 1023px)').matches) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let lines: FlowLine[] = [];
    let accentRgb = FALLBACK_ACCENT_RGB;
    let frameId = 0;
    let lastDraw = 0;

    const readAccent = () => {
      accentRgb =
        getComputedStyle(canvas).getPropertyValue('--theme-accent-rgb').trim() ||
        FALLBACK_ACCENT_RGB;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      /* Sementes numa grade sorteada: espalha melhor que puro aleatório, que
         deixa buracos e aglomerados. A margem negativa garante linhas
         entrando pelas bordas em vez de todas nascerem dentro da tela. */
      const wanted = Math.min(maxLines, Math.max(24, Math.round((width * height) / density)));
      const columns = Math.ceil(Math.sqrt((wanted * width) / height));
      const rows = Math.ceil(wanted / columns);
      const cellW = (width + 400) / columns;
      const cellH = (height + 400) / rows;

      lines = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns && lines.length < wanted; column++) {
          lines.push({
            x: -200 + (column + Math.random()) * cellW,
            y: -200 + (row + Math.random()) * cellH,
            alpha: 0.45 + Math.random() * 0.55,
          });
        }
      }
    };

    const draw = (now: number) => {
      // Limpeza total: sem rastro, sem acúmulo entre quadros.
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = lineWidth;

      const time = now * 0.00004;

      for (const line of lines) {
        let x = line.x;
        let y = line.y;

        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let step = 0; step < steps; step++) {
          const angle = noise3(x * noiseIntensity, y * noiseIntensity, time) * Math.PI * 4;
          x += Math.cos(angle) * stepLength;
          y += Math.sin(angle) * stepLength;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(${accentRgb}, ${(opacity * line.alpha).toFixed(3)})`;
        ctx.stroke();
      }
    };

    const frameInterval = 1000 / FPS;

    const frame = (now: number) => {
      frameId = requestAnimationFrame(frame);
      if (now - lastDraw < frameInterval) {
        return;
      }
      lastDraw = now;
      draw(now);
    };

    const start = () => {
      if (frameId || document.hidden) {
        return;
      }
      lastDraw = 0;
      frameId = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    readAccent();
    resize();
    start();

    const themeObserver = new MutationObserver(readAccent);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 160);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      themeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [density, maxLines, steps, stepLength, noiseIntensity, opacity, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-0 block h-full w-full', className)}
    />
  );
}

export default FluidParticlesBackground;
