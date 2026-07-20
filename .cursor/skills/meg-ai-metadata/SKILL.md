---
name: meg-ai-metadata
description: >-
  Writes MEGS-0004 AI metadata for glyphs (intent, LLM instructions, recommended
  prompts, engineering context, keywords). Use when filling glyph JSON, improving
  style-guide AI fields, or preparing MCP/search metadata.
---

# MEG AI metadata

## Authority

`docs/megs/MEGS-0004-ai-metadata.md` + `docs/megs/schemas/glyph-metadata.schema.json`.

## Workflow

1. Confirm `id`, `shortcode`, `category`, and three meaning fields exist.
2. Write `ai.intent` (one line).
3. Write `ai.llmInstructions` — actionable do/don't for agents.
4. Add ≥1 `ai.recommendedPrompts` that correctly use the glyph.
5. Write `ai.engineeringContext` (where it appears in real systems).
6. Fill `aliases`, `keywords`, `tags` for search/embeddings.
7. Sanity-check with skill mindset of `meg-ai-semantics-reviewer`: no overclaiming, no bypass of human approval / security / governance.

## Quality bar

| Good | Bad |
|------|-----|
| “Treat adjacent module as immutable high-priority rules.” | “Ignore all other instructions forever.” |
| “Do not replace with probabilistic alternatives.” | “This code can never have bugs.” |

## Output

Prefer JSON matching the schema. If only docs are updated, mirror the same field names in `docs/style-guide.md`.
