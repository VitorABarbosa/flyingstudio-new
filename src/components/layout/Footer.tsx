// src/components/layout/Footer.tsx
// Server Component puro — sem 'use client'
// Design 100% fiel ao Figma node 2076:2778 (Frame 6357788, 1920×88px, bg branco)
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import BrandLogo from '@/components/layout/BrandLogo';
import { futurePageHrefs } from '@/lib/site-navigation';

const WHATSAPP_HREF = 'https://wa.me/5511993443369';
const EMAIL_HREF = 'mailto:studio@flyingstudio.com.br';
const MAPS_HREF =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Av. Engenheiro Luís Carlos Berrini, 936 - Itaim Bibi, São Paulo, SP');

const socialLinks = [
  {
    name: 'WhatsApp',
    icon: '/shared/icons/social/icon-whatsapp-light.svg',
    width: 20,
    height: 20,
    href: WHATSAPP_HREF,
  },
  {
    name: 'Behance',
    icon: '/shared/icons/social/icon-behance-light.svg',
    width: 29,
    height: 18,
    href: 'https://www.behance.net/flyingstudio3d',
  },
  // LinkedIn é composto por 3 paths vetoriais no Figma — tratado separadamente abaixo
  {
    name: 'Instagram',
    icon: '/shared/icons/social/icon-instagram-light.svg',
    width: 20,
    height: 20,
    href: 'https://www.instagram.com/flyingstudio3d/',
  },
  {
    name: 'TikTok',
    icon: '/shared/icons/social/icon-tiktok-light.png',
    width: 20,
    height: 20,
    href: 'https://www.tiktok.com/@flyingstudio_3d',
  },
  {
    name: 'YouTube',
    icon: '/shared/icons/social/icon-youtube-light.svg',
    width: 28,
    height: 20,
    href: 'https://www.youtube.com/@FlyingStudio.3D',
  },
];

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="w-full bg-[var(--theme-footer-bg)] transition-colors duration-200">
      {/*
        Figma: Frame 6357788 — 1920×88px, bg branco
        Layout: flex row, justify-between, items-center, px-[180px]
        Todos os elementos numa única linha horizontal
      */}
      <div className="flex h-[88px] w-full items-center justify-between px-[180px]">
        {/* Logo — 198×24px, Figma node 2076:2779 — redireciona para página DNA */}
        <Link
          href={futurePageHrefs.dna}
          className="relative h-[24px] w-[198px] shrink-0"
          aria-label="Flying Studio - DNA"
        >
          <BrandLogo fill className="object-contain" />
        </Link>

        {/* Telefone — abre WhatsApp — Figma node 2076:2780 */}
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-sans text-[16px] leading-[1.2] font-medium whitespace-nowrap text-[var(--theme-text-body)] transition-opacity hover:opacity-70"
        >
          {t('phone')}
        </a>

        {/* E-mail — abre cliente de e-mail padrão (Outlook) — Figma node 2076:2781 */}
        <a
          href={EMAIL_HREF}
          className="shrink-0 font-sans text-[16px] leading-[1.2] font-medium whitespace-nowrap text-[var(--theme-text-body)] transition-opacity hover:opacity-70"
        >
          {t('email')}
        </a>

        {/* Endereço — abre Google Maps — Figma node 2076:2782 */}
        <a
          href={MAPS_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-sans text-[16px] leading-[1.2] font-medium whitespace-nowrap text-[var(--theme-text-body)] transition-opacity hover:opacity-70"
        >
          {t('address')}
        </a>

        {/* Ícones sociais — Figma node 2076:2783 (Frame 6357627, 257×36px, gap 24px) */}
        <div className="flex shrink-0 items-center gap-[24px] py-[8px]">
          {/* WhatsApp, Behance, Instagram, TikTok, YouTube */}
          {socialLinks.map(({ name, icon, width, height, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('ariaLabel', { name })}
            >
              <Image
                src={icon}
                alt={name}
                width={width}
                height={height}
                className="theme-icon-adaptive block shrink-0"
              />
            </a>
          ))}

          {/* LinkedIn — Figma node 2076:2786, composto por 3 paths vetoriais */}
          <a
            href="https://www.linkedin.com/company/flyingstudio3d/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('ariaLabel', { name: 'LinkedIn' })}
          >
            <div className="relative size-[20px] shrink-0">
              {/* path 1: inset-[31.99%_0_0_33.9%] */}
              <div
                className="absolute"
                style={{ top: '31.99%', right: 0, bottom: 0, left: '33.9%' }}
              >
                <Image
                  src="/shared/icons/social/icon-linkedin-light.svg"
                  alt=""
                  fill
                  className="theme-icon-adaptive block size-full"
                />
              </div>
              {/* path 2: inset-[32.88%_75.55%_0.16%_3.14%] */}
              <div
                className="absolute"
                style={{ top: '32.88%', right: '75.55%', bottom: '0.16%', left: '3.14%' }}
              >
                <Image
                  src="/shared/icons/social/icon-linkedin-v2.svg"
                  alt=""
                  fill
                  className="theme-icon-adaptive block size-full"
                />
              </div>
              {/* path 3: inset-[0_72.65%_72.65%_0] */}
              <div
                className="absolute"
                style={{ top: 0, right: '72.65%', bottom: '72.65%', left: 0 }}
              >
                <Image
                  src="/shared/icons/social/icon-linkedin-v3.svg"
                  alt=""
                  fill
                  className="theme-icon-adaptive block size-full"
                />
              </div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
