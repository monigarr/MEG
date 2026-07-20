import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "../..");

/** Formerly compacted duplicates; kept empty after MEGS-0005 cleanup. */
export const EXCLUDED_BASENAMES = new Set();

const SNAKE_CASE = /^[a-z][a-z0-9_]*\.svg$/;
const COMPACTED_FORBIDDEN =
  /^(authoritymark|certitudepoint|sarmark|doublepoint|humanjudgement)\.svg$/i;

export function loadFixedUnicodeMap() {
  const mapPath = path.join(ROOT, "config", "unicode-map.json");
  return JSON.parse(fs.readFileSync(mapPath, "utf8"));
}

export function listCanonicalSvgBasenames(assetsDir = path.join(ROOT, "assets")) {
  return fs
    .readdirSync(assetsDir)
    .filter((name) => name.endsWith(".svg"))
    .filter((name) => !EXCLUDED_BASENAMES.has(name))
    .filter((name) => SNAKE_CASE.test(name))
    .filter((name) => !COMPACTED_FORBIDDEN.test(name))
    .sort();
}

/**
 * Build full id → { codepoint, shortcodes, char, code } assignment.
 * Fixed map wins; remaining ids get next free PUA after max fixed.
 */
export function buildFullGlyphAssignment(ids) {
  const fixed = loadFixedUnicodeMap();
  const usedCodes = new Set();
  const byId = {};

  for (const [id, entry] of Object.entries(fixed)) {
    const code = parseInt(entry.codepoint.replace(/^U\+/i, ""), 16);
    usedCodes.add(code);
    byId[id] = {
      id,
      codepoint: `U+${code.toString(16).toUpperCase()}`,
      code,
      char: String.fromCodePoint(code),
      shortcodes: entry.shortcodes ?? [`:${id}:`],
    };
  }

  let next = 0xe003;
  for (const id of ids) {
    if (byId[id]) continue;
    while (usedCodes.has(next)) next += 1;
    usedCodes.add(next);
    byId[id] = {
      id,
      codepoint: `U+${next.toString(16).toUpperCase()}`,
      code: next,
      char: String.fromCodePoint(next),
      shortcodes: [`:${id}:`],
    };
    next += 1;
  }

  // Only return assignment for requested ids (shippable set)
  const filtered = {};
  for (const id of ids) {
    if (byId[id]) filtered[id] = byId[id];
  }
  return filtered;
}

export function codepointToCssEscape(code) {
  return `\\${code.toString(16)}`;
}
