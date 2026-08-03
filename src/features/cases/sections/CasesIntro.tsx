'use client';

import type { ReactNode } from 'react';
import { Fragment, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import CasesEcosystemRings from './CasesEcosystemRings';
import FluidParticlesBackground from '@/components/ui/fluid-particles-background';
import { groupCompanies } from '../data/casesData';
import type { CompanyId } from '../types/cases.types';
import { EASE, revealItem, staggerContainer } from '../lib/animations';
import { Link } from '@/i18n/navigation';
import { futurePageHrefs } from '@/lib/site-navigation';

/**
 * "Um ecossistema completo" — o sistema solar deixa de ser só cenário e vira
 * o índice do grupo: à esquerda as órbitas (dimensionadas pela altura da
 * viewport, para caberem inteiras na tela), à direita o título, a frase e as
 * quatro empresas em lista. O hover é compartilhado nos dois sentidos —
 * mirar uma empresa acende a órbita dela (preenchimento + logo no centro),
 * mirar uma órbita acende a linha correspondente da lista.
 *
 * A linha expandida (descrição + CTA) abre e fecha junto com o hover: como o
 * painel abre dentro da própria linha, o mouse chega ao CTA sem sair dela.
 */

// Sites das empresas; a Flying é a casa — o CTA dela leva ao nosso DNA
const companySites: Record<CompanyId, string | null> = {
  ogdi: 'https://ogdi.com.br',
  nid: 'https://nidstudio.com.br',
  flying: null,
  rinno: 'https://rinnofilms.com.br',
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: index * 0.03, ease: EASE },
  }),
};

const wordVariants: Variants = {
  hidden: { y: '115%', opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: index * 0.05, ease: EASE },
  }),
};

const chunkText = (chunks: ReactNode) =>
  Array.isArray(chunks) ? chunks.join('') : typeof chunks === 'string' ? chunks : '';

