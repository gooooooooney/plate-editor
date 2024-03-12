import { createPluginFactory, removeNodes } from '@udecode/plate-common';

import { slashOnKeyDownHandler } from './handlers';
import { isSelectionInSlashInput } from './queries/index';
import { SlashPlugin } from './types';
import { withSlash } from './withSlash';

export const KEY_SLASH = 'slash';
export const ELEMENT_SLASH_INPUT = 'slash-input';

export const createSlashPlugin = createPluginFactory<SlashPlugin>({
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
  handlers: {
    onKeyDown: slashOnKeyDownHandler({ query: isSelectionInSlashInput }),
    onBlur: (editor) => () => {
      // remove mention_input nodes from editor on blur
      removeNodes(editor, {
        match: (n) => n.type === ELEMENT_SLASH_INPUT,
        at: [],
      });
    },
  },
  options: {
    trigger: '/',
    triggerPreviousCharPattern: /^\s?$/,
    createSlashNode: (item) => ({ value: item.text }),
  },
  plugins: [
    {
      key: ELEMENT_SLASH_INPUT,
      isElement: true,
      isInline: true,
    },
  ],
  then: (editor, { key }) => ({
    options: {
      id: key,
    },
  }),
  withOverrides: withSlash,
  // (
  //   editor,
  //   { options: { id, trigger, triggerPreviousCharPattern } }: any
  // ) => {
  //   const { type } = getPlugin(editor, KEY_SLASH);

  //   const { insertText, deleteBackward, insertNode, apply } = editor;

  //   editor.insertText = (text) => {
  //     if (text !== trigger) {
  //       insertText(text);
  //       return;
  //     }

  //     // Make sure a mention input is created at the beginning of line or after a whitespace
  //     const previousChar = getEditorString(
  //       editor,
  //       getRange(
  //         editor,
  //         editor.selection!,
  //         getPointBefore(editor, editor.selection!)
  //       )
  //     );
  //     const matchesPreviousCharPattern =
  //       triggerPreviousCharPattern?.test(previousChar);

  //     if (matchesPreviousCharPattern && text === trigger) {
  //       comboboxActions.open({
  //         activeId: id!,
  //         text: '',
  //         targetRange: editor.selection,
  //       });
  //       console.log(id, text, editor.selection);
  //       return insertText(text);
  //     }

  //     return insertText(text);
  //   };

  //   editor.apply = (operation) => {
  //     apply(operation);
  //     console.log(operation);
  //     if (operation.type === 'remove_text' && operation.text === trigger) {
  //       comboboxActions.reset();
  //     }
  //   };

  //   return editor;
  // },
});
