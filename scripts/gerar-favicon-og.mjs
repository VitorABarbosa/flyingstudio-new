/**
 * Gera os ícones do site e a imagem de compartilhamento social a partir da
 * marca oficial (public/brand/logo-flying-studio.png):
 *
 *   - src/app/favicon.ico   (16/32/48, PNGs embutidos no contêiner ICO)
 *   - src/app/icon.png      (512×512, transparente — abas e PWA)
 *   - src/app/apple-icon.png(180×180, fundo branco — iOS)
 *   - public/og-image.jpg   (1200×630 — WhatsApp/Instagram/Google)
 *
 * O símbolo é o quadrado roxo com a seta + bolinha verde (início da logo).
 * Uso: node scripts/gerar-favicon-og.mjs
 */

import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const LOGO = 'public/brand/logo-flying-studio.png';
const LOGO_ALT = 'public/brand/logo-flying-studio-dark.png';

/* ── Símbolo da marca: recorte do início da logo, aparado. ─────────────── */
const mark = await sharp(LOGO)
  .extract({ left: 0, top: 0, width: 440, height: 496 })
  .trim()
  .png()
  .toBuffer();

/** Centraliza o símbolo num canvas quadrado. */
async function onCanvas(canvasSize, contentSize, background) {
  const content = await sharp(mark)
    .resize({ width: contentSize, height: contentSize, fit: 'inside' })
    .png()
    .toBuffer();
  const meta = await sharp(content).metadata();

  return sharp({
    create: { width: canvasSize, height: canvasSize, channels: 4, background },
  })
    .composite([
      {
        input: content,
        left: Math.round((canvasSize - meta.width) / 2),
        top: Math.round((canvasSize - meta.height) / 2),
      },
    ])
    .png()
    .toBuffer();
}

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

/** ICO moderno: contêiner com PNGs embutidos (suportado por todo navegador). */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const dir = [];
  let offset = 6 + 16 * entries.length;

  for (const { size, buf } of entries) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    dir.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dir, ...entries.map((e) => e.buf)]);
}

const icoSizes = [16, 32, 48];
const icoEntries = [];
for (const size of icoSizes) {
  icoEntries.push({ size, buf: await onCanvas(size, size, TRANSPARENT) });
}

await writeFile('src/app/favicon.ico', buildIco(icoEntries));
await writeFile('src/app/icon.png', await onCanvas(512, 460, TRANSPARENT));
await writeFile('src/app/apple-icon.png', await onCanvas(180, 124, WHITE));
console.log('favicon.ico + icon.png + apple-icon.png gerados');

/* ── og-image: render escurecido + logo branca centralizada. ───────────── */
async function meanLuma(path) {
  const { data } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let sum = 0;
  let n = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 128) {
      sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      n += 1;
    }
  }
  return n ? sum / n : 0;
}

const whiteLogoPath = (await meanLuma(LOGO_ALT)) > (await meanLuma(LOGO)) ? LOGO_ALT : LOGO;

const base = await sharp('public/home/hero/01.jpg')
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .toBuffer();

const logoBuf = await sharp(whiteLogoPath).resize({ width: 640 }).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();

await sharp(base)
  .composite([
    {
      input: {
        create: { width: 1200, height: 630, channels: 4, background: { r: 8, g: 8, b: 12, alpha: 0.55 } },
      },
    },
    {
      input: logoBuf,
      left: Math.round((1200 - logoMeta.width) / 2),
      top: Math.round((630 - logoMeta.height) / 2),
    },
  ])
  .jpeg({ quality: 88, progressive: true, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log(`og-image.jpg gerada (logo: ${whiteLogoPath})`);
