// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher: tudo exceto API routes, assets do Next.js (_next),
  // Vercel internals (_vercel), e arquivos com extensão (imagens, fonts, etc.)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
