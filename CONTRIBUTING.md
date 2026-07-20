# Contributing to MEG

Thank you for helping evolve MoniGarr Engineering Glyphs. This repo is both a **product** (glyphs & packages) and a **standard** (MEGS). Clarity beats cleverness.

New here? Read [docs/getting-started.md](docs/getting-started.md) first.

---

## Before you write code

| Change type | Read first |
|-------------|------------|
| Geometry / SVG | [MEGS-0001](docs/megs/MEGS-0001-glyph-anatomy.md), [MEGS-0006](docs/megs/MEGS-0006-svg-production.md), [MEGS-0008](docs/megs/MEGS-0008-originality-and-brand.md) |
| Ids / Unicode | [MEGS-0005](docs/megs/MEGS-0005-naming-and-unicode.md) |
| Meanings / AI text | [MEGS-0004](docs/megs/MEGS-0004-ai-metadata.md), [style guide](docs/style-guide.md) |
| New glyph or breaking semantics | [MEGS-0007 RFC](docs/megs/MEGS-0007-contribution-and-rfc.md) |

**Originality:** do not port Lucide, Heroicons, Font Awesome, or similar geometries.

---

## Development loop

```bash
pnpm install
pnpm run ci    # validate → build → test (required green)
```

| Script | When |
|--------|------|
| `pnpm validate` | After catalog / SVG / map edits |
| `pnpm build` | After assets or package source changes |
| `pnpm test` | After parser / map logic changes |
| `pnpm seed:glyphs` | Bootstrap JSON stubs (then hand-polish) |

---

## Add or change a glyph (checklist)

1. **RFC** if new or breaking ([MEGS-0007](docs/megs/MEGS-0007-contribution-and-rfc.md)).
2. Add `assets/<snake_case_id>.svg` (64×64, `currentColor`, stroke 2.5).
3. Register id + unique PUA + shortcodes in [`config/unicode-map.json`](config/unicode-map.json).
4. Author [`docs/glyphs/<id>.json`](docs/glyphs/) (schema: [glyph-metadata.schema.json](docs/megs/schemas/glyph-metadata.schema.json)).
5. Update the catalog in [`docs/style-guide.md`](docs/style-guide.md).
6. Note the change under `[Unreleased]` in [`CHANGELOG.md`](CHANGELOG.md).
7. Run `pnpm run ci`.

Cursor helpers: `/meg-new-glyph`, `/meg-validate`, `/meg-rfc` (see [AGENTS.md](AGENTS.md)).

---

## Pull requests

- Prefer small, focused PRs.
- Use Conventional Commits: `feat(glyphs):`, `fix(glyphs):`, `docs(megs):`, `chore:`.
- CI must pass ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).
- Reference issues as `#123` when applicable.

---

## Community

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md)
- Docs map: [docs/README.md](docs/README.md)
