import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib/glyphs.mjs";

const ref = process.env.GITHUB_REF_NAME || process.env.npm_config_tag || process.argv[2];
if (!ref) {
  console.error("Usage: GITHUB_REF_NAME=v1.0.0 node scripts/sync-version-from-tag.mjs");
  process.exit(1);
}

const version = ref.replace(/^v/, "");
if (!/^\d+\.\d+\.\d+/.test(version)) {
  console.error(`Invalid version from tag: ${ref}`);
  process.exit(1);
}

const packagesDir = path.join(ROOT, "packages");
const dirs = fs.readdirSync(packagesDir);

for (const dir of dirs) {
  const pkgPath = path.join(packagesDir, dir, "package.json");
  if (!fs.existsSync(pkgPath)) continue;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  if (pkg.private) continue;
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf8");
  console.log(`Set ${pkg.name} → ${version}`);
}

const rootPkgPath = path.join(ROOT, "package.json");
const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));
rootPkg.version = version;
fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + "\n", "utf8");
console.log(`Set root → ${version}`);
