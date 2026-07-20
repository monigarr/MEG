# MEG documentation

Welcome. Pick a path—humans and AI agents use the same facts, different entry points.

## Paths

| If you want to… | Go here |
|-----------------|--------|
| Onboard in ~5 minutes | [getting-started.md](getting-started.md) |
| Choose the right glyph | [style-guide.md](style-guide.md) |
| Read machine metadata / LLM instructions | [glyphs/](glyphs/) |
| Apply normative production rules | [megs/README.md](megs/README.md) |
| Contribute a glyph or fix | [../CONTRIBUTING.md](../CONTRIBUTING.md) |
| Act as an AI coding agent in-repo | [../AGENTS.md](../AGENTS.md) |

## How meaning is stored

Every shippable glyph has **three aligned identities**:

1. **File** — `assets/<id>.svg`
2. **Map** — `config/unicode-map.json` (`id`, `shortcodes`, `codepoint`)
3. **Semantics** — `docs/glyphs/<id>.json` (MEGS-0004 fields)

If those disagree, trust the standards process—and run `pnpm validate`.

## Spec language (MEGS)

- **MUST** — required
- **SHOULD** — strongly recommended
- **MAY** — optional

Draft specs still guide this repository until Approved via [MEGS-0007](megs/MEGS-0007-contribution-and-rfc.md).
