#!/usr/bin/env node
/**
 * The Registry — Image Optimization
 *
 * Resizes (max 1200px) and compresses PNG images for faster loading.
 *
 * Requires: npm install sharp (run from THE_REGISTRY root)
 * Usage: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PACKAGES = path.join(ROOT, 'packages');
const MAX_WIDTH = 1200;

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.warn('sharp not installed. Run: npm install sharp');
    console.warn('Skipping. Images used as-is.');
    process.exit(0);
  }

  const dirs = fs.readdirSync(PACKAGES, { withFileTypes: true });
  let count = 0;

  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const assetsDir = path.join(PACKAGES, d.name, 'assets');
    if (!fs.existsSync(assetsDir)) continue;

    for (const f of fs.readdirSync(assetsDir)) {
      if (!f.endsWith('.png')) continue;
      const src = path.join(assetsDir, f);
      const tmp = src + '.tmp.png';
      await sharp(src)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .png({ compressionLevel: 9 })
        .toFile(tmp);
      fs.renameSync(tmp, src);
      count++;
    }
  }

  console.log(`Optimized ${count} images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
