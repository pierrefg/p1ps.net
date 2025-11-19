'use client';

import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';

import useStore from '@/store/useStore';

export default function Window({ children, icon, appName, fileName }) {
  const [id] = useState(() => nanoid());

  const { lastOpenningPosition, lastZValue } = useStore();

  const [position, setPosition] = useState({ x: lastOpenningPosition.x, y: lastOpenningPosition.y });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [zOrder, setZOrder] = useState(lastZValue);

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [closed, setClosed] = useState(false);

  useEffect(() => {
    useStore.setState((state) => ({
      lastOpenningPosition: { x: lastOpenningPosition.x+20, y: lastOpenningPosition.y+20 },
      lastZValue: lastZValue+1
    }));
  }, []);

  const activateWindow = (e) => {

  };

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
      className="window absolute flex flex-col"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zOrder,
      }}
      onClick={activateWindow}
    >
      {/* Title bar */}
      <div
        className="w-full h-[30px] border-b-2 border-white flex flex-row justify-center items-center bg-[#800080] select-none"
        
      >
        <div className="flex flex-1 justify-center items-center cursor-grab" onMouseDown={handleMouseDown}>
          {icon}&nbsp;{appName} -&nbsp;<i>{fileName}</i>
        </div>
        <div className="flex justify-center items-center p-2">
          <button onClick={x => setClosed(!closed)}>x</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative">{children}</div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-white"
        onMouseDown={startResize}
      />

      {/* Id */}
      <div
        className="absolute bottom-0 left-0 small pl-2 text-gray-700"
      >{id}</div>
    </div>
  );
}
