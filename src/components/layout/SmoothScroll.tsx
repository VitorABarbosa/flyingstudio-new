'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstPathRef = useRef(true);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05 });
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  /* O Next repõe o scroll no topo ao trocar de página, mas o Lenis continua
     animando para o alvo antigo e "devolve" a rolagem para onde estava —
     navegar pelo CTA no fim de uma página abria a próxima também no fim.
     Sincroniza o Lenis com o topo a cada navegação. A primeira montagem fica
     de fora (preserva a restauração de scroll no refresh), e o pathname vem
     sem o locale (trocar de idioma não mexe no scroll). */
  useEffect(() => {
    if (isFirstPathRef.current) {
      isFirstPathRef.current = false;
      return;
    }

    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
