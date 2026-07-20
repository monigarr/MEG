import * as vscode from "vscode";
import { listShortcodes, getGlyph, SHORTCODE_MAP } from "@monigarr/meg-parser";
import { HOVER_DOCS } from "./hover-docs.generated.js";

export function activate(context: vscode.ExtensionContext): void {
  const completion = vscode.languages.registerCompletionItemProvider(
    "markdown",
    {
      provideCompletionItems(document, position) {
        const line = document.lineAt(position).text.slice(0, position.character);
        const match = line.match(/:[a-z0-9_]*$/);
        if (!match) return undefined;

        return listShortcodes().map((shortcode) => {
          const glyph = getGlyph(shortcode);
          const item = new vscode.CompletionItem(
            shortcode,
            vscode.CompletionItemKind.Text,
          );
          item.insertText = shortcode;
          item.detail = glyph?.codepoint ?? "MEG glyph";
          item.documentation = new vscode.MarkdownString(
            HOVER_DOCS[shortcode] ??
              `MEG glyph \`${glyph?.id ?? shortcode}\` (${glyph?.codepoint ?? "?"})`,
          );
          return item;
        });
      },
    },
    ":",
  );

  const hover = vscode.languages.registerHoverProvider("markdown", {
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position, /:[a-z][a-z0-9_]*:/);
      if (!range) return undefined;
      const word = document.getText(range);
      if (!(word in SHORTCODE_MAP)) return undefined;
      const docs =
        HOVER_DOCS[word] ??
        `MEG \`${SHORTCODE_MAP[word].id}\` (${SHORTCODE_MAP[word].codepoint})`;
      return new vscode.Hover(new vscode.MarkdownString(docs), range);
    },
  });

  const insertAuthority = vscode.commands.registerCommand(
    "meg.insertAuthority",
    () => insertAtCursor(":authority:"),
  );
  const insertCertitude = vscode.commands.registerCommand(
    "meg.insertCertitude",
    () => insertAtCursor(":certitude:"),
  );

  context.subscriptions.push(completion, hover, insertAuthority, insertCertitude);
}

function insertAtCursor(text: string): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  editor.edit((edit) => {
    edit.insert(editor.selection.active, text);
  });
}

export function deactivate(): void {}
