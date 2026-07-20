import { Plugin } from "obsidian";
import { replaceShortcodes } from "@monigarr/meg-parser";

const SHORTCODE_RE = /:[a-z][a-z0-9_]*:/g;

export default class MegPlugin extends Plugin {
  async onload(): Promise<void> {
    this.registerMarkdownPostProcessor((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      let current = walker.nextNode();
      while (current) {
        nodes.push(current as Text);
        current = walker.nextNode();
      }

      for (const node of nodes) {
        const value = node.nodeValue ?? "";
        if (!SHORTCODE_RE.test(value)) continue;
        SHORTCODE_RE.lastIndex = 0;
        const replaced = replaceShortcodes(value);
        if (replaced !== value) {
          node.nodeValue = replaced;
        }
      }
    });
  }
}
