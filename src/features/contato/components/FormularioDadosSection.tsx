'use client';

import { useId, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  staggerContainer,
  revealItem,
  VIEWPORT_ONCE,
  buttonHover,
  pressTap,
} from '../lib/animations';

const WHATSAPP_HREF = 'https://wa.me/5511993443369';
const EMAIL_HREF = 'mailto:studio@flyingstudio.com.br';
const MAPS_HREF =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Av. Engenheiro Luís Carlos Berrini, 936 - Itaim Bibi, São Paulo, SP');

/** Divisoria derivada do texto: nasce certa nos dois temas. */
const HAIRLINE_BORDER = 'border-[color-mix(in_srgb,var(--theme-text)_14%,transparent)]';

/**
 * Linha dos campos.
 *
 * NAO usa `--theme-border-strong`: esse token e branco no tema claro
 * (`rgba(255,255,255,0.9)`), entao sobre o fundo claro da pagina a linha
 * praticamente nao aparece. Derivando da cor do TEXTO, ela nasce escura no
 * claro e clara no escuro — legivel nos dois por construcao.
 */
const FIELD_LINE = 'border-[color-mix(in_srgb,var(--theme-text)_30%,transparent)]';

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m3.5 7 7.6 5.3a1.5 1.5 0 0 0 1.8 0L20.5 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.2 3.5H4.6c-.9 0-1.7.8-1.6 1.7.5 8 6.8 14.3 14.8 14.8.9.1 1.7-.7 1.7-1.6v-2.6c0-.7-.5-1.4-1.2-1.5l-2.6-.5c-.6-.1-1.3.2-1.6.8l-.6 1.2a12.4 12.4 0 0 1-5.7-5.7l1.2-.6c.6-.3.9-1 .8-1.6l-.5-2.6c-.1-.7-.8-1.2-1.5-1.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Campo com label em cima, controle no meio e linha (underline) embaixo. */
function Field({
  label,
  htmlFor,
  className = '',
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      variants={revealItem}
      className={`flex w-full flex-col gap-2 self-start ${className}`}
    >
      <label
        htmlFor={htmlFor}
        className="font-['Outfit'] text-[16px] leading-[1.2] text-[var(--theme-text)]"
      >
        {label}
      </label>
      {/* A linha acende em accent quando o campo recebe foco — os controles
          usam `outline-none`, entao sem isso nao haveria indicacao de foco. */}
      <div
        className={`border-b pb-[2px] transition-colors duration-200 focus-within:border-[var(--theme-accent)] ${FIELD_LINE}`}
      >
        {children}
      </div>
    </motion.div>
  );
}

const controlClassName =
  "w-full bg-transparent px-2 py-3 font-['Outfit'] text-[18px] font-medium text-[var(--theme-accent)] outline-none placeholder:text-[var(--theme-muted)]";

type FormState = {
  company: string;
  responsible: string;
  email: string;
  whatsapp: string;
  description: string;
};

const EMPTY_FORM: FormState = {
  company: '',
  responsible: '',
  email: '',
  whatsapp: '',
  description: '',
};

