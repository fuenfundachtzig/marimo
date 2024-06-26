/* Copyright 2024 Marimo. All rights reserved. */
import { EditorView, keymap } from "@codemirror/view";
import { CellId } from "../cells/ids";
import { formatEditorViews, toggleMarkdown } from "./format";
import { smartScrollIntoView } from "../../utils/scroll";
import { HOTKEYS } from "@/core/hotkeys/hotkeys";
import { CellActions } from "../cells/cells";
import { invariant } from "@/utils/invariant";

/**
 * Add a keymap to format the code in the editor.
 */
export function formatKeymapExtension(
  cellId: CellId,
  updateCellCode: CellActions["updateCellCode"],
) {
  return keymap.of([
    {
      key: HOTKEYS.getHotkey("cell.format").key,
      preventDefault: true,
      run: (ev) => {
        formatEditorViews({ [cellId]: ev }, updateCellCode);
        return true;
      },
    },
    {
      key: HOTKEYS.getHotkey("cell.viewAsMarkdown").key,
      preventDefault: true,
      run: (ev) => {
        toggleMarkdown(cellId, ev, updateCellCode);
        return true;
      },
    },
  ]);
}

/**
 * Scroll the active line into view when the editor is resized,
 * with an offset.
 *
 * This is necessary when typings at the edges of the editor
 * and the user is blocked by the hovering action bar.
 */
export function scrollActiveLineIntoView() {
  return EditorView.updateListener.of((update) => {
    // A new line was added, scroll the active line into view
    if (update.heightChanged && update.docChanged) {
      const activeLines = update.view.dom.getElementsByClassName(
        "cm-activeLine cm-line",
      );
      // Only scroll if there is an active line
      if (activeLines.length === 1) {
        const activeLine = activeLines[0] as HTMLElement;
        const appEl = document.getElementById("App");
        invariant(appEl, "App not found");
        smartScrollIntoView(activeLine, { top: 30, bottom: 150 }, appEl);
      }
    }
  });
}
