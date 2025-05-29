"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Aos from "aos";

const collegeLogos = [
  { image: "/logos/cal.png", alt: "Cal" },
  { image: "/logos/ucla.svg", alt: "UCLA" },
  { image: "/logos/uci.svg", alt: "UCI" },
  { image: "/logos/yale.svg", alt: "Yale" },
  { image: "/logos/neu.png", alt: "NEU" },
  { image: "/logos/jhu.svg", alt: "JHU" },
  { image: "/logos/um.svg", alt: "UMich" },
];

export const CollegeLogos = () => {
  useEffect(() => {
    Aos.init({ duration: 500, once: true }); // Added once: true to ensure animation only happens on first scroll
  }, []);
  return (
    <div className="w-full bg-white py-4 md:py-7 overflow-hidden">
      <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-16 py-2">
        <div className="w-full justify-center overflow-hidden lg:flex grid grid-cols-3 gap-y-2 items-center g:gap-20 place-items-center">
          {collegeLogos.map((logo, index) => {
            return (
              <li
                className="relative h-[60px] w-[120px] max-w-full flex-shrink-0 "
                key={index}
                data-aos="fade-left" // Added AOS animation type
                data-aos-delay={index * 50} // Added cascading delay
                data-aos-offset="-500"
              >
                {" "}
                <Image
                  src={logo.image}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};
