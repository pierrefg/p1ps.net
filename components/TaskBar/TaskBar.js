'use client';

import { useEffect, useState } from "react";

import Clock from "../Clock/Clock";

export default function TaskBar() {
  return (
    <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 lg:w-[600px] md:w-[400px] sm:w-[200px] flex items-center justify-center border-white border-2 z-1000 p-3 bg-black">
      <div className="flex flex-row w-full"> 
        <div className="flex items-center flex-1 justify-center">
          menu
        </div>
        <div className="flex items-center justify-center">
          <Clock />
        </div>
      </div>
      
    </div>
  );
}
