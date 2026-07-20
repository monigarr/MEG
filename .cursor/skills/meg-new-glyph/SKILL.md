---
name: meg-new-glyph
description: >-
  Designs and registers a new MoniGarr Engineering Glyph end-to-end (taxonomy,
  original SVG, MEGS-0004 metadata, a11y strings, style-guide entry, validation).
  Use when adding a glyph, promoting a draft in assets/, or the user mentions
  meg-new-glyph, new glyph, or glyph RFC creation.
---

# New MEG glyph

## Preconditions

1. Read `docs/megs/MEGS-0001`, `0002`, `0005`, `0006`, `0008` and `docs/megs/schemas/glyph-metadata.schema.json`.
2. Confirm the glyph is **original** (refuse third-party icon ports).

## Workflow

Copy and track:

```
Glyph progress:
- [ ] 1. Id + category + meanings
- [ ] 2. Geometry against MEGS-0001
- [ ] 3. Write assets/<id>.svg
- [ ] 4. Metadata stub (schema)
- [ ] 5. Accessibility name/description
- [ ] 6. Style-guide or catalog entry
- [ ] 7. Validate (meg-validate-svg checklist)
```

### 1. Identity

- Choose `snake_case` `id` (filename = `id.svg`).
- Primary `shortcode` = `:id:`.
- Pick one primary category from MEGS-0002.
- Draft `meanings.visual|semantic|engineering`, `usage`, aliases/keywords/tags.

### 2–3. Geometry + SVG

- Canvas `0 0 64 64`, `currentColor`, stroke `2.5`, minimal nodes.
- Save to `assets/<id>.svg`.
- Do not assign a new PUA `codepoint` until id/shortcode stabilize (MEGS-0005).

### 4–5. Metadata + a11y

- Fill AI fields per MEGS-0004 (`intent`, `llmInstructions`, `recommendedPrompts`, `engineeringContext`).
- `llmInstructions` must be actionable and must not bypass governance/human-approval intent.

### 6. Docs

- Add or update an entry in `docs/style-guide.md` (or future catalog JSON under a glyphs path).

### 7. Validate

- Run the `meg-validate-svg` checklist on the new file.
- Optionally invoke readonly subagents `meg-glyph-reviewer` and `meg-ai-semantics-reviewer`.

## Done criteria

SVG + schema-valid metadata fields + docs entry + validation checklist green (or explicit draft caveats listed).
