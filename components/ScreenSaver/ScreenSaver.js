'use client';

import { useEffect, useState } from "react";
import BouncingWhiteBox from "./BouncingWhiteBox";

export default function ScreenSaver() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        let timer;

        const resetTimer = () => {
            setActive(false);
            clearTimeout(timer);           
            timer = setTimeout(() => {
                setActive(true);
            }, 5000);
        };

        resetTimer();

        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("touchmove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("touchdown", resetTimer);

        return () => {
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("touchmove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("touchdown", resetTimer);
            clearTimeout(timer);
        };
    }, []);

    if (!active) return null;

    return (
        <div className="absolute top-0 left-0 min-h-screen w-full flex items-center justify-center z-[1001]">
            <BouncingWhiteBox />
        </div>
    );
}