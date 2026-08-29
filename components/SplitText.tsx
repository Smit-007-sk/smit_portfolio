"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  tag?: keyof React.JSX.IntrinsicElements | string;
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  tag: Tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (document.fonts.status === "loaded") {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => setFontsLoaded(true));
      }
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const targets = elementsRef.current.filter(Boolean);
      if (!targets.length) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onLetterAnimationComplete?.();
          },
          willChange: "transform, opacity",
          force3D: true,
        }
      );
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
      ],
      scope: containerRef,
    }
  );

  const words = text.split(" ");

  return (
    // @ts-ignore
    <Tag
      ref={containerRef}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
        willChange: "transform, opacity",
      }}
      className={`split-parent ${className}`}
    >
      {splitType === "words"
        ? words.map((word, wordIdx) => (
            <span
              key={wordIdx}
              ref={(el) => {
                elementsRef.current[wordIdx] = el;
              }}
              className="inline-block mr-[0.25em]"
              style={{ display: "inline-block", willChange: "transform, opacity" }}
            >
              {word}
            </span>
          ))
        : words.map((word, wordIdx) => {
            let charOffset = 0;
            for (let i = 0; i < wordIdx; i++) {
              charOffset += words[i].length;
            }
            return (
              <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
                {word.split("").map((char, charIdx) => {
                  const globalIdx = charOffset + charIdx;
                  return (
                    <span
                      key={charIdx}
                      ref={(el) => {
                        elementsRef.current[globalIdx] = el;
                      }}
                      className="inline-block"
                      style={{ display: "inline-block", willChange: "transform, opacity" }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
    </Tag>
  );
}
