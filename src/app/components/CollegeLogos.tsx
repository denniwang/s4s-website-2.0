"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const collegeLogos = [
  { image: "/logos/cal.png", alt: "Cal" },
  { image: "/logos/ucla.svg", alt: "UCLA" },
  { image: "/logos/uci.svg", alt: "UCI" },
  { image: "/logos/yale.svg", alt: "Yale" },
  { image: "/logos/cal.png", alt: "Cal" },
  { image: "/logos/ucla.svg", alt: "UCLA" },
  { image: "/logos/uci.svg", alt: "UCI" },
  { image: "/logos/yale.svg", alt: "Yale" },
];

export const CollegeLogos = () => {
  return (
    <div className="w-full bg-white py-4 md:py-7 overflow-hidden">
      <ul className="flex w-max min-w-full shrink-0 flex-nowrap gap-16 py-2">
        <motion.div
          className="align-center flex w-full justify-center overflow-hidden gap-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {collegeLogos.map((logo, index) => {
            return (
              <li
                className="relative h-[60px] w-[120px] max-w-full flex-shrink-0 "
                key={index}
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
        </motion.div>
      </ul>
    </div>
  );
};
