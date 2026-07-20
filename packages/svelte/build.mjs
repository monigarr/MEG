import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "src", "lib");
const dist = path.join(__dirname, "dist");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name);
    const b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

copyDir(src, dist);

fs.writeFileSync(
  path.join(dist, "index.d.ts"),
  `import type { Component } from "svelte";

export type MegIconName = string;
export const ICONS: Record<string, string>;
export const MegIcon: Component<{
  name: MegIconName;
  title?: string;
  size?: string | number;
}>;
export const AuthorityMark: Component<{
  title?: string;
  size?: string | number;
}>;
export const CertitudePoint: Component<{
  title?: string;
  size?: string | number;
}>;
`,
  "utf8",
);

console.log("@monigarr/meg-svelte build complete");
