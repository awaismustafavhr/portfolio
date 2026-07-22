"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/sections/header";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";
import { ProjectModal } from "@/components/ui/project-modal";
import type { Project } from "@/data/projects";

export function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-15% 0px -15% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative overflow-x-hidden min-h-screen bg-background">
      {/* Background radial gradient orbs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1200px]">
        <div className="section-orb left-[-120px] top-[80px] h-[400px] w-[400px] bg-accent-purple/20" />
        <div
          className="section-orb right-[-40px] top-[140px] h-[300px] w-[300px] bg-accent-cyan/15"
          style={{ animationDelay: "1.5s", filter: "blur(78px)" }}
        />
        <div
          className="section-orb bottom-[120px] left-1/2 h-[500px] w-[500px] -translate-x-1/2 bg-accent-pink/10"
          style={{ animationDelay: "2s", filter: "blur(92px)" }}
        />
      </div>

      <Header activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection onSelectProject={setSelectedProject} />
      <ExperienceSection />
      <EducationSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      <ProjectModal onClose={() => setSelectedProject(null)} project={selectedProject} />
    </main>
  );
}
