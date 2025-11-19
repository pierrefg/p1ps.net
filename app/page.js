"use client";

import { useEffect, useState } from "react";

import TaskBar from "@/components/TaskBar/TaskBar";
import Background from "@/components/Background/Background";
import ScreenSaver from "@/components/ScreenSaver/ScreenSaver";

import useStore from '@/store/useStore';

import NotePad from "@/components/Apps/NotePad/NotePad";
import Rain from "@/components/Apps/Rain/rain";

export default function Home() {
  const { openWindows } = useStore();
  const addWindow = useStore((state) => state.addWindow);

  useEffect(() => {
      addWindow(NotePad);
      addWindow(Rain);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ScreenSaver />
      <Background />
      {openWindows.map((App) => App.window)}
      <TaskBar />
    </div>
  );
}
