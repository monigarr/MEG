# MoniGarr Engineering Glyphs (Obsidian)

Replaces MEG shortcodes with Private Use Area characters via `registerMarkdownPostProcessor`. Build with `pnpm --filter obsidian-monigarr-meg run build` (from repo root after `pnpm build:maps`).

## Font CSS (required for designed shapes)

1. Install `MEG-Glyphs.ttf` from a GitHub Release or `@monigarr/meg-font`.
2. Add an Obsidian CSS snippet:

```css
.markdown-preview-view,
.markdown-source-view {
  font-family: "MEG-Glyphs", var(--font-text);
}
```

Without the font, shortcodes still become PUA codepoints but render as missing-glyph boxes.

Community plugin directory submission is a separate manual step.
