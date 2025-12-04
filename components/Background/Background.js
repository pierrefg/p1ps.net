import Image from "next/image";

import { useEffect, useState } from "react";
import backgroungImg from './background.jpg';
import prizeImg from './prize.jpg';

export function SquareGrid({ targetPattern }) {
  const [won, setWon] = useState(false);

  // Initialize cells with inactive states
  const [cells, setCells] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      active: false,
    }))
  );

  // Toggles a cell state
  const toggleCell = (id) => {
    setCells((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c
      )
    );
  };

  // Check if user pattern matches the target pattern
  useEffect(() => {
    const currentPattern = cells.map((c) => c.active);
    const hasWon = currentPattern.every(
      (value, index) => value === targetPattern[index]
    );

    if (hasWon) {
      setWon(true);
    }
  }, [cells, targetPattern]);

  return (
    <div className="w-[150px] h-[150px] border-2 border-white">
      {won ? (
          <Image
            src={prizeImg}
            alt="handsome man with a bowl on his head"
            className="w-full h-full"
          />
      ) : (
        <div className="w-full h-full grid grid-cols-5">
          {cells.map((cell) => (
            <button
              key={cell.id}
              onClick={() => toggleCell(cell.id)}
              className={`
                w-full h-full 
                border border-white
                ${cell.active ? "bg-[#800080]" : "bg-black"}
              `}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}


export default function Background() {
  const [showGrid, setShowGrid] = useState(false);

  const target = [
    true, false, false, false, true,
    false, true, true, true, false,
    false, true, false, true, false,
    false, true, true, true, false,
    true, false, false, false, true
  ];

  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-black flex items-center justify-center z-0 select-none">
      
      {!showGrid && (
        <div className="relative">
          <Image
            src={backgroungImg}
            alt="noisy moon"
            width={500}
            className="border-white border-2"
          />

          <div
            className="absolute top-[40%] left-[40%] w-[80px] h-[80px] cursor-pointer"
            onClick={() => setShowGrid(true)}
          >
          </div>
        </div>
      )}

      <div
        className={`
          absolute 
          ${showGrid ? "z-20" : "z-[-1]"}
        `}
      >
        <SquareGrid targetPattern={target} />
      </div>
    </div>
  );
}