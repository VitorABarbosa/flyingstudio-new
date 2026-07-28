import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

const LOGO_LIGHT = '/brand/logo-flying-studio.png';
const LOGO_DARK = '/brand/logo-flying-studio-dark.png';

type BrandLogoProps = Omit<ImageProps, 'src' | 'alt'> & { alt?: string };

/**
 * Logo da marca, com arquivo próprio por tema.
 *
 * As duas versões são renderizadas e a troca é feita por CSS
 * (`theme-logo-light` / `theme-logo-dark`), não por estado em React: o tema é
 * aplicado por script antes da pintura (ThemeScript), então o HTML do servidor
 * não sabe qual tema está ativo e trocar o `src` no cliente daria flash.
 * O `display: none` da versão inativa também a remove da árvore de
 * acessibilidade, então o alt não é anunciado duas vezes.
 */
export default function BrandLogo({
  alt = 'Flying Studio',
  className,
  ...imageProps
}: BrandLogoProps) {
  return (
    <>
      <Image
        {...imageProps}
        src={LOGO_LIGHT}
        alt={alt}
        className={cn('theme-logo-light', className)}
      />
      <Image
        {...imageProps}
        src={LOGO_DARK}
        alt={alt}
        className={cn('theme-logo-dark', className)}
      />
    </>
  );
}
