import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projectsData } from "@/data/projects";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const nextProject = projectsData.find((p) => p.slug === project.nextSlug) || projectsData[0];

  return (
    <div className="min-h-screen w-full bg-[#F4F1EA] text-[#111111] flex flex-col justify-between overflow-x-clip select-none">
      <Navbar />

      <main className="w-full py-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto space-y-16">
          
          {/* HERO */}
          <section className="space-y-8 pt-6 border-b border-black/10 pb-16">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#F14E08] hover:text-[#111111] transition-colors"
              >
                <span>← BACK TO ALL PROJECTS</span>
              </Link>

              <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase text-neutral-500">
                <span>PROJECT {project.id}</span>
                <span>•</span>
                <span>{project.year}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="font-brooks-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.88] tracking-tighter text-[#111111]">
                {project.title}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-[#F14E08] tracking-wide">
                {project.subtitle}
              </p>
            </div>

            {/* Project Meta Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-black/10">
              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-neutral-500 mb-1">
                  CATEGORY
                </div>
                <div className="text-sm font-extrabold text-[#111111]">
                  {project.category}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-neutral-500 mb-1">
                  ROLE
                </div>
                <div className="text-sm font-extrabold text-[#111111]">
                  {project.role}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-neutral-500 mb-1">
                  YEAR
                </div>
                <div className="text-sm font-extrabold text-[#111111]">
                  {project.year}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-black tracking-widest text-neutral-500 mb-1">
                  DEMO LINK
                </div>
                {project.liveUrl ? (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="text-sm font-extrabold text-[#F14E08] hover:underline inline-flex items-center gap-1"
                  >
                    <span>VISIT SITE</span>
                    <span>↗</span>
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-neutral-500">Internal Project</span>
                )}
              </div>
            </div>

            {/* Main Visual Showcase Frame: Fully Bright, 100% Visible & Crisp */}
            <div className="w-full bg-[#1A1D24] text-white rounded-3xl overflow-hidden shadow-2xl border border-black/15 mt-8 group">
              {/* Window Header Bar */}
              <div className="bg-[#111318] px-5 py-3.5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                  <span className="ml-3 text-[11px] font-mono text-white/50 hidden sm:inline-block">
                    {project.title} — Live Showcase
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/15">
                    {project.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#F14E08] bg-[#F14E08]/15 px-3 py-1 rounded-full border border-[#F14E08]/30">
                    PRODUCTION READY ✓
                  </span>
                </div>
              </div>

              {/* Full-Fidelity 100% Bright Showcase Image */}
              <div className="relative w-full aspect-[16/9] bg-[#0E1015]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-contain sm:object-cover object-top w-full h-full group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                />
              </div>

              {/* Window Footer Info Strip */}
              <div className="bg-[#111318] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 text-xs text-white/70">
                <div className="font-mono flex items-center gap-2">
                  <span className="text-[#F14E08] font-bold">TECH:</span>
                  <span className="text-white/90 font-semibold">{project.technologies.join(" • ")}</span>
                </div>
                <div className="text-[11px] text-white/50 font-medium">
                  {project.subtitle}
                </div>
              </div>
            </div>
          </section>

          {/* OVERVIEW */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-black/10 pb-16">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">OVERVIEW</span>
              <h2 className="font-brooks-display text-3xl sm:text-4xl font-black uppercase">
                THE PROJECT
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-neutral-800 text-base sm:text-lg leading-relaxed font-medium">
                {project.overview}
              </p>
            </div>
          </section>

          {/* THE CHALLENGE */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-black/10 pb-16">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">THE CHALLENGE</span>
              <h2 className="font-brooks-display text-3xl sm:text-4xl font-black uppercase">
                THE PROBLEM
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-neutral-800 text-base sm:text-lg leading-relaxed font-medium">
                {project.challenge}
              </p>
            </div>
          </section>

          {/* THE APPROACH */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-black/10 pb-16">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">THE APPROACH</span>
              <h2 className="font-brooks-display text-3xl sm:text-4xl font-black uppercase">
                THE SOLUTION
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-neutral-800 text-base sm:text-lg leading-relaxed font-medium">
                {project.approach}
              </p>
            </div>
          </section>

          {/* KEY FEATURES */}
          <section className="space-y-8 border-b border-black/10 pb-16">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">KEY FEATURES</span>
              <h2 className="font-brooks-display text-3xl sm:text-4xl font-black uppercase">
                HIGHLIGHTED CAPABILITIES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {project.features.map((feature, idx) => (
                <div key={idx} className="bg-white/70 p-6 rounded-2xl border border-black/5 flex items-start gap-4 shadow-sm">
                  <span className="text-[#F14E08] font-bold text-lg select-none pt-0.5">✱</span>
                  <p className="text-sm font-extrabold text-[#111111] leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* TECHNOLOGY */}
          <section className="space-y-6 border-b border-black/10 pb-16">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">TECHNOLOGY</span>
              <h2 className="font-brooks-display text-3xl sm:text-4xl font-black uppercase">
                TECH STACK UTILIZED
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-[#111111] text-white text-xs font-bold uppercase px-4 py-2 rounded-full shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* NEXT PROJECT BANNER */}
          <section className="bg-[#0B0C10] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/10 group">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#F14E08]">NEXT CASE STUDY</span>
              <h2 className="font-brooks-display text-3xl sm:text-5xl font-black uppercase leading-tight group-hover:text-[#F14E08] transition-colors">
                {nextProject.title}
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm font-medium">
                {nextProject.subtitle}
              </p>
            </div>

            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 bg-[#F14E08] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all shadow-lg shrink-0"
            >
              <span>NEXT PROJECT →</span>
            </Link>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
