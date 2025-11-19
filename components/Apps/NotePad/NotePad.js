'use client';

import { useEffect, useState } from "react";

import Window from "@/components/Window/Window";
import { PiNoteDuotone } from "react-icons/pi";

export const notepadIcon = <PiNoteDuotone />;
export const notepadName = "Bloc-notes";

export default function NotePad() {    
    const [fileName, setFileName] = useState("untitled.txt*");
    const [text, setText] = useState("Pas grand chose à dire pour le moment.\nJ'ai pris des vacances trop longues.");

    const handleChange = (e) => {
        setText(e.target.value);
    };


    return <>
        <Window icon={notepadIcon} appName={notepadName} fileName={fileName}>
            <textarea
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Tapez quelque chose..."
                className="w-full h-full p-8 items-top"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="off"
            />
        </Window>
    </>;
}
