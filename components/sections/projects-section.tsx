"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, FolderKanban, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import {
  type Project,
  type ProjectCategory,
  projectCategories,
  projects,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectsSectionProps = {
  onSelectProject: (project: Project) => void;
};

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>("All");

  const filteredProjects = useMemo(
    () =>
      projectCategory === "All"
        ? projects
        : projects.filter((project) => project.category === projectCategory),
    [projectCategory],
  );

  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const regularProjects = filteredProjects.filter((project) => !project.featured);

  return (
    <section className="section-shell relative py-28 md:py-32" id="projects">
      {/* Background elements */}
      <div className="section-grid-bg opacity-25" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb section-orb-alt absolute left-[-120px] top-[8%] h-[400px] w-[400px] bg-accent-purple/14"
          style={{ animationDuration: "18s" }}
        />
        <div
          className="section-orb absolute right-[-80px] bottom-[8%] h-[360px] w-[360px] bg-accent-cyan/13"
          style={{ animationDelay: "2.5s", animationDuration: "17s" }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="WHAT I&apos;VE BUILT"
          title="Featured Projects"
          subtitle="A curated selection of projects showcasing my engineering approach, design sensibility, and ability to ship premium products."
        />

        {/* Category Filters */}
        <div className="mt-14">
          <div className="flex flex-wrap justify-center gap-2.5">
            {projectCategories.map((category) => (
              <button
                key={category}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-[13px] font-semibold transition-all duration-300 interactive-press focus-ring",
                  projectCategory === category
                    ? "accent-gradient-animated glow-ring text-white"
                    : "glass-panel text-text-secondary hover:text-white border-white/[0.08] hover:border-white/[0.16]",
                )}
                onClick={() => setProjectCategory(category)}
                type="button"
              >
                <FolderKanban className={cn("h-4 w-4 transition-transform duration-300", projectCategory === category && "scale-110")} />
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mt-16 space-y-10">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl accent-gradient-animated text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="font-heading text-[17px] font-bold text-white">Selected Work</p>
                <p className="text-[11px] text-text-muted">Premium showcase projects</p>
              </div>
            </div>
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard
                key={project.id}
                index={index}
                onOpen={() => onSelectProject(project)}
                project={project}
              />
            ))}
          </div>
        )}

        {/* Regular Projects Grid */}
        {regularProjects.length > 0 ? (
          <div className="mt-20">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-text-secondary">
                <FolderKanban className="h-4 w-4" />
              </span>
              <div>
                <p className="font-heading text-[17px] font-bold text-white">More Projects</p>
                <p className="text-[11px] text-text-muted">Additional work &amp; experiments</p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {regularProjects.map((project, index) => (
                <RegularProjectCard
                  key={project.id}
                  index={index}
                  onOpen={() => onSelectProject(project)}
                  project={project}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FeaturedProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  const hasLiveUrl =
    project.liveUrl &&
    project.liveUrl !== "#" &&
    !project.liveUrl.includes("demo.com") &&
    !project.liveUrl.includes("yourportfolio.com");

  const isReversed = index % 2 === 1;

  return (
    <motion.article
      className="border-gradient glass-panel glass-hover group relative overflow-hidden rounded-[28px] border border-white/[0.08] transition-all duration-600"
      initial={{ opacity: 0, y: 56 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.14 }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {/* Project color wash */}
      <div
        className="pointer-events-none absolute -inset-20 opacity-0 blur-[80px] transition-opacity duration-[700ms] ease-out group-hover:opacity-30"
        style={{ backgroundColor: project.color }}
      />

      <div
        className={cn(
          "grid w-full gap-0 text-left",
          "lg:grid-cols-[1.25fr_1fr]",
          isReversed && "lg:[direction:rtl]",
        )}
      >
        {/* Image Area */}
        <button
          className="group/img relative min-h-[320px] overflow-hidden bg-black/50 focus-ring sm:min-h-[380px] lg:min-h-[440px]"
          onClick={onOpen}
          type="button"
        >
          {/* Frame border accent */}
          <div className={cn(
            "pointer-events-none absolute inset-0 z-10 border-[1px] border-transparent transition-all duration-500 group-hover/img:border-white/[0.08]",
            "lg:border-r lg:border-white/[0.06]",
            isReversed && "lg:border-r-0 lg:border-l",
          )} />

          <Image
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover/img:scale-[1.08]"
            height={960}
            src={project.image}
            width={1400}
          />

          {/* Layered gradients for depth */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/img:opacity-100" />

          {/* Top-left category */}
          <div className="absolute left-5 top-5 z-20">
            <span className="glass-panel-strong inline-flex items-center gap-2 rounded-full border-white/[0.12] px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-gradient backdrop-blur-xl">
              {project.category}
            </span>
          </div>

          {/* Top-right project number */}
          <div className="absolute right-5 top-5 z-20">
            <span className="glass-panel-strong inline-flex items-center gap-1 rounded-full border-white/[0.12] px-3 py-1.5 backdrop-blur-xl">
              <span className="font-heading text-[11px] font-bold text-gradient">
                {String(project.id).padStart(2, "0")}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="text-[9px] font-semibold uppercase tracking-widest text-text-muted">PRJ</span>
            </span>
          </div>

          {/* View overlay button */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-500 group-hover/img:opacity-100">
            <div className="glass-panel-strong flex items-center gap-2.5 rounded-full border-white/[0.18] px-5 py-3 backdrop-blur-xl">
              <span className="text-[13px] font-semibold text-white">View Details</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full accent-gradient text-white shadow-md">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 z-10 h-[3px] origin-left scale-x-0 accent-gradient-animated transition-transform duration-700 ease-out group-hover/img:scale-x-100" />
        </button>

        {/* Info Panel */}
        <div className={cn(
          "relative flex flex-col justify-center p-7 sm:p-9 lg:p-10",
          isReversed && "lg:[direction:ltr]",
        )}>
          {/* Large decorative number */}
          <span className="pointer-events-none absolute right-6 top-4 select-none font-heading text-[88px] font-bold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-accent-cyan/[0.12] sm:text-[104px] lg:right-8 lg:top-6">
            {String(project.id).padStart(2, "0")}
          </span>

          <button
            className="relative z-10 w-full text-left focus-ring rounded-xl"
            onClick={onOpen}
            type="button"
          >
            {/* Status badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                Featured Project
              </span>
            </div>

            <h3 className="font-heading text-[26px] font-bold leading-[1.15] tracking-tight text-white transition-colors duration-300 group-hover:text-accent-cyan sm:text-[30px] md:text-[34px]">
              {project.title}
            </h3>

            <p className="mt-5 text-[14px] leading-[1.85] text-text-secondary sm:text-[15px]">
              {project.description}
            </p>

            {/* Tech stack badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="glass-panel inline-flex items-center gap-1.5 rounded-xl border-white/[0.08] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-text-secondary transition-all duration-300 group-hover:border-white/[0.16] group-hover:text-white"
                >
                  <span className="h-1 w-1 rounded-full accent-gradient" />
                  {tag}
                </span>
              ))}
            </div>
          </button>

          {/* Action Buttons */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
            {hasLiveUrl ? (
              <a
                href={project.liveUrl}
                rel="noreferrer noopener"
                target="_blank"
                className="btn-primary glow-ring inline-flex items-center gap-2.5 overflow-hidden rounded-2xl accent-gradient-animated px-6 py-3.5 text-[13px] font-semibold text-white interactive-press focus-ring"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Live Project
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpen}
                className="btn-primary glow-ring inline-flex items-center gap-2.5 overflow-hidden rounded-2xl accent-gradient-animated px-6 py-3.5 text-[13px] font-semibold text-white interactive-press focus-ring"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  View Demo
                  <ExternalLink className="h-4 w-4" />
                </span>
              </button>
            )}
            <a
              href={project.githubUrl}
              rel="noreferrer noopener"
              target="_blank"
              className="glass-panel group/gh inline-flex items-center gap-2.5 rounded-2xl border-white/[0.1] px-6 py-3.5 text-[13px] font-semibold text-white transition-all duration-300 hover:border-accent-purple/40 hover:bg-white/[0.04] interactive-press focus-ring"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4 transition-colors duration-300 group-hover/gh:text-accent-purple" />
              Source Code
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function RegularProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  return (
    <motion.article
      className="group/card"
      initial={{ opacity: 0, y: 44 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.09 }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <button
        className="border-gradient glass-panel glass-hover focus-ring relative flex h-full w-full flex-col overflow-hidden rounded-[22px] border border-white/[0.08] text-left transition-all duration-[450ms] hover:-translate-y-2 focus-visible:outline-none"
        onClick={onOpen}
        type="button"
      >
        {/* Colored ambient glow */}
        <div
          className="pointer-events-none absolute -inset-10 opacity-0 blur-[50px] transition-all duration-[600ms] ease-out group-hover/card:opacity-35"
          style={{ backgroundColor: project.color }}
        />

        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-black/45 sm:h-56">
          <div className="pointer-events-none absolute inset-0 z-10 border-b border-white/[0.06]" />
          <Image
            alt={project.title}
            className="h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover/card:scale-110"
            height={480}
            src={project.image}
            width={720}
          />
          {/* Overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-purple/[0.08] via-transparent to-accent-cyan/[0.06] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

          {/* Category badge */}
          <span className="glass-panel-strong absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border-white/[0.1] px-3 py-1.5 backdrop-blur-xl">
            <span className="h-1 w-1 rounded-full accent-gradient" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gradient">
              {project.category}
            </span>
          </span>

          {/* Hover view badge */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-end p-5 opacity-0 transition-all duration-500 ease-out group-hover/card:opacity-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl accent-gradient-animated text-white shadow-lg">
              <ArrowUpRight className="h-4.5 w-4.5" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col p-6">
          <h3 className="font-heading text-[19px] font-bold leading-snug tracking-tight text-white transition-colors duration-300 group-hover/card:text-accent-cyan sm:text-xl">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-[13px] leading-[1.75] text-text-secondary">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-lg bg-white/[0.04] border border-white/[0.05] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary transition-colors duration-300 group-hover/card:text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action icons */}
          <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/80 transition-all duration-300 group-hover/card:border-accent-cyan/40 group-hover/card:text-accent-cyan">
                <ExternalLink className="h-4 w-4" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/80 transition-all duration-300 group-hover/card:border-accent-purple/40 group-hover/card:text-accent-purple">
                <Github className="h-4 w-4" />
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-hover/card:text-white">
              View
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
