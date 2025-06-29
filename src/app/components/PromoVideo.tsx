"use client";

import React from "react";

export default function PromoVideo() {
  return (
    <section className="w-full bg-background py-10 px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Watch Our Story
      </h2>
      <div className="w-[90vw] md:w-[70vw] aspect-video mx-auto rounded-2xl shadow-2xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/AoNxYSAwHys"
          title="Students4Students Intro Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
