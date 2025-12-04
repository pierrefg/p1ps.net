'use client';

import Image from "next/image";

import { AiOutlinePicture } from "react-icons/ai";

function PicViewer({ content = null }) {
    return <div>
        {
            content ? 
            <Image
                src={content}
                alt="me during party"
                fill
                className="object-cover"
            />
            :
            <p>No image to show.</p>
        }
    </div>;
}

PicViewer.appName = "Visionneuse";
PicViewer.ext = "img";
PicViewer.icon = AiOutlinePicture;

export default PicViewer;
