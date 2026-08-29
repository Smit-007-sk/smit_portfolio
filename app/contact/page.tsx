"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReflectiveCard from "@/components/ReflectiveCard";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Web Development",
    message: "",
    _honeypot: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.projectType.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setSuccessMessage("Thanks! Your message has been sent. I'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "Web Development",
          message: "",
          _honeypot: "",
        });
        return;
      }

      // Check for public Web3Forms fallback key if defined in environment
      const publicWeb3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (publicWeb3Key) {
        try {
          const w3Res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: publicWeb3Key,
              name: formData.name,
              email: formData.email,
              company: formData.company,
              project_type: formData.projectType,
              message: formData.message,
              subject: `New Portfolio Inquiry — ${formData.name}`,
            }),
          });
          const w3Data = await w3Res.json();
          if (w3Data.success) {
            setStatus("success");
            setSuccessMessage("Thanks! Your message has been sent. I'll get back to you soon.");
            setFormData({
              name: "",
              email: "",
              company: "",
              projectType: "Web Development",
              message: "",
              _honeypot: "",
            });
            return;
          }
        } catch {
          // ignore fallback error and report main response message below
        }
      }

      setStatus("error");
      setErrorMessage(
        data.message || "Failed to send message via API. Please email smit.sk.connect@gmail.com directly."
      );
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please email smit.sk.connect@gmail.com directly or use the link below.");
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "submitting":
        return "SENDING...";
      case "success":
        return "SENT ✓";
      case "error":
        return "TRY AGAIN ↗";
      case "idle":
      default:
        return "SEND INQUIRY ↗";
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#111111] flex flex-col justify-between overflow-x-clip select-none">
      <Navbar />

      <main className="w-full">
        {/* Full-Width Dark Atmospheric Hero Section matching reference image */}
        <section className="w-full bg-[#0B0C10] text-white py-16 sm:py-20 px-6 md:px-12 lg:px-16 relative overflow-hidden select-none border-b border-white/10">
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Left Column (Cols 1-6): High Contrast Muted & Orange Typography */}
            <div className="lg:col-span-6 space-y-6 z-20">
              <div className="flex items-center gap-3 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#F14E08]">
                <span>GET IN TOUCH</span>
              </div>

              <h1 className="font-brooks-display text-[44px] sm:text-6xl md:text-8xl lg:text-[95px] xl:text-[110px] leading-[0.88] tracking-tighter uppercase font-black">
                <span className="text-white/30">LET&apos;S</span><br />
                <span className="text-[#F14E08]">BUILD</span><br />
                <span className="text-white/30">SOMETHING</span><br />
                <span className="text-[#F14E08]">GREAT.</span>
              </h1>

              <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium pt-2">
                Have a project in mind? Tell me what you&apos;re building, what you&apos;re trying to achieve, and when you&apos;d like to launch. I&apos;ll get back to you with the next steps.
              </p>

              {/* Decorative Orange Swoosh Line */}
              <div className="pt-2">
                <svg className="w-44 h-5 text-[#F14E08]" viewBox="0 0 200 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 15 Q 100 0 195 12" />
                </svg>
              </div>
            </div>

            {/* Right Column (Cols 7-12): Seamless Smoke-Faded Desk Image */}
            <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
                <Image
                  src="/image.png"
                  alt="Smit Khatri Contact Hero Image"
                  fill
                  className="object-cover object-right group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Left & Top Smoke Gradient Mask Overlay into #0B0C10 */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0B0C10] via-[#0B0C10]/40 to-transparent w-full h-full" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0B0C10]/60 via-transparent to-transparent w-full h-full" />
              </div>
            </div>

          </div>

          {/* Atmospheric Orange Radial Glow */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F14E08]/15 rounded-full blur-[150px] pointer-events-none" />
        </section>

        {/* Content Container for Form & Direct Contact */}
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (Cols 1-7): Reflective Card Project Inquiry Form */}
            <div className="lg:col-span-7">
              <ReflectiveCard
                overlayColor="rgba(11, 12, 16, 0.88)"
                blurStrength={10}
                glassDistortion={15}
                metalness={0.8}
                roughness={0.4}
                displacementStrength={25}
                noiseScale={1.5}
                specularConstant={2.0}
                grayscale={0.5}
                color="#ffffff"
                className="shadow-2xl rounded-3xl"
              >
                <form onSubmit={handleSubmit} className="space-y-6 text-white">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <h2 className="text-xl font-black uppercase tracking-wider text-white">
                      PROJECT INQUIRY FORM
                    </h2>
                  </div>

                  {/* Honeypot Field (Spam Protection) */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="_honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData._honeypot}
                      onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-300 block">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => {
                          if (status !== "idle") setStatus("idle");
                          setFormData({ ...formData, name: e.target.value });
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-medium text-white placeholder-white/40 focus:outline-none focus:border-[#F14E08] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-300 block">
                        YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={255}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          if (status !== "idle") setStatus("idle");
                          setFormData({ ...formData, email: e.target.value });
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-medium text-white placeholder-white/40 focus:outline-none focus:border-[#F14E08] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-300 block">
                        COMPANY / BUSINESS
                      </label>
                      <input
                        type="text"
                        maxLength={150}
                        placeholder="Acme Inc."
                        value={formData.company}
                        onChange={(e) => {
                          if (status !== "idle") setStatus("idle");
                          setFormData({ ...formData, company: e.target.value });
                        }}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-medium text-white placeholder-white/40 focus:outline-none focus:border-[#F14E08] transition-colors"
                      />
                    </div>

                    {/* Project Type */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-300 block">
                        PROJECT TYPE
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => {
                          if (status !== "idle") setStatus("idle");
                          setFormData({ ...formData, projectType: e.target.value });
                        }}
                        className="w-full bg-[#0B0C10] border border-white/20 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-[#F14E08] transition-colors"
                      >
                        <option>Web Development</option>
                        <option>Web Application</option>
                        <option>Full-Stack System</option>
                        <option>Custom Digital Experience</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-300 block">
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={5}
                      maxLength={5000}
                      placeholder="Tell me about your project goals, features, and target launch timeline..."
                      value={formData.message}
                      onChange={(e) => {
                        if (status !== "idle") setStatus("idle");
                        setFormData({ ...formData, message: e.target.value });
                      }}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm font-medium text-white placeholder-white/40 focus:outline-none focus:border-[#F14E08] transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Accessible Feedback Alert Message */}
                  {status === "success" && (
                    <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-3 animate-fade-in" role="status">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/40">✓</span>
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-bold space-y-2 animate-fade-in" role="alert">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 border border-rose-500/40">!</span>
                        <span>{errorMessage}</span>
                      </div>
                      <div className="pt-2 border-t border-rose-500/20 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-normal text-rose-200/80">Need to send right away?</span>
                        <a
                          href={`mailto:smit.sk.connect@gmail.com?subject=${encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`)}`}
                          className="inline-flex items-center gap-1.5 text-xs text-white bg-[#F14E08] hover:bg-white hover:text-black px-3 py-1.5 rounded-lg transition-colors font-extrabold"
                        >
                          <span>✉ Open Email Client Direct</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F14E08] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-md group border border-white/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{getButtonText()}</span>
                  </button>
                </form>
              </ReflectiveCard>
            </div>

            {/* Right Column (Cols 8-12): Direct Contact Details & Status */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-[#0B0C10] text-white rounded-3xl p-8 border border-white/10 space-y-6 shadow-xl">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">DIRECT CONTACT</span>
                  <h3 className="text-2xl font-extrabold text-white uppercase tracking-wide">
                    SAY HELLO
                  </h3>
                </div>

                <div className="space-y-4 text-sm font-medium border-t border-white/10 pt-4">
                  <div>
                    <div className="text-[10px] uppercase font-black text-white/50 tracking-widest mb-1">EMAIL</div>
                    <Link href="mailto:smit.sk.connect@gmail.com" className="text-white hover:text-[#F14E08] font-bold text-sm sm:text-base transition-colors underline decoration-2 underline-offset-4 break-all">
                      smit.sk.connect@gmail.com
                    </Link>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-black text-white/50 tracking-widest mb-1">LINKEDIN</div>
                    <Link href="https://www.linkedin.com/in/smit-khatri-631912341/" target="_blank" className="text-white hover:text-[#F14E08] font-bold transition-colors">
                      smit-khatri-631912341 ↗
                    </Link>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-black text-white/50 tracking-widest mb-1">GITHUB</div>
                    <Link href="https://github.com/smit-007-sk" target="_blank" className="text-white hover:text-[#F14E08] font-bold transition-colors">
                      smit-007-sk ↗
                    </Link>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-black text-white/50 tracking-widest mb-1">LOCATION</div>
                    <div className="text-white font-bold">Gujarat, India</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="inline-flex items-center gap-3 text-xs font-bold text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                    <span className="tracking-widest leading-relaxed">AVAILABLE FOR FREELANCE PROJECTS &amp; COLLABORATIONS.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
