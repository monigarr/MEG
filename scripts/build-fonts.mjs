import fs from "node:fs";
import path from "node:path";
import svgtofont from "svgtofont";
import {
  ROOT,
  buildFullGlyphAssignment,
  listCanonicalSvgBasenames,
} from "./lib/glyphs.mjs";

const src = path.join(ROOT, "assets", "optimized");
const dist = path.join(ROOT, "packages", "font", "dist");

if (!fs.existsSync(src) || listCanonicalSvgBasenames(src).length === 0) {
  console.error("No optimized SVGs found. Run `pnpm run optimize` first.");
  process.exit(1);
}

const ids = listCanonicalSvgBasenames(src).map((f) => f.replace(/\.svg$/i, ""));
const assignment = buildFullGlyphAssignment(ids);

// Persist resolved map for generate-maps / packages
const resolvedPath = path.join(ROOT, "config", "unicode-map.resolved.json");
fs.writeFileSync(resolvedPath, JSON.stringify(assignment, null, 2) + "\n", "utf8");

fs.mkdirSync(dist, { recursive: true });

const fixedCodes = new Map(
  Object.values(assignment).map((g) => [g.id, g.code]),
);

/**
 * svgtofont getIconUnicode(name, unicode, startUnicode) → [char, nextStart]
 * Keep authority_mark / certitude_point (and all resolved ids) stable.
 */
function getIconUnicode(name, _unicode, startUnicode) {
  const code = fixedCodes.get(name);
  if (code != null) {
    return [String.fromCodePoint(code), startUnicode];
  }
  return [String.fromCodePoint(startUnicode), startUnicode + 1];
}

await svgtofont({
  src,
  dist,
  fontName: "MEG-Glyphs",
  css: true,
  startUnicode: 0xe001,
  getIconUnicode,
  generateInfoData: true,
  emptyDist: true,
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true,
  },
  website: null,
});

// Copy OFL + complete resolved map (single unicode-map.json for consumers)
fs.copyFileSync(path.join(ROOT, "OFL.txt"), path.join(dist, "OFL.txt"));
fs.copyFileSync(resolvedPath, path.join(dist, "unicode-map.json"));
fs.copyFileSync(resolvedPath, path.join(dist, "unicode-map.resolved.json"));

console.log(`Fonts written to ${dist}`);
