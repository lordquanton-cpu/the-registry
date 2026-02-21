# Contributing to The Registry

The Registry is a **fictional worldbuilding project**. No services exist. No contracts are fulfilled. This document guides those who want to extend, remix, or deepen the universe.

---

## Before You Start

**Read the LICENSE.** [CC BY-NC-SA 4.0](LICENSE) — Attribution, NonCommercial, ShareAlike. Your contributions must follow it.

**Understand the tone.** Providers speak in the voice of deniable black-ops consultancies: terse, operational, no fluff. Taglines land. Discretion is absolute.

---

## Package Structure (Canonical)

Each provider lives in `/packages/[PROVIDER]/` with this document set:

| Document | Purpose |
|----------|---------|
| `README.md` | Package entry point. Quick start. Links to rest. |
| `00_INDEX.md` | Definitive index. Package structure. Assets table. Company identity. |
| `01_COMPANY_OVERVIEW.md` | Who we are. Why we exist. Principles. Sector expertise. |
| `02_PRODUCT_CATALOG.md` | Service tiers. À la carte. Ancillary. What you're buying. |
| `03_*_SPEC.md` | Flagship product — full technical specification. |
| `04_SERVICE_AGREEMENT.md` | Terms. Nine sections. Tailored to provider. |
| `05_INQUIRY_PROTOCOL.md` | Vetting. Channels. Payment. Timeline. What we do not do. |
| `06_ONE_PAGER.md` | Executive summary — single page. WHO WE ARE, WHAT WE OFFER, TIERS, PRINCIPLES, NEXT STEP. |

**Reference package:** [NULL_AXIS](packages/NULL_AXIS/) — treat as the depth standard.

---

## Adding a New Provider

1. **Choose a sector** — Ensure it doesn't overlap excessively with existing providers. See [00_REGISTRY_CATALOG.md](00_REGISTRY_CATALOG.md) for current coverage.

2. **Name convention** — Two words. UPPER_SNAKE_CASE for folder. Evocative, not generic. (e.g., NIGHT_RUN, FALSE_DOOR.)

3. **Copy structure** — Duplicate `packages/NULL_AXIS/` as template. Rename files. Replace content. Keep the *structure*; personalize the *voice*.

4. **Register** — Add to:
   - [README.md](README.md) — Registry Members table
   - [00_REGISTRY_CATALOG.md](00_REGISTRY_CATALOG.md) — Full row with Spec link
   - [catalog.json](catalog.json) — `providers` array and `sector_clusters` if new cluster
   - README Structure tree

5. **Assets** — Place images in `packages/[PROVIDER]/assets/`. Reference in `00_INDEX.md` Assets table. Run `node scripts/optimize-images.js` to resize/compress for web.

---

## Asset Scripts

| Script | Purpose |
|-------|---------|
| `scripts/deploy-assets.ps1` | Copy generated hero images from Cursor assets to package folders. |
| `scripts/optimize-images.js` | Resize (max 1200px) and compress PNGs. Requires `sharp` (npm install sharp). |

---

## Quality Bar

- **Consistency** — Match NULL_AXIS depth for 01–06. No abbreviated sections.
- **Voice** — Operational. Terse. Deniable. No marketing speak.
- **Universe coherence** — Payment: crypto/structured finance. Referral required. No paper trail.
- **Disclaimers** — Fictional. Artistic. Nothing here is real.

---

## Pre-Submit Checklist

Before proposing a new provider or major change:

- [ ] All documents 01–06 present. No abbreviated sections.
- [ ] Links from catalog/README updated.
- [ ] Sector fits without excessive overlap (see 00_UNIVERSE taxonomy).
- [ ] Terms used are canon-aligned (see [00_GLOSSARY.md](00_GLOSSARY.md)).
- [ ] Package added to [catalog.json](catalog.json) if new provider.
- [ ] Run `node scripts/validate-catalog.js` and `node scripts/validate-links.js` before committing.
- [ ] No real service solicitation. No content that could be mistaken for illegal services.

---

## What We Don't Accept

- Real service offerings or solicitations
- Content that could be mistaken for actual illegal services
- Breaking the fictional frame (e.g., meta-commentary inside provider docs)

---

*Extend the universe. Keep the voice. No paper trail.*
