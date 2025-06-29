"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

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
  const [offset, setOffset] = useState(0);
  const logoSetRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const logoWidth = 150; // px, matches w-[150px] in Tailwind
  const numLogos = collegeLogos.length;
  const totalSetWidth = logoWidth * numLogos;

  useEffect(() => {
    let lastTimestamp = performance.now();
    function animate(now: number) {
      const elapsed = now - lastTimestamp;
      lastTimestamp = now;
      setOffset((prev) => {
        const speed =30; // px per second
        let newOffset = prev - (speed * elapsed) / 1000;
        if (Math.abs(newOffset) >= totalSetWidth) {
          // Reset to 0 for seamless loop
          return 0;
        }
        return newOffset;
      });
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [totalSetWidth]);

  return (
    <div className="w-full bg-white py-4 md:py-7 overflow-hidden">
      <div
        className="flex w-max"
        style={{ transform: `translateX(${offset}px)`, transition: "none", willChange: "transform" }}
        ref={logoSetRef}
      >
        {/* Render two sets for seamless looping */}
        {[...collegeLogos, ...collegeLogos].map((logo, index) => (
          <div
            key={index}
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
      </div>
    </div>
  );
};