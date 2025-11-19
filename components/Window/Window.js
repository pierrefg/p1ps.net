'use client';

import { useEffect, useState } from "react";

export default function Window({ children }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [title, setTitle] = useState("Hello Window");

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // --- Dragging logic ---
  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      // Clamp to viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + size.width > viewportWidth) newX = viewportWidth - size.width;
      if (newY + size.height > viewportHeight) newY = viewportHeight - size.height;

      setPosition({ x: newX, y: newY });
    }

    if (resizing) {
      const newWidth = e.clientX - position.x;
      const newHeight = e.clientY - position.y;

      // Minimum size
      setSize({
        width: Math.max(200, newWidth),
        height: Math.max(100, newHeight),
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  // --- Resizing handle ---
  const startResize = (e) => {
    e.stopPropagation(); // Prevent dragging while resizing
    setResizing(true);
  };

  return (
    <div
      className="absolute border-white border-2 bg-black z-10 flex flex-col shadow-[0_4px_0_0_black]"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Title bar */}
      <div
        className="w-full h-[30px] border-b-2 border-white flex flex-row cursor-grab justify-center items-center bg-purple-950 select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex flex-1 justify-center items-center">{title}</div>
        <div className="flex justify-center items-center p-2">controls</div>
      </div>

      {/* Content */}
      <div className="flex-1 relative">{children}</div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-white"
        onMouseDown={startResize}
      />
    </div>
  );
}
