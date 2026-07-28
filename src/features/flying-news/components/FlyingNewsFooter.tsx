import FooterReveal from '@/components/layout/FooterReveal';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';

const FOOTER_TOP_SPACE = 62;

export default function FlyingNewsFooter() {
  return (
    <>
      <SectionScaleFrame designHeight={FOOTER_TOP_SPACE}>
        <div aria-hidden="true" className="h-full w-full bg-[var(--theme-bg)]" />
      </SectionScaleFrame>

      <FooterReveal />
    </>
  );
}
