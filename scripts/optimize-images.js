/**
 * Optimize all images in THE_REGISTRY packages for faster loading.
 * - Resizes to web-friendly dimensions
 * - Compresses PNG with quality preservation
 * - Strips metadata
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const REGISTRY_ROOT = path.join(__dirname, '..');
const PACKAGES_DIR = path.join(REGISTRY_ROOT, 'packages');

// Max dimensions by image type (width in px)
const HERO_MAX = 1200;   // Hero banners, product heroes
const LOGO_MAX = 600;   // Logos
const DIAGRAM_MAX = 1000; // Architecture, flow, pyramid diagrams

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function getMaxWidth(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('-logo') || lower.includes('logo.')) return LOGO_MAX;
  if (lower.includes('pyramid') || lower.includes('layers') || 
      lower.includes('flow') || lower.includes('pipeline') ||
      lower.includes('architecture') || lower.includes('escalation') ||
      lower.includes('product-line') || lower.includes('inquiry-protocol'))
    return DIAGRAM_MAX;
  return HERO_MAX;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return null;

  const stat = fs.statSync(filePath);
  const originalSize = stat.size;
  const filename = path.basename(filePath);
  const maxWidth = getMaxWidth(filename);

  let pipeline = sharp(filePath)
    .rotate() // Auto-orient from EXIF
    .resize(maxWidth, null, { withoutEnlargement: true });

  if (ext === '.png') {
    pipeline = pipeline
      .png({ compressionLevel: 9, palette: false })
      .toBuffer();
  } else if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer();
  } else if (ext === '.webp') {
    pipeline = pipeline
      .webp({ quality: 85 })
      .toBuffer();
  } else {
    return null;
  }

  const buffer = await pipeline;
  const newSize = buffer.length;

  if (newSize < originalSize) {
    fs.writeFileSync(filePath, buffer);
    return { filePath: path.relative(REGISTRY_ROOT, filePath), originalSize, newSize, saved: originalSize - newSize };
  }
  return null;
}

async function processDirectory(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await processDirectory(fullPath));
    } else if (entry.isFile()) {
      try {
        const result = await optimizeImage(fullPath);
        if (result) results.push(result);
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err.message);
      }
    }
  }
  return results;
}

async function main() {
  console.log('Optimizing images in THE_REGISTRY...\n');

  const assetsDir = path.join(PACKAGES_DIR, 'NULL_AXIS', 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('No packages/assets found.');
    process.exit(1);
  }

  const results = [];
  const packages = fs.readdirSync(PACKAGES_DIR);

  for (const pkg of packages) {
    const pkgPath = path.join(PACKAGES_DIR, pkg);
    const assetsPath = path.join(pkgPath, 'assets');
    if (fs.existsSync(assetsPath) && fs.statSync(assetsPath).isDirectory()) {
      results.push(...await processDirectory(assetsPath));
    }
  }

  if (results.length === 0) {
    console.log('No images needed optimization (already optimal or unsupported format).');
    return;
  }

  let totalOriginal = 0;
  let totalNew = 0;
  console.log('Optimized:\n');
  for (const r of results) {
    const pct = ((1 - r.newSize / r.originalSize) * 100).toFixed(1);
    console.log(`  ${r.filePath}`);
    console.log(`    ${(r.originalSize / 1024).toFixed(0)} KB → ${(r.newSize / 1024).toFixed(0)} KB (${pct}% smaller)`);
    totalOriginal += r.originalSize;
    totalNew += r.newSize;
  }

  const totalSaved = totalOriginal - totalNew;
  const pct = ((totalSaved / totalOriginal) * 100).toFixed(1);
  console.log(`\nTotal: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB → ${(totalNew / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB (${pct}%)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
