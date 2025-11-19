"use client";

import { debounce } from "lodash";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

import RainDisplay from "./rainDisplay";
import { useUmbrella } from "./hooks/useUmbrella";
import { MdOutlineGrain } from "react-icons/md";

function updateValue(source, target, dampening) {
  return source + (target - source) * dampening;
}

export default function Rain({ parentRef }) {
  const [canvasSize, setCanvasSize] = useState(null);
  const [debug, setDebug] = useState(false);

  const sparsenessRef = useRef(40);
  const windFactorRef = useRef(0.1);

  const [dropsSet, setDropsSet] = useState([]);
  const [drops, setDrops] = useState([]);
  const [groundCollisions, setGroundCollisions] = useState([]);

  const mousePositionRef = useRef({ x: 0, y: 0 });
  const controlParamtersRef = useRef({ x: 0, y: 0 });

  const {
    umbrella,
    umbrellaCollisions,
    umbrellaSizeRef,
    generateUmbrella,
    generateUmbrellaCollisions,
  } = useUmbrella(mousePositionRef, canvasSize);

  // -----------------------------
  //   Bind size to parentRef
  // -----------------------------
  useEffect(() => {
    if (!parentRef?.current) return;

    const handleResize = () => {
      const rect = parentRef.current.getBoundingClientRect();
      setCanvasSize({ width: rect.width, height: rect.height });
    };

    handleResize();

    const obs = new ResizeObserver(handleResize);
    obs.observe(parentRef.current);

    return () => obs.disconnect();
  }, [parentRef]);

  // -----------------------------
  //  Mouse Move inside the window
  // -----------------------------
  useEffect(() => {
    if (!parentRef?.current) return;

    const debouncedMouseMove = debounce((event) => {
      const rect = parentRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mousePositionRef.current = { x, y };
      generateUmbrella();
    }, 5);

    parentRef.current.addEventListener("mousemove", debouncedMouseMove);

    return () => {
      parentRef.current?.removeEventListener("mousemove", debouncedMouseMove);
      debouncedMouseMove.cancel();
    };
  }, [parentRef, generateUmbrella]);

  // -----------------------------
  //  Drops presets
  // -----------------------------
  useEffect(() => {
    setDropsSet(
      Array.from({ length: 100 }, () =>
        [Math.random(), Math.random()].sort((a, b) => a - b)
      )
    );
  }, []);

  // -----------------------------
  //  Generate drops
  // -----------------------------
  const generateDrops = useCallback(() => {
    if (!canvasSize) return;

    const cWidth = canvasSize.width;
    const cHeight = canvasSize.height;

    const sparseness = sparsenessRef.current;
    const umbrellaSize = umbrellaSizeRef.current;

    const nDrops = Math.floor(cWidth / sparseness);
    const drops_x_locations = Array.from(
      { length: nDrops },
      () => Math.random() * cWidth
    );

    const mouseX = mousePositionRef.current.x;
    const mouseY = mousePositionRef.current.y;
    const umbrellaRange = [mouseX - umbrellaSize, mouseX + umbrellaSize];

    const tmp_drops = drops_x_locations
      .map((x0) => {
        const drop_extent =
          dropsSet[Math.floor(Math.random() * dropsSet.length)];
        let y0 = drop_extent[0] * cHeight;
        let y1 = drop_extent[1] * cHeight;

        const windCorrection =
          windFactorRef.current +
          (0.1 + windFactorRef.current) * Math.random() * 0.1;

        let x1 = x0 + (y1 - y0) * windCorrection;

        // Umbrella collision
        if (
          (x0 > umbrellaRange[0] || x1 > umbrellaRange[0]) &&
          (x0 < umbrellaRange[1] || x1 < umbrellaRange[1])
        ) {
          y1 = Math.min(y1, mouseY);
          x1 = x0 + (y1 - y0) * windCorrection;
          if (y0 >= y1) return null;
        }

        return {
          points: [
            { x: x0, y: y0 },
            { x: x1, y: y1 },
          ],
          opacity: Math.random(),
          width: Math.random() * 2,
        };
      })
      .filter(Boolean);

    setDrops(tmp_drops);

    const nGroundCollisions = Math.floor(cWidth / (3 * sparseness));
    setGroundCollisions(
      Array.from({ length: nGroundCollisions }, () => ({
        point: { x: Math.random() * cWidth, y: cHeight },
      }))
    );

    generateUmbrellaCollisions();
  }, [canvasSize, dropsSet, generateUmbrellaCollisions]);

  useEffect(() => {
    if (!canvasSize) return;
    const interval = setInterval(generateDrops, 100);
    return () => clearInterval(interval);
  }, [canvasSize, generateDrops]);

  // -----------------------------
  //  Parameters adaptation
  // -----------------------------
  useEffect(() => {
    if (!canvasSize) return;
    const interval = setInterval(() => {
      const cWidth = canvasSize.width;
      const cHeight = canvasSize.height;

      const updateSpeed = 0.1;

      controlParamtersRef.current = {
        x: updateValue(
          controlParamtersRef.current.x,
          mousePositionRef.current.x / cWidth,
          updateSpeed
        ),
        y: updateValue(
          controlParamtersRef.current.y,
          mousePositionRef.current.y / cHeight,
          updateSpeed
        ),
      };

      sparsenessRef.current = updateValue(
        sparsenessRef.current,
        80 + (1 - controlParamtersRef.current.x) * 150,
        updateSpeed
      );

      windFactorRef.current = updateValue(
        windFactorRef.current,
        controlParamtersRef.current.x * 0.3,
        0.05
      );
    }, 50);

    return () => clearInterval(interval);
  }, [canvasSize]);

  // -----------------------------
  //   Rendering
  // -----------------------------
  if (!canvasSize) return null;

  return (
    <div className="w-full h-full relative overflow-hidden">
      {debug && (
        <div className="absolute z-50 m-7 bottom-7 bg-black text-white p-2 text-xs">
          mouse: {mousePositionRef.current.x},{mousePositionRef.current.y}
          <br />
          params: {controlParamtersRef.current.x.toFixed(2)} /{" "}
          {controlParamtersRef.current.y.toFixed(2)}
          <br />
          wind: {windFactorRef.current.toFixed(2)}
          <br />
          sparse: {sparsenessRef.current.toFixed(2)}
        </div>
      )}

      <RainDisplay
        drops={drops}
        groundCollisions={groundCollisions}
        umbrella={umbrella.current}
        umbrellaCollisions={umbrellaCollisions}
        paramA={controlParamtersRef.current.x}
        lightX={0}
        canvasSize={canvasSize}
        windFactorRef={windFactorRef}
      />
    </div>
  );
}

Rain.appName = "Plic ploc";
Rain.ext = "rain";
Rain.icon = <MdOutlineGrain />;
