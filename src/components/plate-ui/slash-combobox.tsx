import React from 'react';
import { ComboboxProps } from '@udecode/plate-combobox';
import { getPluginOptions, useEditorRef } from '@udecode/plate-common';
import {
  EmojiDropdownMenuOptions,
  useEmojiDropdownMenuState,
} from '@udecode/plate-emoji';
import { MentionPlugin } from '@udecode/plate-mention';

import { KEY_SLASH } from '@/lib/plate/plugins/slash/createSlashPlugin';
import { getSlashOnSelectItem } from '@/lib/plate/plugins/slash/getSlashOnSelectItem';
import { TSlashData } from '@/lib/plate/slash-items';
import { slashAction, slashSelectors } from '@/lib/plate/store';

import { Combobox } from './combobox';
import { emojiCategoryIcons, emojiSearchIcons } from './emoji-icons';
import { EmojiPicker } from './emoji-picker';
import { EmojiToolbarDropdown } from './emoji-toolbar-dropdown';
import { ToolbarButton } from './toolbar';

export function SlashCombobox({
  pluginKey = KEY_SLASH,
  id = pluginKey,
  ...props
}: Partial<ComboboxProps<TSlashData>> & {
  pluginKey?: string;
}) {
  const editor = useEditorRef();

  const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey);

  return (
    <div onMouseDown={(e) => e.preventDefault()}>
      <Combobox<TSlashData>
        id={id}
        trigger={trigger!}
        controlled
        onSelectItem={getSlashOnSelectItem({
          key: pluginKey,
        })}
        onRenderItem={({ item }: any) => {
          return (
            <div className=" flex w-full items-center space-x-2 rounded-md            text-left text-sm hover:bg-accent aria-selected:bg-accent">
              <div className="flex size-10 items-center justify-center rounded-md border border-muted bg-background">
                {item.data.icon}
              </div>
              <div>
                <p className="font-medium">{item.text}</p>
                <p className="text-xs text-muted-foreground">
                  {item.data.description}
                </p>
              </div>
            </div>
          );
        }}
        {...props}
      />
    </div>
  );
}

type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions;
} & React.ComponentPropsWithoutRef<typeof ToolbarButton>;

export function EmojiDropdownMenu({
  options,
  children,
  ...props
}: EmojiDropdownMenuProps) {
  const { emojiPickerState } = useEmojiDropdownMenuState(options);
  const shouldShowSlashEmoji = slashSelectors.shouldShowSlashEmoji();
  const setShouldShowSlashEmoji = slashAction.setSlashMenu;
  console.log(shouldShowSlashEmoji, 'shouldShowSlashEmoji')

  return (
    <EmojiToolbarDropdown
      control={children}
      isOpen={shouldShowSlashEmoji}
      setIsOpen={setShouldShowSlashEmoji}
    >
      <EmojiPicker
        {...emojiPickerState}
        isOpen={shouldShowSlashEmoji}
        setIsOpen={setShouldShowSlashEmoji}
        icons={{
          categories: emojiCategoryIcons,
          search: emojiSearchIcons,
        }}
        settings={options?.settings}
      />
    </EmojiToolbarDropdown>
  );
}
