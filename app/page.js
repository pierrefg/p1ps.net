"use client";

import { useEffect, useState } from "react";

import useStore from '@/store/useStore';

import TaskBar from "@/components/TaskBar/TaskBar";
import Background from "@/components/Background/Background";
import ScreenSaver from "@/components/ScreenSaver/ScreenSaver";
import NotePad from "@/components/Apps/NotePad/NotePad";
import Desktop from "@/components/Desktop/Desktop";

import files from "@/files/files";

import { MdComputer } from "react-icons/md";


export default function Home() {
  const { openWindows } = useStore();
  const addWindow = useStore((state) => state.addWindow);

  useEffect(() => {
    addWindow(NotePad);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* MOBILE VIEW ONLY */}
      <div className="w-full min-h-screen p-8 flex flex-col items-center justify-center text-center md:hidden">
        <MdComputer className="text-2xl mb-2"/>
        <p>Mon super blog n'est hélas pas disponible téléphone, ouvrez donc votre ordinateur !</p>
      </div>

      {/* DESKTOP VIEW ONLY */}
      <div className="w-full h-full hidden md:block">
        <ScreenSaver />
        <Desktop files={files} />
        <Background />
        {openWindows.map((App) => App.window)}
        <TaskBar />
      </div>

    </div>
  );
}