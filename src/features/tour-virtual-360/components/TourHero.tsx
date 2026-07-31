'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Topo da página de Tour Virtual — mesmo modelo do D.sbrave e de
 * Aplicativos: banner com paralaxe, eyebrow e só o título. O tour rodando
 * aparece na seção seguinte (TourExplainerSection), no notebook ao lado das
 * informações.
 */
export default function TourHero() {
  const t = useTranslations('Tour360Page.hero');
  const bannerRef = useRef<HTMLDivElement>(null);

  /* Paralaxe: a foto sobe mais devagar que a página. O `scale` extra existe
     para o deslocamento nunca revelar a borda de baixo da imagem. */
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  return (
    <section className="relative w-full">
      <div
        ref={bannerRef}
        className="relative h-[clamp(240px,34vh,360px)] w-full overflow-hidden rounded-b-[clamp(24px,3vw,44px)]"
      >
        <motion.div style={{ y: bannerY }} className="absolute inset-0 scale-[1.16]">
          <Image
            src="https://img.flyingstudio.com.br/site-flying-web/LOTEAMENTOS/Granlote_Boituva_Piscina_C_HR.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Scrim escuro: garante leitura do título em cima de qualquer render,
            claro ou escuro, sem depender da cor do tema. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.05) 72%, transparent 100%)',
          }}
        />

        {/* Título dentro da imagem, alinhado à esquerda: o serviço se apresenta
            sobre a própria obra, não numa faixa separada acima dela. */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1800px] px-6 pb-[clamp(26px,4vh,44px)] md:px-10">
          {/* Trilha no padrão do hero de Cases: Home vira link, a etapa atual
              acende em lima. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-2 font-['Outfit'] text-[13px] font-medium tracking-[0.04em] text-white md:text-[16px]"
          >
            <Link href="/" className="transition-opacity hover:opacity-70">
              {t('home')}
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-[#b6ff00]">{t('eyebrow')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.08 }}
            className="mt-[clamp(0.5rem,1.5vh,1rem)] font-['Outfit'] text-[clamp(2rem,4.8vw,3.6rem)] leading-[0.95] font-bold tracking-[-0.03em] text-white"
          >
            {t('title')}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
