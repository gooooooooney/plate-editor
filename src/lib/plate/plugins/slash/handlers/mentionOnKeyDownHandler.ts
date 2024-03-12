import { isHotkey, PlateEditor, Value } from '@udecode/plate-common';

import { findSlashInput } from '../queries';
import { removeSlashInput } from '../transforms/index';
import { KeyboardEventHandler } from './KeyboardEventHandler';
import {
  moveSelectionByOffset,
  MoveSelectionByOffsetOptions,
} from './moveSelectionByOffset';

export const slashOnKeyDownHandler: <V extends Value>(
  options?: MoveSelectionByOffsetOptions<V>
) => (editor: PlateEditor<V>) => KeyboardEventHandler =
  (options) => (editor) => (event) => {
    if (isHotkey('escape', event)) {
      const currentMentionInput = findSlashInput(editor)!;
      if (currentMentionInput) {
        event.preventDefault();
        removeSlashInput(editor, currentMentionInput[1]);
        return true;
      }
      return false;
    }

    return moveSelectionByOffset(editor, options)(event);
  };
