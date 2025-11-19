import Image from "next/image";

import backgroungImg from './background.jpg';

export default function Background() {
  return (
    <div className="absolute top-0 left-0 min-h-screen w-full bg-black flex items-center justify-center z-0 select-none">
      {/* <p className="text-white">p1ps_is_alive</p> */}
      <Image
        src={backgroungImg}
        alt="noisy moon"
        width={500}
        className="border-white border-2"
      />
    </div>
  );
}