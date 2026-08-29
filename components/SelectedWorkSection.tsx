"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [activeProject, setActiveProject] = useState(1);
  const [sectionHeight, setSectionHeight] = useState("380vh");

  const projects = [
    {
      id: "01",
      slug: "emperor-media",
      title: "EMPEROR MEDIA SOLUTION",
      category: "Digital Platform",
      tag: "AGENCY PLATFORM",
      image: "/projects/emperor-media.jpg",
      badge: "GLOBAL MEDIA NETWORK"
    },
    {
      id: "02",
      slug: "taskly",
      title: "TASKLY APP",
      category: "Task Management Application",
      tag: "PRODUCTIVITY APP",
      image: "/projects/taskly.jpg",
      badge: "PRODUCTIVITY SUITE"
    },
    {
      id: "03",
      slug: "velora-store",
      title: "VELORA STORE",
      category: "E-Commerce Website",
      tag: "FASHION E-COMMERCE",
      image: "/projects/velora-store.jpg",
      badge: "EDITORIAL FASHION"
    },
    {
      id: "04",
      slug: "nexus-analytics",
      title: "NEXUS ANALYTICS",
      category: "Analytics Dashboard",
      tag: "DATA VISUALIZATION",
      image: "/projects/nexus-analytics.jpg",
      badge: "ENTERPRISE METRICS"
    },
    {
      id: "05",
      slug: "pulse-health",
      title: "PULSE HEALTH",
      category: "Telehealth & Fitness Platform",
      tag: "HEALTH & WELLNESS",
      image: "/projects/pulse-health.jpg",
      badge: "BIOMETRIC PORTAL"
    },
  ];

  // Helper to calculate exact max travel in pixels so Card 05 is 100% visible
  const getMaxTravel = () => {
    if (!trackRef.current) return 0;
    const track = trackRef.current;
    const container = track.parentElement;
    if (!container) return 0;

    const lastCard = track.lastElementChild as HTMLElement;
    if (!lastCard) return 0;

    const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
    const containerWidth = container.clientWidth;
    const extraMargin = window.innerWidth > 1024 ? 48 : 24;

    return Math.max(0, lastCardRight - containerWidth + extraMargin);
  };

  // Dynamically calculate horizontal travel & vertical pin section height
  useEffect(() => {
    const calculateDimensions = () => {
      const maxTravel = getMaxTravel();
      const totalPinHeight = window.innerHeight + maxTravel;
      setSectionHeight(`${totalPinHeight}px`);
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, []);

  // Sync vertical scroll progress directly to horizontal translation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalScrollableHeight, 0), 1);
      const maxTravel = getMaxTravel();
      setTranslateX(progress * maxTravel);

      // Calculate active card 1 through 5
      const cardIndex = Math.min(Math.floor(progress * 5) + 1, 5);
      setActiveProject(cardIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (!sectionRef.current) return;
    const totalScrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (index - 1) / (projects.length - 1);
    const targetScrollY = sectionRef.current.offsetTop + targetProgress * totalScrollableHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative w-full bg-[#F4F1EA] text-[#111111] select-none"
    >
      {/* Sticky Viewport Pinned in View */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-8 sm:pt-12 md:pt-16 pb-6 px-6 md:px-12 lg:px-16 overflow-hidden">
        
        {/* TOP SECTION: Visually Dominant Heading & Controls Bar */}
        <div className="max-w-[1600px] w-full mx-auto flex flex-col space-y-3 shrink-0 z-20">
          <h2 className="font-brooks-display text-5xl sm:text-7xl md:text-[95px] lg:text-[140px] leading-[0.85] tracking-tighter text-[#F14E08] font-black uppercase drop-shadow-sm">
            SELECTED WORK
          </h2>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-1">
            <p className="text-neutral-700 text-md sm:text-lg md:text-xl leading-relaxed max-w-xl font-medium">
              A curated selection of 5 digital products where strategy, design, and full-stack engineering come together.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#111111] hover:text-[#F14E08] transition-colors group underline decoration-2 underline-offset-4"
              >
                <span>EXPLORE ALL PROJECTS</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>

              {/* Index & Arrow controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#F14E08]">
                  {projects.map((p, idx) => {
                    const num = idx + 1;
                    const isActive = activeProject === num;
                    return (
                      <button
                        key={p.id}
                        onClick={() => scrollToCard(num)}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "opacity-100 scale-125 font-black border-b-2 border-[#F14E08] pb-0.5"
                            : "opacity-40 hover:opacity-80"
                        }`}
                      >
                        {p.id}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollToCard(activeProject > 1 ? activeProject - 1 : 1)}
                    className="w-8 h-8 rounded-full border-2 border-[#F14E08] text-[#F14E08] hover:bg-[#F14E08] hover:text-white transition-all flex items-center justify-center shadow-sm active:scale-95 disabled:opacity-30 cursor-pointer"
                    disabled={activeProject === 1}
                    aria-label="Previous project"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollToCard(activeProject < 5 ? activeProject + 1 : 5)}
                    className="w-8 h-8 rounded-full border-2 border-[#F14E08] text-[#F14E08] hover:bg-[#F14E08] hover:text-white transition-all flex items-center justify-center shadow-sm active:scale-95 disabled:opacity-30 cursor-pointer"
                    disabled={activeProject === 5}
                    aria-label="Next project"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: DYNAMICALLY SCROLLING 5 CARDS TRACK */}
        <div className="w-full max-w-[1600px] mx-auto flex-1 flex items-center overflow-hidden relative my-6">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 lg:gap-10 transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {projects.map((proj) => (
              <div key={proj.id} className="w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[56vw] max-w-[840px] shrink-0 group">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 border border-black/10 hover:border-[#F14E08]/60 flex flex-col justify-between h-[46vh] sm:h-[48vh] lg:h-[50vh] max-h-[500px]">
                  
                  {/* Visual Image Showcase Container */}
                  <div className="w-full bg-[#0B0C10] rounded-2xl overflow-hidden relative flex-1 border border-black/10 group-hover:border-[#F14E08]/40 transition-colors shadow-inner">
                    {/* High-Resolution Showcase Image */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        priority={proj.id === "01" || proj.id === "02"}
                        sizes="(max-width: 768px) 85vw, 56vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none"></div>
                    </div>

                    {/* Top Header Badge Overlay */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-white/20">
                        {proj.badge}
                      </span>
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest bg-[#F14E08] text-white px-3 py-1.5 rounded-full shadow-sm">
                        {proj.tag}
                      </span>
                    </div>

                    {/* Bottom Title & Tag Overlay inside Image Frame */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                      <div className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight drop-shadow-md">
                        {proj.title}
                      </div>
                      <div className="text-xs text-white/80 font-medium">
                        {proj.category}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-end justify-between pt-4">
                    <div className="flex items-baseline gap-4">
                      <span className="text-3xl sm:text-4xl font-black text-[#F14E08]">{proj.id}</span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-black uppercase text-[#111111] tracking-wide">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-neutral-600 font-bold uppercase tracking-wider">{proj.category}</p>
                      </div>
                    </div>

                    <Link
                      href={`/work/${proj.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#F14E08] hover:text-[#111111] transition-colors group-hover:translate-x-1"
                    >
                      <span>VIEW CASE STUDY</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
