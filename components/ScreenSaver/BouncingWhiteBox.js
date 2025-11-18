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

  const [phase, setPhase] = useState(0);
  const [phaseDir, setPhaseDir] = useState(0.01);

  useEffect(() => {
    let timerId;

    const update = () => {
      // Move the box
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

      // Update phase for color cycling
      setPhase((prev) => {
        let nextPhase = prev + phaseDir;
        if (nextPhase >= 1) {
          nextPhase = 1;
          setPhaseDir(-phaseDir); // reverse direction
        } else if (nextPhase <= 0) {
          nextPhase = 0;
          setPhaseDir(-phaseDir); // reverse direction
        }
        return nextPhase;
      });

      timerId = setTimeout(update, interval);
    };

    timerId = setTimeout(update, interval);

    return () => clearTimeout(timerId);
  }, [direction, interval, phaseDir]);

  const getColor = () => {
    const r = Math.round(128 * phase);
    const g = 0;
    const b = Math.round(128 * phase);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full z-[1001]">
      <div
        className="border-4 border-white absolute"
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          left: `${position.x}px`,
          top: `${position.y}px`,
        //   backgroundColor: getColor(),
        }}
      />
    </div>
  );
}
