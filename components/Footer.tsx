"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Skills", href: "/skills" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { label: "GitHub", href: "https://github.com/smit-007-sk" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/smit-khatri-631912341/" },
  ];

  return (
    <footer className="relative w-full bg-[#0B0C10] text-white pt-16 pb-12 px-6 md:px-12 lg:px-16 border-t border-white/10 select-none overflow-hidden">
      {/* Background Watermark Display Typography "SMIT" */}
      <div className="absolute top-95 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-brooks-display text-[32vw] sm:text-[29.5vw] lg:text-[27vw] leading-none font-black text-white/[0.05] uppercase tracking-tighter text-center whitespace-nowrap">
          SMIT
        </span>
      </div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        
        {/* Top Marquee Banner Ticker */}
        <div className="w-full overflow-hidden border-b border-white/10 pb-12 mb-16 select-none">
          <div className="flex w-max whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-6 sm:gap-8 font-brooks-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white/90 shrink-0 pr-6 sm:pr-8"
                aria-hidden={i > 0 ? "true" : undefined}
              >
                <span>LET&apos;S TALK</span>
                <span className="text-[#F14E08]">•</span>
                <span>SMIT KHATRI</span>
                <span className="text-[#F14E08]">•</span>
                <span>FULL-STACK DEVELOPER</span>
                <span className="text-[#F14E08]">•</span>
                <span>AVAILABLE FOR WORK</span>
                <span className="text-[#F14E08]">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Column 1 (Cols 1-4): Brand & Status */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* SK Logo Badge */}
              <Link 
                href="#hero"
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:border-[#F14E08]/50 p-2 shadow-lg hover:scale-105 transition-all group mb-6"
                aria-label="Back to Top"
              >
                <Image
                  src="/logo.png"
                  alt="SK Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </Link>

              {/* Tagline */}
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-wide mb-4 max-w-sm">
                Building digital experiences that move businesses.
              </h3>

              <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed max-w-sm">
                Combining thoughtful design, powerful frontend experiences, and reliable backend systems.
              </p>
            </div>

            {/* Availability Green Dot Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-neutral-300">
                Available for new opportunities
              </span>
            </div>
          </div>

          {/* Column 2 (Cols 5-6): Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F14E08]">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors inline-block hover:translate-x-1 transition-transform"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (Cols 7-8): Social Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F14E08]">
              SOCIALS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {socialLinks.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href}
                    target="_blank"
                    className="text-neutral-400 hover:text-[#F14E08] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{item.label}</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (Cols 9-12): Direct Contact & Location */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#F14E08]">
              SAY HELLO
            </h4>
            
            <div className="space-y-3">
              <Link
                href="mailto:smit.sk.connect@gmail.com"
                className="text-[#F14E08] hover:text-white font-extrabold text-sm sm:text-base transition-colors block underline decoration-2 underline-offset-4 break-all"
              >
                smit.sk.connect@gmail.com
              </Link>

              <div className="text-xs text-neutral-400 space-y-1">
                <div>Based in <span className="text-white font-semibold">Gujarat, India</span></div>
                <div>Local Time Zone: <span className="text-white font-semibold">IST (UTC +5:30)</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-bold">SMIT KHATRI</span>. ALL RIGHTS RESERVED.
          </div>

          {/* Back to Top Smooth Scroll Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white hover:text-[#F14E08] transition-colors group"
          >
            <span>BACK TO TOP</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#F14E08] group-hover:bg-[#F14E08] transition-all">
              <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
