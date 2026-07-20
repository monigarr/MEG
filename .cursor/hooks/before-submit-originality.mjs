#!/usr/bin/env node
/**
 * beforeSubmitPrompt: originality reminder for third-party icon copy requests.
 * Always continues (warn-first); surfaces a user_message when patterns match.
 */
let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) {
  raw += chunk;
}

let prompt = "";
try {
  prompt = JSON.parse(raw || "{}").prompt || "";
} catch {
  prompt = "";
}

const thirdParty =
  /lucide|font\s*awesome|heroicons|bootstrap\s*icons|material\s*icons|fluent\s*ui|carbon\s*icons|primer\s*octicons/i;
const copyIntent = /\b(copy|clone|port|recreate|rip)\b/i;

if (thirdParty.test(prompt) && copyIntent.test(prompt)) {
  const message =
    "MEGS-0008: MEG glyphs must be original MoniGarr Engineering work. Do not copy third-party icon geometries; redesign from engineering intent (MEGS-0001/0002).";
  console.error(`[meg-originality] ${message}`);
  process.stdout.write(
    JSON.stringify({
      continue: true,
      user_message: message,
    }) + "\n",
  );
  process.exit(0);
}

process.stdout.write(JSON.stringify({ continue: true }) + "\n");
process.exit(0);
