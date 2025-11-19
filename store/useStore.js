import { create } from 'zustand';

import Window from '@/components/Window/Window';
import NotePad from '@/components/Apps/NotePad/NotePad';
import { nanoid } from 'nanoid';

const useStore = create((set) => ({
  openWindows : [ ],
  activeWindowId : null,
  lastOpenningPosition : { x: 50, y: 50 },
  lastZValue: 1,

  addWindow: (App) => set((state) => {
    const id = nanoid();

    const window = {
      window: <Window key={id} id={id} App={App} file={null} />,
      id: id
    }

    return {
      openWindows: [...state.openWindows, window],
      lastOpenningPosition: {
        x: state.lastOpenningPosition.x + 25,
        y: state.lastOpenningPosition.y + 25
      },
      lastZValue: state.lastZValue + 1,
      activeWindowId: id
    };
  }),
  closeWindow: (windowId) =>
    set((state) => ({
      openWindows: state.openWindows.filter(item => item.id !== windowId)
  })),
  activateWindow: (windowId) =>
    set((state) => ({
      activeWindowId: windowId
  })),
}));

export default useStore;