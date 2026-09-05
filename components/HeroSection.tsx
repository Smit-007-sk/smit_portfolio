"use client";

import React from "react";
import Image from "next/image";
import DecryptedText from "@/components/DecryptedText";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-90px)] flex-1 flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-2 sm:pt-4 pb-8 overflow-hidden select-none">
      {/* 1. Main Display Typography "SMIT KHATRI" (Background Layer z-10) */}
      <div className="w-full pt-2 sm:pt-4 md:pt-8 flex justify-center items-center relative z-10">
        <h1 className="font-brooks-display text-[12.5vw] sm:text-[13vw] md:text-[11.5vw] lg:text-[10.5vw] leading-none tracking-tighter text-white font-black uppercase text-center select-none whitespace-nowrap drop-shadow-sm flex items-center justify-center gap-[2vw] sm:gap-[10vw] lg:gap-[20vw]">
          <DecryptedText
            text="SMIT"
            sequential={true}
            animateOn="view"
            speed={100}
            maxIterations={15}
            revealDirection="start"
            className="text-white"
            encryptedClassName="text-white/70"
            delay={2250}
            retriggerDelay={0}
          />
          <DecryptedText
            text="KHATRI"
            sequential={true}
            animateOn="view"
            speed={100}
            maxIterations={15}
            revealDirection="start"
            className="text-white"
            encryptedClassName="text-white/70"
            delay={2450}
            retriggerDelay={180}
          />
        </h1>
      </div>

      {/* 2. Character Cutout Image "sk.png" (Middle Layer z-20) */}
      <div className="absolute inset-0 flex justify-center items-start md:items-end pointer-events-none z-20 pt-16 sm:pt-20 md:pt-0">
        <div className="relative w-full h-[58vh] sm:h-[68vh] md:h-[82vh] lg:h-[88vh] max-h-[800px] flex justify-center items-start md:items-end -translate-x-2 sm:-translate-x-6 md:-translate-x-8 lg:-translate-x-22 translate-y-0 md:translate-y-16 lg:translate-y-12 transition-transform duration-300">
          <Image
            src="/sk.png"
            alt="Smit Khatri Portrait"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            className="object-contain object-top md:object-bottom drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 3. Bottom Grid Section: Left Headline & Right Description/Stats (Foreground Layer z-30) */}
      <div className="w-full mt-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-end pt-6 md:pt-8 relative z-30">
        {/* Left Headline Column */}
        <div className="lg:col-span-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight uppercase drop-shadow-md">
            I BUILD DIGITAL<br />
            EXPERIENCES THAT<br />
            MOVE BUSINESSES.
          </h2>
        </div>

        {/* Right Description & Stats Column */}
        <div className="lg:col-span-5 lg:col-start-8 w-full flex flex-col justify-end space-y-6">
          {/* Summary Paragraph */}
          <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal drop-shadow">
            I build modern websites and web applications, combining thoughtful design, powerful frontend experiences, and reliable backend systems.
          </p>

          {/* Statistics Counters with vertical divider */}
          <div className="grid grid-cols-2 gap-6 pt-1 items-center">
            {/* Stat 1 */}
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-1 uppercase drop-shadow">
                FULL-STACK
              </div>
              <div className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
                Frontend + Backend
              </div>
            </div>

            {/* Stat 2 */}
            <div className="border-l border-white/30 pl-6">
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mb-1 uppercase drop-shadow">
                MODERN
              </div>
              <div className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
                Web Experiences
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
