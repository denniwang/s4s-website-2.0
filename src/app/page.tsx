import { Button } from "@/components/ui/button";
import { CollegeLogos } from "./components/CollegeLogos";
import { ScrollingText } from "./components/ScrollingText";
import Formula from "./components/Formula";
import Testimony from "./components/Testimony";

export default function Home() {
  const helpWith = [
    "essays",
    "activity lists",
    "common app",
    "uc apps",
    "transfers",
  ];
  return (
    <main className="flex flex-col justify-center items-center overflow-hidden">
      <div className="h-[80vh] flex flex-col justify-center items-center align-middle">
        <h1 className="text-center  text-3xl md:text-8xl font-bold">
          Students4Students
        </h1>
        <h2 className="text-center text-xl md:text-2xl font-bold mb-8">
          Get help with{" "}
          <span className="inline-block">
            <ScrollingText
              options={helpWith}
              className="font-bold text-blue-500"
            />{" "}
          </span>
          now
        </h2>
        <a
          href="https://calendly.com/studs4students/15-min-free-trial"
          target="_blank"
          className="w-min"
        >
          <Button>Book 15-min free trial</Button>
        </a>
      </div>
      <CollegeLogos />
      <Testimony />
      <Formula />
    </main>
  );
}
