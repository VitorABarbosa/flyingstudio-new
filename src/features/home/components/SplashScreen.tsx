'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BrandLogo from '@/components/layout/BrandLogo';

/**
 * Tela de abertura da home.
 *
 * Sequência:
 *  1. Fundo na cor do tema (var(--theme-bg) — branco no claro, preto no escuro).
 *  2. A logo da Flying sobe e aparece.
 *  3. A logo some e a "bolinha" da marca (círculo na cor accent do tema) surge
 *     no ponto da logo e cresce até cobrir toda a tela.
 *  4. O overlay faz fade-out, revelando o site (que entra com o reveal das seções).
 *
 * Aparece uma vez por sessão (sessionStorage). Respeita prefers-reduced-motion.
 */

const SESSION_KEY = 'fs-splash-seen';

// Proporção intrínseca da logo (4096×496).
const LOGO_RATIO = 496 / 4096;
const LOGO_DISPLAY_WIDTH = 360;

// Posição aproximada do ponto verde da logo, em % da caixa da logo.
// É de onde a bolinha cresce. Fácil de afinar visualmente.
const POINT_X_PCT = 10.2; // ← horizontal: maior = direita, menor = esquerda
const POINT_Y_PCT = 12; // ← vertical: maior = baixo, menor = cima
const CIRCLE_BASE_PX = 11; // ← diâmetro da bolinha (px)

// ⚠️ MODO AJUSTE: congela o splash com a logo + bolinha parados para alinhar a
// posição da bolinha. Ignora "uma vez por sessão" (recarregue à vontade).
// Voltar para false quando terminar de ajustar.
const ADJUST_MODE = false;

// Tempos da sequência (ms).
const LOGO_RISE_MS = 800; // logo termina de subir → entao a bolinha aparece
const ENTER_HOLD_MS = 1350; // bolinha ja cheia → entao comeca a expandir
const EXPAND_MS = 900; // duração do crescimento da bolinha
const REMOVE_MS = ENTER_HOLD_MS + EXPAND_MS + 300; // quando o overlay começa a sair

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  // Só liga na primeira visita. Enquanto false, a logo/bolinha ficam no estado
  // inicial (invisíveis) e NÃO animam — evita o flash da logo no refresh, quando
  // o overlay existe no HTML mas deve sair sem rodar a abertura.
  const [play, setPlay] = useState(false);
  // A bolinha só aparece depois que a logo terminou de subir (não junto com ela).
  const [showDot, setShowDot] = useState(false);
  const [expand, setExpand] = useState(false);
  // Quando true, a saída é instantânea (sem fade): caso de revisita na mesma
  // sessão ou movimento reduzido — o overlay só existe no HTML inicial para
  // não deixar o site "piscar", e some no primeiro frame.
  const [instant, setInstant] = useState(false);
  // Escala final para a bolinha cobrir a tela a partir do ponto. Calculada no
  // cliente com base no viewport (fallback alto para o primeiro paint do SSR).
  const [targetScale, setTargetScale] = useState(400);

  useEffect(() => {
    const root = document.documentElement;

    // Modo ajuste: mostra a logo + bolinha parados (sem expandir, sem sair) para
    // alinhar a posição. Trava o scroll e nunca remove o overlay.
    if (ADJUST_MODE) {
      setPlay(true);
      setShowDot(true);
      const previousOverflow = root.style.overflow;
      root.style.overflow = 'hidden';
      window.__lenis?.stop();
      window.scrollTo(0, 0);
      return () => {
        root.style.overflow = previousOverflow;
        window.__lenis?.start();
      };
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === '1';

    // Já visto nesta sessão (ou movimento reduzido): não exibe a abertura.
    if (alreadySeen || prefersReducedMotion) {
      window.sessionStorage.setItem(SESSION_KEY, '1');
      setInstant(true);
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem(SESSION_KEY, '1');

    /* Celular: a expansão escala a bolinha de 11px até ~200× — o Safari do
       iPhone aloca um buffer do tamanho FINAL e era um dos estouros da
       primeira visita (o crash "um problema ocorreu repetidamente" logo na
       home). No celular a abertura termina em fade: a logo aparece e o
       overlay dissolve, sem a bolinha crescer. Desktop segue com a expansão. */
    const soft = window.matchMedia('(max-width: 1023px)').matches;
    const removeAt = soft ? ENTER_HOLD_MS + 250 : REMOVE_MS;

    // Garante que a bolinha cobre o canto mais distante da tela.
    const diagonal = Math.hypot(window.innerWidth, window.innerHeight);
    setTargetScale(Math.ceil((diagonal * 2) / CIRCLE_BASE_PX) + 20);

    // Primeira visita: libera a animação de abertura.
    setPlay(true);

    // Trava o scroll enquanto a abertura está na tela.
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    window.__lenis?.stop();
    window.scrollTo(0, 0);

    const dotTimer = window.setTimeout(() => setShowDot(true), LOGO_RISE_MS);
    const expandTimer = soft ? null : window.setTimeout(() => setExpand(true), ENTER_HOLD_MS);
    const removeTimer = window.setTimeout(() => setVisible(false), removeAt);

    const restore = () => {
      root.style.overflow = previousOverflow;
      window.__lenis?.start();
    };
    const restoreTimer = window.setTimeout(restore, removeAt);

    return () => {
      window.clearTimeout(dotTimer);
      if (expandTimer) window.clearTimeout(expandTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(restoreTimer);
      restore();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[var(--theme-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: instant ? 0 : 0.5, ease: 'easeInOut' }}
        >
          <div
            className="relative"
            style={{
              width: `min(${LOGO_DISPLAY_WIDTH}px, 72vw)`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={
                !play
                  ? { opacity: 0, y: 24 }
                  : expand
                    ? { opacity: 0, y: -10 }
                    : { opacity: 1, y: 0 }
              }
              transition={{ duration: expand ? 0.3 : 0.7, ease: EASE }}
            >
              <BrandLogo
                width={LOGO_DISPLAY_WIDTH}
                height={Math.round(LOGO_DISPLAY_WIDTH * LOGO_RATIO)}
                priority
                className="block h-auto w-full object-contain"
              />
            </motion.div>

            {/* A "bolinha" da marca — cresce do ponto da logo cobrindo a tela.
                Lima nos dois temas, porque é a cor da bolinha nos dois
                arquivos da logo: ela precisa nascer da própria bolinha. */}
            <motion.div
              aria-hidden="true"
              className="absolute rounded-full bg-[var(--theme-splash-dot)]"
              style={{
                left: `${POINT_X_PCT}%`,
                top: `${POINT_Y_PCT}%`,
                width: `${CIRCLE_BASE_PX}px`,
                height: `${CIRCLE_BASE_PX}px`,
                x: '-50%',
                y: '-50%',
              }}
              initial={{ scale: 0 }}
              animate={
                !play || !showDot ? { scale: 0 } : expand ? { scale: targetScale } : { scale: 1 }
              }
              transition={{
                duration: expand ? EXPAND_MS / 1000 : 0.4,
                ease: expand ? [0.65, 0, 0.35, 1] : EASE,
              }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
