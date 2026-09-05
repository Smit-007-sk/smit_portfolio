"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import FlowingMenu, { MenuItemData } from "@/components/FlowingMenu";
import OptionWheel from "@/components/OptionWheel";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const mobileNavItems = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "WORK", href: "/work" },
    { label: "SERVICES", href: "/services" },
    { label: "CONTACT", href: "/contact" },
  ];

  const currentMobileIndex = Math.max(
    0,
    mobileNavItems.findIndex((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    )
  );

  const flowingMenuItems: MenuItemData[] = [
    {
      text: "HOME",
      link: "/",
      image: "/navbar/home.jpg",
    },
    {
      text: "ABOUT",
      link: "/about",
      image: "/navbar/about.jpg",
    },
    {
      text: "WORK",
      link: "/work",
      image: "/navbar/work.jpg",
    },
    {
      text: "SERVICES",
      link: "/services",
      image: "/capabilities/web-experiences-v2.jpg",
    },
    {
      text: "CONTACT",
      link: "/contact",
      image: "/navbar/contact.jpg",
    },
  ];

  const handleMobileSelect = (label: string) => {
    const item = mobileNavItems.find((i) => i.label === label);
    if (item) {
      setIsMenuOpen(false);
      router.push(item.href);
    }
  };

  return (
    <>
      {/* Standard Header */}
      <header 
        className={`w-full py-5 px-6 md:px-12 lg:px-16 flex items-center justify-between relative z-40 transition-colors select-none ${
          isHomePage ? "bg-transparent text-white" : "bg-[#F4F1EA] text-[#111111] border-b border-black/10"
        }`}
      >
        {/* 1. Left: Brand Logo */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:opacity-90 hover:scale-105 transition-all group"
            aria-label="Smit Khatri - Home"
          >
            <Image
              src="/logo.png"
              alt="SK Logo"
              width={96}
              height={96}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
              priority
            />
          </Link>
        </div>

        {/* 2. Desktop Floating Navigation Menu Pill */}
        <nav 
          className={`absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 backdrop-blur-xl rounded-full px-3 py-1.5 border shadow-md transition-all ${
            isHomePage 
              ? "bg-black/20 border-white/20 shadow-black/10 text-white" 
              : "bg-white/90 border-black/10 shadow-black/5 text-[#111111]"
          }`}
        >
          {navItems.map((item) => {
            const isActive = 
              item.href === "/" 
                ? pathname === "/" 
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? isHomePage
                      ? "bg-white text-black shadow-md font-black"
                      : "bg-[#111111] text-white shadow-md font-black"
                    : isHomePage
                      ? "text-white/80 hover:text-white hover:bg-white/10 font-semibold"
                      : "text-neutral-700 hover:text-[#111111] hover:bg-black/5 font-semibold"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. Right: Contact CTA Button */}
        <div className="flex items-center gap-3 pr-24 sm:pr-28">
          <Link
            href="/contact"
            className={`hidden sm:inline-flex items-center justify-center gap-2 font-black text-xs md:text-sm tracking-wider uppercase px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md group ${
              isHomePage 
                ? "bg-white text-black hover:bg-neutral-100" 
                : "bg-[#111111] text-white hover:bg-[#F14E08]"
            }`}
          >
            <span>LET&apos;S TALK</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
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
      </header>

      {/* STICKY / FIXED MENU BUTTON */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-5 right-5 sm:right-8 md:right-12 z-50 inline-flex items-center justify-center gap-2 text-xs md:text-sm font-black uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all border shadow-lg backdrop-blur-md ${
          isMenuOpen
            ? "bg-[#111318] text-white border-white/40 hover:bg-white/10"
            : "bg-[#0B0C10] text-white border-white/20 hover:bg-[#1a1b22] hover:border-white/40 shadow-black/40"
        }`}
      >
        <span>{isMenuOpen ? "CLOSE ✕" : "MENU ☰"}</span>
      </button>

      {/* FULL-SCREEN OVERLAY: React Bits OptionWheel on Mobile, FlowingMenu on Desktop */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0C10] flex flex-col justify-between pt-24 pb-8 transition-opacity duration-300">
          
          {/* MOBILE PHONE ONLY: React Bits OptionWheel Navbar */}
          <div className="md:hidden flex-1 w-full relative flex items-center justify-center">
            <OptionWheel
              items={mobileNavItems.map((i) => i.label)}
              defaultSelected={currentMobileIndex}
              textColor="#777777"
              activeColor="#FFFFFF"
              side="left"
              fontSize={2.3}
              spacing={1.35}
              curve={1.0}
              tilt={10}
              blur={1}
              fade={0.28}
              inset={35}
              loop={false}
              onSelect={handleMobileSelect}
            />
          </div>

          {/* DESKTOP / TABLET ONLY: React Bits FlowingMenu */}
          <div className="hidden md:block flex-1 w-full relative">
            <FlowingMenu
              items={flowingMenuItems}
              speed={15}
              textColor="#ffffff"
              bgColor="#0B0C10"
              marqueeBgColor="#F14E08"
              marqueeTextColor="#ffffff"
              borderColor="rgba(255,255,255,0.12)"
              onItemClick={() => setIsMenuOpen(false)}
            />
          </div>

          {/* Bottom Footer Info inside Overlay */}
          <div className="max-w-[1500px] w-full mx-auto px-6 md:px-12 flex items-center justify-center md:justify-end text-xs text-white/50 pt-4 border-t border-white/10">
            <span className="text-[#F14E08] font-bold md:hidden inline text-xs tracking-wider">SWIPE / TAP WHEEL TO NAVIGATE</span>
          </div>
        </div>
      )}
    </>
  );
}
