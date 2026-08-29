"use client";

import React from "react";
import Link from "next/link";
import DriftWall from "./DriftWall";

export default function TechStackSection() {
  const tools = [
    {
      name: "HTML",
      category: "Markup Language",
      icon: (
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 32 32" fill="none">
          <path d="M5 3L7.5 27L16 29.5L24.5 27L27 3H5Z" fill="#E44D26" />
          <path d="M16 27.3L22.8 25.4L25 5.5H16V27.3Z" fill="#F16529" />
          <path d="M16 13.7H12.3L12 10H16V6.4H8L9 17.3H16V13.7ZM16 21.9L12.5 21L12.2 17.3H8.6L9.2 24.3L16 26.2V21.9Z" fill="white" />
          <path d="M16 13.7V17.3H19.2L18.9 21L16 21.9V26.2L22.8 24.3L23.7 13.7H16ZM16 6.4V10H24L24.3 6.4H16Z" fill="#EBEBEB" />
        </svg>
      ),
    },
    {
      name: "CSS",
      category: "Styling Language",
      icon: (
        <svg className="w-9 h-9 shrink-0" viewBox="0 0 32 32" fill="none">
          <path d="M5 3L7.5 27L16 29.5L24.5 27L27 3H5Z" fill="#264DE4" />
          <path d="M16 27.3L22.8 25.4L25 5.5H16V27.3Z" fill="#2965F1" />
          <path d="M16 13.7H12.3L12.6 17.3H16V20.9L12.5 20L12.3 17.3H8.7L9.2 23.6L16 25.5V20.9ZM16 6.4H8.4L8.7 10H16V6.4Z" fill="white" />
          <path d="M16 13.7V10H23.7L24 6.4H16V10H20.1L19.7 13.7H16ZM16 20.9V25.5L22.8 23.6L23.7 13.7H20.1L19.4 20.9L16 20.9Z" fill="#EBEBEB" />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      category: "Programming Language",
      icon: (
        <div className="w-9 h-9 bg-[#F7DF1E] rounded-md flex items-end justify-end p-1 shrink-0 font-bold text-black text-xs font-mono select-none">
          JS
        </div>
      ),
    },
    {
      name: "TypeScript",
      category: "Typed JavaScript",
      icon: (
        <div className="w-9 h-9 bg-[#3178C6] rounded-md flex items-end justify-end p-1 shrink-0 font-bold text-white text-xs font-mono select-none">
          TS
        </div>
      ),
    },
    {
      name: "React",
      category: "UI Library",
      icon: (
        <svg className="w-9 h-9 shrink-0 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        </svg>
      ),
    },
    {
      name: "Next.js",
      category: "React Framework",
      icon: (
        <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center shrink-0 font-black text-white text-xs font-sans select-none border border-white/20">
          N
        </div>
      ),
    },
    {
      name: "NestJS",
      category: "Backend Framework",
      icon: (
        <svg className="w-9 h-9 shrink-0 text-[#E0234E]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-6h2v6zm0-8h-2V7h2v1.5z" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      category: "Utility-first CSS",
      icon: (
        <svg className="w-9 h-9 shrink-0 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      ),
    },
    {
      name: "SQL",
      category: "Query Language",
      icon: (
        <svg className="w-9 h-9 shrink-0 text-[#00618A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.68 0 8 1.35 8 2s-3.32 2-8 2-8-1.35-8-2 3.32-2 8-2zm0 16c-4.68 0-8-1.35-8-2v-2.15c1.91 1.15 4.81 1.85 8 1.85s6.09-.7 8-1.85V18c0 .65-3.32 2-8 2zm0-5c-4.68 0-8-1.35-8-2v-2.15c1.91 1.15 4.81 1.85 8 1.85s6.09-.7 8-1.85V13c0 .65-3.32 2-8 2z" />
        </svg>
      ),
    },
    {
      name: "ES6+",
      category: "Modern JavaScript",
      icon: (
        <div className="w-9 h-9 bg-[#F7DF1E] rounded-md flex items-center justify-center shrink-0 font-extrabold text-black text-xs font-mono select-none">
          ES6
        </div>
      ),
    },
    {
      name: "Sass",
      category: "CSS Preprocessor",
      icon: (
        <div className="w-9 h-9 rounded-md bg-[#CF649A]/10 flex items-center justify-center shrink-0 font-serif italic text-base font-black text-[#CF649A] select-none">
          Sass
        </div>
      ),
    },
    {
      name: "Git",
      category: "Version Control",
      icon: (
        <div className="w-8 h-8 bg-[#F05032] rounded-lg rotate-45 flex items-center justify-center shrink-0 shadow-sm">
          <svg className="w-4 h-4 text-white -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="6" y1="3" x2="6" y2="15" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M18 9a9 9 0 0 1-9 9" />
          </svg>
        </div>
      ),
    },
    {
      name: "GitHub",
      category: "Code Collaboration",
      icon: (
        <svg className="w-9 h-9 shrink-0 text-[#181717]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "VS Code",
      category: "Code Editor",
      icon: (
        <svg className="w-9 h-9 shrink-0 text-[#007ACC]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63L2.8 5.42a.747.747 0 0 0-.968.083L.224 7.111a.747.747 0 0 0 .025 1.077l4.63 4.195-4.63 4.194a.747.747 0 0 0-.025 1.077l1.608 1.608a.747.747 0 0 0 .968.083l4.245-3.713 9.46 8.63c.48.438 1.185.545 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.93V3.07a1.5 1.5 0 0 0-.85-1.383zm-6.27 15.653l-7.23-6.24 7.23-6.24v12.48z" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      category: "JS Runtime",
      icon: (
        <svg className="w-9 h-9 shrink-0 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2.5 7.5v9L12 22l9.5-5.5v-9L12 2zm7.5 13.6L12 19.8l-7.5-4.2V8.4L12 4.2l7.5 4.2v7.2z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="stack" 
      className="relative w-full bg-[#f4e5ffb5] text-[#111111] py-20 px-6 md:px-12 lg:px-16 border-t border-black/10 select-none overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto">
        
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Cols 1-4) — Header & Paragraph */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div>
              {/* Subtitle Tag */}
              <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08] mb-4">
                <span>THE STACK</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-brooks-display text-5xl sm:text-6xl lg:text-[72px] leading-[0.88] tracking-tighter uppercase mb-6 font-black">
                <span className="text-[#111111]">THE TOOLS</span><br />
                <span className="text-[#F14E08]">I BUILD</span><br />
                <span className="text-[#111111]">WITH.</span>
              </h2>

              {/* Paragraph */}
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-medium mb-8 max-w-md">
                I use modern, scalable and performance-focused languages and technologies to build fast, responsive and exceptional digital experiences.
              </p>

              {/* CTA Link */}
              <Link
                href="/skills"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#111111] hover:text-[#F14E08] transition-colors group underline decoration-2 underline-offset-4"
              >
                <span>VIEW ALL SKILLS</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>

            {/* Bottom-Left Dotted Radial Pattern Graphic */}
            <div className="relative w-56 h-56 pt-8 hidden sm:block pointer-events-none opacity-40">
              <div className="w-full h-full bg-[radial-gradient(#F14E08_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
            </div>

          </div>

          {/* Right Column (Cols 5-12) — 3D Drifting Tech Cards Wall */}
          <div className="lg:col-span-8 h-[560px] relative overflow-hidden">
            <DriftWall
              items={tools}
              columns={3}
              tileWidth={230}
              tileHeight={100}
              gap={16}
              tilt={14}
              turn={-12}
              perspective={1100}
              depth={70}
              speed={28}
              variance={0.4}
              parallax={0.7}
              lift={45}
              dim={0.92}
              fade={0.15}
            />
          </div>

        </div>

      </div>
    </section>
  );
}

