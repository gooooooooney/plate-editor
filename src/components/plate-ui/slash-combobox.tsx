import { ComboboxProps } from '@udecode/plate-combobox';
import { getPluginOptions, useEditorRef } from '@udecode/plate-common';
import { MentionPlugin } from '@udecode/plate-mention';

import { KEY_SLASH } from '@/lib/plate/plugins/slash/createSlashPlugin';
import { TData } from '@/lib/plate/slash-items';

import { Combobox } from './combobox';

export function SlashCombobox({
  pluginKey = KEY_SLASH,
  id = pluginKey,
  ...props
}: Partial<ComboboxProps<TData>> & {
  pluginKey?: string;
}) {
  const editor = useEditorRef();

  const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey);

  return (
    <div onMouseDown={(e) => e.preventDefault()}>
      <Combobox<TData>
        id={id}
        trigger={trigger!}
        controlled
        // onSelectItem={getMentionOnSelectItem({
        //   key: pluginKey,
        // })}
        onSelectItem={(item) => {
          console.log(item);
        }}
        onRenderItem={({ item }: any) => {
          return (
            <div className="my-4 flex w-full items-center space-x-2 rounded-md py-4 text-left text-sm hover:bg-accent aria-selected:bg-accent">
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
