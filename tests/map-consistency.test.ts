import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const map = JSON.parse(
  readFileSync(join(root, "config/unicode-map.json"), "utf8"),
) as Record<string, { codepoint: string; shortcodes: string[] }>;

describe("unicode-map consistency", () => {
  it("has unique codepoints", () => {
    const codes = Object.values(map).map((e) => e.codepoint);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("matches assets and docs/glyphs 1:1", () => {
    for (const id of Object.keys(map)) {
      expect(existsSync(join(root, "assets", `${id}.svg`))).toBe(true);
      expect(existsSync(join(root, "docs/glyphs", `${id}.json`))).toBe(true);
    }
    const svgs = readdirSync(join(root, "assets")).filter((f) =>
      f.endsWith(".svg"),
    );
    expect(svgs.length).toBe(Object.keys(map).length);
  });

  it("keeps authority_mark and certitude_point stable", () => {
    expect(map.authority_mark.codepoint).toBe("U+E001");
    expect(map.certitude_point.codepoint).toBe("U+E002");
  });
});

describe("font info.json alignment", () => {
  const infoPath = join(root, "packages/font/dist/info.json");

  it("matches unicode-map encoded codes when font is built", () => {
    if (!existsSync(infoPath)) {
      return; // build not run yet in isolation
    }
    const info = JSON.parse(readFileSync(infoPath, "utf8")) as Record<
      string,
      { encodedCode: string }
    >;
    for (const [id, entry] of Object.entries(map)) {
      expect(info[id], id).toBeDefined();
      const expected = "\\" + entry.codepoint.replace(/^U\+/i, "").toLowerCase();
      expect(info[id].encodedCode.toLowerCase()).toBe(expected);
    }
  });
});
