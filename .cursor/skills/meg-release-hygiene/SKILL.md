---
name: meg-release-hygiene
description: >-
  Prepares MEG package or docs releases (semver impact, changelog notes, naming
  consistency, license stub awareness). Use before publishing packages or when
  the user asks for release readiness. Do not publish without explicit user ask.
disable-model-invocation: true
---

# MEG release hygiene

## Checklist

- [ ] Semver impact classified (glyph additive vs breaking semantic/codepoint change)
- [ ] Naming consistent (`snake_case`, no new compacted duplicates) — MEGS-0005
- [ ] SVG validation clean for release-tagged assets — MEGS-0006
- [ ] Metadata schema-valid for released glyphs — MEGS-0004
- [ ] MEGS versions bumped if specs changed
- [ ] License files acknowledged: do not invent license text; flag empty `LICENSE-*` / `OFL.txt` as blockers for public publish
- [ ] Changelog / release notes drafted (conventional commit summary)

## Output

Provide a short **Ready** / **Blocked** verdict with blocker list. Never `npm publish` / registry publish unless the user explicitly requests it.
