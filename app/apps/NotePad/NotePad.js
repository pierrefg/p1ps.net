'use client';

import { useEffect, useState } from "react";

import Window from "@/components/Window/Window";

export default function NotePad() {
    const appName = 'Bloc-notes'
    
    const [fileName, setFileName] = useState("untitled.txt*");
    const [text, setText] = useState("Pas grand chose à dire pour le moment.\nJ'ai pris des vacances trop longues.");

    const handleChange = (e) => {
        setText(e.target.value);
    };


    return <>
        <Window appName={appName} fileName={fileName}>
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
