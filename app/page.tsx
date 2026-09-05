import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AboutMeSection from "@/components/AboutMeSection";
import TechStackSection from "@/components/TechStackSection";
import HorizontalTextSection from "@/components/HorizontalTextSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollExpand from "@/components/ScrollExpand";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#0B0C10] text-white flex flex-col justify-between overflow-x-clip">
      {/* Header Navigation & Hero in dedicated Orange Background */}
      <div className="w-full bg-[#F14E08] text-white flex flex-col">
        <Navbar />
        <HeroSection />
      </div>

      {/* Selected Work Section */}
      <SelectedWorkSection />

      {/* ScrollExpand transition section right after Selected Work ends */}
      <ScrollExpand
        src="/showcase-experience.jpg"
        alt="Digital Showcase"
        title="BUILDING DIGITAL EXPERIENCES"
        scrollHint="SCROLL TO EXPAND ↓"
        useWindowScroll={true}
        startWidth={50}
        startHeight={65}
        startRadius={32}
        endRadius={0}
        mediaZoom={1.35}
        scrollDistance={1.2}
        holdDistance={0.3}
      >
        <div className="max-w-3xl text-center space-y-4 px-6 select-none">
          <span className="text-[#F14E08] text-xs font-black uppercase tracking-widest bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            CRAFTSMANSHIP &amp; ENGINEERING
          </span>
          <h2 className="font-brooks-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase leading-tight drop-shadow-lg">
            READY TO TRANSFORM YOUR VISION?
          </h2>
          <p className="text-white/80 text-sm sm:text-base font-medium max-w-xl mx-auto drop-shadow">
            Combining ultra-fast performance, high-converting design, and full-stack scalability.
          </p>
        </div>
      </ScrollExpand>

      {/* Capabilities / What I Build Section */}
      <CapabilitiesSection />

      {/* About Me Section */}
      <AboutMeSection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Mobile-only Blank Transition Screen: Completely covers the screen before the pinned Are You Ready section */}
      <div 
        className="w-full h-screen bg-[#0B0C10] md:hidden relative z-10 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* GSAP Horizontal Scroll Text Animation */}
      <HorizontalTextSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
