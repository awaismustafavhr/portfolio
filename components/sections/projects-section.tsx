"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
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
    <section className="section-shell bg-background-secondary py-28" id="projects">
      <div className="container-shell">
        <SectionHeading
          eyebrow="WHAT I'VE BUILT"
          title="Featured Projects"
          subtitle="A selection of projects that showcase my skills and approach to building premium products."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {projectCategories.map((category) => (
            <button
              key={category}
              className={cn(
                "glass-panel rounded-full px-6 py-3 text-sm transition-all duration-300 interactive-press",
                projectCategory === category
                  ? "accent-gradient glow-ring text-white font-medium shadow-md"
                  : "text-text-secondary hover:bg-white/10 hover:text-white border border-white/10",
              )}
              onClick={() => setProjectCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-14 space-y-8">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              index={index}
              onOpen={() => onSelectProject(project)}
              project={project}
            />
          ))}
        </div>

        {regularProjects.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {regularProjects.map((project, index) => (
              <RegularProjectCard
                key={project.id}
                index={index}
                onOpen={() => onSelectProject(project)}
                project={project}
              />
            ))}
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
  return (
    <motion.article
      className="glass-panel group overflow-hidden border border-white/10 rounded-3xl"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <button
        className="grid w-full gap-0 text-left lg:grid-cols-[1.4fr_1fr] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-3xl"
        onClick={onOpen}
        type="button"
      >
        <div className="relative min-h-[320px] overflow-hidden">
          <Image
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            height={960}
            src={project.image}
            width={1400}
          />
          <div className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-hover:opacity-10" />
        </div>
        <div className="relative flex flex-col justify-center p-8 md:p-12">
          <span className="absolute right-8 top-6 font-heading text-7xl font-semibold text-white/10 pointer-events-none">
            {String(project.id).padStart(2, "0")}
          </span>
          <span className="glass-panel w-fit rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-gradient border border-white/10">
            {project.category}
          </span>
          <h3 className="mt-6 font-heading text-3xl font-semibold text-white group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-text-secondary">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="glass-panel rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-text-secondary border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="accent-gradient inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white font-medium shadow-md">
              Live Demo <ExternalLink className="h-4 w-4" />
            </span>
            <span className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white border border-white/10">
              Source Code <Github className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
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
      className="group"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <button
        className="glass-panel glass-hover relative flex h-full w-full flex-col overflow-hidden text-left border border-white/10 rounded-2xl transition duration-300 hover:-translate-y-2 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        onClick={onOpen}
        type="button"
      >
        <div
          className="absolute inset-0 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
          style={{ backgroundColor: project.color }}
        />
        <div className="relative h-52 overflow-hidden">
          <Image
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            height={480}
            src={project.image}
            width={720}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <span className="glass-panel absolute left-4 top-4 rounded-full px-3 py-2 text-xs uppercase tracking-[0.2em] text-gradient border border-white/10">
            {project.category}
          </span>
        </div>
        <div className="relative flex flex-1 flex-col p-6">
          <h3 className="font-heading text-xl font-semibold text-white transition duration-300 group-hover:text-transparent group-hover:[background:linear-gradient(135deg,_#7C3AED_0%,_#06B6D4_50%,_#EC4899_100%)] group-hover:[-webkit-background-clip:text]">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-sm leading-7 text-text-secondary">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="glass-panel rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-text-secondary border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <span className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white">
              <ExternalLink className="h-4 w-4" />
            </span>
            <span className="glass-panel inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white">
              <Github className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
