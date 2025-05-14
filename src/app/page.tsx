import { CollegeLogos } from "./components/CollegeLogos";
import { ScrollingText } from "./components/ScrollingText";

export default function Home() {
  const helpWith = [
    "essays",
    "activity lists",
    "common app",
    "uc apps",
    "transfers",
  ];
  return (
    <main className="flex flex-col justify-center">
      <div className="h-[80vh] flex flex-col justify-center content-center align-middle">
        <h1 className="text-center text-8xl font-bold">Students4Students</h1>
        <h2 className="text-center">
          Get help with <ScrollingText options={helpWith} />{" "}
        </h2>
      </div>
      <CollegeLogos />
    </main>
  );
}
