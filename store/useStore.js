import { create } from 'zustand';

import NotePad from '@/components/Apps/NotePad/NotePad';
import { nanoid } from 'nanoid';

const useStore = create((set) => ({
  openWindows : [ <NotePad key={nanoid()} /> ],
  lastOpenningPosition : { x: 50, y: 50 },
  lastZValue: 1,
  addWindow: (Component) =>
    set((state) => ({
      openWindows: [...state.openWindows, <Component key={nanoid()} />],
  })),
}));

export default useStore;