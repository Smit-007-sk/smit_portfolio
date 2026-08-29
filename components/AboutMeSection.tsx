"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import AccordionGallery from "./AccordionGallery";
import SplitText from "@/components/SplitText";

export default function AboutMeSection() {
  const infoCards = [
    {
      title: "BASED IN",
      value: "Gujarat, India",
      subValue: "",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      title: "EXPERIENCE",
      value: "3+ Years",
      subValue: "Building digital products",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      title: "AVAILABLE FOR",
      value: "Freelance Projects",
      subValue: "& Full-time Opportunities",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      ),
    },
  ];

  const processSteps = [
    {
      title: "UNDERSTAND",
      description: "I start by understanding your goals, users and requirements in detail.",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      title: "DESIGN",
      description: "I design clean, modern and user-friendly interfaces that convert.",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
    {
      title: "DEVELOP",
      description: "I build fast, scalable and secure solutions with clean and maintainable code.",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: "DELIVER",
      description: "I test everything thoroughly and deliver products that drive real results.",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.2-2.55L4.5 16.5z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.95 11a22.35 22.35 0 0 1-3.05 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="about" 
      className="relative w-full bg-[#F4F1EA] text-[#111111] py-20 px-6 md:px-12 lg:px-16 border-t border-black/10 select-none overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto">
        
        {/* Top 3-Column Section: Bio, Cutout Portrait & Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column (Cols 1-4) — Bio & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* Tag / Subtitle */}
              <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08] mb-3">
                <span></span>
              </div>

              {/* Main Heading with SplitText */}
              <div className="mb-6">
                <SplitText
                  text="ABOUT ME."
                  tag="h2"
                  className="font-brooks-display text-6xl sm:text-7xl lg:text-[85px] leading-[0.88] tracking-tighter uppercase font-black text-[#F14E08]"
                  delay={45}
                  duration={1.2}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </div>

              {/* Bio Paragraph */}
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-medium mb-8 max-w-md">
                I&apos;m Smit Khatri, a full-stack developer and digital creator who loves turning ideas into powerful, user-focused digital experiences. I blend clean design with solid code to build products that make an impact.
              </p>

              {/* Download Resume Link */}
              <Link
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F14E08] hover:text-[#111111] transition-colors group underline decoration-2 underline-offset-4"
              >
                <span>DOWNLOAD RESUME</span>
                <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Center Column (Cols 5-8) — Cutout Character & Signature */}
          <div className="lg:col-span-4 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]">
            
            {/* Background Circular Dotted Graphic */}
            <div className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-[#EAE5D9]/80 flex items-center justify-center -z-0 border border-black/5 shadow-inner overflow-hidden">
              <div className="w-full h-full opacity-30 bg-[radial-gradient(#F14E08_1.5px,transparent_1.5px)] [background-size:16px_16px]"></div>
            </div>

            {/* Cutout Portrait Image */}
            <div className="relative z-10 max-w-[340px] sm:max-w-[380px] hover:scale-105 transition-transform duration-500">
              <Image
                src="/sk.png"
                alt="Smit Khatri"
                width={400}
                height={500}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Handwritten Signature SVG Accent */}
            <div className="absolute right-2 sm:right-6 top-8 z-20 pointer-events-none transform rotate-6">
              <span className="font-serif italic text-3xl sm:text-4xl text-[#F14E08] font-bold tracking-tight select-none drop-shadow">
                Smit
              </span>
              <div className="w-12 h-[2px] bg-[#F14E08] -mt-1 rounded-full"></div>
            </div>

          </div>

          {/* Right Column (Cols 9-12) — Info Cards & Quote */}
          <div className="lg:col-span-4 flex flex-col space-y-5">
            
            {/* 3 Quick Info Cards */}
            <div className="space-y-3">
              {infoCards.map((card, idx) => (
                <div 
                  key={idx}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-black/5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center shrink-0 shadow-md">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-black uppercase text-neutral-500 tracking-wider">
                      {card.title}
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-[#111111] leading-tight">
                      {card.value}
                    </div>
                    {card.subValue && (
                      <div className="text-xs text-neutral-600 font-medium">
                        {card.subValue}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Quote Block */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-black/5 shadow-sm space-y-1">
              <div className="text-3xl font-serif font-black text-[#F14E08] leading-none">
                “
              </div>
              <p className="text-xs sm:text-sm font-semibold text-neutral-800 italic leading-relaxed">
                I believe in writing clean code, building meaningful products and creating experiences that users truly enjoy. ”
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Process Section: "MY APPROACH" with AccordionGallery */}
        <div className="border-t border-black/10 pt-16 mt-16 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#111111] tracking-wide">
                MY APPROACH
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium max-w-xl">
                I follow a simple, high-performing process that helps me deliver exceptional digital work, every time.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase text-[#F14E08] hover:text-[#111111] transition-colors group underline decoration-2 underline-offset-4 shrink-0"
            >
              <span>LET&apos;S WORK TOGETHER</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </div>

          <AccordionGallery
            items={[
              {
                image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
                label: "UNDERSTAND",
                description: "Deep dive into your business goals, target users, technical requirements, and core brand values.",
              },
              {
                image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
                label: "DESIGN",
                description: "Architect clean, modern, high-converting interfaces with pixel-perfect layouts and responsive design.",
              },
              {
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
                label: "DEVELOP",
                description: "Engineer fast, scalable, and secure full-stack code using Next.js, React, TypeScript, and modern APIs.",
              },
              {
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
                label: "DELIVER",
                description: "Rigorously test performance, optimize speed, and deploy production-ready digital products that drive results.",
              },
            ]}
            defaultIndex={0}
            accentColor="#F14E08"
            overlayColor="#0B0C10"
            height={400}
            expandRatio={0.52}
            trigger="hover"
          />
        </div>

      </div>
    </section>
  );
}
