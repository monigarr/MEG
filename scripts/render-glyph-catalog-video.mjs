/**
 * Renders a silent cinematic catalog video of all MEG glyphs.
 * Requires: ffmpeg on PATH, playwright (npx / local).
 *
 * Usage: node scripts/render-glyph-catalog-video.mjs
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const assetsDir = join(root, "assets");
const outDir = join(assetsDir, "media");
const outMp4 = join(outDir, "meg-glyph-catalog.mp4");

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;

/** Display order + one-line intents (style guide). */
const CATALOG = [
  { id: "authority_mark", shortcode: ":authority:", intent: "Immutable high-priority rule boundary" },
  { id: "certitude_point", shortcode: ":certitude:", intent: "Deterministic / fully evidenced logic" },
  { id: "human_judgement", shortcode: ":human_judgement:", intent: "Human-in-the-loop gate" },
  { id: "governance", shortcode: ":governance:", intent: "Policy / review-board control" },
  { id: "specification", shortcode: ":specification:", intent: "Binding specification" },
  { id: "agent", shortcode: ":agent:", intent: "Autonomous agent scope" },
  { id: "explainability", shortcode: ":explainability:", intent: "Require interpretable explanation" },
  { id: "acclimation_point", shortcode: ":acclimation_point:", intent: "Onboarding / adjustment phase" },
  { id: "collaboration", shortcode: ":collaboration:", intent: "Multi-party coordination" },
  { id: "insight", shortcode: ":insight:", intent: "Preserve a non-obvious learning" },
  { id: "double_point", shortcode: ":double_point:", intent: "Dual / compound concern" },
  { id: "elray", shortcode: ":elray:", intent: "Challenge assumptions" },
  { id: "exclamation_comma", shortcode: ":exclamation_comma:", intent: "Urgent but incomplete" },
  { id: "friendly_period", shortcode: ":friendly_period:", intent: "Warm closure" },
  { id: "irony_mark", shortcode: ":irony_mark:", intent: "Ironic / non-literal" },
  { id: "love_point", shortcode: ":love_point:", intent: "Appreciation / care" },
  { id: "question_comma", shortcode: ":question_comma:", intent: "Open continuing question" },
  { id: "sar_mark", shortcode: ":sar_mark:", intent: "Sarcasm—not a literal requirement" },
  { id: "snark_mark", shortcode: ":snark_mark:", intent: "Snark—extract substance neutrally" },
];

const TITLE_MS = 3200;
const PER_GLYPH_MS = 1400;
const GRID_MS = 4200;
const TOTAL_MS = TITLE_MS + CATALOG.length * PER_GLYPH_MS + GRID_MS;

function loadSvgInner(id) {
  const path = join(assetsDir, `${id}.svg`);
  if (!existsSync(path)) {
    throw new Error(`Missing SVG: ${path}`);
  }
  const raw = readFileSync(path, "utf8");
  const match = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  if (!match) {
    throw new Error(`Could not parse SVG: ${path}`);
  }
  return match[1].trim();
}

