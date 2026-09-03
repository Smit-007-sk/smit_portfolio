"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { CircularGalleryItem } from "@/components/CircularGallery";

const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#F14E08] animate-spin" />
    </div>
  ),
});

export default function ServicesPage() {
  const galleryItems: CircularGalleryItem[] = [
    { image: "/capabilities/web-experiences-v2.jpg", text: "WEB EXPERIENCES" },
    { image: "/projects/nexora-crm-real.jpg", text: "WEB APPLICATIONS" },
    { image: "/projects/ecommerce-platform-real.jpg", text: "E-COMMERCE STORES" },
    { image: "/capabilities/custom-experiences-v2.jpg", text: "CUSTOM 3D & MOTION" },
    { image: "/projects/emperor-media.jpg", text: "MARKETING & CMS" },
    { image: "/projects/millionaire-digital-real.jpg", text: "CREATIVE PRODUCTION" },
    { image: "/projects/dental-uk-real.jpg", text: "HEALTHCARE PLATFORMS" },
    { image: "/projects/spotify-clone-real.jpg", text: "STREAMING WEB APPS" },
  ];

  const servicesList = [
    {
      id: "01",
      title: "WEB DEVELOPMENT",
      shortDesc: "Modern, responsive websites built around your brand, goals, and audience — from landing pages to complete business websites.",
      tags: ["RESPONSIVE WEBSITES", "LANDING PAGES", "MODERN UI", "PERFORMANCE"],
      badge: "FRONTEND & FULL-STACK",
    },
    {
      id: "02",
      title: "WEB APPLICATIONS",
      shortDesc: "Custom web applications designed around real workflows, from interactive dashboards to productivity and business tools.",
      tags: ["REACT / NEXT.JS", "CUSTOM DASHBOARDS", "INTERACTIVE UI", "API INTEGRATIONS"],
      badge: "SAAS & WORKFLOWS",
    },
    {
      id: "03",
      title: "E-COMMERCE",
      shortDesc: "Clean, conversion-focused e-commerce experiences that make products easy to discover, explore, and purchase across devices.",
      tags: ["PRODUCT EXPERIENCES", "RESPONSIVE STORES", "SHOPPING FLOWS", "MODERN UI"],
      badge: "CONVERSION & RETAIL",
    },
    {
      id: "04",
      title: "CUSTOM DIGITAL EXPERIENCES",
      shortDesc: "Unique digital experiences combining thoughtful design, interaction, animation, and custom functionality.",
      tags: ["MICRO-INTERACTIONS", "WEB ANIMATIONS", "INTERACTIVE EXPERIENCES", "CREATIVE DEVELOPMENT"],
      badge: "BESPOKE & 3D MOTION",
    },
  ];

  const processSteps = [
    {
      id: "01",
      title: "DISCOVER",
      desc: "Understanding your goals, audience, requirements, and what success looks like.",
    },
    {
      id: "02",
      title: "PLAN",
      desc: "Defining the structure, features, content, and technical direction before development begins.",
    },
    {
      id: "03",
      title: "DESIGN",
      desc: "Creating a clear, modern interface focused on usability, visual hierarchy, and your brand.",
    },
    {
      id: "04",
      title: "BUILD",
      desc: "Turning the approved direction into a responsive, scalable web experience using modern technologies.",
    },
    {
      id: "05",
      title: "REFINE",
      desc: "Testing, polishing, optimizing, and making sure everything feels right across devices.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#111111] flex flex-col justify-between overflow-x-clip select-none">
      <Navbar />

      <main className="w-full py-16">
        {/* Top Header Section */}
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 mb-20">
          <section className="space-y-8 pt-6 border-b border-black/10 pb-16">
            <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
              <span>SERVICES &amp; CAPABILITIES</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h1 className="font-brooks-display text-3xl sm:text-5xl md:text-7xl lg:text-[100px] leading-[0.88] tracking-tighter uppercase font-black">
                <span className="text-[#111111]">I BUILD DIGITAL</span><br />
                <span className="text-[#F14E08]">EXPERIENCES.</span>
              </h1>

              <p className="text-neutral-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                From high-converting websites to custom web applications and e-commerce experiences — I design and build fast, responsive digital products with a strong focus on usability and detail.
              </p>
            </div>
          </section>
        </div>

        {/* FULL-WIDTH 3D CIRCULAR GALLERY SECTION */}
        <section className="relative w-full bg-[#08090C] py-8 sm:py-12 md:py-16 text-white border-y border-white/10 mb-16 sm:mb-24 overflow-hidden">
          {/* Header Bar */}
          <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6">
            <h2 className="font-brooks-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white">
              ROTATING SERVICE GALLERY
            </h2>
          </div>

          {/* Full Viewport Width WebGL Canvas */}
          <div className="w-full h-[420px] sm:h-[520px] md:h-[640px] lg:h-[720px] relative overflow-hidden">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#FFFFFF"
              borderRadius={0.06}
              scrollSpeed={2}
              scrollEase={0.04}
              autoScroll={true}
              autoScrollSpeed={0.08}
              font="bold 24px Plus Jakarta Sans, sans-serif"
            />
          </div>
        </section>

        {/* What I Offer & Process Sections */}
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 space-y-24">
          
          {/* WHAT I OFFER */}
          <section className="space-y-12 border-b border-black/10 pb-20">
            <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
              <span>WHAT I OFFER</span>
            </div>

            <div className="space-y-8">
              {servicesList.map((service) => (
                <div
                  key={service.id}
                  className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-10 border border-black/5 hover:border-[#F14E08]/50 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Service Header */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-sm font-black text-[#F14E08] font-mono">
                          {service.id}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#111111] group-hover:text-[#F14E08] transition-colors tracking-wide">
                          {service.title}
                        </h2>
                      </div>

                      <p className="text-neutral-600 text-sm leading-relaxed font-medium">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Tags List */}
                    <div className="lg:col-span-7 flex flex-wrap gap-2.5 pt-1">
                      {service.tags.map((tag, tIdx) => (
                        <div
                          key={tIdx}
                          className="bg-[#111111] text-white text-[11px] font-extrabold uppercase tracking-wider px-4 py-2 rounded-full shadow-sm group-hover:bg-[#F14E08] transition-colors"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE PROCESS */}
          <section className="space-y-12 border-b border-black/10 pb-20">
            <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
              <span>THE PROCESS</span>
            </div>

            <h2 className="font-brooks-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111111]">
              FROM IDEA TO LAUNCH.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-4">
              {processSteps.map((step) => (
                <div
                  key={step.id}
                  className="bg-white/70 p-6 rounded-2xl border border-black/5 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-black/10 pb-3">
                      <span className="text-xs font-black text-[#F14E08] font-mono">
                        {step.id}
                      </span>
                      <h3 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#0B0C10] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">GET STARTED</span>
              <h2 className="font-brooks-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight">
                <span className="text-white">LET&apos;S BUILD</span><br />
                <span className="text-[#F14E08]">SOMETHING GREAT.</span>
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm font-medium leading-relaxed">
                Have an idea, website, or web application in mind? Let&apos;s turn it into something useful, polished, and built to perform.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F14E08] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-lg shrink-0 group border border-white/10"
            >
              <span>LET&apos;S TALK ↗</span>
            </Link>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
