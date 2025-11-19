import { create } from 'zustand';

import Window from '@/components/Window/Window';
import NotePad from '@/components/Apps/NotePad/NotePad';
import { nanoid } from 'nanoid';

const useStore = create((set) => ({
  openWindows : [ <Window key={nanoid()} App={NotePad} file={null} /> ],
  lastOpenningPosition : { x: 50, y: 50 },
  lastZValue: 1,
  addWindow: (Component) =>
    set((state) => ({
      openWindows: [...state.openWindows, <Window key={nanoid()} App={Component} file={null} />],
  })),
}));

export default useStore;