export default function CasesIntro() {
  const t = useTranslations('CasesPage.intro');
  const tEcosystem = useTranslations('CasesPage.ecosystem');
  const tRings = useTranslations('CasesPage.ecosystemRings');
  // Slogans vêm da home (Home.grupo) — uma fonte só para as duas seções
  const tGrupo = useTranslations('Home.grupo.companies');
  const [hovered, setHovered] = useState<CompanyId | null>(null);
  let wordIndex = 0;

  const title = tRings('title');

  // Divide o trecho em palavras, cada uma subindo de dentro da própria máscara.
  // O espaço fica FORA da máscara (inline-block engole espaço no fim do conteúdo).
  const renderWords = (chunks: ReactNode, className: string) =>
    chunkText(chunks)
      .split(' ')
      .filter(Boolean)
      .map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={wordVariants}
              custom={wordIndex++}
              className={`inline-block ${className}`}
            >
              {word}
            </motion.span>
          </span>{' '}
        </Fragment>
      ));

  return (
    <section className="relative w-full overflow-hidden">
      {/* O campo de linhas das páginas de serviço, recortado para esta seção
          (`absolute` no lugar do `fixed` padrão; o overflow-hidden apara).
          O mask dissolve as linhas na base, sem corte seco na divisa. */}
      <FluidParticlesBackground className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black_78%,transparent)]" />

      {/* `items-start`, não `items-center`: com centro, abrir um painel muda a
          altura da coluna e re-centraliza tudo — o alvo desliza para fora do
          mouse, fecha, volta, e vira um loop de abre-fecha. Ancorado no topo,
          a expansão só empurra o que está ABAIXO dela, longe do cursor. */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1718px] items-start gap-14 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-20">
        {/* As órbitas: a largura respeita a altura da viewport, então o sistema
          inteiro cabe na tela em qualquer monitor. */}
        <div className="mx-auto w-full max-w-[min(620px,64vh)]">
          <CasesEcosystemRings hovered={hovered} onHoveredChange={setHovered} />
        </div>

        <div className="w-full max-w-[600px] lg:justify-self-end">
          <motion.h2
            aria-label={title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="text-[clamp(18px,1.7vw,27px)] leading-[1.2] font-normal tracking-[0.19em] text-[var(--theme-text)] uppercase"
          >
            {title.split('').map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                aria-hidden
                variants={letterVariants}
                custom={index}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-6 text-[clamp(24px,2.3vw,40px)] leading-[1.25] font-semibold tracking-[-0.02em] text-[var(--theme-text)]"
          >
            {t.rich('statement', {
              strong: (chunks) => <>{renderWords(chunks, '')}</>,
              muted: (chunks) => <>{renderWords(chunks, 'font-light text-[var(--theme-muted)]')}</>,
            })}
          </motion.p>

          {/* O índice do ecossistema: mesma ordem das órbitas, de dentro para fora */}
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-10 border-t border-[color-mix(in_srgb,var(--theme-text)_12%,transparent)]"
          >
            {groupCompanies.map((company) => {
              const isActive = hovered === company.id;
              const dimmed = hovered !== null && !isActive;
              const site = companySites[company.id];
              const ctaClass =
                'group/cta mt-4 inline-flex items-center gap-[8px] text-[15px] font-semibold text-[var(--theme-text)] transition-colors duration-200 hover:text-[var(--theme-accent)] focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-ring-offset)] focus-visible:outline-none';
              const ctaArrow = (external: boolean) => (
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-300 group-hover/cta:translate-x-[4px] ${external ? '-rotate-45' : ''}`}
                >
                  <path
                    d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              );
              return (
                <motion.li
                  key={company.id}
                  variants={revealItem}
                  onMouseEnter={() => setHovered(company.id)}
                  onMouseLeave={() => setHovered(null)}
                  // Foco por teclado: abre ao entrar e só fecha quando o foco
                  // sai da linha inteira — Tab até o CTA mantém o painel aberto
                  onFocus={() => setHovered(company.id)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setHovered(null);
                    }
                  }}
                  className={`border-b border-[color-mix(in_srgb,var(--theme-text)_12%,transparent)] transition-opacity duration-300 ${dimmed ? 'opacity-40' : 'opacity-100'}`}
                >
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setHovered(company.id)}
                    className="group relative flex w-full cursor-pointer items-center justify-between gap-6 py-[18px] pl-5 text-left focus-visible:outline-none"
                  >
                    {/* Barra na cor da empresa: cresce quando a órbita/linha acende */}
                    <motion.span
                      aria-hidden
                      className="absolute top-1/2 left-0 h-[58%] w-[3px] -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: company.accentColor, transformOrigin: 'center' }}
                      initial={false}
                      animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                    <span className="flex items-center gap-5">
                      <span className="inline-flex w-[24px] text-[13px] font-medium tracking-[0.12em] text-[var(--theme-muted)]">
                        {company.number}
                      </span>
                      <span className="flex flex-col gap-[2px]">
                        <span
                          className={`text-[clamp(19px,1.5vw,24px)] leading-[1.2] font-semibold text-[var(--theme-text)] transition-transform duration-300 ${isActive ? 'translate-x-[6px]' : ''}`}
                        >
                          {tEcosystem(`${company.id}.name`)}
                        </span>
                        <span className="text-[clamp(13px,1vw,15px)] leading-[1.4] text-[var(--theme-muted)]">
                          {tGrupo(`${company.id}.slogan`)}
                        </span>
                      </span>
                    </span>
                    {/* O "planeta" da linha: ganha halo quando a empresa acende */}
                    <motion.span
                      aria-hidden
                      className="h-[11px] w-[11px] shrink-0 rounded-full"
                      style={{ backgroundColor: company.accentColor }}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.35 : 1,
                        boxShadow: isActive
                          ? `0 0 16px 3px ${company.accentColor}80`
                          : `0 0 0 0 ${company.accentColor}00`,
                      }}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  </button>

                  {/* A linha aberta: descrição do manifesto + CTA para o site.
                    Abre dentro da própria linha — o mouse alcança o link sem sair dela. */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        {/* 64px = pl-5 (20) + número (24) + gap-5 (20): alinha com o nome */}
                        <div className="pr-6 pb-6 pl-[64px]">
                          <p className="max-w-[52ch] text-[15px] leading-[1.6] text-[var(--theme-muted)]">
                            {t(`companies.${company.id}.desc`)}
                          </p>
                          {site ? (
                            <a
                              href={site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={ctaClass}
                            >
                              {t(`companies.${company.id}.cta`)}
                              {ctaArrow(true)}
                            </a>
                          ) : (
                            <Link href={futurePageHrefs.dna} className={ctaClass}>
                              {t(`companies.${company.id}.cta`)}
                              {ctaArrow(false)}
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
