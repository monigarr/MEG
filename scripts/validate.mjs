import fs from "node:fs";
import path from "node:path";
import {
  ROOT,
  loadFixedUnicodeMap,
  listCanonicalSvgBasenames,
} from "./lib/glyphs.mjs";

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

const map = loadFixedUnicodeMap();
const mapIds = Object.keys(map).sort();
const assetIds = listCanonicalSvgBasenames(path.join(ROOT, "assets")).map((f) =>
  f.replace(/\.svg$/i, ""),
);

// Compacted names must not return
for (const name of fs.readdirSync(path.join(ROOT, "assets"))) {
  if (!name.endsWith(".svg")) continue;
  if (!name.includes("_") && name.replace(/\.svg$/i, "").length > 8) {
    // allow short single tokens like agent.svg, elray.svg
    const id = name.replace(/\.svg$/i, "");
    if (["authoritymark", "certitudepoint", "sarmark", "doublepoint", "humanjudgement"].includes(id)) {
      fail(`compacted filename forbidden: assets/${name}`);
    }
  }
}

if (mapIds.length !== assetIds.length) {
  fail(
    `unicode-map has ${mapIds.length} ids but assets has ${assetIds.length} canonical SVGs`,
  );
}

for (const id of mapIds) {
  if (!assetIds.includes(id)) fail(`unicode-map id missing SVG: ${id}`);
  const svgPath = path.join(ROOT, "assets", `${id}.svg`);
  const svg = fs.readFileSync(svgPath, "utf8");
  if (!/viewBox\s*=\s*["']0\s+0\s+64\s+64["']/.test(svg)) {
    fail(`${id}.svg missing viewBox 0 0 64 64`);
  }
  if (!/currentColor/.test(svg)) fail(`${id}.svg missing currentColor`);
  if (/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/.test(svg)) {
    fail(`${id}.svg has hard-coded hex color`);
  }

  const docPath = path.join(ROOT, "docs", "glyphs", `${id}.json`);
  if (!fs.existsSync(docPath)) {
    fail(`missing docs/glyphs/${id}.json`);
  } else {
    const doc = JSON.parse(fs.readFileSync(docPath, "utf8"));
    if (doc.id !== id) fail(`${id}.json id mismatch`);
    if (doc.codepoint !== map[id].codepoint) {
      fail(`${id}.json codepoint ${doc.codepoint} != map ${map[id].codepoint}`);
    }
    for (const field of ["shortcode", "category", "meanings", "accessibility", "ai", "aliases", "keywords", "tags"]) {
      if (doc[field] == null) fail(`${id}.json missing ${field}`);
    }
  }
}

for (const id of assetIds) {
  if (!mapIds.includes(id)) fail(`SVG without unicode-map entry: ${id}`);
}

const codes = new Set();
for (const [id, entry] of Object.entries(map)) {
  if (codes.has(entry.codepoint)) fail(`duplicate codepoint ${entry.codepoint} (${id})`);
  codes.add(entry.codepoint);
  if (!Array.isArray(entry.shortcodes) || entry.shortcodes.length === 0) {
    fail(`${id} missing shortcodes`);
  }
}

const resolvedPath = path.join(ROOT, "config", "unicode-map.resolved.json");
if (fs.existsSync(resolvedPath)) {
  const resolved = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  for (const id of mapIds) {
    if (!resolved[id]) {
      warn(`resolved map missing ${id} (run pnpm build)`);
      continue;
    }
    if (resolved[id].codepoint !== map[id].codepoint) {
      fail(
        `resolved drift for ${id}: map ${map[id].codepoint} vs resolved ${resolved[id].codepoint}`,
      );
    }
  }
}

if (warnings.length) {
  console.warn("Warnings:");
  for (const w of warnings) console.warn(`  - ${w}`);
}

if (errors.length) {
  console.error("Validation FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`Validation OK (${mapIds.length} glyphs)`);
