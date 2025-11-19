import { create } from 'zustand';

import Window from '@/components/Window/Window';
import NotePad from '@/components/Apps/NotePad/NotePad';
import { nanoid } from 'nanoid';

function createWindow(App) {
  const id = nanoid();
  return {
    window: <Window key={id} id={id} App={App} file={null} />,
    id: id
  }
}

const useStore = create((set) => ({
  openWindows : [ createWindow(NotePad) ],
  lastOpenningPosition : { x: 50, y: 50 },
  lastZValue: 1,
  addWindow: (App) =>
    set((state) => ({
      openWindows: [...state.openWindows, createWindow(App)],
  })),
  closeWindow: (windowId) =>
    set((state) => ({
      openWindows: state.openWindows.filter(item => item.id !== windowId)
  })),
}));

export default useStore;