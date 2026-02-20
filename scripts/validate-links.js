#!/usr/bin/env node
/**
 * The Registry — Link Validation Script
 *
 * Validates internal markdown links resolve to existing files.
 * Extracts [text](path) and [text](path#anchor), resolves relative paths.
 *
 * Usage: node scripts/validate-links.js
 * Exit: 0 if all valid, 1 if broken links found.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g;

function getAllMarkdown(dir, base = dir) {
  const results = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = ent.name;
    const full = path.join(dir, name);
    if (name === 'node_modules' || name === '.git') continue;
    if (name.endsWith('.md')) results.push(path.relative(base, full));
    else if (ent.isDirectory()) results.push(...getAllMarkdown(full, base));
  }
  return results;
}

function extractLinks(content, baseDir) {
  const links = [];
  let m;
  while ((m = LINK_RE.exec(content)) !== null) {
    const raw = m[2];
    const [target, anchor] = raw.split('#');
    if (!target || target.startsWith('http://') || target.startsWith('https://') || target.startsWith('mailto:'))
      continue;
    const resolved = path.normalize(path.join(baseDir, target));
    links.push({ raw: target, resolved, anchor });
  }
  return links;
}

function main() {
  const mdFiles = getAllMarkdown(path.join(ROOT));
  const broken = [];

  for (const rel of mdFiles) {
    const fullPath = path.join(ROOT, rel);
    const dir = path.dirname(fullPath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const links = extractLinks(content, dir);

    for (const { raw } of links) {
      const targetPath = raw.split('#')[0];
      const absTarget = path.resolve(dir, targetPath);
      if (!fs.existsSync(absTarget)) {
        broken.push({ from: rel, link: raw, resolved: path.relative(ROOT, absTarget) });
      }
    }
  }

  if (broken.length > 0) {
    console.error('Broken links:\n');
    broken.forEach(({ from, link, resolved }) =>
      console.error(`  ${from} → ${link}\n    (resolved: ${resolved})\n`)
    );
    process.exit(1);
  }

  console.log('Link validation passed.');
  process.exit(0);
}

main();
