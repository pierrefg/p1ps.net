"use client";

import { useEffect, useState } from "react";

import useStore from '@/store/useStore';

import TaskBar from "@/components/TaskBar/TaskBar";
import Background from "@/components/Background/Background";
import ScreenSaver from "@/components/ScreenSaver/ScreenSaver";
import NotePad from "@/components/Apps/NotePad/NotePad";
import Desktop from "@/components/Desktop/Desktop";

import files from "@/files/files";


export default function Home() {
  const { openWindows } = useStore();
  const addWindow = useStore((state) => state.addWindow);

  useEffect(() => {
      addWindow(NotePad);
      // addWindow(NotePad, files[0]);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ScreenSaver />
      <Desktop files={files}/>
      <Background />
      {openWindows.map((App) => App.window)}
      <TaskBar />
    </div>
  );
}
