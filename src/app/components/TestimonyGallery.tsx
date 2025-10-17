"use client";

import React, { useState } from "react";

interface TestimonyVideo {
  id: string;
  name: string;
  title: string;
  embedUrl: string;
  thumbnail?: string;
}

export default function TestimonyGallery() {
  const [activeTestimony, setActiveTestimony] = useState(0);

  const testimonies: TestimonyVideo[] = [
    {
      id: "testimony-5",
      name: "Our Story",
      title: "Our S4S Story",
      embedUrl: "https://www.youtube.com/embed/AoNxYSAwHys",
    },
    {
      id: "testimony-1",
      name: "Angeline",
      title: "Angeline's S4S Experience",
      embedUrl: "https://www.youtube.com/embed/iAjwl6Q71kQ",
    },
    {
      id: "testimony-2",
      name: "Isabella",
      title: "Isabella's S4S Experience",
      embedUrl: "https://youtube.com/embed/BDBrM_-xSMY",
    },
    {
      id: "testimony-3",
      name: "Alyssa",
      title: "Alyssa's S4S Experience",
      embedUrl: "https://youtube.com/embed/uJi558N5YZE",
    },
    {
      id: "testimony-4",
      name: "Love",
      title: "Love's S4S Experience",
      embedUrl: "https://youtube.com/embed/wETgl_F62Dk",
    },
  ];

  return (
    <section className="w-full bg-background py-10 px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
        Student & Mentor Stories
      </h2>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {testimonies.map((testimony, index) => (
            <button
              key={testimony.id}
              onClick={() => setActiveTestimony(index)}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTestimony === index
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {testimony.name}
            </button>
          ))}
        </div>
      </div>

      {/* Video Container */}
      <div className="w-[90vw] md:w-[70vw] aspect-video mx-auto rounded-2xl shadow-2xl overflow-hidden">
        <iframe
          className="w-full h-full border-0"
          src={`${testimonies[activeTestimony].embedUrl}?modestbranding=1&rel=0&showinfo=0&controls=1&fs=1`}
          title={testimonies[activeTestimony].title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>


      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonies.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTestimony(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              activeTestimony === index
                ? "bg-blue-600 scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to ${testimonies[index].name}`}
          />
        ))}
      </div>
    </section>
  );
}
