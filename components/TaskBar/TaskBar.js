'use client';

import { useEffect, useState } from "react";

import Clock from "../Clock/Clock";

export default function TaskBar() {
  return (
    <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[600px] h-[50px] border border-white border-2 flex items-center justify-center z-1000">
      <Clock />
    </div>
  );
}