function buildHtml() {
  const glyphs = CATALOG.map((g) => ({
    ...g,
    inner: loadSvgInner(g.id),
  }));

  const slidesJson = JSON.stringify(
    glyphs.map(({ id, shortcode, intent, inner }) => ({ id, shortcode, intent, inner })),
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>MEG Glyph Catalog</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    background: #0b1014;
    color: #e8eef2;
    font-family: "Segoe UI Variable", "Segoe UI", Candara, Calibri, sans-serif;
  }

  .stage {
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background:
      radial-gradient(ellipse 80% 60% at 50% 35%, rgba(45, 212, 191, 0.09), transparent 55%),
      radial-gradient(ellipse 50% 40% at 80% 80%, rgba(14, 165, 233, 0.06), transparent 50%),
      linear-gradient(165deg, #0b1014 0%, #111820 45%, #0d141a 100%);
  }

  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(232, 238, 242, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232, 238, 242, 0.035) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%);
    pointer-events: none;
  }

  .accent-line {
    position: absolute;
    left: 120px;
    right: 120px;
    top: 96px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #2dd4bf 30%, #38bdf8 70%, transparent);
    opacity: 0.55;
  }

  .scene {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.55s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }
  .scene.active {
    opacity: 1;
    transform: scale(1);
  }
  .scene.exit {
    opacity: 0;
    transform: scale(1.04);
    transition-duration: 0.4s;
  }

  .brand {
    letter-spacing: 0.28em;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 500;
    color: #2dd4bf;
    margin-bottom: 28px;
  }
  .title {
    font-size: 72px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    text-align: center;
    max-width: 1200px;
  }
  .subtitle {
    margin-top: 24px;
    font-size: 26px;
    color: #94a3b8;
    text-align: center;
    max-width: 900px;
    line-height: 1.45;
  }
  .count-pill {
    margin-top: 40px;
    font-family: Consolas, "Cascadia Mono", "Courier New", monospace;
    font-size: 15px;
    color: #0b1014;
    background: #2dd4bf;
    padding: 10px 20px;
    letter-spacing: 0.08em;
  }

  .glyph-wrap {
    width: 360px;
    height: 360px;
    color: #f1f5f9;
    filter: drop-shadow(0 0 40px rgba(45, 212, 191, 0.18));
  }
  .glyph-wrap svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .shortcode {
    margin-top: 36px;
    font-family: Consolas, "Cascadia Mono", "Courier New", monospace;
    font-size: 36px;
    font-weight: 500;
    color: #2dd4bf;
    letter-spacing: 0.02em;
  }
  .intent {
    margin-top: 16px;
    font-size: 28px;
    color: #cbd5e1;
    text-align: center;
    max-width: 1000px;
  }
  .progress {
    position: absolute;
    bottom: 72px;
    left: 50%;
    transform: translateX(-50%);
    font-family: Consolas, "Cascadia Mono", "Courier New", monospace;
    font-size: 14px;
    color: #64748b;
    letter-spacing: 0.12em;
  }

  .finale .title {
    font-size: 48px;
    margin-bottom: 48px;
  }
  .glyph-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 28px 36px;
    width: 1400px;
    justify-items: center;
  }
  .glyph-grid .cell {
    width: 96px;
    height: 96px;
    color: #e2e8f0;
    opacity: 0;
    transform: translateY(12px) scale(0.85);
    transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .glyph-grid .cell.show {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .glyph-grid .cell svg {
    width: 100%;
    height: 100%;
  }
  .finale-tag {
    margin-top: 56px;
    font-family: Consolas, "Cascadia Mono", "Courier New", monospace;
    font-size: 16px;
    color: #94a3b8;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <div class="stage" id="stage">
    <div class="grid-bg"></div>
    <div class="accent-line"></div>

    <section class="scene title-scene active" id="scene-title">
      <div class="brand">MoniGarr Engineering</div>
      <h1 class="title">MoniGarr Engineering Glyphs</h1>
      <p class="subtitle">An original visual language for engineering intent—governance, judgment, specifications, and agent scope.</p>
      <div class="count-pill">19 GLYPHS · MEG</div>
    </section>

    <section class="scene glyph-scene" id="scene-glyph">
      <div class="glyph-wrap" id="glyph-mark"></div>
      <div class="shortcode" id="glyph-shortcode"></div>
      <div class="intent" id="glyph-intent"></div>
      <div class="progress" id="glyph-progress"></div>
    </section>

    <section class="scene finale" id="scene-finale">
      <h2 class="title">The complete catalog</h2>
      <div class="glyph-grid" id="glyph-grid"></div>
      <div class="finale-tag">MEG · Engineering is communication</div>
    </section>
  </div>

  <script>
    const SLIDES = ${slidesJson};
    const TITLE_MS = ${TITLE_MS};
    const PER_GLYPH_MS = ${PER_GLYPH_MS};
    const GRID_MS = ${GRID_MS};

    const titleScene = document.getElementById("scene-title");
    const glyphScene = document.getElementById("scene-glyph");
    const finaleScene = document.getElementById("scene-finale");
    const markEl = document.getElementById("glyph-mark");
    const shortEl = document.getElementById("glyph-shortcode");
    const intentEl = document.getElementById("glyph-intent");
    const progressEl = document.getElementById("glyph-progress");
    const gridEl = document.getElementById("glyph-grid");

    function svgFor(inner) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5">' + inner + '</svg>';
    }

    for (const s of SLIDES) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerHTML = svgFor(s.inner);
      gridEl.appendChild(cell);
    }

    function sleep(ms) {
      return new Promise((r) => setTimeout(r, ms));
    }

    async function activate(scene) {
      for (const el of [titleScene, glyphScene, finaleScene]) {
        if (el !== scene && el.classList.contains("active")) {
          el.classList.add("exit");
          el.classList.remove("active");
          await sleep(380);
          el.classList.remove("exit");
        }
      }
      scene.classList.add("active");
    }

    async function run() {
      await sleep(TITLE_MS);

      for (let i = 0; i < SLIDES.length; i++) {
        const s = SLIDES[i];
        markEl.innerHTML = svgFor(s.inner);
        shortEl.textContent = s.shortcode;
        intentEl.textContent = s.intent;
        progressEl.textContent = String(i + 1).padStart(2, "0") + " / " + String(SLIDES.length).padStart(2, "0");
        await activate(glyphScene);
        // Retrigger scale on glyph mark
        markEl.style.transform = "scale(0.88)";
        markEl.style.opacity = "0.4";
        markEl.style.transition = "none";
        void markEl.offsetWidth;
        markEl.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease";
        markEl.style.transform = "scale(1)";
        markEl.style.opacity = "1";
        await sleep(PER_GLYPH_MS);
      }

      await activate(finaleScene);
      const cells = gridEl.querySelectorAll(".cell");
      cells.forEach((cell, idx) => {
        setTimeout(() => cell.classList.add("show"), 80 + idx * 70);
      });
      await sleep(GRID_MS);
      document.documentElement.dataset.done = "1";
    }

    window.__megReady = true;
    window.__megRun = run;
  </script>
</body>
</html>`;
}

function findFfmpeg() {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return "ffmpeg";
  } catch {
    const winget = join(
      process.env.LOCALAPPDATA || "",
      "Microsoft",
      "WinGet",
      "Packages",
      "Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe",
      "ffmpeg-8.1.1-full_build",
      "bin",
      "ffmpeg.exe",
    );
    if (existsSync(winget)) return winget;
    throw new Error("ffmpeg not found on PATH");
  }
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const work = mkdtempSync(join(tmpdir(), "meg-catalog-"));
  const htmlPath = join(work, "catalog.html");
  writeFileSync(htmlPath, buildHtml(), "utf8");

  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    console.error("Installing playwright chromium (one-time)…");
    execFileSync("pnpm", ["add", "-D", "-w", "playwright"], {
      cwd: root,
      stdio: "inherit",
      shell: true,
    });
    execFileSync("npx", ["playwright", "install", "chromium"], {
      cwd: root,
      stdio: "inherit",
      shell: true,
    });
    playwright = await import("playwright");
  }

  const { chromium } = playwright;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    recordVideo: {
      dir: work,
      size: { width: WIDTH, height: HEIGHT },
    },
  });
  const page = await context.newPage();

  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.waitForFunction(() => window.__megReady === true);

  console.log(`Recording ~${(TOTAL_MS / 1000).toFixed(1)}s catalog animation…`);
  await page.evaluate(() => window.__megRun());
  await page.waitForFunction(() => document.documentElement.dataset.done === "1", {
    timeout: TOTAL_MS + 15000,
  });
  // Hold last frame briefly so the finale settles in the recording
  await page.waitForTimeout(400);

  const video = page.video();
  await page.close();
  const webmPath = await video.path();
  await context.close();
  await browser.close();

  const ffmpeg = findFfmpeg();
  console.log("Encoding H.264 MP4…");
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i",
      webmPath,
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "20",
      "-pix_fmt",
      "yuv420p",
      "-r",
      String(FPS),
      "-movflags",
      "+faststart",
      outMp4,
    ],
    { stdio: "inherit" },
  );

  rmSync(work, { recursive: true, force: true });
  const size = readFileSync(outMp4).byteLength;
  console.log(`Wrote ${outMp4} (${(size / (1024 * 1024)).toFixed(2)} MB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
