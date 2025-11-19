'use client';

import useDragResize from "./useDragResize";
import useStore from '@/store/useStore';

export default function Window({ App, file, id }) {
  const { lastOpenningPosition } = useStore();
  const windowsOrder = useStore((s) => s.windowsOrder);
  const activeWindowId = useStore((s) => s.activeWindowId);
  const closeWindow = useStore((s) => s.closeWindow);
  const activateWindow = useStore((s) => s.activateWindow);

  const { position, size, startDragging, startResize } = useDragResize(
    { x: lastOpenningPosition.x, y: lastOpenningPosition.y },
    { width: 800, height: 600 }
  );

  const active = activeWindowId === id;
  const zOrder = windowsOrder.indexOf(id);

  return (
    <div
      className={`window absolute flex flex-col ${active ? "select-none" : ""}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: zOrder,
      }}
      onMouseDown={() => activateWindow(id)}
      onTouchStart={() => activateWindow(id)}
    >
      {
        !active && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            pointerEvents: "none",
            zIndex: zOrder,
          }}
        />)
      } 
      <div className="w-full h-[30px] bg-[#800080] border-b-2 border-white flex items-center select-none">
        <div
          className="flex-1 cursor-grab flex items-center justify-center"
          onMouseDown={startDragging}
          onTouchStart={startDragging}
        >
          {App.icon} {App.appName} -&nbsp;<i>{file ?? ("untitled." + App.ext)}</i>
        </div>

        <button onClick={() => closeWindow(id)} className="p-2">x</button>
      </div>

      <div className="flex-1 relative">
        <App />
      </div>

      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-white cursor-se-resize"
        onMouseDown={startResize}
        onTouchStart={startResize}
      />

      <div className="absolute bottom-0 left-0 text-gray-600 text-xs pl-2">{id}</div>
    </div>
  );
}
