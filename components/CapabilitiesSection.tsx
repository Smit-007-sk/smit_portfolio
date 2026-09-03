"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CapabilitiesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const capabilities = [
    {
      id: "01",
      title: "WEB EXPERIENCES",
      description: "High-converting websites and landing pages that look stunning and deliver results.",
      icon: (
        <svg className="w-6 h-6 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
      imageSrc: "/capabilities/web-experiences-v2.jpg",
    },
    {
      id: "02",
      title: "WEB APPLICATIONS",
      description: "Interactive web applications with smooth experiences and powerful functionality.",
      icon: (
        <svg className="w-6 h-6 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="12" height="12" rx="2" />
          <rect x="9" y="9" width="12" height="12" rx="2" />
        </svg>
      ),
      imageSrc: "/capabilities/web-applications.jpg",
    },
    {
      id: "03",
      title: "FULL-STACK SYSTEMS",
      description: "End-to-end systems with robust backend and scalable, secure architecture.",
      icon: (
        <svg className="w-6 h-6 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      imageSrc: "/capabilities/fullstack-systems.jpg",
    },
    {
      id: "04",
      title: "CUSTOM EXPERIENCES",
      description: "Unique interactions, animations and bespoke features tailored to your brand.",
      icon: (
        <svg className="w-6 h-6 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.2L22 11.6l-6 4.8 2.4 7.6L12 18.8 5.6 24l2.4-7.6-6-4.8 7.6-2.4z" />
        </svg>
      ),
      imageSrc: "/capabilities/custom-experiences-v2.jpg",
    },
  ];

  const metrics = [
    {
      val: "50+",
      label: "Projects Completed",
      icon: (
        <svg className="w-6 h-6 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.2-2.55L4.5 16.5z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.95 11a22.35 22.35 0 0 1-3.05 2z" />
        </svg>
      ),
    },
    {
      val: "30+",
      label: "Happy Clients",
      icon: (
        <svg className="w-6 h-6 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      val: "3+",
      label: "Years Experience",
      icon: (
        <svg className="w-6 h-6 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      val: "100%",
      label: "Commitment",
      icon: (
        <svg className="w-6 h-6 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="capabilities" 
      className="relative w-full bg-[#F4F1EA] text-[#111111] py-20 px-6 md:px-12 lg:px-16 border-t border-black/10 select-none overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto">
        
        {/* Main Grid: Left Header & Right Capabilities List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-black/10">
          
          {/* Left Column (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div>
              {/* Tag / Subtitle */}
              <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08] mb-4">
                <span>CAPABILITIES</span>
              </div>

              {/* Main Display Title */}
              <h2 className="font-brooks-display text-6xl sm:text-7xl md:text-8xl lg:text-[90px] leading-[0.88] tracking-tighter uppercase mb-6 font-black">
                <span className="text-[#111111]">WHAT I</span><br />
                <span className="text-[#F14E08]">BUILD</span>
              </h2>

              {/* Summary Paragraph */}
              <p className="text-neutral-700 text-sm sm:text-base leading-relaxed max-w-md font-medium mb-8">
                From beautiful interfaces to powerful backend systems, I build complete digital solutions that are fast, scalable and designed to make an impact.
              </p>

              {/* Action Link */}
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F14E08] hover:text-[#111111] transition-colors group underline decoration-2 underline-offset-4"
              >
                <span>SEE ALL SERVICES</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column (Cols 6-12): 4 Capabilities Rows */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-black/10">
            {capabilities.map((item) => (
              <Link 
                key={item.id}
                href="/services" 
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onMouseMove={handleMouseMove}
                className="relative py-8 sm:py-10 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group cursor-pointer block"
              >
                <div className="flex items-center gap-6 sm:gap-8">
                  {/* Number */}
                  <span className="text-4xl sm:text-5xl font-mono font-bold text-neutral-400 group-hover:text-[#F14E08] transition-colors">
                    {item.id}
                  </span>

                  {/* Circular Icon Container */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#F14E08]/30 bg-[#F14E08]/5 flex items-center justify-center shrink-0 group-hover:bg-[#F14E08] group-hover:border-[#F14E08] transition-all group-hover:scale-110">
                    <div className="group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold uppercase text-[#111111] tracking-wide mb-1 group-hover:text-[#F14E08] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 max-w-md font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Top-Right Arrow */}
                <div className="shrink-0 text-neutral-400 group-hover:text-[#F14E08] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>

                {/* Smooth Cursor-Following Popup Card */}
                <div
                  className={`absolute pointer-events-none z-50 transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2 ${
                    hoveredId === item.id
                      ? "opacity-100 scale-100 rotate-1 shadow-2xl"
                      : "opacity-0 scale-75 pointer-events-none"
                  }`}
                  style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                  }}
                >
                  <div className="w-80 h-48 rounded-2xl bg-[#141720] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/60 overflow-hidden relative flex flex-col">
                    {/* Window Header */}
                    <div className="bg-[#111318] px-3.5 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                        <span className="ml-2 text-[9px] font-mono text-white/70 uppercase tracking-wider">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono font-bold text-[#F14E08] bg-[#F14E08]/15 px-2 py-0.5 rounded-full">
                        {item.id}
                      </span>
                    </div>

                    {/* Image Preview Container */}
                    <div className="relative flex-1 w-full bg-[#0A0B0E] overflow-hidden">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        sizes="320px"
                        className="w-full h-full object-cover object-top opacity-100"
                      />
                    </div>
                  </div>
                </div>

              </Link>
            ))}
          </div>

        </div>

        {/* Bottom Metrics Bar (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 items-center">
          {metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 lg:border-r border-black/10 last:border-r-0 lg:pr-8"
            >
              {/* Soft Orange Icon Box */}
              <div className="w-12 h-12 rounded-2xl bg-[#F14E08]/10 flex items-center justify-center shrink-0">
                {m.icon}
              </div>

              {/* Stat Details */}
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#F14E08] leading-none mb-1">
                  {m.val}
                </div>
                <div className="text-xs font-bold text-neutral-700 tracking-wide">
                  {m.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
