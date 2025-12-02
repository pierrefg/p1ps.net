import NotePad from "@/components/Apps/NotePad/NotePad";
import { nanoid } from 'nanoid';

const files = [
    {
        id: nanoid(),
        name: "note_01",
        ext: "txt",
        app: NotePad,
        content: "RDV semaine prochaine, un peu angoissé.\nComment en parler.",
        created_on: new Date("2025-08-20 10:02"),
        modified_on: new Date("2025-08-21 08:01"),
        size: '10ko',
        void: false
    },
    // {
    //     id: nanoid(),
    //     name: "note_02",
    //     ext: "txt",
    //     app: NotePad,
    //     content: "hello",
    //     created_on: new Date("2025-08-28 18:10").toISOString(),
    //     modified_on: new Date("2025-08-28 18:15").toISOString(),
    //     void: false
    // }
];

export default files;