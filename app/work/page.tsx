"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projectsData } from "@/data/projects";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "WEBSITES", "WEB APPS", "E-COMMERCE"];

  const filteredProjects = selectedCategory === "ALL"
    ? projectsData
    : projectsData.filter((p) => p.category.toUpperCase() === selectedCategory.toUpperCase());

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#111111] flex flex-col justify-between overflow-x-clip select-none">
      <Navbar />

      <main className="w-full py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1500px] mx-auto space-y-16">
          
          {/* Header & Filter Controls */}
          <div className="space-y-8 pt-6 border-b border-black/10 pb-12">
            <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
              <span>PROJECT ARCHIVE</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h1 className="font-brooks-display text-3xl sm:text-5xl md:text-7xl lg:text-[100px] leading-[0.88] tracking-tighter uppercase font-black">
                <span className="text-[#111111]">SELECTED</span><br />
                <span className="text-[#F14E08]">WORK &amp; PROJECTS.</span>
              </h1>

              <p className="text-neutral-700 text-sm sm:text-base max-w-md font-medium leading-relaxed">
                Websites, web applications, and digital experiences I&apos;ve designed and built.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                    selectedCategory === cat
                      ? "bg-[#111111] text-white border-[#111111] shadow-md"
                      : "bg-white/60 text-neutral-700 border-black/10 hover:border-black/30 hover:bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Showcase Rows with React Bits ScrollStack Effect */}
          <ScrollStack
            useWindowScroll={true}
            itemDistance={60}
            itemStackDistance={35}
            baseScale={0.88}
            itemScale={0.03}
            stackPosition="15%"
            scaleEndPosition="10%"
          >
            {filteredProjects.map((project) => (
              <ScrollStackItem key={project.slug}>
                <div className="bg-[#0E1015] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/10 transition-all duration-300 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Project Info (Cols 1-5) */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex items-baseline gap-4 mb-3">
                          <span className="text-3xl sm:text-4xl font-black text-[#F14E08] font-mono">
                            {project.id}
                          </span>
                          <span className="text-xs uppercase font-extrabold tracking-widest text-white/60">
                            {project.category}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-wide mb-3 group-hover:text-[#F14E08] transition-colors">
                          {project.title}
                        </h2>

                        <p className="text-[#F14E08] text-xs font-bold uppercase tracking-wider mb-4">
                          {project.subtitle}
                        </p>

                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-medium mb-6">
                          {project.shortDesc}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="bg-white/10 text-white/90 text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F14E08] hover:text-white transition-colors underline decoration-2 underline-offset-4 group/link"
                      >
                        <span>VIEW CASE STUDY ↗</span>
                      </Link>
                    </div>

                    {/* Clean & Bright Mockup Frame (Cols 6-12) */}
                    <div className="lg:col-span-7">
                      <div className="w-full bg-[#1A1D24] rounded-2xl overflow-hidden border border-white/15 shadow-xl flex flex-col group-hover:border-[#F14E08]/50 transition-colors">
                        
                        {/* Browser Window Header */}
                        <div className="bg-[#111318] px-4 py-3 flex items-center justify-between border-b border-white/10">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                            <span className="ml-2 text-[10px] font-mono text-white/50 truncate max-w-[200px]">
                              {project.title}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono uppercase bg-white/10 text-white/80 px-2.5 py-0.5 rounded-full border border-white/10">
                            {project.category}
                          </span>
                        </div>

                        {/* 100% Bright Project Screenshot Container */}
                        <div className="relative w-full aspect-[16/10] bg-[#0A0B0E] overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-top w-full h-full opacity-100 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                          />
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>

        </div>
      </main>

      <Footer />
    </div>
  );
}
