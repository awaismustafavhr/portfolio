"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Cloud,
  Code2,
  Cpu,
  Database,
  FileCode,
  GitBranch,
  Globe,
  Layout,
  Monitor,
  Network,
  Palette,
  Send,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Zap,
  Gauge,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import {
  type Skill,
  type SkillCategory,
  marqueeTechnologies,
  skillCategories,
  skills,
} from "@/data/skills";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  FileCode: <FileCode className="h-5 w-5" />,
  Layout: <Layout className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
  Server: <Server className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Network: <Network className="h-5 w-5" />,
  GitBranch: <GitBranch className="h-5 w-5" />,
  Cloud: <Cloud className="h-5 w-5" />,
  Terminal: <Terminal className="h-5 w-5" />,
  Send: <Send className="h-5 w-5" />,
  Palette: <Palette className="h-5 w-5" />,
  Smartphone: <Smartphone className="h-5 w-5" />,
  Monitor: <Monitor className="h-5 w-5" />,
};

const categoryIconMap: Record<SkillCategory, React.ReactNode> = {
  All: <Sparkles className="h-3.5 w-3.5" />,
  Frontend: <Layout className="h-3.5 w-3.5" />,
  Backend: <Server className="h-3.5 w-3.5" />,
  "Tools & DevOps": <GitBranch className="h-3.5 w-3.5" />,
  Design: <Palette className="h-3.5 w-3.5" />,
};

