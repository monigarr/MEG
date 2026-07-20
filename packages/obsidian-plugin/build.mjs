import esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await esbuild.build({
  entryPoints: [path.join(__dirname, "src", "main.ts")],
  bundle: true,
  outfile: path.join(__dirname, "main.js"),
  external: ["obsidian"],
  platform: "browser",
  format: "cjs",
  sourcemap: "inline",
  target: "es2020",
});

console.log("obsidian-plugin build complete");
