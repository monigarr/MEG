# MEGS-0002: Semantic Taxonomy

| Field | Value |
|-------|-------|
| Status | Draft |
| Version | 0.1.0 |
| Normative | Yes (when Approved) |

## 1. Purpose

Organize MEG glyphs into stable semantic categories so humans and agents share one vocabulary for engineering intent.

## 2. Identity

Every glyph MUST have:

| Field | Rule |
|-------|------|
| `id` | `snake_case`, unique, matches filename without `.svg` |
| `shortcode` | `:snake_case:` matching `id` |
| `category` | One primary category from §3 |
| `visualMeaning` | What the mark looks like / evokes |
| `semanticMeaning` | What it means in communication |
| `engineeringMeaning` | What it means in software/engineering practice |

## 3. Primary categories

Glyphs MUST declare exactly one primary category:

- Engineering
- Architecture
- Governance
- Security
- Compliance
- AI
- Machine Learning
- Human Oversight
- Documentation
- Specifications
- Observability
- Testing
- Quality
- Workflow
- Communication
- Knowledge
- Leadership
- Research
- Innovation
- Decision Making
- Ethics
- Privacy
- Risk
- Reliability
- Accessibility
- Culture
- Language
- Community
- Human-Centered Design

Secondary categories MAY be listed as tags.

## 4. Shortcodes

- Shortcodes MUST use the form `:id:`.
- Shortcodes MUST be unique across the catalog.
- Aliases MAY map alternate spellings to the canonical `id` but MUST NOT create a second primary shortcode.

## 5. Keywords and search

Each glyph SHOULD include:

- `aliases` — alternate human names
- `keywords` — search terms
- `tags` — cross-cutting labels (e.g. `ai-native`, `governance`)

## 6. Recommended usage

Each glyph MUST document:

- When to use it
- When not to use it
- At least one concrete engineering example

## 7. References

- [MEGS-0004 AI Metadata](MEGS-0004-ai-metadata.md)
- [MEGS-0005 Naming and Unicode](MEGS-0005-naming-and-unicode.md)
