# `@monigarr/meg-parser`

Zero-dependency shortcode → Private Use Area mapping for MEG.

## Install

```bash
pnpm add @monigarr/meg-parser
```

## Usage

```ts
import {
  replaceShortcodes,
  getGlyph,
  listShortcodes,
} from "@monigarr/meg-parser";

replaceShortcodes("Respect :authority: and :certitude:.");
getGlyph(":human_judgement:")?.codepoint; // "U+E00C"
listShortcodes(); // all known :shortcodes:
```

Install the **MEG-Glyphs** font ([`@monigarr/meg-font`](../font/README.md)) if you want designed shapes instead of tofu boxes for PUA characters.

## Docs

- [Getting started](../../docs/getting-started.md)
- [Style guide](../../docs/style-guide.md)
- Map source: [`config/unicode-map.json`](../../config/unicode-map.json)
