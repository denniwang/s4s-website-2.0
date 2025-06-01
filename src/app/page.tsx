"use client";
import { CollegeLogos } from "./components/CollegeLogos";
import { ScrollingText } from "./components/ScrollingText";
import Testimony from "./components/Testimony";
import { PopupButton } from "react-calendly";
import {
  TypewriterEffect,
} from "@/components/ui/typewriter-effect";
import FeatureSectionSimple from "@/components/ui/feature-section";
import { Cta4 } from "@/components/ui/cta";
import { Stats8 } from "@/components/ui/stats8";

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
      <div
        className="h-[80vh] w-full flex flex-col justify-center items-center align-middle bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/home/row.png')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-white opacity-85"></div>
        <h1 className="text-center font-bold relative">
          <TypewriterEffect
            words={[
              { text: "Students4Students", className: "text-4xl md:text-8xl" },
            ]}
          />
        </h1>
        <h2 className="text-center text-xl md:text-2xl font-bold mb-8 flex items-center justify-center gap-2 relative">
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
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-2xl font-bold relative"
          />
        )}
      </div>
      <CollegeLogos />
      <Testimony />
      <Stats8 />


      <FeatureSectionSimple />
      <Cta4 />
    </main>
  );
}
