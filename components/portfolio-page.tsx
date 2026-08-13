"use client";

import { useEffect, useRef, useState } from "react";
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
  const activeSectionRef = useRef("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));

    const handleScroll = () => {
      let currentSection = activeSectionRef.current;
      let minDistance = Infinity;

      // Focus point: 30% down the viewport
      const focusPoint = window.scrollY + window.innerHeight * 0.3;

      let foundContaining = false;
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (focusPoint >= sectionTop && focusPoint <= sectionBottom) {
          currentSection = section.id;
          foundContaining = true;
        }
      });

      if (!foundContaining) {
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          const distance = Math.min(
            Math.abs(focusPoint - sectionTop),
            Math.abs(focusPoint - sectionBottom)
          );
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section.id;
          }
        });
      }

      // Bottom-of-page edge case — last nav item is "contact"
      if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50) {
        currentSection = "contact";
      }

      if (currentSection && currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
        setActiveSection(currentSection);
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", scrollListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Global ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="section-orb left-[-180px] top-[40px] h-[500px] w-[500px] bg-accent-purple/22" />
        <div
          className="section-orb section-orb-alt right-[-100px] top-[200px] h-[420px] w-[420px] bg-accent-cyan/18"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="section-orb left-[30%] top-[60%] h-[550px] w-[550px] -translate-x-1/2 bg-accent-blue/12"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="section-orb section-orb-alt right-[20%] bottom-[-100px] h-[480px] w-[480px] bg-accent-pink/10"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10">
        <Header
          activeSection={activeSection}
          onNavClick={(id) => {
            activeSectionRef.current = id;
            setActiveSection(id);
          }}
        />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <ExperienceSection />
        <EducationSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>

      <ProjectModal onClose={() => setSelectedProject(null)} project={selectedProject} />
    </main>
  );
}
