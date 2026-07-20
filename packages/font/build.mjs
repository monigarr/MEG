import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const css = path.join(__dirname, "dist", "MEG-Glyphs.css");
if (!fs.existsSync(css)) {
  console.error("@monigarr/meg-font: run root `pnpm run build:fonts` first");
  process.exit(1);
}
console.log("@monigarr/meg-font ready");
