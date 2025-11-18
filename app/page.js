import TaskBar from "@/components/TaskBar/TaskBar";
import Background from "@/components/Background/Background";
import ScreenSaver from "@/components/ScreenSaver/ScreenSaver";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black">
      <ScreenSaver />
      <Background />
      <TaskBar />
    </div>
  );
}
