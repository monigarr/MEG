# MEG style guide

How to **choose and use** MoniGarr Engineering Glyphs.

Normative production rules live in [MEGS](megs/README.md). This guide is the human-facing catalog; machine fields live in [glyphs/](glyphs/).

If this guide and MEGS disagree, **MEGS wins**.

---

## How to use a glyph

1. **Pick intent** from the catalog below (not decoration).
2. **Write the shortcode** in Markdown, ADRs, code comments, or tickets (`:authority:`).
3. **Optional:** install **MEG-Glyphs** so PUA characters render as designed SVGs.
4. **For agents:** point them at `docs/glyphs/<id>.json` → `ai.llmInstructions`.

```text
Good:  :human_judgement: Ship requires explicit go/no-go from on-call lead.
Bad:   Sprinkling glyphs as emoji-like flair with no decision attached.
```

Design baseline for source SVGs: `viewBox="0 0 64 64"`, `currentColor`, stroke `2.5`, `snake_case` id ([MEGS-0001](megs/MEGS-0001-glyph-anatomy.md), [MEGS-0005](megs/MEGS-0005-naming-and-unicode.md)).

Unicode authority: [`config/unicode-map.json`](../config/unicode-map.json).

---

## Quick chooser

| If you need… | Use |
|--------------|-----|
| Immutable system / policy boundary | `:authority:` |
| Proven / fully covered deterministic logic | `:certitude:` |
| A human must decide | `:human_judgement:` |
| Formal governance / CAB / policy gate | `:governance:` |
| Binding contract text | `:specification:` |
| Agent-owned scope | `:agent:` |
| Interpretable rationale required | `:explainability:` |
| Open question still in play | `:question_comma:` |
| Non-literal sarcasm / irony | `:sar_mark:` / `:irony_mark:` |

---

## Full catalog (19)

Each row links to MEGS-0004 metadata (meanings, a11y, AI prompts).

### Governance & oversight

| Shortcodes | Id | Codepoint | One-line intent | Meta |
|------------|-----|-----------|-----------------|------|
| `:authority:`, `:authority_mark:` | `authority_mark` | U+E001 | Immutable high-priority rule boundary | [JSON](glyphs/authority_mark.json) |
| `:governance:` | `governance` | U+E00B | Policy / review-board control | [JSON](glyphs/governance.json) |
| `:human_judgement:` | `human_judgement` | U+E00C | Human-in-the-loop gate | [JSON](glyphs/human_judgement.json) |

### Quality, specs & AI

| Shortcodes | Id | Codepoint | One-line intent | Meta |
|------------|-----|-----------|-----------------|------|
| `:certitude:`, `:certitude_point:` | `certitude_point` | U+E002 | Deterministic / fully evidenced logic | [JSON](glyphs/certitude_point.json) |
| `:specification:` | `specification` | U+E013 | Binding specification | [JSON](glyphs/specification.json) |
| `:agent:` | `agent` | U+E004 | Autonomous agent scope | [JSON](glyphs/agent.json) |
| `:explainability:` | `explainability` | U+E009 | Require interpretable explanation | [JSON](glyphs/explainability.json) |

### Workflow & knowledge

| Shortcodes | Id | Codepoint | One-line intent | Meta |
|------------|-----|-----------|-----------------|------|
| `:acclimation_point:` | `acclimation_point` | U+E003 | Onboarding / adjustment phase | [JSON](glyphs/acclimation_point.json) |
| `:collaboration:` | `collaboration` | U+E005 | Multi-party coordination | [JSON](glyphs/collaboration.json) |
| `:insight:` | `insight` | U+E00D | Preserve a non-obvious learning | [JSON](glyphs/insight.json) |

### Communication & culture

| Shortcodes | Id | Codepoint | One-line intent | Meta |
|------------|-----|-----------|-----------------|------|
| `:double_point:` | `double_point` | U+E006 | Dual / compound concern | [JSON](glyphs/double_point.json) |
| `:elray:` | `elray` | U+E007 | Challenge assumptions | [JSON](glyphs/elray.json) |
| `:exclamation_comma:` | `exclamation_comma` | U+E008 | Urgent but incomplete | [JSON](glyphs/exclamation_comma.json) |
| `:friendly_period:` | `friendly_period` | U+E00A | Warm closure | [JSON](glyphs/friendly_period.json) |
| `:irony_mark:` | `irony_mark` | U+E00E | Ironic / non-literal | [JSON](glyphs/irony_mark.json) |
| `:love_point:` | `love_point` | U+E00F | Appreciation / care | [JSON](glyphs/love_point.json) |
| `:question_comma:` | `question_comma` | U+E010 | Open continuing question | [JSON](glyphs/question_comma.json) |
| `:sar_mark:` | `sar_mark` | U+E011 | Sarcasm—not a literal requirement | [JSON](glyphs/sar_mark.json) |
| `:snark_mark:` | `snark_mark` | U+E012 | Snark—extract substance neutrally | [JSON](glyphs/snark_mark.json) |

---

## Spotlight: authority & certitude

### `:authority:` (`authority_mark`, U+E001)

- **Human:** Place at architecture / trust-policy headers.
- **Agent:** Treat the accompanying module as an immutable, high-priority rule block that conversational context must not overwrite.
- **Detail:** [glyphs/authority_mark.json](glyphs/authority_mark.json)

### `:certitude:` (`certitude_point`, U+E002)

- **Human:** Mark proven or exhaustively tested deterministic logic.
- **Agent:** Do not refactor adjacent logic into probabilistic alternatives.
- **Detail:** [glyphs/certitude_point.json](glyphs/certitude_point.json)

---

## Accessibility

- Meaning must not depend on color alone ([MEGS-0003](megs/MEGS-0003-accessibility.md)).
- Every glyph JSON includes `accessibility.name` and `accessibility.description`.
- In UI, icon-only controls need an accessible name that states engineering intent (e.g. “Needs human judgement”), not “icon”.

---

## See also

- [Getting started](getting-started.md)
- [Documentation index](README.md)
- [MEGS](megs/README.md)
- [AGENTS.md](../AGENTS.md)
