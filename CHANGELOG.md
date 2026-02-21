# Changelog

All notable changes to The Registry are documented here.  
**Format:** [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).  
**Classification:** Meta. Project history.

---

## [1.4.0] - 2025-02

### Removed

- **Contact/automation** — Removed public contact email and Make.com inquiry automation. Art project remains; no automated responses.
- **CONTACT.md** — Deleted.
- **AGENT_SPEC/** — Removed (Make.com blueprint).

### Changed

- **scripts/deploy-assets.ps1** — Uses `$PSScriptRoot` and `$env:CURSOR_ASSETS` (or `./generated-assets/`). No hardcoded user paths.
- **ENHANCEMENT_REPORT.md** — Updated AGENT_SPEC references to AGENTS.md.

---

## [1.3.0] - 2025-02

### Added

- **00_PRICING_INDEX.md** — Consolidated pricing for all 24 providers. Tiers, à la carte, escrow thresholds.
- **00_TESTIMONIALS_INDEX.md** — Value propositions from all 24 specs. Anonymous verified references (canon: discretion).

---

## [1.2.0] - 2025-02

### Added

- **Spec hero images** — All 24 flagship specs now have hero banners. Dark minimalist aesthetic.
- **inquiry-protocol.png** — Shared flow diagram for 05_INQUIRY_PROTOCOL across all packages.
- **scripts/deploy-assets.ps1** — Deploy generated images to package assets.
- **scripts/optimize-images.js** — Resize/compress images for faster loading (max 1200px, sharp).

### Changed

- All package assets optimized for web. Images resized and compressed.

---

## [1.1.0] - 2025-02

### Added

- **QUICKSTART.md** — Reader paths. Onboarding for explorers, contributors, AI agents.
- **scripts/validate-links.js** — Validates internal markdown links resolve.
- **00_UNIVERSE.md** — "Explore Further" section with generative questions.
- **README.md** — Provider names link to packages. QUICKSTART in navigation.

### Changed

- CONTRIBUTING pre-submit checklist now includes link validation.

---

## [1.0.0] - 2025

### Added

- **Catalog** — 24 fictional providers with full package structure.
- **00_REGISTRY_CATALOG.md** — Central index. Flagship products. Inquiry protocol.
- **00_UNIVERSE.md** — Canon. Sector taxonomy. Operating principles.
- **00_GLOSSARY.md** — Canonical definitions for terms.
- **catalog.json** — Machine-readable provider index for tooling.
- **Packages** — Per-provider: 00_INDEX, 01–06 document set, assets.
- **Reference package** — NULL_AXIS (depth standard).
- **LICENSE** — CC BY-NC-SA 4.0.
- **CONTRIBUTING.md** — Package structure. Quality bar. Extension guide.

### Canon

- Operating principles: Discretion, Deniability, Prepayment, Referral.
- Sector clusters: Influence, Exfiltration, Evasion, Intelligence, Financial, Attribution, Severance, Enforcement.

---

*Fictional. Artistic. No paper trail.*
