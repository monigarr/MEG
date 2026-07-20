---
name: meg-bootstrap-monorepo
description: >-
  Scaffolds the opinionated MEG monorepo (PNPM, Turbo, packages for svg/react/vue,
  design-tokens, tests, CI stubs) only when the user explicitly asks to bootstrap
  or scaffold packages. Never run proactively.
disable-model-invocation: true
---

# Bootstrap MEG monorepo

## Hard gate

**Stop** unless the user explicitly asked to scaffold/bootstrap the monorepo or packages. Draft SVGs + MEGS alone are not permission.

## Target layout (opinionated)

```text
packages/
  svg/
  react/
  vue/
  svelte/
  web-components/
  design-tokens/
  cli/
docs/
examples/
tests/
scripts/
.github/
```

Tooling intent: TypeScript, Vite, PNPM, TurboRepo, ESLint, Prettier, Vitest, Playwright, Changesets, GitHub Actions stubs.

## Workflow

1. Confirm scope with user (which packages in v1 scaffold).
2. Preserve existing `assets/`, `docs/megs/`, `.cursor/`, licenses.
3. Add root workspace manifests without deleting glyph drafts.
4. Wire `packages/svg` to consume/export from `assets/` (or copy pipeline) per MEGS-0006.
5. Add minimal README sections for scripts; do not fake complete font/site/VS Code extensions in the first scaffold unless requested.
6. Run install/build/typecheck if tooling was added; fix failures before declaring done.

## Done criteria

Workspace installs; at least one package builds; MEGS and agent tooling remain authoritative.
