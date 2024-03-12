import { createZustandStore } from '@udecode/plate-common';

export type SlashState = {
  shouldShowSlashEmoji: boolean;
};

export const slashStore = createZustandStore('slash')<SlashState>({
  shouldShowSlashEmoji: false,
}).extendActions((set, get) => ({
  setSlashMenu: (bol:boolean) => {
    set.state((draft) => {
      draft.shouldShowSlashEmoji = bol;
    });
  },
  openSlashMenu: () => {
    set.state((draft) => {
      draft.shouldShowSlashEmoji = true;
    });
  },
  closeSlashMenu: () => {
    set.state((draft) => {
      draft.shouldShowSlashEmoji = false;
    });
  },
}));

export const slashAction = slashStore.set;

export const slashSelectors = slashStore.get;
