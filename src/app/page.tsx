"use client";
import { CollegeLogos } from "./components/CollegeLogos";
import { ScrollingText } from "./components/ScrollingText";
import Formula from "./components/Formula";
import Testimony from "./components/Testimony";
import { PopupButton } from "react-calendly";

export default function Home() {
  const helpWith = [
    "essays",
    "activity lists",
    "common app",
    "uc apps",
    "transfers",
  ];
  return (
    <main
      className="flex flex-col justify-center items-center overflow-hidden"
      id="root"
    >
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
        {typeof window !== "undefined" && document.getElementById("root") && (
          <PopupButton
            url="https://calendly.com/studs4students/15-min-free-trial"
            rootElement={document.getElementById("root") as HTMLElement}
            text="15-min free trial"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-bold"
          />
        )}
      </div>
      <CollegeLogos />
      <Testimony />
      <Formula />
    </main>
  );
}
