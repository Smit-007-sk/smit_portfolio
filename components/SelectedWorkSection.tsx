"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";

// Project badges & tags dictionary matching the updated project catalog
const projectMetaMap: Record<string, { badge: string; tag: string }> = {
  "millionaire-digital": { badge: "3D & IMMERSIVE", tag: "CREATIVE STUDIO" },
  "nexora-crm": { badge: "LEAD & WORKFLOW", tag: "SAAS PLATFORM" },
  "emperor-media": { badge: "30+ TEMPLATES", tag: "MARKETING & CMS" },
  "dental-website-uk": { badge: "HEALTHCARE UI", tag: "PHP & WEB" },
  "spotify-clone": { badge: "AUDIO STREAMING", tag: "MUSIC PLAYER" },
  "ecommerce-platform": { badge: "CART & STOREFRONT", tag: "ONLINE RETAIL" },
};

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [activeProject, setActiveProject] = useState(1);
  const [sectionHeight, setSectionHeight] = useState("420vh");

  const projects = projectsData.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.subtitle,
    tag: projectMetaMap[p.slug]?.tag || p.category,
    image: p.image,
    badge: projectMetaMap[p.slug]?.badge || "FEATURED PROJECT",
  }));

  // Helper to calculate exact max travel in pixels so Card 06 is 100% visible
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
  }, [projects.length]);

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

      // Calculate active card index
      const cardIndex = Math.min(Math.floor(progress * projects.length) + 1, projects.length);
      setActiveProject(cardIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [projects.length]);

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
              A curated selection of {projects.length} digital products where strategy, design, and full-stack engineering come together.
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
                    onClick={() => scrollToCard(activeProject < projects.length ? activeProject + 1 : projects.length)}
                    className="w-8 h-8 rounded-full border-2 border-[#F14E08] text-[#F14E08] hover:bg-[#F14E08] hover:text-white transition-all flex items-center justify-center shadow-sm active:scale-95 disabled:opacity-30 cursor-pointer"
                    disabled={activeProject === projects.length}
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

        {/* BOTTOM SECTION: DYNAMICALLY SCROLLING CARDS TRACK */}
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
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 border border-black/10 hover:border-[#F14E08]/60 flex flex-col justify-between h-[46vh] sm:h-[48vh] lg:h-[50vh] max-h-[500px]">
                  
                  {/* Visual Image Showcase Container */}
                  <div className="w-full bg-[#12141A] rounded-2xl overflow-hidden relative flex-1 border border-black/10 group-hover:border-[#F14E08]/40 transition-colors shadow-inner flex flex-col">
                    
                    {/* Top Header Badge Overlay */}
                    <div className="bg-[#111318]/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-white/10 z-10">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                        <span className="ml-2 text-[10px] font-mono text-white/70 uppercase tracking-wider">
                          {proj.badge}
                        </span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-[#F14E08] text-white px-2.5 py-0.5 rounded-full shadow-sm">
                        {proj.tag}
                      </span>
                    </div>

                    {/* High-Resolution Fully-Visible Image */}
                    <div className="relative w-full flex-1 overflow-hidden bg-[#0A0B0E]">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        priority={proj.id === "01" || proj.id === "02"}
                        sizes="(max-width: 768px) 85vw, 56vw"
                        className="object-cover object-top w-full h-full opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-3 px-1 gap-2 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-xl sm:text-3xl font-black text-[#F14E08] font-mono shrink-0">
                        {proj.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-lg font-black uppercase text-[#111111] tracking-wide truncate">
                          {proj.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-neutral-600 font-bold uppercase tracking-wider truncate">
                          {proj.category}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/work/${proj.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#F14E08] hover:text-[#111111] transition-colors shrink-0 bg-black/5 hover:bg-[#F14E08] hover:text-white px-3 py-1.5 rounded-full"
                    >
                      <span className="hidden sm:inline">VIEW CASE STUDY</span>
                      <span className="sm:hidden">VIEW</span>
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
