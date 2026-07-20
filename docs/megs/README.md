# MoniGarr Engineering Glyph Standard (MEGS)

**MEG** is the glyph system. **MEGS** is the standards suite that keeps it coherent for decades.

Start with product usage in the [style guide](../style-guide.md) or [getting started](../getting-started.md). Open a MEGS doc when you need **MUST/SHOULD** production rules.

---

## Status

All specs here are **Draft 0.1.0** unless noted. Drafts still guide this repository. **Approved** status requires an RFC per [MEGS-0007](MEGS-0007-contribution-and-rfc.md).

---

## Read in this order (recommended)

| Order | Spec | You need it when… |
|------:|------|-------------------|
| 1 | [MEGS-0008 Originality](MEGS-0008-originality-and-brand.md) | Designing or reviewing any glyph |
| 2 | [MEGS-0001 Anatomy](MEGS-0001-glyph-anatomy.md) | Drawing / editing SVG geometry |
| 3 | [MEGS-0005 Naming & Unicode](MEGS-0005-naming-and-unicode.md) | Choosing ids, shortcodes, PUA |
| 4 | [MEGS-0006 SVG Production](MEGS-0006-svg-production.md) | Shipping production SVG/font assets |
| 5 | [MEGS-0002 Taxonomy](MEGS-0002-semantic-taxonomy.md) | Assigning categories & meanings |
| 6 | [MEGS-0004 AI Metadata](MEGS-0004-ai-metadata.md) | Writing `docs/glyphs/*.json` |
| 7 | [MEGS-0003 Accessibility](MEGS-0003-accessibility.md) | Names, contrast, host UI a11y |
| 8 | [MEGS-0007 Contribution & RFC](MEGS-0007-contribution-and-rfc.md) | Changing the standard or catalog |

---

## Specification index

| ID | Title | File |
|----|-------|------|
| MEGS-0001 | Glyph Anatomy | [MEGS-0001-glyph-anatomy.md](MEGS-0001-glyph-anatomy.md) |
| MEGS-0002 | Semantic Taxonomy | [MEGS-0002-semantic-taxonomy.md](MEGS-0002-semantic-taxonomy.md) |
| MEGS-0003 | Accessibility | [MEGS-0003-accessibility.md](MEGS-0003-accessibility.md) |
| MEGS-0004 | AI Metadata | [MEGS-0004-ai-metadata.md](MEGS-0004-ai-metadata.md) |
| MEGS-0005 | Naming and Unicode | [MEGS-0005-naming-and-unicode.md](MEGS-0005-naming-and-unicode.md) |
| MEGS-0006 | SVG Production | [MEGS-0006-svg-production.md](MEGS-0006-svg-production.md) |
| MEGS-0007 | Contribution and RFC | [MEGS-0007-contribution-and-rfc.md](MEGS-0007-contribution-and-rfc.md) |
| MEGS-0008 | Originality and Brand | [MEGS-0008-originality-and-brand.md](MEGS-0008-originality-and-brand.md) |

## Machine-readable schema

| Schema | File |
|--------|------|
| Glyph metadata | [schemas/glyph-metadata.schema.json](schemas/glyph-metadata.schema.json) |

Instances: [`../glyphs/*.json`](../glyphs/).

---

## Language

| Term | Meaning |
|------|---------|
| **MUST** / **MUST NOT** | Mandatory |
| **SHOULD** / **SHOULD NOT** | Strongly recommended; document deviations |
| **MAY** | Optional |

## Versioning

Specs use `MAJOR.MINOR.PATCH` independent of npm package versions.

- **MAJOR** — breaking MUST changes  
- **MINOR** — compatible additions  
- **PATCH** — clarifications  

Silent breaking changes MUST NOT merge ([MEGS-0007](MEGS-0007-contribution-and-rfc.md)).

---

## Related

- [Documentation index](../README.md)
- [AGENTS.md](../../AGENTS.md) — agent hard laws
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — PR workflow
