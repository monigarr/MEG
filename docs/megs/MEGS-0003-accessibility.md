# MEGS-0003: Accessibility

| Field | Value |
|-------|-------|
| Status | Draft |
| Version | 0.1.0 |
| Normative | Yes (when Approved) |

## 1. Purpose

Ensure MEG communicates engineering intent without excluding people who use assistive technologies, keyboard-only navigation, or high-contrast environments.

## 2. Target level

- Implementations MUST meet **WCAG 2.2 Level AA**.
- Implementations SHOULD prefer **AAA** where practical (contrast, spacing, clarity).

## 3. Color independence

- Meaning MUST NOT depend on color alone.
- Glyphs MUST remain understandable in monochrome and high-contrast themes.
- Production SVGs MUST use `currentColor` so hosts control contrast.

## 4. Text alternatives

When a glyph is presented as meaningful UI content (not purely decorative):

- There MUST be an accessible name (`aria-label`, visible text, or SVG `<title>`).
- There SHOULD be a longer accessible description when the short name is insufficient (`aria-describedby` or SVG `<desc>`).
- Decorative uses MUST be hidden from assistive tech (`aria-hidden="true"` or equivalent).

Metadata MUST include:

- `accessibility.name` — short name
- `accessibility.description` — longer description

## 5. Keyboard and interaction (host UIs)

Docs sites, playgrounds, and editors that surface glyphs:

- MUST be fully keyboard operable
- MUST provide visible focus styles
- SHOULD support reduced-motion preferences for any animation
- MUST NOT trap focus

## 6. Motion

- Animation MAY be used for presence/hierarchy.
- Motion MUST NOT be required to understand glyph meaning.
- Hosts SHOULD respect `prefers-reduced-motion`.

## 7. Screen readers

- Shortcodes and engineering meanings SHOULD be available as text alongside icons in documentation.
- Icon-only controls MUST expose their engineering intent in the accessible name (e.g. “Needs human approval”), not only a vague “icon”.

## 8. References

- [MEGS-0001 Glyph Anatomy](MEGS-0001-glyph-anatomy.md)
- [MEGS-0004 AI Metadata](MEGS-0004-ai-metadata.md)
