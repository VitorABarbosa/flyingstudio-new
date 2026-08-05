'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Footer from '@/components/layout/Footer';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';

const FOOTER_BAR_HEIGHT = 88;
const PHOTO_BAND_HEIGHT = 400;

/** Recorte da foto usado nas páginas internas — mantido idêntico. */
const PHOTO_CROP = {
  left: '-15.1%',
  top: '-142.69%',
  width: '115.1%',
  height: '368.38%',
} as const;

/**
 * Fecho da página: barra do Footer + faixa da foto do estúdio, com paralaxe.
 *
 * O progresso vai de "o bloco encosta na base da viewport" até "o bloco está
 * inteiro na tela", então a animação termina exatamente quando se chega ao fim
 * da página. A barra sobe para o lugar (o "abrir") enquanto a foto corre mais
 * devagar que o scroll — é a diferença entre as duas velocidades que dá a
 * sensação de profundidade.
 */
export default function FooterReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  // Deslocamentos pequenos de propósito: a foto é 368% da faixa, então poucos
  // pontos percentuais já são dezenas de pixels — e sobra recorte nas duas
  // pontas, o que garante que nunca apareça vazio.
  const photoY = useTransform(scrollYProgress, [0, 1], ['-7%', '3%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const photoStyle = reduceMotion ? {} : { y: photoY, scale: photoScale };

  return (
    <div ref={ref}>
      <SectionScaleFrame designHeight={FOOTER_BAR_HEIGHT}>
        {/* A entrada da barra é por IntersectionObserver, e NÃO por progresso
            de scroll: se a medição do alvo ficar defasada, o progresso trava em
            0 e a barra some de vez. Aqui o pior caso é a animação não rodar —
            a barra fica visível de qualquer jeito. */}
        <motion.div
          className="h-full w-full"
          initial={reduceMotion ? false : { y: '60%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Footer />
        </motion.div>
      </SectionScaleFrame>

      <SectionScaleFrame designHeight={PHOTO_BAND_HEIGHT}>
        <section className="relative h-[400px] w-full overflow-hidden">
          <motion.div
            className="pointer-events-none absolute"
            style={{ ...PHOTO_CROP, ...photoStyle }}
          >
            {/* `unoptimized`: o otimizador re-encodava a foto em q75 (compressão
                dupla) — o arquivo é servido direto, sem nenhum re-encode, como
                nas heroes e na galeria. Este é o upscale 6K (6144px) que o
                Vitor salvou — folga de sobra para 4K e telas com escala. */}
            <Image
              src="/home/footer/upscale-foto-empresa-nitida.jpg"
              alt="Flying Studio - Escritório"
              fill
              unoptimized
              className="object-cover"
              sizes="115vw"
            />
          </motion.div>
        </section>
      </SectionScaleFrame>
    </div>
  );
}
