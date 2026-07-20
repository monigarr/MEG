import { GLYPHS_BY_ID, SHORTCODE_MAP, type GlyphRef } from "./glyph-map.generated.js";

export type { GlyphRef };
export { GLYPHS_BY_ID, SHORTCODE_MAP };

const SHORTCODE_RE = /:[a-z][a-z0-9_]*:/g;

/** Look up a glyph by shortcode (e.g. `:authority:`). */
export function getGlyph(shortcode: string): GlyphRef | undefined {
  return SHORTCODE_MAP[shortcode];
}

/** Replace all known `:shortcodes:` in text with PUA characters. */
export function replaceShortcodes(text: string): string {
  return text.replace(SHORTCODE_RE, (match) => {
    const glyph = SHORTCODE_MAP[match];
    return glyph ? glyph.char : match;
  });
}

/** List all known shortcodes. */
export function listShortcodes(): string[] {
  return Object.keys(SHORTCODE_MAP).sort();
}
