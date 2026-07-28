'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Nav');
  const [isPending, startTransition] = useTransition();

  const targetLocale = locale === 'pt-BR' ? 'en' : 'pt-BR';

  function handleSwitch() {
    startTransition(() => {
      router.replace(pathname, { locale: targetLocale });
    });
  }

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={`Mudar idioma para ${targetLocale}`}
      className="rounded-pill border border-white/30 bg-transparent px-4 py-2 font-sans text-label text-white transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
    >
      {t('languageSwitcher')}
    </button>
  );
}
