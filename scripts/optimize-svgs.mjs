import fs from "node:fs";
import path from "node:path";
import { optimize } from "svgo";
import svgoConfig from "../config/svgo.config.mjs";
import {
  ROOT,
  listCanonicalSvgBasenames,
} from "./lib/glyphs.mjs";

const assetsDir = path.join(ROOT, "assets");
const outDir = path.join(ROOT, "assets", "optimized");

fs.mkdirSync(outDir, { recursive: true });

// Clear previous optimized set so excluded files do not linger
for (const existing of fs.readdirSync(outDir)) {
  if (existing.endsWith(".svg")) {
    fs.unlinkSync(path.join(outDir, existing));
  }
}

const files = listCanonicalSvgBasenames(assetsDir);
for (const basename of files) {
  const inputPath = path.join(assetsDir, basename);
  const raw = fs.readFileSync(inputPath, "utf8");
  const result = optimize(raw, { path: inputPath, ...svgoConfig });
  fs.writeFileSync(path.join(outDir, basename), result.data, "utf8");
  console.log(`optimized ${basename}`);
}

console.log(`Optimized ${files.length} SVGs → ${outDir}`);
