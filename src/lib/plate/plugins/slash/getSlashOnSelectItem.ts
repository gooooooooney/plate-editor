import {
  comboboxActions,
  ComboboxOnSelectItem,
  comboboxSelectors,
  Data,
  TComboboxItem,
} from '@udecode/plate-combobox';
import {
  focusEditor,
  getBlockAbove,
  getPlugin,
  isEndPoint,
  moveSelection,
  PlatePluginKey,
  removeNodes,
  select,
  TNodeProps,
  toggleNodeType,
  withoutMergingHistory,
  withoutNormalizing,
} from '@udecode/plate-common';
import { ListStyleType, toggleIndentList } from '@udecode/plate-indent-list';
import { ELEMENT_TABLE, insertTable } from '@udecode/plate-table';

import { TSlashData } from '../../slash-items';
import { KEY_SLASH } from './createSlashPlugin';
import { isNodeSlashInput } from './queries/isNodeSlashInput';
import { SlashPlugin, TSlashElement } from './types';
import { slashAction } from '../../store';

export interface CreateSlashNode<TData extends Data> {
  (
    item: TComboboxItem<TData>,
    meta: CreateSlashNodeMeta
  ): TNodeProps<TSlashElement>;
}

export interface CreateSlashNodeMeta {
  search: string;
}

export const getSlashOnSelectItem =
  <TData extends Data = TSlashData>({
    key = KEY_SLASH,
  }: PlatePluginKey = {}): ComboboxOnSelectItem<TSlashData> =>
  (editor, item) => {
    const targetRange = comboboxSelectors.targetRange();
    if (!targetRange) return;
    const {
      type,
      options: { insertSpaceAfterSlash, createSlashNode },
    } = getPlugin<SlashPlugin>(editor as any, key);

    const pathAbove = getBlockAbove(editor)?.[1];
    const isBlockEnd = () =>
      editor.selection &&
      pathAbove &&
      isEndPoint(editor, editor.selection.anchor, pathAbove);

    withoutNormalizing(editor, () => {
      // Selectors are sensitive to operations, it's better to create everything
      // before the editor state is changed. For example, asking for text after
      // removeNodes below will return null.
      const props = createSlashNode!(item, {
        search: comboboxSelectors.text() ?? '',
      });

      select(editor, targetRange);

      withoutMergingHistory(editor, () =>
        removeNodes(editor, {
          match: (node) => isNodeSlashInput(editor, node),
        })
      );
      // console.log(props, 'props');
      // insertNodes<TSlashElement>(editor, {
      //   type,
      //   children: [{ text: '' }],
      // } as TSlashElement);

      // move the selection after the element
      moveSelection(editor, { unit: 'offset' });

      // if (isBlockEnd() && insertSpaceAfterSlash) {
      // insertText(editor, ' ');
      switch (item.data.value) {
        case 'emoji':
          comboboxActions.reset();
          slashAction.setSlashMenu(true)

          break;
        case ListStyleType.Decimal:
        case ListStyleType.Disc:
          toggleIndentList(editor, {
            listStyleType: item.data.value,
          });
          break;
        case ELEMENT_TABLE:
          insertTable(editor);
          break;
        default:
          toggleNodeType(editor, { activeType: item.data.value });
          break;
      }
      focusEditor(editor);
      // }
    });

    return comboboxActions.reset();
  };
