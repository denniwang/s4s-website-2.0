"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const collegeLogos = [
  { image: "/logos/cal.png", alt: "Cal" },
  { image: "/logos/ucla.svg", alt: "UCLA" },
  { image: "/logos/uci.svg", alt: "UCI" },
  { image: "/logos/yale.svg", alt: "Yale" },
  { image: "/logos/neu.png", alt: "NEU" },
  { image: "/logos/jhu.svg", alt: "JHU" },
  { image: "/logos/um.svg", alt: "UMich" },
];

// Duplicate logos for a seamless loop
const duplicatedLogos = [...collegeLogos, ...collegeLogos];

export const CollegeLogos = () => {
  const duplicationFactor = duplicatedLogos.length / collegeLogos.length;

  return (
    <div className="w-full bg-white py-4 md:py-7 overflow-hidden">
      <motion.div
        className="flex w-max" // Use w-max to allow content to define width
        animate={{
          // Animate by the percentage width of one set of original logos
          x: ["0%", `-${100 / duplicationFactor}%`],
          transition: {
            ease: "linear",
            duration: 35, // Adjust duration for desired speed (e.g., 20-25 seconds)
            repeat: Infinity,
          },
        }}
        // No explicit style.width here; it's determined by w-max and children
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            // Apply responsive widths directly using Tailwind:
            // w-[150px] for narrow screens, md:w-[250px] for medium screens and up.
            className="flex-shrink-0 flex justify-center items-center w-[150px] md:w-[250px]"
          >
            <div className="relative h-[50px] w-[100px] sm:h-[60px] sm:w-[120px]">
              <Image
                src={logo.image}
                alt={logo.alt}
                fill
                className="object-contain"
                priority={index < collegeLogos.length}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};