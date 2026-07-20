---
name: meg-validate-svg
description: >-
  Validates MEG SVG files against MEGS-0006 production rules (viewBox, currentColor,
  stroke-width, snake_case names, duplicates, junk nodes). Use when reviewing or
  optimizing SVGs under assets/, after glyph edits, or when the user runs
  /meg-validate or asks for SVG validation.
---

# Validate MEG SVGs

## Authority

Follow `docs/megs/MEGS-0006-svg-production.md` and `MEGS-0005-naming-and-unicode.md`. Prefer running `.cursor/hooks/validate-meg-svg.mjs` when Node is available.

## Scope

- Default: all `assets/**/*.svg`
- Or: paths the user specifies

## Checklist (per file)

Report **PASS** / **WARN** / **FAIL**:

| Check | Severity |
|-------|----------|
| Filename matches `^[a-z][a-z0-9_]*\.svg$` | FAIL if not |
| Compacted name (no underscore) when a multi-word concept needs snake_case | WARN (known debt listed in MEGS-0005) |
| `viewBox="0 0 64 64"` | FAIL if missing/wrong |
| `currentColor` on primary stroke/fill | FAIL if hard-coded color used for meaning |
| `stroke-width="2.5"` (or documented exception) | WARN if other |
| No `inkscape:` / `sodipodi:` / script / raster | FAIL if present |
| Duplicate ids (e.g. `authoritymark` vs `authority_mark`) | WARN + note cleanup debt |

## Output format

```markdown
## MEG SVG validation

| File | Result | Issues |
|------|--------|--------|
| assets/foo.svg | PASS | |
| assets/bar.svg | FAIL | missing viewBox |

### Summary
- N passed, N warned, N failed
- Recommended next actions
```

Do not rewrite all SVGs unless the user asks; report first.
