---
name: meg-a11y-audit
description: >-
  Audits MEG glyphs and related docs/UI against MEGS-0003 (WCAG 2.2 AA, color
  independence, accessible names/descriptions, keyboard and reduced motion for
  hosts). Use for accessibility reviews or when the user runs /meg-a11y.
---

# MEG accessibility audit

## Authority

`docs/megs/MEGS-0003-accessibility.md`.

## Scope

- Glyph SVGs + their metadata / style-guide entries
- Any host UI touched in the change (docs site, playground) when present

## Checks

- [ ] Meaning does not depend on color alone
- [ ] Production SVG uses `currentColor`
- [ ] `accessibility.name` and `accessibility.description` present for catalog glyphs
- [ ] Meaningful vs decorative usage guidance is clear
- [ ] Host UI (if any): keyboard operable, visible focus, `prefers-reduced-motion` respected
- [ ] Icon-only controls expose engineering intent in the accessible name

## Report format

```markdown
## MEG a11y audit
### Critical
### Serious
### Moderate
### Passes
### Recommendations
```

Cite file paths. Do not invent WCAG failures without evidence from the files reviewed.
