'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import SectionScaleFrame from '@/components/layout/SectionScaleFrame';
import { revealItem, staggerContainer, VIEWPORT_ONCE } from '@/features/home/lib/revealAnimation';
import { homeCtaHrefs } from '@/lib/site-navigation';

/**
 * "Sobre" — a seção original, fiel ao Figma: o letreiro FLYING / STUDIO em
 * marca-d'água com o brilho que segue o cursor, as três fotos do escritório
 * em posições absolutas no canvas de 1920×1680 e o bloco "Há 15 anos no
 * mercado" com o CTA para o DNA.
 */

const ABOUT_SECTION_HEIGHT = 1680;
const ABOUT_IMAGE_TRANSFORMS = {
  sideLeft: { objectPosition: '100% 50%', x: -14, y: -10, width: 128, height: 124 },
  mainLeft: { objectPosition: '0% 40%', x: -4, y: -2, width: 108, height: 108 },
  centerBottom: { objectPosition: '105% 30%', x: -8, y: -18, width: 116, height: 134 },
  mainRight: { objectPosition: '50% 50%', x: -2, y: -2, width: 104, height: 104 },
} as const;

export default function AboutStudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const t = useTranslations('Sobre');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setTitleVisible(true);
        observer.disconnect();
      },
      {
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.08,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  function renderAdjustedImage(
    key: keyof typeof ABOUT_IMAGE_TRANSFORMS,
    src: string,
    alt: string,
    sizes: string,
  ) {
    const config = ABOUT_IMAGE_TRANSFORMS[key];

    return (
      <div
        className="absolute"
        style={{
          left: `${config.x}%`,
          top: `${config.y}%`,
          width: `${config.width}%`,
          height: `${config.height}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectPosition: config.objectPosition }}
          sizes={sizes}
        />
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative w-full overflow-hidden bg-[var(--theme-bg)] transition-colors duration-200"
    >
      <SectionScaleFrame designHeight={ABOUT_SECTION_HEIGHT}>
        <div
          className="about-title-glow absolute z-20 font-['Outfit'] text-[300px] leading-none font-semibold whitespace-pre-line text-[var(--theme-display-watermark)]"
          style={{ left: '400px', top: '30px', width: '1320px' }}
          onMouseEnter={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty('--glow-opacity', '1');
            event.currentTarget.style.setProperty(
              '--glow-x',
              `${((event.clientX - rect.left) / rect.width) * 100}%`,
            );
            event.currentTarget.style.setProperty(
              '--glow-y',
              `${((event.clientY - rect.top) / rect.height) * 100}%`,
            );
          }}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty(
              '--glow-x',
              `${((event.clientX - rect.left) / rect.width) * 100}%`,
            );
            event.currentTarget.style.setProperty(
              '--glow-y',
              `${((event.clientY - rect.top) / rect.height) * 100}%`,
            );
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.setProperty('--glow-opacity', '0');
          }}
        >
          <span aria-hidden="true" className="about-title-glow-fill">
            <span className="block">FLYING</span>
            <span className="mt-[-40px] ml-[220px] block text-[300px]">STUDIO</span>
          </span>
          <span
            className={`about-title-entrance block ${titleVisible ? 'about-title-entrance-visible' : ''}`}
          >
            FLYING
          </span>
          <span
            className={`about-title-entrance mt-[-40px] ml-[220px] block text-[300px] ${titleVisible ? 'about-title-entrance-visible about-title-entrance-delay' : ''}`}
          >
            STUDIO
          </span>
        </div>

        <motion.div
          className="absolute inset-0"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          variants={staggerContainer}
        >
          <motion.div
            variants={revealItem}
            className="absolute top-[923px] left-[-375px] h-[644px] w-[560px] overflow-hidden rounded-[24px]"
          >
            {renderAdjustedImage(
              'sideLeft',
              '/home/sobre/sobre-office-01.png',
              'Flying Studio - detalhe lateral do escritorio',
              '326px',
            )}
          </motion.div>

          <motion.div
            variants={revealItem}
            className="absolute top-[647px] left-[226px] h-[711px] w-[560px] overflow-hidden rounded-[24px]"
          >
            {renderAdjustedImage(
              'mainLeft',
              '/home/sobre/sobre-office-01.png',
              'Flying Studio - escritorio',
              '560px',
            )}
          </motion.div>

          <motion.div
            variants={revealItem}
            className="absolute top-[678px] left-[843px] w-[480px] text-justify font-['Outfit'] text-[20px] leading-[1.5] font-normal text-[var(--theme-muted)]"
          >
            {t('intro')}
          </motion.div>

          <motion.div
            variants={revealItem}
            className="absolute top-[922px] left-[812px] h-[644px] w-[560px] overflow-hidden rounded-[24px]"
          >
            {renderAdjustedImage(
              'centerBottom',
              '/home/sobre/sobre-office-01.png',
              'Flying Studio - ambiente interno',
              '560px',
            )}
          </motion.div>

          <motion.div
            variants={revealItem}
            className="absolute top-[539px] left-[1404px] h-[686px] w-[618px] overflow-hidden rounded-[24px]"
          >
            {renderAdjustedImage(
              'mainRight',
              '/home/sobre/sobre-office-02.png',
              'Flying Studio - uma imagem vale mais que mil',
              '618px',
            )}
          </motion.div>

          <motion.div variants={revealItem} className="absolute top-[1276px] left-[1422px] w-[464px]">
            <p className="font-['Outfit'] text-[43px] leading-[1.2] font-semibold text-[var(--theme-accent)]">
              {t('years')}
            </p>

            <p className="mt-[16px] w-[448px] text-justify font-['Outfit'] text-[20px] leading-[1.5] font-normal text-[var(--theme-muted)]">
              {t('description')}
            </p>

            <Link
              href={homeCtaHrefs.about}
              className="mt-[26px] inline-flex h-[56px] items-center gap-[8px] rounded-[99px] bg-[var(--theme-accent)] px-[24px] py-[16px] transition-colors duration-200"
            >
              <span className="font-['Outfit'] text-[16px] leading-[1.5] font-medium tracking-[0.32px] whitespace-nowrap text-[var(--theme-accent-contrast)]">
                {t('cta')}
              </span>
              <Image
                src="/shared/icons/ui/icon-cta-arrow.svg"
                alt=""
                width={20}
                height={20}
                className="theme-icon-on-accent"
              />
            </Link>
          </motion.div>
        </motion.div>
      </SectionScaleFrame>
    </section>
  );
}
