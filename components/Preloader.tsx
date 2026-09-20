"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isExit, setIsExit] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // 1. Immediately reset scroll position to top
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }

    // 2. Lock html and body overflow, height, and touch action
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlHeight = document.documentElement.style.height;
    const originalBodyHeight = document.body.style.height;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.touchAction = "none";

    // Stop Lenis smooth scroll while loading
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }
    const checkLenisInterval = setInterval(() => {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
    }, 50);

    // 3. Prevent wheel, touchmove, and scroll keyboard shortcuts
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventKeys = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"];
      if (keys.includes(e.code) || keys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
    window.addEventListener("keydown", preventKeys, { capture: true });

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 2000; // 2.0 seconds duration

    const unlockScroll = () => {
      clearInterval(checkLenisInterval);
      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("touchmove", preventScroll, { capture: true });
      window.removeEventListener("keydown", preventKeys, { capture: true });

      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.height = originalHtmlHeight;
      document.body.style.height = originalBodyHeight;
      document.body.style.touchAction = "";

      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);

      setProgress(currentProgress);

      if (currentProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Hold 100% briefly before exit slide-up
        setTimeout(() => {
          setIsExit(true);
          // Re-enable scroll and reveal page content once exit animation finishes
          setTimeout(() => {
            unlockScroll();
            setIsHidden(true);
          }, 700);
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      unlockScroll();
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0B0C10] text-white flex flex-col justify-between select-none pointer-events-auto touch-none overscroll-none transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExit ? "-translate-y-full opacity-90" : "translate-y-0 opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Center Container: Exclamation Mark Icon with Vertical Progress Fill */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative w-28 h-64 sm:w-36 sm:h-80 md:w-44 md:h-[360px] flex items-center justify-center">
          
          {/* Base Unfilled Dark Layer (Background Outline Silhouette) */}
          <svg
            className="w-full h-full text-white/15"
            viewBox="0 0 100 240"
            fill="currentColor"
          >
            {/* Top Bar of Exclamation Mark */}
            <path d="M 36 6 C 36 2.7, 38.7 0, 42 0 L 58 0 C 61.3 0, 64 2.7, 64 6 L 57 154 C 57 157.3, 54.3 160, 51 160 L 49 160 C 45.7 160, 43 157.3, 43 154 Z" />
            {/* Bottom Square Dot of Exclamation Mark */}
            <rect x="39" y="184" width="22" height="22" rx="3" />
          </svg>

          {/* Foreground Active White Fill Layer (Masked from Bottom to Top based on Progress) */}
          <div
            className="absolute inset-0 transition-all duration-75 ease-out"
            style={{
              clipPath: `inset(${100 - progress}% 0 0 0)`,
            }}
          >
            <svg
              className="w-full h-full text-[#F14E08] drop-shadow-[0_0_30px_rgba(241,78,8,0.6)]"
              viewBox="0 0 100 240"
              fill="currentColor"
            >
              {/* Top Bar of Exclamation Mark */}
              <path d="M 36 6 C 36 2.7, 38.7 0, 42 0 L 58 0 C 61.3 0, 64 2.7, 64 6 L 57 154 C 57 157.3, 54.3 160, 51 160 L 49 160 C 45.7 160, 43 157.3, 43 154 Z" />
              {/* Bottom Square Dot of Exclamation Mark */}
              <rect x="39" y="184" width="22" height="22" rx="3" />
            </svg>
          </div>

        </div>
      </div>

      {/* Bottom-Left Fixed Position Big Number Percentage Counter */}
      <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 md:bottom-12 md:left-12 z-10 pointer-events-none">
        <span className="font-brooks-display text-7xl sm:text-9xl md:text-[140px] font-black text-white leading-none tracking-tighter inline-block drop-shadow-md">
          {Math.floor(progress).toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
