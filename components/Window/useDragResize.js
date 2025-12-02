import { useEffect, useState, useCallback } from "react";

export default function useDragResize(initialPos, initialSize) {
  const [position, setPosition] = useState(initialPos);
  const [size, setSize] = useState(initialSize);

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Normalize coords (touch or mouse)
  const getXY = (e) => {
    if (e.touches) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const startDragging = useCallback((e) => {
    const { x, y } = getXY(e);
    setDragging(true);
    setOffset({ x: x - position.x, y: y - position.y });
  }, [position]);

  const startResize = useCallback((e) => {
    e.stopPropagation();
    setResizing(true);
  }, []);

  const stopAll = useCallback(() => {
    setDragging(false);
    setResizing(false);
  }, []);

  const handleMove = useCallback(
    (e) => {
      const { x, y } = getXY(e);

      if (dragging) {
        let newX = x - offset.x;
        let newY = y - offset.y;

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + size.width > vw) newX = vw - size.width;
        if (newY + size.height > vh) newY = vh - size.height;

        setPosition({ x: newX, y: newY });
      }

      if (resizing) {
        setSize({
          width: Math.max(500, x - position.x),
          height: Math.max(300, y - position.y),
        });
      }
    },
    [dragging, resizing, offset, position, size]
  );

  // Add listeners
  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopAll);

    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", stopAll);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopAll);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", stopAll);
    };
  }, [handleMove, stopAll]);

  return {
    position,
    size,
    startDragging,
    startResize,
  };
}