"use client";

import React from "react";
import Link from "next/link";

export default function ContactSection() {
  const contactLinks = [
    {
      title: "EMAIL",
      value: "smit.sk.connect@gmail.com",
      href: "mailto:smit.sk.connect@gmail.com",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      title: "LINKEDIN",
      value: "smit-khatri-631912341",
      href: "https://www.linkedin.com/in/smit-khatri-631912341/",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      title: "GITHUB",
      value: "smit-007-sk",
      href: "https://github.com/smit-007-sk",
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      title: "BASED IN",
      value: "Gujarat, India",
      href: null,
      icon: (
        <svg className="w-5 h-5 text-[#F14E08]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <section 
      id="contact" 
      className="relative w-full bg-[#F4F1EA] text-[#111111] pt-20 pb-16 px-6 md:px-12 lg:px-16 border-t border-black/10 select-none overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto">
        
        {/* Clean 2-Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Cols 1-6) — Heading & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Subtitle Tag */}
              <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08] mb-3">
                <span>LET&apos;S BUILD SOMETHING</span>
              </div>

              {/* Display Heading */}
              <h2 className="font-brooks-display text-4xl sm:text-6xl lg:text-[76px] leading-[0.88] tracking-tighter uppercase mb-6 font-black">
                <span className="text-[#111111]">HAVE AN IDEA?</span><br />
                <span className="text-[#F14E08]">LET&apos;S BUILD</span><br />
                <span className="text-[#111111]">SOMETHING</span><br />
                <span className="text-[#F14E08]">GREAT.</span>
              </h2>

              {/* Bio Paragraph */}
              <p className="text-neutral-700 text-xs sm:text-sm md:text-base leading-relaxed font-medium mb-8 max-w-md">
                I&apos;m always open to new opportunities, interesting projects and collaborations. Let&apos;s create something impactful together.
              </p>

              {/* CTA Ring Button & Link */}
              <div className="flex items-center gap-4">
                <Link 
                  href="/contact"
                  className="w-12 h-12 rounded-full border-2 border-[#F14E08] text-[#F14E08] hover:bg-[#F14E08] hover:text-white transition-all flex items-center justify-center shadow-sm active:scale-95 shrink-0 group"
                  aria-label="Start a project"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#111111] hover:text-[#F14E08] transition-colors group underline decoration-2 underline-offset-4"
                >
                  <span>START A PROJECT</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 7-12) — 4 Contact Rows with generous gap */}
          <div className="lg:col-span-6 flex flex-col space-y-5 lg:space-y-6 lg:pl-8">
            {contactLinks.map((item, idx) => {
              const ContentNode = (
                <div className="p-6 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-black/10 hover:border-[#F14E08]/60 hover:bg-white flex items-center justify-between gap-4 group cursor-pointer w-full shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-5">
                    {/* Soft Icon Box */}
                    <div className="w-13 h-13 rounded-xl border border-black/5 bg-neutral-100 flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#F14E08] group-hover:bg-[#F14E08]/10 transition-all">
                      {item.icon}
                    </div>

                    {/* Info Text */}
                    <div>
                      <div className="text-[10px] sm:text-xs font-black uppercase text-neutral-500 tracking-wider mb-0.5">
                        {item.title}
                      </div>
                      <div className="text-base sm:text-xl font-extrabold text-[#111111] group-hover:text-[#F14E08] transition-colors leading-tight">
                        {item.value}
                      </div>
                    </div>
                  </div>

                  {/* Top-Right Arrow (for links) */}
                  {item.href && (
                    <div className="shrink-0 text-neutral-400 group-hover:text-[#F14E08] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  )}
                </div>
              );

              return item.href ? (
                <Link key={idx} href={item.href} target="_blank" className="w-full">
                  {ContentNode}
                </Link>
              ) : (
                <div key={idx} className="w-full">
                  {ContentNode}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
