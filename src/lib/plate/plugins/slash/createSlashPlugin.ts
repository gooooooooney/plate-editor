import { comboboxActions } from '@udecode/plate-combobox';
import {
  createPluginFactory,
  getEditorString,
  getPlugin,
  getPointBefore,
  getRange,
} from '@udecode/plate-common';

export const KEY_SLASH = 'slash';

export const createSlashPlugin = createPluginFactory({
  key: KEY_SLASH,
  // handlers: {
  //   onKeyDown: (editor) => (e) => {
  //     if (e.key === '/') {
  //       slashAction.openSlashMenu();
  //       console.log('open slash menu');
  //       e.preventDefault();
  //       editor.insertText('/');
  //     }
  //   },
  // },
  options: {
    trigger: '/',
    triggerPreviousCharPattern: /^\s?$/,
  },
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
  withOverrides: (
    editor,
    { options: { id, trigger, triggerPreviousCharPattern } }: any
  ) => {
    const { type } = getPlugin(editor, KEY_SLASH);

    const { insertText, deleteBackward, insertNode, apply } = editor;

    editor.insertText = (text) => {
      if (text !== trigger) {
        insertText(text);
        return;
      }

      // Make sure a mention input is created at the beginning of line or after a whitespace
      const previousChar = getEditorString(
        editor,
        getRange(
          editor,
          editor.selection!,
          getPointBefore(editor, editor.selection!)
        )
      );
      const matchesPreviousCharPattern =
        triggerPreviousCharPattern?.test(previousChar);

      if (matchesPreviousCharPattern && text === trigger) {
        comboboxActions.open({
          activeId: id!,
          text: '',
          targetRange: editor.selection,
        });
        console.log(id, text, editor.selection);
        return insertText(text);
      }

      return insertText(text);
    };

    editor.apply = (operation) => {
      apply(operation);
      console.log(operation);
      if (operation.type === 'remove_text' && operation.text === trigger) {
        comboboxActions.reset();
      }
    };

    return editor;
  },
});
