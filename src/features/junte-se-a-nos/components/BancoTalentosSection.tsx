'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  staggerContainer,
  revealItem,
  revealText,
  revealFromLeft,
  VIEWPORT_ONCE,
  buttonHover,
  pressTap,
} from '../lib/animations';

const areaKeys = ['comercial', 'arte', 'tecnologia', 'talentos', 'other'] as const;

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <motion.div variants={revealItem} className="flex w-full flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-['Outfit'] text-[16px] leading-[1.2] text-[var(--theme-text)]"
      >
        {label}
      </label>
      <div className="border-b border-[var(--theme-text)]/40 pb-[2px]">{children}</div>
    </motion.div>
  );
}

const controlClassName =
  "w-full bg-transparent px-2 py-3 font-['Outfit'] text-[18px] font-medium text-[var(--theme-accent)] outline-none placeholder:text-[var(--theme-text)]/55";

/**
 * `<option>` nativa herda o fundo do SO (branco), o que some no dark com texto
 * claro. Forcamos fundo/cor pelo tema para a lista ficar legivel.
 */
const optionStyle = {
  backgroundColor: 'var(--theme-surface)',
  color: 'var(--theme-text)',
} as const;

function UploadIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 16V4m0 0L7 9m5-5l5 5M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2"
        stroke="var(--theme-accent)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type FormState = {
  name: string;
  area: string;
  email: string;
  whatsapp: string;
  motivation: string;
};

export default function BancoTalentosSection() {
  const t = useTranslations('JunteSeANos.bancoTalentos');
  const fieldId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    area: '',
    email: '',
    whatsapp: '',
    motivation: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const canSubmit =
    form.name.trim() !== '' && form.email.trim() !== '' && file !== null;

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    // Integracao de envio (upload do curriculo) sera conectada futuramente.
    setSubmitted(true);
  };

  return (
    <section
      id="banco-talentos"
      aria-labelledby="banco-talentos-title"
      className="w-full scroll-mt-[80px] bg-[var(--theme-bg)] px-4 py-[40px]"
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-[1680px] flex-col items-start gap-12 rounded-[40px] bg-[var(--theme-surface-alt)] p-[40px] lg:flex-row lg:items-center lg:gap-16 lg:p-[64px]"
      >
        {/* Texto */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="flex w-full shrink-0 flex-col items-start gap-5 lg:w-[540px]"
        >
          <motion.span
            variants={revealText}
            className="font-['Outfit'] text-[20px] font-bold tracking-[0.04em] text-[var(--theme-accent)] uppercase"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            variants={revealFromLeft}
            id="banco-talentos-title"
            className="font-['Outfit'] text-[64px] leading-[0.9] font-semibold text-[var(--theme-text)] md:text-[96px] xl:text-[124px]"
          >
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
            <span className="text-[var(--theme-accent)]">.</span>
          </motion.h2>
          <motion.p
            variants={revealText}
            className="font-['Outfit'] text-[16px] leading-[1.5] text-[var(--theme-text)]"
          >
            {t('paragraph')}
          </motion.p>
          <motion.p
            variants={revealText}
            className="font-['Outfit'] text-[20px] leading-[1.5] font-medium text-[var(--theme-accent)] md:text-[24px]"
          >
            {t('closing')}
          </motion.p>
        </motion.div>

        {/* Formulario + upload */}
        <div className="flex w-full flex-col gap-10 md:flex-row md:gap-16">
          {/* Campos */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="flex flex-1 flex-col justify-center gap-10"
          >
            <Field label={t('fields.name.label')} htmlFor={`${fieldId}-name`}>
              <input
                id={`${fieldId}-name`}
                type="text"
                value={form.name}
                onChange={(e) => update('name')(e.target.value)}
                placeholder={t('fields.name.placeholder')}
                className={controlClassName}
              />
            </Field>

            <Field label={t('fields.area.label')} htmlFor={`${fieldId}-area`}>
              <div className="relative">
                <select
                  id={`${fieldId}-area`}
                  value={form.area}
                  onChange={(e) => update('area')(e.target.value)}
                  className={`${controlClassName} cursor-pointer appearance-none pr-9 ${
                    form.area === '' ? 'text-[var(--theme-text)]/55' : ''
                  }`}
                >
                  <option value="" disabled style={optionStyle}>
                    {t('fields.area.placeholder')}
                  </option>
                  {areaKeys.map((key) => (
                    <option key={key} value={key} style={optionStyle}>
                      {t(`areas.${key}`)}
                    </option>
                  ))}
                </select>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[var(--theme-text)]"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Field>

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

            <Field label={t('fields.motivation.label')} htmlFor={`${fieldId}-motivation`}>
              <textarea
                id={`${fieldId}-motivation`}
                value={form.motivation}
                onChange={(e) => update('motivation')(e.target.value)}
                placeholder={t('fields.motivation.placeholder')}
                rows={3}
                className={`${controlClassName} resize-none`}
              />
            </Field>
          </motion.div>

          {/* Upload + enviar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            className="flex w-full flex-col items-center gap-10 md:w-[380px]"
          >
            <motion.label
              variants={revealItem}
              whileHover={{ scale: 1.01 }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`flex min-h-[260px] w-full flex-1 cursor-pointer flex-col items-center justify-center gap-10 rounded-[24px] border-2 border-dashed p-[40px] text-center transition-colors ${
                dragging
                  ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)]/5'
                  : 'border-[var(--theme-text)]/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              <UploadIcon />
              <div className="flex flex-col gap-2">
                <span className="font-['Outfit'] text-[20px] font-medium text-[var(--theme-accent)]">
                  {file ? file.name : t('uploadTitle')}
                </span>
                <span className="font-['Outfit'] text-[16px] text-[var(--theme-text)]">
                  {t('uploadHint')}
                </span>
              </div>
            </motion.label>

            <motion.button
              type="submit"
              disabled={!canSubmit}
              variants={revealItem}
              whileHover={canSubmit ? buttonHover : undefined}
              whileTap={canSubmit ? pressTap : undefined}
              className="flex w-[300px] max-w-full items-center justify-center gap-2 rounded-full bg-[var(--theme-text)] px-[24px] py-[16px] font-['Outfit'] text-[16px] font-medium tracking-[0.32px] text-[var(--theme-bg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitted ? t('submitted') : t('submit')}
              {!submitted ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4.5 10h11M11 5.5l4.5 4.5-4.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </motion.button>
          </motion.div>
        </div>
      </form>
    </section>
  );
}
