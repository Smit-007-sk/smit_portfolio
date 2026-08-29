"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitText from "@/components/SplitText";

export default function AboutPage() {
  const workflow = [
    {
      title: "DISCOVER",
      desc: "Understanding goals, audience, and business requirements to establish a clear direction.",
    },
    {
      title: "DESIGN",
      desc: "Creating modern, accessible, high-converting interfaces tailored to the brand.",
    },
    {
      title: "BUILD",
      desc: "Turning the design into a fast, scalable experience using modern technologies.",
    },
    {
      title: "REFINE",
      desc: "Testing performance, responsiveness, interactions, and details across devices.",
    },
    {
      title: "LAUNCH",
      desc: "Delivering a polished, production-ready experience built to perform in the real world.",
    },
  ];

  const principles = [
    {
      title: "Thoughtful Design",
      desc: "Every visual decision should have a purpose — making the experience clearer, more engaging, and easier to use.",
    },
    {
      title: "Clean Code",
      desc: "Maintainable, scalable foundations built to support the product beyond launch.",
    },
    {
      title: "Performance",
      desc: "Fast load times, optimized assets, and smooth interactions across devices.",
    },
    {
      title: "Responsive By Default",
      desc: "Experiences that work beautifully across desktop, tablet, and mobile.",
    },
    {
      title: "Attention to Detail",
      desc: "Small interactions, precise spacing, typography, and motion that make the difference.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#111111] flex flex-col justify-between overflow-x-clip select-none">
      <Navbar />

      <main className="w-full py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1500px] mx-auto space-y-24">
          
          {/* STATEMENT HERO */}
          <section className="space-y-8 pt-6 border-b border-black/10 pb-16">
            <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
              <span>ABOUT ME</span>
            </div>

            <SplitText
              text="I BUILD DIGITAL EXPERIENCES THAT MOVE BUSINESSES."
              tag="h1"
              className="font-brooks-display text-3xl sm:text-5xl md:text-7xl lg:text-[95px] xl:text-[105px] leading-[0.88] tracking-tighter uppercase font-black"
              delay={35}
              duration={1.1}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />

            <div className="space-y-4 max-w-3xl pt-2">
              <p className="text-neutral-800 text-base sm:text-lg md:text-xl leading-relaxed font-semibold">
                I&apos;m Smit Khatri, a full-stack developer focused on building modern websites and web applications. I combine thoughtful design with reliable development to create digital experiences that look sharp, feel intuitive, and perform exceptionally well.
              </p>
              <p className="text-neutral-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                I work with startups, businesses, and ambitious ideas to turn concepts into polished digital products — from the first interaction to the final line of code.
              </p>
            </div>
          </section>

          {/* WHO I AM */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start border-b border-black/10 pb-20">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08] mb-4">
                <span>WHO I AM</span>
              </div>
              <SplitText
                text="CRAFTSMANSHIP & CODE."
                tag="h2"
                className="font-brooks-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#111111] leading-[0.95] tracking-tight max-w-md"
                delay={40}
                duration={1.2}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
              />
            </div>

            <div className="lg:col-span-7 space-y-6 text-neutral-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium pt-2">
              <p>
                My work sits at the intersection of modern design and scalable technology. I believe a great website or web application shouldn&apos;t just look impressive — it should work flawlessly under the hood.
              </p>
              <p>
                Whether working with a startup, growing business, or an ambitious idea, I focus on creating end-to-end digital experiences that solve real problems, engage users, and support business growth.
              </p>
            </div>
          </section>

          {/* HOW I WORK (WORKFLOW TIMELINE) */}
          <section className="space-y-12 border-b border-black/10 pb-20">
            <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
              <span>HOW I WORK</span>
            </div>

            <SplitText
              text="A STREAMLINED PROCESS."
              tag="h2"
              className="font-brooks-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111111]"
              delay={40}
              duration={1.25}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 35 }}
              to={{ opacity: 1, y: 0 }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-4">
              {workflow.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-black/5 hover:border-[#F14E08]/40 transition-all group flex flex-col justify-between min-h-[200px]"
                >
                  <div>
                    <h3 className="text-lg font-extrabold text-[#111111] uppercase tracking-wider mb-2 group-hover:text-[#F14E08] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-8 h-[2px] bg-[#F14E08]/30 group-hover:w-full group-hover:bg-[#F14E08] transition-all mt-6"></div>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT MATTERS (CORE PRINCIPLES) */}
          <section className="space-y-12 border-b border-black/10 pb-20">
            <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
              <span>WHAT MATTERS</span>
            </div>

            <SplitText
              text="CORE PRINCIPLES."
              tag="h2"
              className="font-brooks-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111111]"
              delay={50}
              duration={1.2}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
              {principles.map((p, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="text-[#F14E08] font-bold text-xl select-none pt-0.5">✱</span>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#111111] uppercase tracking-wide mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA SECTION */}
          <section className="bg-[#0B0C10] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">HAVE A PROJECT IN MIND?</span>
              <SplitText
                text="LET'S BUILD SOMETHING REMARKABLE."
                tag="h2"
                className="font-brooks-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight text-white"
                delay={45}
                duration={1.2}
                ease="power3.out"
                splitType="words"
                from={{ opacity: 0, y: 35 }}
                to={{ opacity: 1, y: 0 }}
              />
              <p className="text-neutral-400 text-xs sm:text-sm font-medium pt-1">
                Have an idea, website, or web application in mind? Let&apos;s turn it into something real.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F14E08] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-lg shrink-0 group"
            >
              <span>LET&apos;S TALK</span>
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
