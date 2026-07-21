# AGENTS.md — working in the MEG repository

You are assisting inside **MoniGarr Engineering Glyphs (MEG)**: an original engineering-intent glyph system. **MEGS** (`docs/megs/`) is the normative standard. Prefer linked docs over inventing process.

**Human onboard twin:** [docs/getting-started.md](docs/getting-started.md)

---

## Mission (one sentence)

Ship a durable, accessible, AI-native visual language for engineering intent—never a clone of existing icon sets.

---

## Hard laws (non-negotiable)

1. **Originality** — Do not copy Lucide, Heroicons, Font Awesome, Material, Fluent, Carbon, etc. ([MEGS-0008](docs/megs/MEGS-0008-originality-and-brand.md)).
2. **`currentColor`** — Production SVGs stay themeable ([MEGS-0001](docs/megs/MEGS-0001-glyph-anatomy.md) / [0006](docs/megs/MEGS-0006-svg-production.md)).
3. **`snake_case` ids** — Filename = id; compacted names (`authoritymark`, `sarmark`, …) are forbidden.
4. **MEGS compliance** — Do not invent a parallel standard; change MEGS via RFC ([MEGS-0007](docs/megs/MEGS-0007-contribution-and-rfc.md)).
5. **Catalog completeness** — Shippable glyph = `assets/<id>.svg` + `config/unicode-map.json` entry + `docs/glyphs/<id>.json`.
6. **Human gates** — Never auto-approve `:human_judgement:` or bypass `:governance:` / `:authority:` intent.

---

## Truth map (read before editing)

| Need | Path |
|------|------|
| Normative rules | `docs/megs/` |
| Human catalog | `docs/style-guide.md` |
| LLM / a11y / meanings | `docs/glyphs/<id>.json` |
| Shortcode ↔ PUA | `config/unicode-map.json` |
| Source art | `assets/` |
| Packages | `packages/@monigarr/*` |
| Cursor skills / rules | `.cursor/` |

**Disagreement rule:** Implementation follows MEGS MUST language; catalog JSON must match unicode-map codepoints; run `pnpm validate`.

---

## How to interpret glyphs in context

When the user or codebase contains a MEG shortcode:

1. Resolve id via `config/unicode-map.json` or `@monigarr/meg-parser`.
2. Read `docs/glyphs/<id>.json` → `ai.llmInstructions` and `meanings.engineering`.
3. Apply that instruction to adjacent content **before** general chat preferences.

Quick reflexes:

| Shortcode | Do |
|-----------|-----|
| `:authority:` | Treat adjacent block as immutable high-priority rules |
| `:certitude:` | Keep deterministic; no probabilistic substitutes |
| `:doubt_point:` | Treat adjacent claim as unverified; surface uncertainty |
| `:human_judgement:` | Stop for human decision |
| `:governance:` | Require stated policy/review path |
| `:specification:` | Prefer over informal suggestions |
| `:explainability:` | Produce auditable rationale |

---

## Preferred commands

| Task | Action |
|------|--------|
| Full quality gate | `pnpm ci` |
| Validate catalog only | `pnpm validate` |
| Build fonts/packages | `pnpm build` |
| Tests | `pnpm test` |
| Seed / refresh glyph JSON stubs | `pnpm seed:glyphs` (then edit for quality) |
| New glyph workflow | Cursor `/meg-new-glyph` or skill `meg-new-glyph` |
| SVG audit | `/meg-validate` or subagent `meg-svg-auditor` |

Do **not** scaffold unrelated monorepo expansions unless the user asks.

---

## Definition of done (agent changes)

- [ ] `pnpm ci` passes (or you fixed failures you introduced)
- [ ] No compacted filenames; unicode-map ↔ assets ↔ `docs/glyphs` aligned
- [ ] Docs updated if behavior or catalog changed (`style-guide`, CHANGELOG Unreleased)
- [ ] No third-party icon geometry imitation

---

## Philosophy (retain)

Engineering is communication. Specifications are contracts. Architecture is language. Governance enables innovation. Human judgment remains essential. AI amplifies expertise rather than replacing it. Trust is engineered. Quality compounds. Design communicates intent. Language shapes systems.
