# Changelog

All notable changes to MoniGarr Engineering Glyphs (MEG) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Five historical-punctuation Communication glyphs: `percontation_point`, `doubt_point`, `asterism`, `hedera`, `manicule` (U+E014–U+E018)
- Full 24-glyph shippable catalog with PUA map, `docs/glyphs/*.json`, and style-guide index
- pnpm monorepo packages (`@monigarr/meg-*`), font pipeline, VS Code + Obsidian scaffolds
- `pnpm validate` / `pnpm test` / `pnpm ci` and GitHub Actions CI + release workflows
- Triple licensing (MIT / SIL OFL 1.1 / CC BY 4.0)
- README demo media: animated GIF previews + mute MP4s for install/build and full glyph catalog (`assets/media/`)

### Changed

- README restructured for busy-engineer onboarding (use / consume / develop paths first)
- Removed compacted duplicate SVGs; renamed `sarmark` → `sar_mark`
- Documentation overhaul: getting-started, docs index, dual-audience README / AGENTS / style guide
