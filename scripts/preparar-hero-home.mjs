/**
 * Baixa os destaques do hero da home (site-flying/HOME_HERO/ no servidor de
 * imagens) e gera as versões locais otimizadas em public/home/hero/.
 *
 * Receita: 3840px máx, JPEG q85 mozjpeg 4:4:4 (a mesma da esteira web da
 * galeria) — cai de 7–28 MB por slide para ~1–3 MB sem perda visível.
 * PNGs viram JPG (fundo branco).
 *
 * Uso: node scripts/preparar-hero-home.mjs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const BASE = 'https://img.flyingstudio.com.br/site-flying/HOME_HERO/';
const FILES = ['01.jpg', '02.png', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.png'];
const OUT_DIR = 'public/home/hero';

const mb = (bytes) => (bytes / 1048576).toFixed(1);

await mkdir(OUT_DIR, { recursive: true });

for (const file of FILES) {
  const res = await fetch(BASE + file);
  if (!res.ok) {
    console.error(`ERRO ${res.status} em ${file}`);
    process.exitCode = 1;
    continue;
  }

  const original = Buffer.from(await res.arrayBuffer());
  const out = await sharp(original, { limitInputPixels: false })
    .rotate()
    .flatten({ background: '#ffffff' })
    .resize({ width: 3840, height: 3840, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();

  /* Versão mobile (0N-mobile.jpg): 1080px q80 — o <picture> do hero serve
     esta em telas pequenas, cortando ~90% do peso no celular. */
  const mobile = await sharp(out)
    .resize({ width: 1080, height: 1080, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toBuffer();

  const outName = file.replace(/\.(png|jpe?g)$/i, '.jpg');
  const mobileName = outName.replace('.jpg', '-mobile.jpg');
  await writeFile(path.join(OUT_DIR, outName), out);
  await writeFile(path.join(OUT_DIR, mobileName), mobile);
  console.log(
    `${file} -> ${outName}  ${mb(original.length)} MB -> ${mb(out.length)} MB (mobile ${Math.round(mobile.length / 1024)} KB)`
  );
}

console.log('Pronto. O hero aponta para /home/hero/0N.jpg (+ 0N-mobile.jpg no celular)');
