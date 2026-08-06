// next.config.mjs — formato .mjs para o padrão de deploy no cPanel (Napoleon),
// o mesmo dos sites da OGDI e da Rinno Films.
import createNextIntlPlugin from 'next-intl/plugin';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * Exportado como função para separar as pastas por fase:
 * - dev (`npm run dev`)  -> .next-dev (ignorada pelo git)
 * - build de produção    -> .next (VERSIONADA — sobe pronta para o Napoleon)
 *
 * Sem isso o dev server sobrescrevia os manifests do build dentro de .next
 * e o deploy subia corrompido (`routesManifest.dataRoutes is not iterable`).
 */
export default function config(phase) {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
    images: {
      /* Só WebP: codificar AVIF de originais grandes é MUITO lento e enfileira
         o otimizador quando a galeria pede dezenas de imagens de uma vez —
         era a causa das imagens quebradas/demoradas. WebP codifica em fração
         do tempo com qualidade equivalente. */
      formats: ['image/webp'],
      /* Acervo de Perspectivas. O site usa a pasta site-flying-web/ — mestres
         de ~1,8 MB gerados por scripts/gerar-acervo-web.mjs a partir dos
         originais de trabalho (site-flying/, até 160 MB), que continuam no
         servidor mas não devem ser referenciados por páginas. */
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.flyingstudio.com.br',
          pathname: '/site-flying-web/**',
        },
      ],
      /* Original de ~28 MB não deve ser reprocessado a cada visita. */
      minimumCacheTTL: 60 * 60 * 24 * 30,
    },
  };

  return withNextIntl(nextConfig);
}
