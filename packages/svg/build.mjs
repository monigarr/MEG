import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "dist");
const glyphsPath = path.join(dist, "glyphs.json");

if (!fs.existsSync(glyphsPath)) {
  console.error("@monigarr/meg-svg: run root `pnpm run build:maps` first");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(glyphsPath, "utf8"));
const indexJs = `export const glyphs = ${JSON.stringify(data, null, 2)};
export default glyphs;
`;
const indexDts = `export interface GlyphEntry {
  id: string;
  codepoint: string;
  shortcodes: string[];
  svg: string;
}

export interface GlyphCatalog {
  version: string;
  glyphs: GlyphEntry[];
}

export declare const glyphs: GlyphCatalog;
export default glyphs;
`;

fs.writeFileSync(path.join(dist, "index.js"), indexJs, "utf8");
fs.writeFileSync(path.join(dist, "index.d.ts"), indexDts, "utf8");
console.log("@monigarr/meg-svg build complete (browser-safe)");
