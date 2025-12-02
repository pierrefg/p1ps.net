import { create } from 'zustand';
import Window from '@/components/Window/Window';
import { nanoid } from 'nanoid';

const useStore = create((set, get) => ({
  openWindows: [],
  activeWindowId: null,
  windowsOrder: [],
  lastOpenningPosition: { x: 50, y: 50 },
  lastZValue: 100,

  addWindow: (App, file = null) => set((state) => {
    const id = file?.id || nanoid();

    if (state.windowsOrder.includes(id)) {
      get().activateWindow(id);

      return {};
    }

    const window = {
      window: <Window key={id} id={id} App={App} file={file} />,
      id,
    };

    return {
      openWindows: [...state.openWindows, window],
      lastOpenningPosition: {
        x: state.lastOpenningPosition.x + 25,
        y: state.lastOpenningPosition.y + 25,
      },
      windowsOrder: [...state.windowsOrder, id],
      lastZValue: state.lastZValue + 1,
      activeWindowId: id,
    };
  }),

  closeWindow: (windowId) =>
    set((state) => ({
      openWindows: state.openWindows.filter(item => item.id !== windowId),
      windowsOrder: state.windowsOrder.filter(id => id !== windowId),
      activeWindowId:
        state.activeWindowId === windowId ? null : state.activeWindowId,
    })),

  activateWindow: (windowId) =>
    set((state) => {
      const index = state.windowsOrder.indexOf(windowId);
      const newWindowsOrder = [...state.windowsOrder];

      if (index > -1) {
        const [item] = newWindowsOrder.splice(index, 1);
        newWindowsOrder.push(item);
      }

      return {
        windowsOrder: newWindowsOrder,
        activeWindowId: windowId,
      };
    }),
}));

export default useStore;
