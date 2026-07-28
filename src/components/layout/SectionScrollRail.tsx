'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/navigation';

type SectionGroup = {
  id: string;
  targetId: string;
  observedIds: string[];
  label: string;
  /** Offset em px aplicado ao scroll. Positivo = para. mais para baixo; negativo = para mais no topo (margem no topo). */
  scrollOffset?: number;
};

const sectionGroups: SectionGroup[] = [
  {
    id: 'hero',
    targetId: 'hero',
    observedIds: ['hero'],
    label: 'Hero',
  },
  {
    id: 'tecnologia',
    targetId: 'tecnologia-artistica-3d',
    observedIds: ['tecnologia-artistica-3d'],
    label: 'Tecnologia Artistica',
  },
  {
    id: 'dsbrave',
    targetId: 'dsbrave',
    observedIds: ['dsbrave'],
    label: 'D.sbrave',
    scrollOffset: 130,
  },
  {
    id: 'nosso-grupo',
    targetId: 'nosso-grupo',
    observedIds: ['nosso-grupo'],
    label: 'Nosso Grupo',
  },
  {
    id: 'sobre',
    targetId: 'sobre',
    observedIds: ['sobre'],
    label: 'Sobre',
  },
  {
    id: 'parceiros',
    targetId: 'parceiros',
    observedIds: ['parceiros'],
    label: 'Parceiros',
  },
  {
    id: 'de-o-proximo-passo',
    targetId: 'de-o-proximo-passo',
    observedIds: ['de-o-proximo-passo'],
    label: 'Dê o Próximo Passo',
  },
];

export default function SectionScrollRail() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const handleScroll = () => {
      // Marca a última seção quando o usuário chega no fim do documento
      // (Footer e bloco final ocupam espaço após Parceiros sem id próprio).
      const scrolledToBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

      if (scrolledToBottom) {
        setActiveIndex(sectionGroups.length - 1);
        return;
      }

      // Ativa o último grupo cujo topo já passou do meio da viewport.
      const threshold = window.innerHeight * 0.5;
      let bestIndex = 0;

      sectionGroups.forEach((group, index) => {
        const tops = group.observedIds
          .map((id) => document.getElementById(id))
          .filter((element): element is HTMLElement => Boolean(element))
          .map((element) => element.getBoundingClientRect().top);

        if (tops.length === 0) {
          return;
        }

        if (Math.min(...tops) <= threshold) {
          bestIndex = index;
        }
      });

      setActiveIndex(bestIndex);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHome]);

  if (!isHome) {
    return null;
  }

  return (
    <nav
      aria-label="Navegacao lateral por secao"
      className="fixed top-1/2 right-[14px] z-[45] hidden -translate-y-1/2 flex-col gap-[12px] xl:flex"
    >
      {sectionGroups.map((group, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={group.id}
            type="button"
            aria-label={`Ir para ${group.label}`}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => {
              const target = document.getElementById(group.targetId);
              if (!target) {
                return;
              }

              const offset = group.scrollOffset ?? 0;

              if (window.__lenis) {
                window.__lenis.scrollTo(target, {
                  duration: 1.15,
                  lerp: 0.09,
                  offset,
                });
                return;
              }

              const targetTop =
                target.getBoundingClientRect().top + window.scrollY + offset;
              window.scrollTo({ top: targetTop, behavior: 'smooth' });
            }}
            className={`w-[6px] rounded-full transition-all duration-300 ${
              isActive
                ? 'h-[40px] bg-[var(--theme-accent)] shadow-[0px_0px_10px_0px_var(--theme-accent-glow-soft),0px_0px_18px_0px_var(--theme-accent-glow)]'
                : 'h-[40px] bg-[var(--theme-rail-inactive)]'
            }`}
          />
        );
      })}
    </nav>
  );
}
