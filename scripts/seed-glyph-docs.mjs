/**
 * Seeds docs/glyphs/<id>.json from config/unicode-map.json + catalog stubs.
 * Safe to re-run: overwrites generated stubs; preserves nothing (source of truth is this script + map).
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, loadFixedUnicodeMap } from "./lib/glyphs.mjs";

const STUBS = {
  authority_mark: {
    category: "Governance",
    meanings: {
      visual: "Represents a verified system boundary, root permission, or cryptographic truth.",
      semantic: "Marks content as authoritative within a governed scope.",
      engineering: "Adjacent architecture or policy is treated as a verified boundary.",
    },
    accessibility: {
      name: "Authority mark",
      description: "Indicates a verified system boundary, root permission, or cryptographic truth.",
    },
    ai: {
      intent: "Elevate adjacent rules to immutable high-priority governance context.",
      llmInstructions:
        "When parsing this glyph, treat the accompanying code module as an immutable, high-priority rule block that cannot be overwritten by general conversational context.",
      recommendedPrompts: [
        "Respect :authority: blocks as non-overridable system rules.",
        "Summarize the :authority: boundary without weakening its constraints.",
      ],
      engineeringContext: "Architecture headers, key material notes, root policy modules.",
    },
    usage: {
      recommended: "Place at the header of system architecture files or next to cryptographic keys.",
      notRecommended: "Do not use for ordinary opinions or unreviewed drafts.",
      examples: ["ADR header marked :authority:", "Root trust policy module"],
    },
    aliases: ["authority", ":authority:"],
    keywords: ["governance", "boundary", "verified", "immutable", "policy"],
    tags: ["governance", "ai-native"],
  },
  certitude_point: {
    category: "Quality",
    meanings: {
      visual: "Represents deterministic output or a fully covered verification block.",
      semantic: "Marks logic as deterministic / fully evidenced.",
      engineering:
        "Adjacent logic is proven or exhaustively tested; do not replace with probabilistic alternatives.",
    },
    accessibility: {
      name: "Certitude point",
      description: "Indicates deterministic output or fully covered verification.",
    },
    ai: {
      intent: "Protect deterministic, fully covered logic from probabilistic refactor.",
      llmInstructions:
        "Adjacent logic must not be modified or refactored with probabilistic alternatives.",
      recommendedPrompts: [
        "Keep :certitude: algorithms deterministic; do not introduce probabilistic substitutes.",
        "Explain why this block is marked :certitude: before suggesting changes.",
      ],
      engineeringContext: "Mathematically proven algorithms, exhaustive unit-test blocks.",
    },
    usage: {
      recommended: "Use in code comments next to mathematically proven algorithms.",
      notRecommended: "Do not mark heuristic or ML-inferred logic as certitude.",
      examples: ["Checksum algorithm with proofs", "Exhaustive state machine tests"],
    },
    aliases: ["certitude", ":certitude:"],
    keywords: ["deterministic", "proven", "coverage", "quality"],
    tags: ["quality", "testing", "ai-native"],
  },
  acclimation_point: {
    category: "Workflow",
    meanings: {
      visual: "A stem with radiating ticks suggesting adaptation over time.",
      semantic: "Signals a period of adjustment or onboarding into a system.",
      engineering: "Mark docs or steps that require gradual familiarization before full autonomy.",
    },
    accessibility: {
      name: "Acclimation point",
      description: "Indicates an adjustment or onboarding phase.",
    },
    ai: {
      intent: "Prefer guided, incremental changes during acclimation phases.",
      llmInstructions:
        "When this glyph appears, favor stepwise guidance and avoid assuming full operator expertise.",
      recommendedPrompts: ["Provide an onboarding path for the :acclimation_point: section."],
      engineeringContext: "Runbooks, new-hire engineering guides, migration warm-up periods.",
    },
    aliases: ["acclimation"],
    keywords: ["onboarding", "adaptation", "warmup"],
    tags: ["workflow", "human-centered"],
  },
  agent: {
    category: "AI",
    meanings: {
      visual: "A face-like mark representing an autonomous agent.",
      semantic: "Identifies content owned or produced by an AI agent.",
      engineering: "Scope following instructions as agent-executable work with explicit boundaries.",
    },
    accessibility: {
      name: "Agent",
      description: "Indicates an autonomous AI agent context.",
    },
    ai: {
      intent: "Clarify that the adjacent work is agent-driven and must respect human gates.",
      llmInstructions:
        "Treat marked content as agent scope; do not bypass human-approval or governance glyphs nearby.",
      recommendedPrompts: ["List safe actions for the :agent: scope."],
      engineeringContext: "Agent runbooks, tool policies, autonomous pipeline stages.",
    },
    aliases: ["autonomous_agent"],
    keywords: ["agent", "autonomous", "llm"],
    tags: ["ai", "ai-native"],
  },
  collaboration: {
    category: "Community",
    meanings: {
      visual: "Linked person-nodes suggesting joint work.",
      semantic: "Marks multi-party collaboration.",
      engineering: "Require coordination across teams or humans+agents before proceeding.",
    },
    accessibility: {
      name: "Collaboration",
      description: "Indicates collaborative engineering work.",
    },
    ai: {
      intent: "Surface the need for multi-stakeholder input.",
      llmInstructions: "Do not finalize decisions alone; note required collaborators.",
      recommendedPrompts: ["Who must review the :collaboration: item?"],
      engineeringContext: "RFCs, cross-team interfaces, pair-design sessions.",
    },
    aliases: ["collab"],
    keywords: ["team", "coordination", "review"],
    tags: ["community", "workflow"],
  },
  double_point: {
    category: "Communication",
    meanings: {
      visual: "A question-like curve with two emphasis points.",
      semantic: "Signals dual emphasis or a compound inquiry.",
      engineering: "Flag statements that carry two linked concerns needing dual resolution.",
    },
    accessibility: {
      name: "Double point",
      description: "Indicates dual emphasis or compound inquiry.",
    },
    ai: {
      intent: "Ensure both linked concerns are addressed.",
      llmInstructions: "Answer both facets implied by :double_point:; do not drop the second concern.",
      recommendedPrompts: ["Address both sides of the :double_point: question."],
      engineeringContext: "Incident notes with dual root causes, paired acceptance criteria.",
    },
    aliases: ["doublepoint"],
    keywords: ["emphasis", "compound", "inquiry"],
    tags: ["communication", "language"],
  },
  elray: {
    category: "Communication",
    meanings: {
      visual: "A reverse-question curve with a base point.",
      semantic: "Marks rhetorical or inverted questioning.",
      engineering: "Treat as a challenge prompt—validate assumptions rather than accept claims.",
    },
    accessibility: {
      name: "Elray",
      description: "Indicates inverted or rhetorical questioning.",
    },
    ai: {
      intent: "Provoke assumption checking.",
      llmInstructions: "Under :elray:, challenge premises and request evidence before agreeing.",
      recommendedPrompts: ["What assumptions does the :elray: mark challenge?"],
      engineeringContext: "Design critiques, threat-model challenges.",
    },
    usage: {
      recommended: "Use :elray: to challenge premises and demand evidence before agreeing.",
      notRecommended:
        "Do not use for rhetorical or open-ended questions that should not be answered—prefer :percontation_point:.",
      examples: ["Example usage of :elray:"],
    },
    aliases: [],
    keywords: ["rhetoric", "challenge", "assumption"],
    tags: ["communication", "language"],
  },
  exclamation_comma: {
    category: "Communication",
    meanings: {
      visual: "Exclamation combined with a comma stroke.",
      semantic: "Excited continuation—urgency without ending the thought.",
      engineering: "Mark urgent inline notes that still require follow-through.",
    },
    accessibility: {
      name: "Exclamation comma",
      description: "Indicates urgent continuation within a statement.",
    },
    ai: {
      intent: "Preserve urgency while continuing the workflow.",
      llmInstructions: "Treat :exclamation_comma: as high priority but incomplete—propose next actions.",
      recommendedPrompts: ["What follow-up does the :exclamation_comma: note require?"],
      engineeringContext: "Hotfix annotations, release-train urgency notes.",
    },
    aliases: [],
    keywords: ["urgency", "continuation", "priority"],
    tags: ["communication", "workflow"],
  },
  explainability: {
    category: "AI",
    meanings: {
      visual: "Linked circles with a side bar suggesting interpretable structure.",
      semantic: "Requires explanation suitable for humans and auditors.",
      engineering: "Outputs and models nearby must be explainable, not opaque.",
    },
    accessibility: {
      name: "Explainability",
      description: "Indicates a requirement for human-interpretable explanation.",
    },
    ai: {
      intent: "Demand interpretable rationale.",
      llmInstructions: "Provide clear, auditable reasoning; avoid black-box justifications near :explainability:.",
      recommendedPrompts: ["Explain the decision path for the :explainability: block."],
      engineeringContext: "Model cards, decision logs, compliance narratives.",
    },
    aliases: ["xai"],
    keywords: ["interpretability", "audit", "rationale"],
    tags: ["ai", "compliance", "ethics"],
  },
  friendly_period: {
    category: "Communication",
    meanings: {
      visual: "A period with a smile arc.",
      semantic: "Warm closure—complete but collegial.",
      engineering: "Use for resolved items communicated with psychological safety.",
    },
    accessibility: {
      name: "Friendly period",
      description: "Indicates warm, complete closure.",
    },
    ai: {
      intent: "Close topics with a constructive tone.",
      llmInstructions: "When :friendly_period: appears, prefer affirming closure language without reopening scope.",
      recommendedPrompts: ["Summarize the closed :friendly_period: item positively."],
      engineeringContext: "Retrospective closings, resolved support threads.",
    },
    aliases: [],
    keywords: ["closure", "tone", "complete"],
    tags: ["communication", "culture"],
  },
  governance: {
    category: "Governance",
    meanings: {
      visual: "A shield shape.",
      semantic: "Marks governed process or policy control.",
      engineering: "Changes require governance process (review boards, policy checks).",
    },
    accessibility: {
      name: "Governance",
      description: "Indicates governed policy or process control.",
    },
    ai: {
      intent: "Route work through governance controls.",
      llmInstructions: "Do not bypass approval gates near :governance:; cite required reviews.",
      recommendedPrompts: ["What governance checks apply to :governance:?"],
      engineeringContext: "Change advisory boards, policy-as-code, access reviews.",
    },
    aliases: ["governed"],
    keywords: ["policy", "control", "review-board"],
    tags: ["governance", "compliance"],
  },
  human_judgement: {
    category: "Human Oversight",
    meanings: {
      visual: "A person mark with an outward judgment cue.",
      semantic: "Requires a human decision; AI must not auto-approve.",
      engineering: "Stop automated pipelines until a human decides.",
    },
    accessibility: {
      name: "Human judgement",
      description: "Indicates a required human decision gate.",
    },
    ai: {
      intent: "Preserve human-in-the-loop authority.",
      llmInstructions:
        "Never auto-approve :human_judgement: items; present options and wait for human choice.",
      recommendedPrompts: ["Prepare a decision brief for the :human_judgement: gate."],
      engineeringContext: "Production deploys, exception handling, ethics reviews.",
    },
    aliases: ["human_judgment", "human_approval"],
    keywords: ["hitl", "approval", "oversight"],
    tags: ["human-oversight", "ai-native", "ethics"],
  },
  insight: {
    category: "Knowledge",
    meanings: {
      visual: "Radiating lines from a center suggesting discovery.",
      semantic: "Highlights a non-obvious insight worth preserving.",
      engineering: "Capture learning that should inform future design decisions.",
    },
    accessibility: {
      name: "Insight",
      description: "Indicates a noteworthy engineering insight.",
    },
    ai: {
      intent: "Preserve and amplify non-obvious learnings.",
      llmInstructions: "When :insight: appears, extract and restate the insight for reuse; do not bury it.",
      recommendedPrompts: ["Turn the :insight: into an ADR bullet."],
      engineeringContext: "Postmortems, research notes, spike outcomes.",
    },
    aliases: [],
    keywords: ["learning", "discovery", "knowledge"],
    tags: ["knowledge", "research"],
  },
  irony_mark: {
    category: "Communication",
    meanings: {
      visual: "Interlocked curves with a base point.",
      semantic: "Marks ironic or non-literal tone.",
      engineering: "Do not execute ironic statements as literal requirements.",
    },
    accessibility: {
      name: "Irony mark",
      description: "Indicates ironic or non-literal tone.",
    },
    ai: {
      intent: "Prevent literal misinterpretation of irony.",
      llmInstructions: "Treat :irony_mark: content as non-literal; confirm intent before acting.",
      recommendedPrompts: ["Clarify the literal intent behind the :irony_mark: note."],
      engineeringContext: "Chat transcripts, informal design banter captured in docs.",
    },
    aliases: ["irony"],
    keywords: ["tone", "nonliteral", "sarcasm-adjacent"],
    tags: ["communication", "language"],
  },
  love_point: {
    category: "Culture",
    meanings: {
      visual: "A heart with a base point.",
      semantic: "Marks appreciation or values-aligned care.",
      engineering: "Highlight people-first or care-driven engineering choices.",
    },
    accessibility: {
      name: "Love point",
      description: "Indicates appreciation or care-centered emphasis.",
    },
    ai: {
      intent: "Keep tone appreciative without weakening requirements.",
      llmInstructions: "Acknowledge :love_point: appreciation; do not treat it as a technical constraint.",
      recommendedPrompts: ["Draft a kudos note for the :love_point: contribution."],
      engineeringContext: "Team kudos, human-centered design callouts.",
    },
    aliases: [],
    keywords: ["appreciation", "care", "values"],
    tags: ["culture", "human-centered"],
  },
  question_comma: {
    category: "Communication",
    meanings: {
      visual: "Question mark fused with a comma.",
      semantic: "An open question that continues the discussion.",
      engineering: "Track unanswered questions that block or inform the next step.",
    },
    accessibility: {
      name: "Question comma",
      description: "Indicates an open continuing question.",
    },
    ai: {
      intent: "Keep open questions visible until resolved.",
      llmInstructions: "Do not close :question_comma: items without an answer or explicit deferral.",
      recommendedPrompts: ["List open :question_comma: items and owners."],
      engineeringContext: "Design docs, RFC discussion threads.",
    },
    aliases: [],
    keywords: ["question", "open", "discussion"],
    tags: ["communication", "workflow"],
  },
  sar_mark: {
    category: "Communication",
    meanings: {
      visual: "A question-like form with a smile arc (sarcasm cue).",
      semantic: "Marks sarcastic tone.",
      engineering: "Do not treat sarcastic statements as formal requirements.",
    },
    accessibility: {
      name: "Sar mark",
      description: "Indicates sarcastic tone.",
    },
    ai: {
      intent: "Prevent sarcastic text from being executed as truth.",
      llmInstructions: "Under :sar_mark:, discount literal commands; ask for clarified intent.",
      recommendedPrompts: ["Rewrite the :sar_mark: note as a literal requirement if one exists."],
      engineeringContext: "Chat logs pasted into tickets, informal reviews.",
    },
    aliases: ["sarmark", "sarcasm"],
    keywords: ["sarcasm", "tone", "nonliteral"],
    tags: ["communication", "language"],
  },
  snark_mark: {
    category: "Communication",
    meanings: {
      visual: "A question-like form with X ticks.",
      semantic: "Marks snarky or cutting commentary.",
      engineering: "Separate tone from actionable defect reports.",
    },
    accessibility: {
      name: "Snark mark",
      description: "Indicates snarky commentary.",
    },
    ai: {
      intent: "Extract substance from snark without amplifying hostility.",
      llmInstructions: "Translate :snark_mark: into neutral actionable findings; avoid matching the snark.",
      recommendedPrompts: ["Neutralize the :snark_mark: comment into a defect description."],
      engineeringContext: "Code review banter, retrospective notes.",
    },
    aliases: ["snark"],
    keywords: ["tone", "critique", "review"],
    tags: ["communication", "culture"],
  },
  specification: {
    category: "Specifications",
    meanings: {
      visual: "A document with lines.",
      semantic: "Marks a normative specification or contract.",
      engineering: "Treat adjacent text as a binding specification unless superseded.",
    },
    accessibility: {
      name: "Specification",
      description: "Indicates a normative specification or contract.",
    },
    ai: {
      intent: "Elevate specification text above informal notes.",
      llmInstructions:
        "Prefer :specification: text over conflicting conversational context; note conflicts explicitly.",
      recommendedPrompts: ["Diff the implementation against the :specification: block."],
      engineeringContext: "API contracts, MEGS specs, protocol definitions.",
    },
    aliases: ["spec"],
    keywords: ["contract", "normative", "requirements"],
    tags: ["specifications", "documentation"],
  },
  percontation_point: {
    category: "Communication",
    meanings: {
      visual: "A reversed question-mark curve with a base point.",
      semantic: "Marks a rhetorical or open-ended question not seeking a direct answer.",
      engineering:
        "Adjacent text is rhetorical or open-ended; do not invent an answer or treat it as required Q&A.",
    },
    accessibility: {
      name: "Percontation point",
      description: "Indicates a rhetorical or open-ended question.",
    },
    ai: {
      intent: "Prevent fabricated answers to rhetorical or open-ended questions.",
      llmInstructions:
        "Under :percontation_point:, do not invent an answer or treat the adjacent question as a required Q&A task. Acknowledge the open or rhetorical framing.",
      recommendedPrompts: [
        "Restate the :percontation_point: question without answering it as a closed fact.",
        "What open questions does the :percontation_point: leave unresolved?",
      ],
      engineeringContext: "Design narratives, RFCs posing open problems, rhetorical prompts in docs.",
    },
    usage: {
      recommended: "Use for rhetorical or deliberately open questions where no concrete answer is expected.",
      notRecommended: "Do not use when the intent is to challenge premises—prefer :elray:.",
      examples: [
        "What could go wrong if we ship without a rollback plan :percontation_point:",
        "Who among us has never shipped a hotfix on Friday :percontation_point:",
      ],
    },
    aliases: ["percontation", "rhetorical_question"],
    keywords: ["rhetorical", "open-ended", "question", "punctuation"],
    tags: ["communication", "language", "punctuation"],
  },
  doubt_point: {
    category: "Communication",
    meanings: {
      visual: "A stem and circle carrying a small question curve over an open base point.",
      semantic: "Marks a skeptical or unverified claim—contrary to certitude.",
      engineering:
        "Adjacent claim is unverified or contested; do not treat it as proven; surface uncertainty and evidence gaps.",
    },
    accessibility: {
      name: "Doubt point",
      description: "Indicates a skeptical or unverified claim.",
    },
    ai: {
      intent: "Keep skeptical or unverified claims from being treated as proven.",
      llmInstructions:
        "Under :doubt_point:, treat adjacent claims as unverified. Do not assert them as facts; surface uncertainty, missing evidence, and what would raise confidence.",
      recommendedPrompts: [
        "What evidence is missing for the :doubt_point: claim?",
        "Contrast the :doubt_point: statement with what :certitude: would require.",
      ],
      engineeringContext: "Unverified metrics, speculative root causes, draft hypotheses in incident notes.",
    },
    usage: {
      recommended: "End or mark statements the author wants read with skepticism.",
      notRecommended: "Do not mark proven or exhaustively tested logic—use :certitude: instead.",
      examples: ["Latency is fine in production :doubt_point:", "This race cannot happen :doubt_point:"],
    },
    aliases: ["doubt"],
    keywords: ["skeptical", "unverified", "uncertainty", "punctuation"],
    tags: ["communication", "language", "punctuation", "quality"],
  },
  asterism: {
    category: "Communication",
    meanings: {
      visual: "Three asterisk units arranged in a triangle.",
      semantic: "Marks a major break between sub-chapters or narrative sections.",
      engineering:
        "Treat preceding and following blocks as separate sections; do not merge context across the break.",
    },
    accessibility: {
      name: "Asterism",
      description: "Indicates a major section or narrative break.",
    },
    ai: {
      intent: "Preserve hard section boundaries in documents.",
      llmInstructions:
        "Treat :asterism: as a major structural break. Do not blend requirements, decisions, or narrative across the mark; summarize each side separately when asked.",
      recommendedPrompts: [
        "Summarize the sections before and after :asterism: separately.",
        "List decisions that belong only to the block after :asterism:.",
      ],
      engineeringContext: "ADRs with distinct phases, runbooks with major scene changes, long-form design docs.",
    },
    usage: {
      recommended: "Separate major narrative or document sections when a new heading is too heavy.",
      notRecommended: "Do not use for soft paragraph decoration—prefer :hedera:.",
      examples: ["Background … :asterism: Proposal …", "Incident timeline day 1 … :asterism: Day 2 recovery …"],
    },
    aliases: [],
    keywords: ["section", "break", "separator", "punctuation"],
    tags: ["communication", "language", "punctuation", "documentation"],
  },
  hedera: {
    category: "Communication",
    meanings: {
      visual: "A heart-shaped fleuron with paired ivy curls and a stem.",
      semantic: "Marks a soft paragraph or ornamental break without a hard section boundary.",
      engineering:
        "Signal a gentle pause or decorative divider; keep surrounding context continuous unless a stronger break is marked.",
    },
    accessibility: {
      name: "Hedera",
      description: "Indicates a soft paragraph or ornamental break.",
    },
    ai: {
      intent: "Recognize light decorative breaks without splitting document semantics.",
      llmInstructions:
        "Treat :hedera: as a soft or ornamental break. Do not invent a new section boundary; preserve continuous context across it unless :asterism: or headings say otherwise.",
      recommendedPrompts: [
        "Read through the :hedera: pause without treating it as a new ADR section.",
        "Where would :asterism: be more appropriate than :hedera: here?",
      ],
      engineeringContext: "Prose dividers in style guides, ornamental pauses in long comments or notes.",
    },
    usage: {
      recommended: "Use for soft paragraph pauses or decorative division within a section.",
      notRecommended: "Do not use for major sub-chapter breaks—prefer :asterism:.",
      examples: ["Opening note … :hedera: Continuing detail …", "Thanks to reviewers :hedera:"],
    },
    aliases: ["fleuron", "printers_flower"],
    keywords: ["fleuron", "ivy", "paragraph", "ornament", "punctuation"],
    tags: ["communication", "language", "punctuation", "culture"],
  },
  manicule: {
    category: "Communication",
    meanings: {
      visual: "A simplified pointing hand indicating direction and emphasis.",
      semantic: "Highlights or draws attention to a significant passage.",
      engineering: "Prioritize the adjacent passage for attention, review, or follow-through.",
    },
    accessibility: {
      name: "Manicule",
      description: "Indicates a passage that should receive attention.",
    },
    ai: {
      intent: "Force attention onto a critical adjacent passage.",
      llmInstructions:
        "Under :manicule:, prioritize the adjacent passage. Surface it first in summaries, reviews, and checklists; do not bury it under surrounding context.",
      recommendedPrompts: [
        "Quote the passage marked :manicule: and explain why it matters.",
        "Add the :manicule: item to the top of the review checklist.",
      ],
      engineeringContext: "Callouts in ADRs, critical caveats in runbooks, must-read notes in PRs.",
    },
    usage: {
      recommended: "Point at passages that must not be overlooked.",
      notRecommended: "Do not use as a general bullet or decorative flourish.",
      examples: [
        ":manicule: Rollback is irreversible after step 3.",
        ":manicule: This SLA excludes weekend maintenance windows.",
      ],
    },
    aliases: ["pointing_hand", "index"],
    keywords: ["attention", "highlight", "pointer", "punctuation"],
    tags: ["communication", "language", "punctuation", "documentation"],
  },
};

const outDir = path.join(ROOT, "docs", "glyphs");
fs.mkdirSync(outDir, { recursive: true });
const map = loadFixedUnicodeMap();

for (const [id, entry] of Object.entries(map)) {
  const stub = STUBS[id];
  if (!stub) {
    console.error(`Missing stub for ${id}`);
    process.exit(1);
  }
  const primaryShortcode =
    id === "authority_mark"
      ? ":authority:"
      : id === "certitude_point"
        ? ":certitude:"
        : `:${id}:`;
  const doc = {
    id,
    shortcode: primaryShortcode,
    codepoint: entry.codepoint,
    category: stub.category,
    meanings: stub.meanings,
    accessibility: stub.accessibility,
    ai: stub.ai,
    usage: stub.usage ?? {
      recommended: `Use :${id}: where its engineering meaning applies.`,
      notRecommended: "Do not use outside its documented intent.",
      examples: [`Example usage of :${id}:`],
    },
    aliases: stub.aliases,
    keywords: stub.keywords,
    tags: stub.tags,
    asset: { svg: `assets/${id}.svg` },
  };
  fs.writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(doc, null, 2) + "\n", "utf8");
  console.log(`wrote docs/glyphs/${id}.json`);
}

console.log(`Seeded ${Object.keys(map).length} glyph docs`);
