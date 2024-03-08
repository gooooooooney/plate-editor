import { createZustandStore } from '@udecode/plate-common';

export type SlashState = {
  shouldShowSlashMenu: boolean;
};

export const slashStore = createZustandStore('slash')<SlashState>({
  shouldShowSlashMenu: false,
}).extendActions((set, get) => ({
  openSlashMenu: () => {
    set.state((draft) => {
      draft.shouldShowSlashMenu = true;
    });
  },
  closeSlashMenu: () => {
    set.state((draft) => {
      draft.shouldShowSlashMenu = false;
    });
  },
}));

export const slashAction = slashStore.set;

export const slashSelectors = slashStore.get;
