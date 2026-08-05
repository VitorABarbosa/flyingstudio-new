/**
 * Converte o conteúdo dos 4 cases (Canvas Altino, The One Saúde, The One
 * Tucuruvi e Livigno) na MESMA receita da galeria:
 *
 *   - versão web:   3840px, q85, mozjpeg, 4:4:4  -> site-flying-web/CASES/...
 *   - miniatura:    1920px, q82, mozjpeg          -> site-flying-thumbs/CASES/...
 *
 * O grid do site serve a thumb direto e o zoom serve o mestre web direto —
 * o mesmo fluxo da galeria de Perspectivas.
 *
 * Pastas A4 (versões de impressão) e Thumbs.db ficam de fora; PNGs viram JPG.
 * Nomes de pasta são normalizados para o servidor (TAVERES -> LIVIGNO etc.).
 *
 * Uso:    node scripts/preparar-conteudo-cases.mjs
 * Saída:  C:/Users/power/Downloads/CASES-PRONTOS/  (mesclar na raiz do servidor)
 * Retomável: arquivos já gerados são pulados.
 */

import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_ROOT = 'C:/Users/power/Downloads/CONTEUDO_CASES_FLYING/THE_ONE_SAUDE/FLYINGSTUDIO';
const OUT_ROOT = 'C:/Users/power/Downloads/CASES-PRONTOS';

/* Pasta de origem -> pasta no servidor (em site-flying-web/CASES/<nome>). */
const PROJETOS = {
  CANVAS_ALTINO: 'CANVAS_ALTINO',
  OUSY_SAUDE: 'THE_ONE_SAUDE',
  OUSY_TUCURUVI: 'THE_ONE_TUCURUVI',
  TAVERES_LIVIGNO: 'LIVIGNO',
  MACUCO_GRAND_CANAL: 'MACUCO_GRAND_CANAL',
};

const EXTENSOES = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      /* A4 é versão de impressão — não vai para o site. */
      if (entry.name.toUpperCase() === 'A4') continue;
      out.push(...(await walk(full)));
    } else if (EXTENSOES.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

async function alreadyDone(outPath) {
  try {
    return (await stat(outPath)).size > 0;
  } catch {
    return false;
  }
}

const mb = (bytes) => (bytes / 1048576).toFixed(1);

let done = 0;
let skipped = 0;
let totalIn = 0;
let totalWeb = 0;
const failures = [];

for (const [srcFolder, outFolder] of Object.entries(PROJETOS)) {
  /* Pasta de origem pode ter sido apagada depois de convertida/subida —
     segue para os projetos que ainda existem no disco. */
  try {
    await stat(path.join(SRC_ROOT, srcFolder));
  } catch {
    console.log(`\n=== ${outFolder}: pasta de origem ausente, pulando ===`);
    continue;
  }

  const files = await walk(path.join(SRC_ROOT, srcFolder));
  console.log(`\n=== ${outFolder}: ${files.length} imagens ===`);

  for (const srcPath of files) {
    /* Subpastas Plantas/PLANTAS/PNG viram uma única PLANTAS. */
    const relDir = path.relative(path.join(SRC_ROOT, srcFolder), path.dirname(srcPath));
    const isPlanta = /plantas/i.test(relDir);
    const outName = path
      .basename(srcPath)
      .replace(/(\.jpe?g|\.png)+$/i, '.jpg');
    const relOut = path.join('CASES', outFolder, isPlanta ? 'PLANTAS' : '', outName);

    const webPath = path.join(OUT_ROOT, 'site-flying-web', relOut);
    const thumbPath = path.join(OUT_ROOT, 'site-flying-thumbs', relOut);

    try {
      if ((await alreadyDone(webPath)) && (await alreadyDone(thumbPath))) {
        skipped += 1;
        continue;
      }

      const original = await readFile(srcPath);

      const web = await sharp(original, { limitInputPixels: false })
        .rotate()
        .flatten({ background: '#ffffff' })
        .resize({ width: 3840, height: 3840, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toBuffer();

      const thumb = await sharp(web)
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toBuffer();

      await mkdir(path.dirname(webPath), { recursive: true });
      await mkdir(path.dirname(thumbPath), { recursive: true });
      await writeFile(webPath, web);
      await writeFile(thumbPath, thumb);

      done += 1;
      totalIn += original.length;
      totalWeb += web.length;
      console.log(
        `[${String(done).padStart(3, '0')}] ${relOut}  ${mb(original.length)} MB -> web ${mb(web.length)} MB | thumb ${Math.round(thumb.length / 1024)} KB`
      );
    } catch (error) {
      failures.push({ srcPath, message: error.message });
      console.error(`ERRO ${srcPath}: ${error.message}`);
    }
  }
}

console.log(`\n--- Resumo: ${done} geradas, ${skipped} puladas, ${failures.length} falhas ---`);
if (done > 0) console.log(`Tamanho: ${mb(totalIn)} MB -> ${mb(totalWeb)} MB (web)`);
if (failures.length > 0) {
  failures.forEach((f) => console.log(` - ${f.srcPath}: ${f.message}`));
  process.exitCode = 1;
} else {
  console.log(`Pronto. Mescle as duas pastas de ${OUT_ROOT} na raiz do servidor de imagens.`);
}
