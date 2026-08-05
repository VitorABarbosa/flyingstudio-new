'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const RINNO_URL = 'https://rinnofilms.com.br/';
/** Cor de identidade da Rinno — a mesma usada nos cards do grupo, no DNA. */
const RINNO = '#ff00a4';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Passagem de bastão para a Rinno Films.
 *
 * Institucionais e documentários não são desta casa — são da produtora do
 * grupo. Em vez de manter duas categorias vazias esperando acervo que não vem,
 * a página assume isso e aponta o caminho.
 *
 * A faixa usa a cor da RINNO, não a accent do tema. É proposital: a quebra
 * cromática avisa que você está saindo do território da Flying antes mesmo de
 * ler o texto.
 */
export default function RinnoCtaSection() {
  const t = useTranslations('Videos3DPage.rinno');

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="w-full"
    >
      <div className="mx-auto w-full max-w-[1800px] px-4 md:px-6">
        {/* Gancho acima do banner: a pergunta fisga quem chegou procurando
            documentário/institucional, e a resposta corrige a leitura — a
            Rinno não faz SÓ esses, ela é a produtora de todos os filmes da
            página. */}
        <div className="mb-[clamp(20px,3.5vh,36px)] text-center">
          <p className="font-['Outfit'] text-[clamp(1.15rem,2vw,1.8rem)] leading-[1.3] font-semibold text-[var(--theme-text)]">
            {t('leadQuestion')}
          </p>
          <p className="mt-2 font-['Outfit'] text-[clamp(0.95rem,1.2vw,1.15rem)] leading-[1.5] text-[var(--theme-muted)]">
            {t.rich('leadAnswer', {
              rinno: (chunks) => (
                <span className="font-semibold" style={{ color: RINNO }}>
                  {chunks}
                </span>
              ),
            })}
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-[clamp(24px,3vw,40px)] px-[clamp(24px,5vw,72px)] py-[clamp(36px,6vw,68px)]"
          style={{
            background: `linear-gradient(120deg, color-mix(in srgb, ${RINNO} 16%, var(--theme-surface)) 0%, var(--theme-surface) 55%, color-mix(in srgb, ${RINNO} 10%, var(--theme-surface)) 100%)`,
          }}
        >
          {/* Luz da marca vazando pelo canto — mesma linguagem do resto do site. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-[30%] -right-[10%] h-[320px] w-[46%] rounded-full opacity-60 blur-[90px]"
            style={{
              background: `radial-gradient(closest-side, color-mix(in srgb, ${RINNO} 55%, transparent), transparent 75%)`,
            }}
          />

          <div className="relative flex flex-col items-start gap-[clamp(20px,3vw,36px)] lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[720px]">
              <span
                className="font-['Outfit'] text-[11px] font-bold tracking-[0.28em] uppercase"
                style={{ color: RINNO }}
              >
                {t('eyebrow')}
              </span>

              <h2 className="mt-3 font-['Outfit'] text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.12] font-semibold text-[var(--theme-text)]">
                {t('titlePre')} <span style={{ color: RINNO }}>{t('titleAccent')}</span>
              </h2>

              <p className="mt-4 max-w-[60ch] text-justify font-['Outfit'] text-[clamp(0.95rem,1.15vw,1.15rem)] leading-[1.65] text-[var(--theme-muted)]">
                {t('description')}
              </p>
            </div>

            {/* `items-center`: sem isso os dois alinham pela borda direita, e como
                a logo e o botão têm larguras diferentes, um parece deslocado. */}
            <div className="flex shrink-0 flex-col items-start gap-6 lg:items-center">
              <Image
                src="/home/nosso-grupo/logos/rinno-films.png"
                alt="Rinno Films"
                width={1920}
                height={378}
                className="theme-icon-adaptive h-[clamp(26px,2.4vw,38px)] w-auto object-contain"
              />

              <a
                href={RINNO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[10px] rounded-full px-[28px] py-[15px] font-['Outfit'] text-[15px] leading-none font-medium text-white transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none"
                style={{ backgroundColor: RINNO, boxShadow: `0 18px 44px -14px ${RINNO}` }}
              >
                {t('cta')}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 12 12 4M5.5 4H12v6.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
