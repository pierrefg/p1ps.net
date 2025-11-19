import TaskBar from "@/components/TaskBar/TaskBar";
import Background from "@/components/Background/Background";
import ScreenSaver from "@/components/ScreenSaver/ScreenSaver";
import Window from "@/components/Window/Window";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* <ScreenSaver /> */}
      <Background />
      <Window />
      <TaskBar />
    </div>
  );
}
