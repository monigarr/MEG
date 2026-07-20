#!/usr/bin/env node
/**
 * MEG SVG validator (MEGS-0005 / MEGS-0006).
 * Warn-first: always exit 0. Prints a JSON report to stdout.
 *
 * Usage:
 *   node .cursor/hooks/validate-meg-svg.mjs [file.svg ...]
 *   echo '{"file_path":"..."}' | node .cursor/hooks/validate-meg-svg.mjs --stdin-hook
 */

import fs from "node:fs";
import path from "node:path";

const SNAKE_CASE = /^[a-z][a-z0-9_]*\.svg$/;
const COMPACTED_MULTIWORD =
  /^(authoritymark|certitudepoint|doublepoint|humanjudgement|sarmark)\.svg$/i;

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", () => resolve(""));
  });
}

function validateSvgFile(filePath) {
  const issues = [];
  const base = path.basename(filePath);
  let severity = "PASS";

  const bump = (level, message) => {
    issues.push({ level, message });
    if (level === "FAIL") severity = "FAIL";
    else if (level === "WARN" && severity === "PASS") severity = "WARN";
  };

  if (!SNAKE_CASE.test(base)) {
    bump("FAIL", "filename must be snake_case.svg matching glyph id");
  } else if (COMPACTED_MULTIWORD.test(base) || (!base.includes("_") && base.replace(/\.svg$/i, "").length > 12)) {
    // Compacted known debt or suspiciously long single-token names
    if (COMPACTED_MULTIWORD.test(base)) {
      bump("WARN", "compacted filename; migrate to snake_case per MEGS-0005");
    }
  }

  if (!fs.existsSync(filePath)) {
    bump("FAIL", "file does not exist");
    return { file: filePath, result: severity, issues };
  }

  const content = fs.readFileSync(filePath, "utf8");

  if (!/viewBox\s*=\s*["']0\s+0\s+64\s+64["']/.test(content)) {
    bump("FAIL", 'missing or incorrect viewBox="0 0 64 64"');
  }

  if (!/currentColor/.test(content)) {
    bump("FAIL", "primary geometry should use currentColor");
  }

  if (/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/.test(content) || /rgb\s*\(/.test(content)) {
    bump("FAIL", "hard-coded colors detected; use currentColor for meaning");
  }

  if (!/stroke-width\s*=\s*["']2\.5["']/.test(content)) {
    bump("WARN", 'default stroke-width="2.5" not found (document exception if intentional)');
  }

  if (/inkscape:|sodipodi:|<script|xlink:href\s*=\s*["']data:image/i.test(content)) {
    bump("FAIL", "editor namespaces, scripts, or embedded rasters are forbidden");
  }

  return { file: filePath, result: severity, issues };
}

function isMegSvgPath(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  return normalized.includes("/assets/") && normalized.endsWith(".svg");
}

function formatReport(results) {
  return {
    ok: true,
    warnFirst: true,
    summary: {
      pass: results.filter((r) => r.result === "PASS").length,
      warn: results.filter((r) => r.result === "WARN").length,
      fail: results.filter((r) => r.result === "FAIL").length,
    },
    results,
  };
}

function mainCli(paths) {
  const results = paths.map((p) => validateSvgFile(path.resolve(p)));
  const report = formatReport(results);
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
}

async function mainHook() {
  const raw = await readStdin();
  let payload = {};
  try {
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    payload = {};
  }

  const filePath = payload.file_path || payload.filePath || "";
  if (!filePath || !isMegSvgPath(filePath)) {
    process.stdout.write("{}\n");
    return;
  }

  const result = validateSvgFile(filePath);
  const report = formatReport([result]);

  // afterFileEdit is notification-oriented; log for Hooks channel
  if (result.result !== "PASS") {
    console.error(`[meg-svg] ${result.result}: ${filePath}`);
    for (const issue of result.issues) {
      console.error(`  - ${issue.level}: ${issue.message}`);
    }
  }

  // Still emit JSON for debugging / composition with postToolUse wrappers
  process.stdout.write(JSON.stringify(report) + "\n");
}

const args = process.argv.slice(2);
if (args.includes("--stdin-hook")) {
  await mainHook();
} else if (args.length > 0) {
  mainCli(args);
} else {
  // Default: validate all assets/*.svg from cwd/repo root guess
  const assetsDir = path.resolve("assets");
  if (!fs.existsSync(assetsDir)) {
    process.stdout.write(JSON.stringify({ ok: true, results: [], summary: { pass: 0, warn: 0, fail: 0 } }, null, 2) + "\n");
    process.exit(0);
  }
  const files = fs
    .readdirSync(assetsDir)
    .filter((f) => f.endsWith(".svg"))
    .map((f) => path.join(assetsDir, f));
  mainCli(files);
}
