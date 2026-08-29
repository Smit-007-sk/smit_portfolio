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
                <div className="bg-[#0B0C10] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 transition-all duration-300 group">
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

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-wide mb-4 group-hover:text-[#F14E08] transition-colors">
                          {project.title}
                        </h2>

                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-medium mb-6">
                          {project.shortDesc}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="bg-white/10 text-white/80 text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white hover:text-[#F14E08] transition-colors underline decoration-2 underline-offset-4 group/link"
                      >
                        <span>VIEW CASE STUDY ↗</span>
                      </Link>
                    </div>

                    {/* Mockup Frame (Cols 6-12) */}
                    <div className="lg:col-span-7">
                      <div className="w-full bg-[#12141C] rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] flex flex-col justify-between relative group-hover:border-white/20 transition-colors">
                        {/* Background UI Showcase Image */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-top opacity-35 group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/80 to-[#0B0C10]/60 pointer-events-none" />
                        </div>

                        {/* Frame Header */}
                        <div className="relative z-10 flex items-center justify-between text-xs uppercase text-white/70 border-b border-white/10 p-6 pb-3">
                          <div className="flex items-center gap-2 font-bold text-white">
                            <span className="text-[#F14E08]">⚡</span> {project.title}
                          </div>
                          <div className="text-[10px] text-white/60 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                            {project.category}
                          </div>
                        </div>

                        {/* Frame Content */}
                        <div className="relative z-10 my-auto px-6 py-4 space-y-3">
                          <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
                            {project.subtitle}
                          </h3>
                          <p className="text-white/70 text-xs max-w-lg hidden sm:block font-medium">
                            {project.overview}
                          </p>
                        </div>

                        {/* Frame Footer */}
                        <div className="relative z-10 flex items-center justify-between text-[10px] text-white/50 border-t border-white/10 p-6 pt-3">
                          <span>Role: {project.role}</span>
                          <Link
                            href={`/work/${project.slug}`}
                            className="text-[#F14E08] font-bold hover:underline"
                          >
                            CASE STUDY ↗
                          </Link>
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
