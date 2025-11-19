"use client";

import TaskBar from "@/components/TaskBar/TaskBar";
import Background from "@/components/Background/Background";
import ScreenSaver from "@/components/ScreenSaver/ScreenSaver";

import Window from "@/components/Window/Window";

import useStore from '@/store/useStore';
import NotePad from "@/components/Apps/NotePad/NotePad";

export default function Home() {
  const { openWindows } = useStore();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ScreenSaver />
      <Background />
      {openWindows.map((App) => App.window)}
      <TaskBar />
    </div>
  );
}
