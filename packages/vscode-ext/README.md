# MoniGarr Engineering Glyphs (VS Code)

Markdown **shortcode autocomplete** and **hover docs** for all MEG glyphs.

## Setup

1. Build from repo root: `pnpm build` (produces `packages/vscode-ext/out/`).
2. Install **MEG-Glyphs** from `@monigarr/meg-font` or a GitHub Release.
3. Settings → Font Family → prepend `'MEG-Glyphs'`.

## Use

- Type `:` in a Markdown file → completion list of shortcodes.
- Hover a shortcode → engineering meaning + LLM guidance (from `docs/glyphs`).
- Commands: **MEG: Insert :authority:** / **MEG: Insert :certitude:**

Product docs: [getting started](../../docs/getting-started.md).
