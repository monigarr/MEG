import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getGlyph,
  replaceShortcodes,
  SHORTCODE_MAP,
} from "../packages/parser/src/index.ts";

const root = join(import.meta.dirname, "..");
const unicodeMap = JSON.parse(
  readFileSync(join(root, "config/unicode-map.json"), "utf8"),
);

describe("meg-parser shortcodes", () => {
  it("maps :authority: to U+E001", () => {
    const g = getGlyph(":authority:");
    expect(g?.codepoint).toBe("U+E001");
    expect(g?.id).toBe("authority_mark");
    expect(g?.char).toBe("\uE001");
  });

  it("maps :certitude: to U+E002", () => {
    const g = getGlyph(":certitude:");
    expect(g?.codepoint).toBe("U+E002");
    expect(replaceShortcodes("x :certitude: y")).toContain("\uE002");
  });

  it("maps :sar_mark: to configured PUA", () => {
    const g = getGlyph(":sar_mark:");
    expect(g?.codepoint).toBe(unicodeMap.sar_mark.codepoint);
  });

  it("replaces multiple shortcodes", () => {
    const out = replaceShortcodes(":authority: + :certitude:");
    expect(out).toBe("\uE001 + \uE002");
  });

  it("exposes every unicode-map shortcode", () => {
    for (const entry of Object.values(unicodeMap) as Array<{
      shortcodes: string[];
    }>) {
      for (const sc of entry.shortcodes) {
        expect(SHORTCODE_MAP[sc], sc).toBeDefined();
      }
    }
  });
});
