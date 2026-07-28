import Header from '@/components/layout/Header';

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--theme-bg)] transition-colors duration-200">
      <Header />

      <section className="mx-auto flex min-h-screen max-w-[1440px] items-center px-8 pt-32 pb-20">
        <div className="max-w-[720px] rounded-[40px] bg-[var(--theme-surface)] px-10 py-12 shadow-[0px_24px_80px_0px_var(--theme-border-soft)]">
          <p className="font-['Outfit'] text-[14px] font-semibold tracking-[0.2em] text-[var(--theme-accent)] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-['Outfit'] text-[56px] leading-[1.05] font-semibold text-[var(--theme-text)]">
            {title}
          </h1>
          <p className="mt-6 max-w-[560px] font-['Outfit'] text-[18px] leading-[1.65] text-[var(--theme-muted)]">
            {description}
          </p>
        </div>
      </section>
    </main>
  );
}
