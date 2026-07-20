# MEGS-0004: AI Metadata

| Field | Value |
|-------|-------|
| Status | Draft |
| Version | 0.1.0 |
| Normative | Yes (when Approved) |

## 1. Purpose

Define machine-readable metadata so AI agents, MCP tools, search, and structured outputs interpret glyphs with stable engineering intent.

## 2. Required metadata object

Each glyph MUST provide metadata conforming to [schemas/glyph-metadata.schema.json](schemas/glyph-metadata.schema.json).

Required top-level fields:

| Field | Description |
|-------|-------------|
| `id` | Canonical snake_case id |
| `shortcode` | `:id:` form |
| `codepoint` | Unicode PUA codepoint string (e.g. `U+E001`) when assigned |
| `category` | Primary category (MEGS-0002) |
| `meanings.visual` | Visual meaning |
| `meanings.semantic` | Semantic meaning |
| `meanings.engineering` | Engineering meaning |
| `accessibility.name` | Accessible name |
| `accessibility.description` | Accessible description |
| `ai.intent` | One-line intent for models |
| `ai.llmInstructions` | How an agent MUST behave when the glyph appears |
| `ai.recommendedPrompts` | Example prompts that correctly use the glyph |
| `ai.engineeringContext` | Typical systems/docs where it applies |
| `aliases` | Alternate names |
| `keywords` | Search keywords |
| `tags` | Cross-cutting tags |

## 3. LLM instruction quality

`ai.llmInstructions` MUST:

- Be actionable (tell the model what to do / not do)
- Avoid overclaiming (“always true in all jurisdictions”)
- Preserve human oversight where the glyph denotes approval, risk, or governance
- Remain consistent with `meanings.engineering`

## 4. Structured outputs and MCP

- Metadata SHOULD be exposable as JSON for MCP resources/tools.
- Embeddings and search indexes SHOULD use `keywords`, `aliases`, `tags`, and all three meaning fields.
- Schema `$id` SHOULD remain stable across minor versions.

## 5. Prompt safety

Recommended prompts MUST NOT instruct models to bypass security, compliance, or human-approval gates represented by glyphs such as governance or human judgement.

## 6. References

- [MEGS-0002 Semantic Taxonomy](MEGS-0002-semantic-taxonomy.md)
- [MEGS-0005 Naming and Unicode](MEGS-0005-naming-and-unicode.md)
