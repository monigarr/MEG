#!/usr/bin/env node
/**
 * postToolUse hook for Write: inject MEG SVG validation into agent context.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const validator = path.join(__dirname, "validate-meg-svg.mjs");

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) {
  raw += chunk;
}

let payload = {};
try {
  payload = raw ? JSON.parse(raw) : {};
} catch {
  process.stdout.write("{}\n");
  process.exit(0);
}

const toolInput = payload.tool_input || {};
const filePath = toolInput.path || toolInput.file_path || toolInput.filePath || "";
const normalized = String(filePath).replace(/\\/g, "/");

if (!normalized.endsWith(".svg") || !normalized.includes("/assets/")) {
  process.stdout.write("{}\n");
  process.exit(0);
}

const abs = path.isAbsolute(filePath)
  ? filePath
  : path.resolve(payload.cwd || process.cwd(), filePath);

if (!fs.existsSync(abs)) {
  process.stdout.write("{}\n");
  process.exit(0);
}

const result = spawnSync(process.execPath, [validator, abs], {
  encoding: "utf8",
});

let report;
try {
  report = JSON.parse(result.stdout || "{}");
} catch {
  process.stdout.write("{}\n");
  process.exit(0);
}

const row = report.results?.[0];
if (!row || row.result === "PASS") {
  process.stdout.write(
    JSON.stringify({
      additional_context:
        `[meg-svg] PASS: ${abs} meets MEGS-0006 baseline checks.`,
    }) + "\n",
  );
  process.exit(0);
}

const lines = row.issues
  .map((i) => `- ${i.level}: ${i.message}`)
  .join("\n");

process.stdout.write(
  JSON.stringify({
    additional_context:
      `[meg-svg] ${row.result} (warn-first, edit not blocked): ${abs}\n${lines}\nSee docs/megs/MEGS-0006-svg-production.md`,
  }) + "\n",
);
process.exit(0);
