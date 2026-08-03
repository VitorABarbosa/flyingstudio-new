'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { staggerContainer, revealText, EASE } from '../lib/animations';

export default function JunteSeANosHero() {
  const t = useTranslations('JunteSeANos.hero');

  return (
    /* Sem `bg` opaco: o campo de linhas da página vive atrás e precisa
       aparecer no respiro das laterais da faixa. */
    <section className="w-full">
      {/* Banner */}
      <div className="relative w-full px-[8px] md:px-[20px]">
        {/* Mesma faixa das páginas de serviço (Tour, Imagens, Filmes):
            clamp(240px, 34vh, 360px). Os cantos em elipse continuam sendo
            a assinatura desta página. */}
        <div
          className="
            relative h-[clamp(240px,34vh,360px)] w-full overflow-hidden
            [border-bottom-left-radius:80px_60px] [border-bottom-right-radius:80px_60px]
          "
        >
          {/* O fade + zoom-out fica só na foto: o título por cima não deve
              entrar escalando junto. */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src="/junte-se-a-nos/hero/banner-v2.png"
              alt={t('bannerAlt')}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>

          {/* Camada preta: garante leitura do título sobre qualquer trecho da
              foto, nos dois temas. */}
          <div aria-hidden="true" className="absolute inset-0 bg-black/60" />

          {/* Título dentro da imagem, um pouco abaixo do centro: o respiro de
              cima empurra o bloco para baixo sem tirá-lo do eixo. */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pt-[clamp(32px,8vh,64px)] text-center"
          >
            {/* Trilha no padrão das páginas de serviço: Home vira link e a
                etapa atual acende em lima. */}
            <motion.div
              variants={revealText}
              className="flex items-center justify-center gap-2 font-['Outfit'] text-[13px] font-medium tracking-[0.04em] text-white md:text-[16px]"
            >
              <Link href="/" className="transition-opacity hover:opacity-70">
                {t('home')}
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-[var(--theme-accent)]">{t('label')}</span>
            </motion.div>
            <motion.h1
              variants={revealText}
              className="mt-3 font-['Outfit'] text-[32px] leading-[1.2] font-semibold text-white md:text-[48px]"
            >
              {t('title')}
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
