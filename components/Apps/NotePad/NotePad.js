'use client';

import { useEffect, useState } from "react";

import { PiNoteDuotone } from "react-icons/pi";
import { GoPencil } from "react-icons/go";

function NotePad({ content = "Pas grand chose à dire pour le moment.\nJ'ai pris des vacances trop longues." }) {
    const [text, setText] = useState(content);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    return <>
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
    </>;
}

NotePad.appName = "Bloc-notes";
NotePad.ext = "txt";
NotePad.icon = GoPencil;

export default NotePad;
