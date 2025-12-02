'use client';

import useStore from '@/store/useStore';
import Clock from "../Clock/Clock";
import { availableApps } from "@/components/Apps/availableApps";

export default function TaskBar() {
  const addWindow = useStore((state) => state.addWindow);

  return (
    <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 lg:w-[600px] md:w-[400px] sm:w-[200px] flex items-center justify-center border-white border-2 z-1000 p-3 bg-black">
      <div className="flex flex-row w-full"> 
        <div className="flex items-center flex-1 justify-center">
          {availableApps.map((App, index) => (
            <button
              key={index}
              onClick={() => addWindow(App.app)}
              className="app-button"
            >
              {<App.app.icon />}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Clock />
        </div>
      </div>
    </div>
  );
}