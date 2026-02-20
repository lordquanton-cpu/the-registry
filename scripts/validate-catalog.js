#!/usr/bin/env node
/**
 * The Registry — Catalog Validation Script
 *
 * Validates catalog.json against packages directory.
 * Ensures: all providers in catalog exist as packages; all packages are in catalog.
 *
 * Usage: node scripts/validate-catalog.js
 * Exit: 0 if valid, 1 if invalid.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'catalog.json');
const PACKAGES_PATH = path.join(ROOT, 'packages');

function main() {
  let errors = [];

  if (!fs.existsSync(CATALOG_PATH)) {
    console.error('Missing catalog.json');
    process.exit(1);
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const providerIds = new Set(catalog.providers.map((p) => p.id));

  // All catalog providers must have a package directory
  for (const id of providerIds) {
    const pkgPath = path.join(PACKAGES_PATH, id);
    if (!fs.existsSync(pkgPath) || !fs.statSync(pkgPath).isDirectory()) {
      errors.push(`Catalog has provider ${id} but no package at packages/${id}/`);
    }
  }

  // All package directories should be in catalog
  const dirs = fs.readdirSync(PACKAGES_PATH, { withFileTypes: true });
  for (const d of dirs) {
    if (d.isDirectory() && !providerIds.has(d.name)) {
      errors.push(`Package packages/${d.name}/ exists but not in catalog.json`);
    }
  }

  if (errors.length > 0) {
    console.error('Validation failed:\n');
    errors.forEach((e) => console.error('  -', e));
    process.exit(1);
  }

  console.log('Catalog validation passed.');
  process.exit(0);
}

main();
