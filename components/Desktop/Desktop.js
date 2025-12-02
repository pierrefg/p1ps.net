"use client";

import useStore from '@/store/useStore';

import DesktopIcon from './DesktopIcon';

export default function Desktop({ files }) {
  const addWindow = useStore((state) => state.addWindow);

  return (
    <div
        className="
            absolute top-0 left-0 w-full h-full
            p-10
            grid grid-flow-row auto-cols-max
            gap-6
            z-10
            pointer-events-none
        "
        style={{
            gridTemplateRows: "repeat(auto-fill, 100px)"
        }}
    >
        {files.map((file) => (
            <DesktopIcon key={file.id} file={file} addWindow={addWindow} />
        ))}
    </div>
  );
}
