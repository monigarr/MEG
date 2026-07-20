import esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await esbuild.build({
  entryPoints: [path.join(__dirname, "src", "extension.ts")],
  bundle: true,
  outfile: path.join(__dirname, "out", "extension.js"),
  external: ["vscode"],
  platform: "node",
  format: "cjs",
  sourcemap: true,
  target: "node20",
});

console.log("vscode-ext build complete");
