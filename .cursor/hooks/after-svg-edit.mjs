#!/usr/bin/env node
/**
 * afterFileEdit hook: validate assets/**/*.svg (warn-first, never blocks).
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const validator = path.join(__dirname, "validate-meg-svg.mjs");

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) {
  raw += chunk;
}

// Re-run validator in hook mode (filters non-assets paths)
const result = spawnSync(process.execPath, [validator, "--stdin-hook"], {
  input: raw || "{}",
  encoding: "utf8",
});

if (result.stderr) {
  process.stderr.write(result.stderr);
}
// afterFileEdit: no required stdout fields
process.stdout.write("{}\n");
process.exit(0);
