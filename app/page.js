"use client";

import TaskBar from "@/components/TaskBar/TaskBar";
import Background from "@/components/Background/Background";
import ScreenSaver from "@/components/ScreenSaver/ScreenSaver";

import useStore from '@/store/useStore';

export default function Home() {
  const { openWindows } = useStore();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ScreenSaver />
      <Background />
      {openWindows.map((App) => App)}
      <TaskBar />
    </div>
  );
}
