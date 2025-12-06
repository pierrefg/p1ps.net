"use client";

import useStore from '@/store/useStore';

import FileIcon from './FileIcon';

import { TiFolderOpen } from "react-icons/ti";

function Explorer({ content = [] }) {
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
        {content.map((file) => (
            <FileIcon key={file.id} file={file} addWindow={addWindow} />
        ))}
    </div>
  );
}

Explorer.appName = "Explorateur";
Explorer.ext = "";
Explorer.icon = TiFolderOpen;
Explorer.uses_files = true;

export default Explorer;
