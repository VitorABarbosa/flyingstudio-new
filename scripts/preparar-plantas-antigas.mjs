/**
 * Prepara as PLANTAS ANTIGAS re-editadas (textos removidos) — mesma esteira
 * de preparar-plantas-novas.mjs, com uma diferença: os arquivos de saída
 * ganham sufixo `_v2`. O servidor manda cache de 30 dias sem ETag; trocar o
 * arquivo mantendo o nome deixaria a versão velha (com textos) presa no
 * navegador de quem já visitou. Nome novo = download novo garantido.
 *
 * Uso:    node scripts/preparar-plantas-antigas.mjs
 * Saída:  C:/Users/power/Downloads/PLANTAS-PRONTAS/ (junta com as novas)
 */

import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'C:/Users/power/Downloads/PLANTAS/PLANTAS';
const OUT = 'C:/Users/power/Downloads/PLANTAS-PRONTAS';
const TARGET_BYTES = 20 * 1024 * 1024;

const LADDER = [
  { edge: Infinity, quality: 90 },
  { edge: Infinity, quality: 87 },
  { edge: Infinity, quality: 85 },
  { edge: 12000, quality: 85 },
  { edge: 10000, quality: 85 },
  { edge: 8500, quality: 85 },
  { edge: 7000, quality: 85 },
];
const MAX_VIABLE_MEGAPIXELS = 75;

const DIRS = {
  original: path.join(OUT, 'site-flying', 'PLANTAS'),
  web: path.join(OUT, 'site-flying-web', 'PLANTAS'),
  thumb: path.join(OUT, 'site-flying-thumbs', 'PLANTAS'),
};

for (const dir of Object.values(DIRS)) await mkdir(dir, { recursive: true });

const mb = (bytes) => (bytes / 1048576).toFixed(1);

async function reduzirOriginal(buffer, meta, outPath) {
  if (buffer.length <= TARGET_BYTES) {
    await writeFile(outPath, buffer);
    return { note: 'copiada intacta', bytes: buffer.length };
  }

  const longest = Math.max(meta.width, meta.height);
  let last = null;

  for (const [i, step] of LADDER.entries()) {
    const scale = Math.min(1, step.edge / longest);
    const scaledMp = (meta.width * scale * meta.height * scale) / 1e6;
    const isLast = i === LADDER.length - 1;
    if (!isLast && scaledMp > MAX_VIABLE_MEGAPIXELS) continue;

    const pipeline = sharp(buffer, { limitInputPixels: false }).rotate();
    if (scale < 1) {
      pipeline.resize({
        width: step.edge,
        height: step.edge,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    const output = await pipeline
      .jpeg({
        quality: step.quality,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: '4:4:4',
      })
      .toBuffer();

    last = { output, step };
    if (output.length <= TARGET_BYTES) break;
  }

  await writeFile(outPath, last.output);
  const edgeNote = last.step.edge === Infinity ? 'resolução cheia' : `máx ${last.step.edge}px`;
  return { note: `${edgeNote}, q${last.step.quality}`, bytes: last.output.length };
}

const entries = await readdir(SRC, { withFileTypes: true });
const files = entries
  .filter((e) => e.isFile() && /\.(jpe?g|png)$/i.test(e.name))
  .map((e) => e.name)
  .sort();

console.log(`Plantas antigas re-editadas: ${files.length} arquivos em ${SRC}\n`);

const failures = [];

for (const file of files) {
  const outName = file.replace(/(\.jpe?g|\.png)+$/i, '_v2.jpg');
  try {
    const buffer = await readFile(path.join(SRC, file));
    const meta = await sharp(buffer, { limitInputPixels: false }).metadata();

    const original = await reduzirOriginal(buffer, meta, path.join(DIRS.original, outName));

    const web = await sharp(buffer, { limitInputPixels: false })
      .rotate()
      .flatten({ background: '#ffffff' })
      .resize({ width: 3840, height: 3840, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toBuffer();
    await writeFile(path.join(DIRS.web, outName), web);

    const thumb = await sharp(web)
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toBuffer();
    await writeFile(path.join(DIRS.thumb, outName), thumb);

    console.log(
      `${outName}\n` +
        `  ${meta.width}x${meta.height}  ${mb(buffer.length)} MB -> original ${mb(original.bytes)} MB (${original.note})` +
        ` | web ${mb(web.length)} MB | thumb ${Math.round(thumb.length / 1024)} KB`
    );
  } catch (error) {
    failures.push({ file, message: error.message });
    console.error(`ERRO ${file}: ${error.message}`);
  }
}

console.log(`\n--- Resumo: ${files.length - failures.length} ok, ${failures.length} falhas ---`);
if (failures.length > 0) {
  failures.forEach((f) => console.log(` - ${f.file}: ${f.message}`));
  process.exitCode = 1;
}
