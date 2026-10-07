"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function HorizontalTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const headlineText = "ARE YOU READY TO MAKE YOUR NEXT DIGITAL EXPERIENCE UNFORGETTABLE?";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];
    const mm = gsap.matchMedia();

    // ==========================================
    // DESKTOP: (min-width: 1024px) - 100% UNCHANGED
    // ==========================================
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      const startX = window.innerWidth;
      const endX = -(text.scrollWidth + 20);
      const totalTravel = Math.abs(endX - startX);

      gsap.set(text, { x: startX });

      const scrollTween = gsap.to(text, {
        x: endX,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${Math.round(totalTravel)}px`,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      let letterCount = 0;
      chars.forEach((char) => {
        const textContent = char.textContent?.trim();
        const isSpace = !textContent;
        const isFromUp = letterCount % 2 === 0;
        if (!isSpace) {
          letterCount++;
        }

        const initialY = isFromUp ? -120 : 120;

        gsap.fromTo(
          char,
          {
            yPercent: initialY,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: "left 95%",
              end: "left 45%",
              scrub: 0.6,
            },
          }
        );
      });
    });

    // ==========================================
    // MOBILE / TABLET: (max-width: 1023px) - FIXED
    // ==========================================
    mm.add("(max-width: 1023px)", () => {
      if (!container) return;

      const startX = window.innerWidth;
      const endX = -(text.scrollWidth + 20);

      gsap.set(text, { x: startX });

      // Native sticky container eliminates JS pin toggling and prevents all scroll-up glitches
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        text,
        {
          x: endX,
          ease: "none",
          duration: 1,
        },
        0
      );

      let letterCount = 0;
      const totalChars = chars.length;
      chars.forEach((char, index) => {
        const textContent = char.textContent?.trim();
        const isSpace = !textContent;
        const isFromUp = letterCount % 2 === 0;
        if (!isSpace) {
          letterCount++;
        }

        const initialY = isFromUp ? -100 : 100;
        gsap.set(char, { yPercent: initialY, opacity: 0 });

        const startTime = Math.min(0.85, (index / totalChars) * 0.85);
        tl.to(
          char,
          {
            yPercent: 0,
            opacity: 1,
            ease: "power1.out",
            duration: 0.15,
          },
          startTime
        );
      });
    });

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[280vh] lg:h-auto bg-[#0B0C10]">
      <section
        ref={sectionRef}
        className="sticky top-0 lg:relative w-full h-[100dvh] min-h-[100dvh] lg:h-[100svh] lg:min-h-[100svh] bg-[#0B0C10] text-white flex items-center overflow-hidden select-none border-t border-b border-white/10"
      >
        {/* Background Subtle Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-[#F14E08]/10 to-indigo-900/10 pointer-events-none" />

        {/* Top Tag Header - Fixed to top inside section */}
        <div className="absolute top-6 sm:top-10 left-6 sm:left-12 z-20 flex items-center gap-2.5 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08] pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#F14E08] animate-pulse" />
          <span>LET&apos;S COLLABORATE</span>
        </div>

        {/* Main Horizontal Text Container in Center */}
        <div className="w-full overflow-visible px-6 md:px-12 py-8 relative z-10">
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

        {/* Bottom CTA Button: Elevated with bottom-16 on mobile for 100% visibility above browser bars */}
        <div className="absolute bottom-16 sm:bottom-12 md:bottom-10 left-0 right-0 z-20 flex items-center justify-center pointer-events-auto px-6">
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
    </div>
  );
}
