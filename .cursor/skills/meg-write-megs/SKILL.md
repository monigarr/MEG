---
name: meg-write-megs
description: >-
  Authors or revises MEGS specification documents with MUST/SHOULD discipline,
  version bumps, and cross-links. Use when editing docs/megs/, adding a MEGS-####
  spec, or when the user runs /meg-megs-update.
disable-model-invocation: true
---

# Write / update MEGS specs

## Steps

1. Read `docs/megs/README.md` versioning rules and `MEGS-0007`.
2. Determine change class: PATCH (clarity), MINOR (compatible add), MAJOR (breaking MUST).
3. Edit the spec file; update the `Version` field in the header table.
4. Update `docs/megs/README.md` index if adding a new spec id.
5. If schema changes, update `docs/megs/schemas/` and reference it from MEGS-0004.
6. Note migrations when MUST rules break existing glyphs.

## Spec template

```markdown
# MEGS-00NN: Title

| Field | Value |
|-------|-------|
| Status | Draft |
| Version | X.Y.Z |
| Normative | Yes (when Approved) |

## 1. Purpose
...
```

## Rules

- Prefer cross-links over copying large sections from other MEGS docs.
- Keep examples clearly non-normative unless stated as requirements.
- Do not approve Draft → Approved without user/RFC intent.
