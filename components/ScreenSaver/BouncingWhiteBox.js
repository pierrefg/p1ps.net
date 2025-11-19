'use client';

import { useEffect, useState } from "react";

export default function BouncingWhiteBox() {
  const boxSize = 200;
  const speed = 4;
  const fps = 60;
  const interval = 1000 / fps;

  const [position, setPosition] = useState({
    x: Math.random() * (window.innerWidth - boxSize),
    y: Math.random() * (window.innerHeight - boxSize),
  });

  const [direction, setDirection] = useState({ x: speed, y: speed });

  useEffect(() => {
    let timerId;

    const update = () => {
      setPosition((prev) => {
        let nextX = prev.x + direction.x;
        let nextY = prev.y + direction.y;
        let nextDirX = direction.x;
        let nextDirY = direction.y;

        if (nextX <= 0 || nextX + boxSize >= window.innerWidth) {
          nextDirX = -nextDirX;
          nextX = Math.max(0, Math.min(nextX, window.innerWidth - boxSize));
        }

        if (nextY <= 0 || nextY + boxSize >= window.innerHeight) {
          nextDirY = -nextDirY;
          nextY = Math.max(0, Math.min(nextY, window.innerHeight - boxSize));
        }

        setDirection({ x: nextDirX, y: nextDirY });

        return { x: nextX, y: nextY };
      });

      timerId = setTimeout(update, interval);
    };

    timerId = setTimeout(update, interval);

    return () => clearTimeout(timerId);
  }, [direction, interval]);

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full z-[1001]">
      
      {/* MASKING */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute bg-black"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: position.y + "px",
          }}
        />
        <div
          className="absolute bg-black"
          style={{
            top: position.y + boxSize + "px",
            left: 0,
            width: "100%",
            height: `calc(100% - ${position.y + boxSize}px)`,
          }}
        />
        <div
          className="absolute bg-black"
          style={{
            top: position.y + "px",
            left: 0,
            width: position.x + "px",
            height: boxSize + "px",
          }}
        />
        <div
          className="absolute bg-black"
          style={{
            top: position.y + "px",
            left: position.x + boxSize + "px",
            width: `calc(100% - ${position.x + boxSize}px)`,
            height: boxSize + "px",
          }}
        />
      </div>

      <div
        className="border-4 border-white absolute"
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
}
