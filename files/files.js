import { nanoid } from 'nanoid';

import NotePad from "@/components/Apps/NotePad/NotePad";
import PicViewer from '@/components/Apps/PicViewer/PicViewer';
import Explorer from '@/components/Apps/Explorer/Explorer';

import picA from './picA.jpg';

const files = [
    {
        id: nanoid(),
        name: "note_01",
        ext: "txt",
        app: NotePad,
        content: "J'avais complètement oublié de lui en parler.\nJ'ai peur de sa réaction...",
        created_on: new Date("2025-08-20 10:02"),
        modified_on: new Date("2025-08-21 08:01"),
        size: '10ko',
        void: false
    },
    {
        id: nanoid(),
        name: "pics",
        ext: "",
        app: Explorer,
        content: [
            {
                id: nanoid(),
                name: "me_during_party",
                ext: "img",
                app: PicViewer,
                content: picA,
                created_on: new Date("2025-06-11 23:10"),
                modified_on: new Date("2025-08-28 18:15"),
                size: '430ko',
                void: false
            }
        ],
        created_on: new Date("2025-08-20 10:01"),
        modified_on: new Date("2025-08-21 08:01"),
        size: '10ko',
        void: false
    },
];

export default files;