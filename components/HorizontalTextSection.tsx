"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function HorizontalTextSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const headlineText = "ARE YOU READY TO MAKE YOUR NEXT DIGITAL EXPERIENCE UNFORGETTABLE?";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      // 1. Calculate travel bounds
      const startX = window.innerWidth * 0.75;
      const endX = -(text.scrollWidth + window.innerWidth * 0.25);

      gsap.set(text, { x: startX });
      gsap.set(chars, {
        yPercent: () => (Math.random() - 0.5) * 180,
        rotation: () => (Math.random() - 0.5) * 30,
        opacity: 0,
        scale: 0.6,
      });

      // 2. Single unified timeline bound to the pin scrollTrigger
      // anticipatePin: 0 ensures the pin triggers ONLY when reaching 100% of the preceding section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2.2, (text.scrollWidth + window.innerWidth) * 1.4)}px`,
          scrub: 0.4,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });

      // Translate text horizontally
      tl.to(
        text,
        {
          x: endX,
          ease: "none",
        },
        0
      );

      // Animate character bounce & entrance seamlessly with the master timeline
      tl.to(
        chars,
        {
          yPercent: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          stagger: {
            each: 0.012,
            from: "start",
          },
        },
        0
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0B0C10] text-white flex flex-col justify-between overflow-hidden select-none border-t border-b border-white/10"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-[#F14E08]/10 to-indigo-900/10 pointer-events-none" />

      {/* Top Tag Header */}
      <div className="w-full pt-8 sm:pt-12 px-6 md:px-16 z-20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
          <span className="w-2 h-2 rounded-full bg-[#F14E08] animate-pulse" />
          <span>LET&apos;S COLLABORATE</span>
        </div>
      </div>

      {/* Main Horizontal Text Container in Center */}
      <div className="w-full overflow-hidden px-6 md:px-12 my-auto py-4 relative z-10">
        <h2
          ref={textRef}
          className="font-brooks-display inline-block whitespace-nowrap text-[13vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5vw] font-black uppercase tracking-wide text-white leading-none will-change-transform drop-shadow-lg"
        >
          {headlineText.split("").map((char, index) => {
            const isOrangeWord = index >= headlineText.indexOf("UNFORGETTABLE");
            const isSpace = char === " ";
            return (
              <span
                key={index}
                ref={(el) => {
                  charsRef.current[index] = el;
                }}
                className={`inline-block ${
                  isOrangeWord ? "text-[#F14E08]" : "text-white"
                } ${isSpace ? "w-[0.5em]" : "mr-[0.02em]"}`}
                style={{ display: "inline-block" }}
              >
                {isSpace ? "\u00A0" : char}
              </span>
            );
          })}
        </h2>
      </div>

      {/* Bottom CTA Button Rock-Solid Anchored Inside Pinned Container */}
      <div className="w-full pb-8 sm:pb-12 px-6 z-20 flex items-center justify-center shrink-0">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#F14E08] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-7 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-2xl group border border-white/20 active:scale-95"
        >
          <span>START A PROJECT</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
