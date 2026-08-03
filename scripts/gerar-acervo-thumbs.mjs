/**
 * Gera as MINIATURAS da galeria a partir dos mestres web no SERVIDOR
 * (site-flying-web/) — não depende de pasta local.
 *
 * O problema que este script resolve: mesmo com mestres de ~1,8 MB, a grade
 * da galeria pede dezenas de imagens de uma vez e cada uma passa pelo
 * otimizador do Next (baixar mestre + decodificar 3840px + recodificar) —
 * em cache frio a fila satura e o carregamento arrasta. Miniaturas prontas
 * servidas DIRETO do servidor de imagens carregam como estático puro.
 * O lightbox continua usando o mestre via otimizador (uma imagem por vez).
 *
 * Uso:    node scripts/gerar-acervo-thumbs.mjs
 * Saída:  acervo-thumbs/<MESMA_ESTRUTURA>.jpg
 * Depois: subir o CONTEÚDO de acervo-thumbs/ como a pasta site-flying-thumbs/
 *
 * Retomável: arquivos já gerados são pulados.
 */

import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ORIGIN = 'https://img.flyingstudio.com.br';
const ROOT = '/site-flying-web/';
const OUT_ROOT = path.resolve(process.cwd(), 'acervo-thumbs');

/* 1920px q82: acima do que o otimizador entrega hoje à grade (828-1200px
   q70 WebP) — qualidade estritamente melhor que a atual, ainda ~400 KB. */
const MAX_EDGE = 1920;
const JPEG_QUALITY = 82;
const CONCURRENCY = 4;

async function listDir(dirPath) {
  const res = await fetch(ORIGIN + encodeURI(dirPath));
  if (!res.ok) throw new Error(`Listagem falhou (${res.status}): ${dirPath}`);
  const html = await res.text();
  const dirs = [];
  const files = [];
  for (const m of html.matchAll(/<tr><td[^>]*><a href="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith(ROOT)) continue;
    if (href.endsWith('/')) dirs.push(href);
    else if (/\.jpe?g$/i.test(href)) files.push(href);
  }
  return { dirs, files };
}

async function alreadyDone(outPath) {
  try {
    return (await stat(outPath)).size > 0;
  } catch {
    return false;
  }
}

async function processOne(href) {
  const rel = decodeURIComponent(href.slice(ROOT.length)).replace(/\//g, path.sep);
  const outPath = path.join(OUT_ROOT, rel);
  if (await alreadyDone(outPath)) return { name: rel, skipped: true };

  const res = await fetch(ORIGIN + href);
  if (!res.ok) throw new Error(`Download falhou (${res.status}): ${href}`);
  const original = Buffer.from(await res.arrayBuffer());

  const output = await sharp(original, { limitInputPixels: false })
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, output);
  return { name: rel, inKb: original.length / 1024, outKb: output.length / 1024 };
}

const queue = [];
const pending = [ROOT];
while (pending.length) {
  const { dirs, files } = await listDir(pending.shift());
  pending.push(...dirs);
  queue.push(...files);
}

console.log(`Mestres no servidor: ${queue.length}. Gerando miniaturas (máx. ${MAX_EDGE}px, q${JPEG_QUALITY})...\n`);

let done = 0;
let skipped = 0;
let totalOut = 0;
const failures = [];

async function worker() {
  while (queue.length > 0) {
    const href = queue.shift();
    try {
      const r = await processOne(href);
      if (r.skipped) {
        skipped += 1;
        continue;
      }
      done += 1;
      totalOut += r.outKb;
      console.log(`[${String(done).padStart(3, '0')}] ${r.name}  ${Math.round(r.inKb)} KB -> ${Math.round(r.outKb)} KB`);
    } catch (error) {
      failures.push({ href, message: error.message });
      console.error(`ERRO ${href}: ${error.message}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

console.log('\n--- Resumo ---');
console.log(`Geradas: ${done} | Puladas (já existiam): ${skipped} | Falhas: ${failures.length}`);
if (done > 0) console.log(`Total gerado nesta rodada: ${(totalOut / 1024).toFixed(0)} MB`);
if (failures.length > 0) {
  failures.forEach((f) => console.log(` - ${f.href}: ${f.message}`));
  process.exitCode = 1;
} else {
  console.log('\nPronto. Suba o CONTEÚDO de acervo-thumbs/ como site-flying-thumbs/');
}
