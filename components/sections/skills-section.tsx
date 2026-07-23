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
  Network,
  Palette,
  Send,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Zap,
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
    <section className="section-shell bg-background-secondary/60 py-28" id="skills" ref={skillsRef}>
      <div className="container-shell">
        <SectionHeading
          eyebrow="TECHNICAL EXPERTISE"
          title="Skills & Technologies"
          subtitle="Modern web technologies, frameworks, and engineering practices I use to craft high-performance applications."
        />

        {/* ── Category Filter Tabs ── */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {skillCategories.map((category) => {
            const count = getCategoryCount(category);
            const isActive = skillCategory === category;

            return (
              <button
                key={category}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 interactive-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan",
                  isActive
                    ? "accent-gradient glow-ring text-white shadow-lg"
                    : "glass-panel text-text-secondary hover:border-white/20 hover:text-white border border-white/10",
                )}
                onClick={() => setSkillCategory(category)}
                type="button"
              >
                <span>{category}</span>
                <span
                  className={cn(
                    "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-colors",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-text-muted group-hover:text-white",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Skills Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={skillCategory}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
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

        {/* ── Marquee Animation ── */}
        <div className="mt-20 space-y-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-md">
          <div className="mb-2 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-text-muted">
              Tech Stack Overview
            </span>
          </div>
          <MarqueeRow items={marqueeTechnologies} reverse={false} />
          <MarqueeRow items={[...marqueeTechnologies].reverse()} reverse />
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
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "Advanced":
        return "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan";
      default:
        return "border-accent-purple/30 bg-accent-purple/10 text-accent-purple";
    }
  };

  return (
    <motion.article
      className="glass-panel glass-hover group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-xl hover:shadow-accent-cyan/5"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {/* Background ambient glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-col justify-between h-full gap-4">
        {/* Header: Icon + Title + Proficiency Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              {iconComponent}
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-white transition-colors group-hover:text-accent-cyan">
                {skill.name}
              </h3>
              <span className="text-[11px] text-text-muted">{skill.category}</span>
            </div>
          </div>

          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0",
              getBadgeColor(skill.proficiency),
            )}
          >
            {skill.proficiency}
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs leading-relaxed text-text-secondary font-normal line-clamp-2">
          {skill.description}
        </p>

        {/* Progress Bar & Percentage */}
        <div className="mt-1">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Proficiency
            </span>
            <span className="font-mono text-xs font-semibold text-gradient">{skill.level}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full accent-gradient"
              initial={{ width: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
              viewport={{ once: true }}
              whileInView={{ width: inView ? `${skill.level}%` : 0 }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse: boolean }) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "flex min-w-max gap-3",
          reverse ? "animate-marqueeRight" : "animate-marqueeLeft",
        )}
      >
        {duplicated.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="glass-panel flex h-9 items-center gap-2.5 rounded-full border border-white/10 px-4 text-xs text-text-secondary transition-all duration-200 hover:border-accent-cyan/40 hover:text-white"
          >
            <span className="text-gradient font-bold">{item.slice(0, 2).toUpperCase()}</span>
            <span className="font-medium text-white">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
