"use client";

import { useState, useRef } from "react";

import { formatDateString } from '@/utils/utils';

export default function DesktopIcon({ file, addWindow }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimeout = useRef(null); // useRef so it persists across renders

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowTooltip(true);
    }, 800); // 800ms delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current); // cancel the timeout
    setShowTooltip(false);              // hide tooltip immediately
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={() => addWindow(file.app, file)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-[80px] h-[100px] flex flex-col items-center justify-center text-center pointer-events-auto"
      >
        <file.app.icon className="text-[40px]" />
        <span className="mt-1 w-[120px] text-center break-words">
          {file.name + '.' + file.ext}
        </span>
      </button>

      {showTooltip && (
        <div className="absolute top-[50%] left-[50%] bg-black border-2 border-white text-white text-xs p-2 z-50 w-55">
          <p><strong>{file.name}.{file.ext}</strong></p>
          <p>created_on: {formatDateString(file.created_on) || "Unknown"}</p>
          <p>type: {file.ext || "Unknown"}</p>
          <p>size: {file.size || "N/A"}</p>
          <p>void: {file.void ? 'yes' : 'no'}</p>
        </div>
      )}
    </div>
  );
};
