# `@monigarr/meg-react`

React components for every MEG glyph (`currentColor`, typed names).

## Install

```bash
pnpm add @monigarr/meg-react
```

## Usage

```tsx
import {
  AuthorityMark,
  CertitudePoint,
  HumanJudgement,
  MegIcon,
} from "@monigarr/meg-react";

export function Gates() {
  return (
    <>
      <AuthorityMark size={24} />
      <CertitudePoint size="1.25rem" />
      <HumanJudgement title="Needs human judgement" />
      <MegIcon name="governance" size={20} />
    </>
  );
}
```

Named exports are PascalCase ids (`authority_mark` → `AuthorityMark`). Prefer an accessible `title` when the icon is meaningful, not decorative.

## Docs

- [Getting started](../../docs/getting-started.md)
- [Style guide](../../docs/style-guide.md)
