"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SkillsPage() {
  const skillCategories = [
    {
      category: "FRONTEND ENGINEERING",
      description: "Building responsive, pixel-perfect, and ultra-fast user interfaces with modern React frameworks.",
      skills: [
        { name: "React 19 / 18", desc: "Component architecture, custom hooks, context API" },
        { name: "Next.js (App Router)", desc: "Server components, SSG, SSR, routing & performance" },
        { name: "TypeScript", desc: "Strict typing, interface definitions, scalable codebase" },
        { name: "Tailwind CSS", desc: "Utility-first design systems, custom themes, responsive layouts" },
        { name: "JavaScript (ES6+)", desc: "Async/await, DOM manipulation, functional programming" },
        { name: "HTML5 & CSS3", desc: "Semantic markup, CSS Grid/Flexbox, accessibility" },
      ],
    },
    {
      category: "BACKEND & DATABASE",
      description: "Architecting reliable server endpoints, API integrations, and structured database models.",
      skills: [
        { name: "Node.js & Express", desc: "RESTful API design, middleware, server-side logic" },
        { name: "NestJS", desc: "Enterprise modular backend architecture & TypeScript controllers" },
        { name: "SQL & Databases", desc: "Relational database design, query optimization, schema migration" },
        { name: "API Integrations", desc: "Third-party SDKs, OAuth, webhooks & JSON communication" },
      ],
    },
    {
      category: "WORKFLOW & PERFORMANCE",
      description: "Professional developer toolchain ensuring clean code collaboration and production readiness.",
      skills: [
        { name: "Git & GitHub", desc: "Version control, feature branching, pull request workflows" },
        { name: "Performance Optimization", desc: "Lighthouse audits, asset compression, bundle size reduction" },
        { name: "Responsive Architecture", desc: "Cross-device compatibility from mobile to 4K displays" },
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#111111] flex flex-col justify-between overflow-x-clip select-none">
      <Navbar />

      <main className="w-full py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1500px] mx-auto space-y-24">
          
          {/* HERO */}
          <section className="space-y-8 pt-6 border-b border-black/10 pb-16">
            <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
              <span>TECHNICAL SKILLS</span>
            </div>

            <h1 className="font-brooks-display text-3xl sm:text-5xl md:text-7xl lg:text-[100px] leading-[0.88] tracking-tighter uppercase font-black">
              <span className="text-[#111111]">TOOLS, FRAMEWORKS</span><br />
              <span className="text-[#F14E08]">&amp; TECHNOLOGIES.</span>
            </h1>

            <p className="text-neutral-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              A comprehensive overview of my technical stack, development capabilities, and engineering workflow.
            </p>
          </section>

          {/* SKILL CATEGORIES */}
          <section className="space-y-16">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="space-y-8 border-b border-black/10 pb-16 last:border-b-0">
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">
                    CATEGORY {idx + 1}
                  </span>
                  <h2 className="font-brooks-display text-3xl sm:text-4xl font-black uppercase text-[#111111]">
                    {cat.category}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-xl">
                    {cat.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-black/5 hover:border-[#F14E08]/40 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#F14E08] font-bold">✱</span>
                        <h3 className="text-base font-extrabold text-[#111111] group-hover:text-[#F14E08] transition-colors">
                          {skill.name}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* CTA */}
          <section className="bg-[#0B0C10] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">GET STARTED</span>
              <h2 className="font-brooks-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight">
                READY TO BUILD SOMETHING GREAT?
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm font-medium">
                Let&apos;s turn your requirements into scalable code.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F14E08] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-lg shrink-0 group"
            >
              <span>START A PROJECT</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