export default function FormularioDadosSection() {
  const t = useTranslations('Contato.form');
  const tMeeting = useTranslations('Contato.meeting');
  const tFooter = useTranslations('Footer');
  const fieldId = useId();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const canSubmit =
    accepted &&
    form.company.trim() !== '' &&
    form.email.trim() !== '' &&
    form.responsible.trim() !== '' &&
    form.description.trim() !== '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    // Integracao de envio ao backend sera conectada futuramente.
    setSubmitted(true);
  };

  return (
    <section
      id="formulario"
      aria-labelledby="formulario-title"
      className="relative w-full scroll-mt-[80px] bg-[var(--theme-bg)] pt-[clamp(40px,7vh,76px)] pb-[clamp(64px,10vh,96px)]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4">
        {/* O titulo visivel da pagina e o do hero; aqui ele so nomeia a secao
            para leitores de tela. */}
        <h2 id="formulario-title" className="sr-only">
          {t('title')}
        </h2>

        {/*
          Duas colunas: o card de "marcar reuniao" a ESQUERDA e o formulario a
          direita. A ordem no DOM e a inversa (formulario primeiro) de proposito
          — no mobile a acao principal tem de vir antes, e o tab do teclado
          percorre os campos antes do atalho. No desktop o `order` troca as
          posicoes sem mexer no DOM.

          O formulario NAO entra num card: as linhas dos campos sao derivadas da
          cor do texto e foram calibradas para o fundo da pagina. Quem ganha o
          card e o aside.
        */}
        <div className="grid grid-cols-1 items-start gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[clamp(300px,26vw,380px)_minmax(0,1fr)]">
          <form onSubmit={handleSubmit} className="flex w-full flex-col lg:order-2">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_ONCE}
              className="grid w-full grid-cols-1 gap-x-[clamp(2rem,4vw,3.5rem)] gap-y-10 md:grid-cols-2"
            >
              {/* Linha 1 */}
              <Field label={t('fields.company.label')} htmlFor={`${fieldId}-company`}>
                <input
                  id={`${fieldId}-company`}
                  type="text"
                  value={form.company}
                  onChange={(e) => update('company')(e.target.value)}
                  placeholder={t('fields.company.placeholder')}
                  className={controlClassName}
                />
              </Field>

              <Field
                label={t('fields.responsible.label')}
                htmlFor={`${fieldId}-responsible`}
              >
                <input
                  id={`${fieldId}-responsible`}
                  type="text"
                  value={form.responsible}
                  onChange={(e) => update('responsible')(e.target.value)}
                  placeholder={t('fields.responsible.placeholder')}
                  className={controlClassName}
                />
              </Field>

              {/* Linha 2 */}
              <Field label={t('fields.email.label')} htmlFor={`${fieldId}-email`}>
                <input
                  id={`${fieldId}-email`}
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email')(e.target.value)}
                  placeholder={t('fields.email.placeholder')}
                  className={controlClassName}
                />
              </Field>

              <Field label={t('fields.whatsapp.label')} htmlFor={`${fieldId}-whatsapp`}>
                <input
                  id={`${fieldId}-whatsapp`}
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => update('whatsapp')(e.target.value)}
                  placeholder={t('fields.whatsapp.placeholder')}
                  className={controlClassName}
                />
              </Field>

              {/* Linha 3 — a descricao ocupa as duas colunas. */}
              <Field
                label={t('fields.description.label')}
                htmlFor={`${fieldId}-description`}
                className="md:col-span-2"
              >
                <textarea
                  id={`${fieldId}-description`}
                  rows={4}
                  value={form.description}
                  onChange={(e) => update('description')(e.target.value)}
                  placeholder={t('fields.description.placeholder')}
                  className={`${controlClassName} block resize-y leading-[1.45]`}
                />
              </Field>
            </motion.div>

            {/* Politica + envio na mesma linha: economiza duas alturas de bloco. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-6"
            >
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex size-5 shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors peer-checked:border-[var(--theme-accent)] peer-checked:bg-[var(--theme-accent)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--theme-accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--theme-ring-offset)] ${FIELD_LINE}`}
                >
                  {accepted ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M2.5 6.5L5 9L9.5 3.5"
                        stroke="var(--theme-bg)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>
                <span className="font-['Outfit'] text-[15px] text-[var(--theme-text)] md:text-[16px]">
                  {t('privacyPrefix')}{' '}
                  <Link
                    href="/politica-de-privacidade"
                    className="font-medium text-[var(--theme-accent)] underline underline-offset-2"
                  >
                    {t('privacyLink')}
                  </Link>
                </span>
              </label>

              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={canSubmit ? buttonHover : undefined}
                whileTap={canSubmit ? pressTap : undefined}
                className="flex items-center justify-center rounded-full bg-[var(--theme-text)] px-[28px] py-[16px] font-['Outfit'] text-[16px] font-medium tracking-[0.32px] text-[var(--theme-bg)] transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitted ? t('submitted') : t('submit')}
              </motion.button>
            </motion.div>
          </form>

          {/* Atalho para quem prefere conversar antes de preencher. Acompanha o
              scroll do formulario no desktop. */}
          <motion.aside
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 rounded-[32px] bg-[var(--theme-surface)] p-[clamp(28px,3vw,40px)] lg:order-1 lg:sticky lg:top-[110px]"
          >
            <h3 className="font-['Outfit'] text-[28px] leading-[1.15] font-semibold text-[var(--theme-text)] md:text-[32px]">
              {tMeeting('title')}{' '}
              <span className="text-[var(--theme-accent)]">{tMeeting('titleHighlight')}</span>
            </h3>

            <p className="font-['Outfit'] text-[16px] leading-[1.5] text-[var(--theme-muted)]">
              {tMeeting('text')}
            </p>

            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={buttonHover}
              whileTap={pressTap}
              className="mt-1 inline-flex items-center justify-center gap-[13px] rounded-full bg-[var(--theme-accent)] px-[24px] py-[16px] text-center font-['Outfit'] text-[16px] font-medium tracking-[0.32px] text-[var(--theme-accent-contrast)]"
            >
              {tMeeting('cta')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 8h12M9.5 3.5L14 8l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>

            {/* Contato direto, no mesmo card: quem nao quer preencher nada
                resolve aqui. Os dados vem do mesmo lugar que alimenta a footer. */}
            <ul
              className={`mt-2 flex flex-col gap-[14px] border-t pt-6 font-['Outfit'] text-[15px] leading-[1.45] ${HAIRLINE_BORDER}`}
            >
              <li className="flex items-start gap-3">
                <span className="mt-[1px] shrink-0 text-[var(--theme-accent)]">
                  <MailIcon />
                </span>
                <a
                  href={EMAIL_HREF}
                  className="text-[var(--theme-text)] transition-opacity duration-200 hover:opacity-70"
                >
                  {tFooter('email')}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-[1px] shrink-0 text-[var(--theme-accent)]">
                  <PhoneIcon />
                </span>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--theme-text)] transition-opacity duration-200 hover:opacity-70"
                >
                  {tFooter('phone')}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-[1px] shrink-0 text-[var(--theme-accent)]">
                  <PinIcon />
                </span>
                <a
                  href={MAPS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--theme-muted)] transition-opacity duration-200 hover:opacity-70"
                >
                  {tFooter('address')}
                </a>
              </li>
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
