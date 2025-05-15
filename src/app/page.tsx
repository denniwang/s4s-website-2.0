import { Button } from "@/components/ui/button";
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
    <main className="flex flex-col justify-center items-center">
      <div className="h-[80vh] flex flex-col justify-center items-center align-middle">
        <h1 className="text-center text-8xl font-bold">Students4Students</h1>
        <h2 className="text-center text-2xl font-bold mb-8">
          Get help with{" "}
          <span className="inline-block">
            <ScrollingText
              options={helpWith}
              className="font-bold text-blue-500"
            />{" "}
          </span>
          now
        </h2>
        <a href="#" className="w-min">
          <Button>Book 15-min free trial</Button>
        </a>
      </div>
      <CollegeLogos />
      <div>
        <h1>hello</h1>
      </div>
    </main>
  );
}
