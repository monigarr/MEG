---
name: meg-validate
description: Validate MEG SVG production rules for assets
---

Run the project skill `meg-validate-svg`.

1. Read `.cursor/skills/meg-validate-svg/SKILL.md`.
2. Validate all `assets/**/*.svg` unless the user named specific files.
3. If Node is available, also run `node .cursor/hooks/validate-meg-svg.mjs` on those paths and include its output.
4. Report PASS/WARN/FAIL table and recommended next actions. Do not bulk-rewrite files unless asked.
