# MEGS-0007: Contribution and RFC

| Field | Value |
|-------|-------|
| Status | Draft |
| Version | 0.1.0 |
| Normative | Yes (when Approved) |

## 1. Purpose

Define how glyphs, MEGS specs, and repository changes evolve without breaking semantic stability.

## 2. Conventional commits

Commits SHOULD use Conventional Commits:

- `feat(glyphs):` new glyph or metadata
- `fix(glyphs):` geometry or metadata correction
- `docs(megs):` specification changes
- `chore:` tooling, hooks, CI
- `refactor:` non-semantic restructuring

Reference issues as `#<number>` when applicable.

## 3. Glyph RFC process

For a **new glyph** or **breaking semantic change**:

1. Propose: id, category, meanings, sketch or draft SVG, AI metadata outline.
2. Validate: run `/meg-validate` and accessibility checks.
3. Review: use `meg-glyph-reviewer` and `meg-ai-semantics-reviewer` subagents (or human equivalent).
4. Assign codepoint only after id/shortcode stabilize (MEGS-0005).
5. Land: SVG + metadata + style-guide/docs update in one focused change set.

Trivial optical fixes that do not change meaning MAY skip a formal RFC but MUST still pass SVG validation.

## 4. MEGS spec changes

- Spec edits MUST bump the spec version per [README](README.md) versioning rules.
- MUST changes that break existing glyphs require a migration note.
- Silent breaking changes MUST NOT be merged.

## 5. Architecture Decision Records

Structural decisions (monorepo layout, font pipeline, packaging) SHOULD be recorded as ADRs under `docs/adr/` when that directory exists.

## 6. Quality bar

Contributions MUST meet the project quality bar described in `AGENTS.md` and MEGS-0008. Prototype-quality glyphs MUST NOT be marked production-ready.

## 7. References

- [MEGS-0008 Originality and Brand](MEGS-0008-originality-and-brand.md)
- [AGENTS.md](../../AGENTS.md)
