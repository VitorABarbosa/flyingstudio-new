// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    /* Acervo de Perspectivas: os arquivos são os de trabalho, em resolução
       cheia. Liberar o domínio aqui é o que permite ao otimizador baixar o
       original uma vez e servir ao navegador uma versão redimensionada. */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.flyingstudio.com.br',
        pathname: '/site-flying/**',
      },
    ],
    /* Original de ~28 MB não deve ser reprocessado a cada visita. */
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default withNextIntl(nextConfig);