export function SkillsSection() {
  const [skillCategory, setSkillCategory] = useState<SkillCategory>("All");
  const skillsRef = useRef<HTMLElement | null>(null);
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.15 });

  const filteredSkills = useMemo(
    () =>
      skillCategory === "All"
        ? skills
        : skills.filter((skill) => skill.category === skillCategory),
    [skillCategory],
  );

  const getCategoryCount = (category: SkillCategory) => {
    if (category === "All") return skills.length;
    return skills.filter((s) => s.category === category).length;
  };

  return (
    <section className="section-shell relative py-28 md:py-32" id="skills" ref={skillsRef}>
      {/* Background elements */}
      <div className="section-grid-bg opacity-25" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb absolute right-[-100px] top-[10%] h-[380px] w-[380px] bg-accent-cyan/15"
          style={{ animationDuration: "17s" }}
        />
        <div
          className="section-orb section-orb-alt absolute left-[-80px] bottom-[5%] h-[340px] w-[340px] bg-accent-purple/16"
          style={{ animationDelay: "3s", animationDuration: "19s" }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="TECHNICAL EXPERTISE"
          title="Skills & Technologies"
          subtitle="Modern web technologies, frameworks, and engineering practices I use to craft high-performance applications with precision."
        />

        {/* Category Filter Tabs */}
        <div className="mt-16 flex w-full justify-center px-4">
          <div className="glass-panel inline-flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-2.5 rounded-[1.25rem] border border-white/[0.08] p-2.5 shadow-lg">
            {skillCategories.map((category) => {
              const count = getCategoryCount(category);
              const isActive = skillCategory === category;
              const icon = categoryIconMap[category] ?? <Sparkles className="h-4 w-4" />;

              return (
                <button
                  key={category}
                  className={cn(
                    "group relative inline-flex h-11 items-center justify-center gap-2.5 rounded-xl px-4 sm:px-5 text-[11px] sm:text-[11.5px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 interactive-press focus-ring whitespace-nowrap",
                    isActive
                      ? "accent-gradient-animated text-white shadow-md shadow-accent-purple/20"
                      : "text-text-secondary hover:bg-white/[0.05] hover:text-white",
                  )}
                  onClick={() => setSkillCategory(category)}
                  type="button"
                >
                  <span className={cn("transition-transform duration-300", isActive && "scale-110")}>
                    {icon}
                  </span>
                  <span>{category}</span>
                  <span
                    className={cn(
                      "flex h-6 min-w-[24px] items-center justify-center rounded-lg px-2 text-[10px] font-bold transition-all",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/[0.08] text-text-muted group-hover:bg-white/[0.14] group-hover:text-white",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={skillCategory}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            exit={{ opacity: 0, y: -14 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={`${skillCategory}-${skill.name}`}
                index={index}
                inView={skillsInView}
                skill={skill}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Marquee Banner */}
        <div className="mt-24 relative">
          <div className="glass-panel relative overflow-hidden rounded-3xl border-white/[0.08] p-6 sm:p-7">
            {/* Top accent line */}
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
            <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-accent-purple/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-accent-cyan/10 blur-3xl" />

            <div className="relative mb-5 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="accent-gradient-animated flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md">
                  <Gauge className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-[15px] font-bold text-white">Tech Stack Overview</p>
                  <p className="text-[11px] text-text-muted">Core tools &amp; technologies I work with daily</p>
                </div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                {["Expert", "Advanced", "Proficient"].map((level) => (
                  <span key={level} className="flex items-center gap-1.5 rounded-full border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      level === "Expert" && "bg-emerald-400",
                      level === "Advanced" && "bg-accent-cyan",
                      level === "Proficient" && "bg-accent-purple",
                    )} />
                    {level}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative space-y-3">
              {/* Soft edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0f0f1a] via-[#0f0f1a]/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0f0f1a] via-[#0f0f1a]/80 to-transparent" />
              <MarqueeRow items={marqueeTechnologies} reverse={false} />
              <MarqueeRow items={[...marqueeTechnologies].reverse()} reverse />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  inView,
  index,
}: {
  skill: Skill;
  inView: boolean;
  index: number;
}) {
  const iconComponent = iconMap[skill.icon] ?? <Code2 className="h-5 w-5" />;

  const getBadgeColor = (proficiency: Skill["proficiency"]) => {
    switch (proficiency) {
      case "Expert":
        return "border-emerald-400/25 bg-emerald-400/[0.09] text-emerald-400 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]";
      case "Advanced":
        return "border-accent-cyan/25 bg-accent-cyan/[0.09] text-accent-cyan shadow-[0_0_0_1px_rgba(6,182,212,0.08)]";
      default:
        return "border-accent-purple/25 bg-accent-purple/[0.09] text-accent-purple shadow-[0_0_0_1px_rgba(124,58,237,0.08)]";
    }
  };

  return (
    <motion.article
      className="border-gradient glass-panel glass-hover group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/20 hover:shadow-xl hover:shadow-accent-cyan/5"
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {/* Ambient background gradient */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.05),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Decorative corner dots */}
      <span className="pointer-events-none absolute right-4 top-4 flex gap-1 opacity-40 transition-opacity duration-300 group-hover:opacity-80">
        <span className="h-1 w-1 rounded-full bg-white/25" />
        <span className="h-1 w-1 rounded-full bg-white/15" />
        <span className="h-1 w-1 rounded-full bg-white/8" />
      </span>

      <div className="relative flex flex-col h-full gap-5">
        {/* Header: Icon + Title + Proficiency */}
        <div className="flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-xl accent-gradient opacity-0 blur transition-opacity duration-400 group-hover:opacity-35" />
              <div className="accent-gradient-animated relative flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:-rotate-1">
                {iconComponent}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-[15px] font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-accent-cyan sm:text-base">
                {skill.name}
              </h3>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full accent-gradient" />
                <span className="text-[10.5px] font-medium tracking-wide text-text-muted">{skill.category}</span>
              </div>
            </div>
          </div>

          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shrink-0",
              getBadgeColor(skill.proficiency),
            )}
          >
            {skill.proficiency}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] leading-relaxed text-text-secondary font-normal line-clamp-2 sm:line-clamp-none grow">
          {skill.description}
        </p>

        {/* Progress & Percentage */}
        <div className="space-y-2.5 shrink-0 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-text-muted">
              Proficiency
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[13px] font-bold text-gradient sm:text-sm">{skill.level}</span>
              <span className="text-[11px] font-semibold text-text-muted">%</span>
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {/* Track gradient */}
            <motion.div
              className="relative h-full rounded-full"
              initial={{ width: 0 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              viewport={{ once: true }}
              whileInView={{ width: inView ? `${skill.level}%` : 0 }}
            >
              <div className="absolute inset-0 rounded-full accent-gradient-animated" />
              {/* Shine effect */}
              <div
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.5s linear infinite",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse: boolean }) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-1">
      <div
        className={cn(
          "flex min-w-max gap-3",
          reverse ? "animate-marqueeRight" : "animate-marqueeLeft",
        )}
        style={{ animationDuration: reverse ? "36s" : "30s" }}
      >
        {duplicated.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="group glass-panel flex h-[42px] items-center gap-3 rounded-xl border-white/[0.08] px-4.5 text-xs transition-all duration-300 hover:border-accent-cyan/30 hover:bg-white/[0.04]"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg accent-gradient-animated text-white shadow-sm">
              <span className="font-heading text-[10px] font-bold">
                {item.slice(0, 2).toUpperCase()}
              </span>
            </span>
            <span className="font-medium text-white/90 transition-colors group-hover:text-white">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
