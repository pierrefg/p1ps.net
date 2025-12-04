'use client';

import Image from "next/image";

import { BiPlanet } from "react-icons/bi";

function Browser({ content = "https://fr.wikipedia.org/wiki/Salix_matsudana" }) {
    return <div className="w-full h-full">
        <iframe src={content} width="100%" height="100%" />
    </div>;
}

Browser.appName = "Navigateur";
Browser.ext = "html";
Browser.icon = BiPlanet;
Browser.uses_files = false;

export default Browser;
