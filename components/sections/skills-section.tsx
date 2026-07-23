"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { SectionHeading } from "./section-heading";
import {
  type Skill,
  type SkillCategory,
  marqueeTechnologies,
  skillCategories,
  skills,
} from "@/data/skills";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const [skillCategory, setSkillCategory] = useState<SkillCategory>("All");
  const skillsRef = useRef<HTMLElement | null>(null);
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 });

  const filteredSkills = useMemo(
    () =>
      skillCategory === "All"
        ? skills
        : skills.filter((skill) => skill.category === skillCategory),
    [skillCategory],
  );

  return (
    <section className="section-shell py-28" id="skills" ref={skillsRef}>
      <div className="container-shell">
        <SectionHeading eyebrow="WHAT I WORK WITH" title="My Skills" />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {skillCategories.map((category) => (
            <button
              key={category}
              className={cn(
                "glass-panel rounded-full px-6 py-3 text-sm transition-all duration-300 interactive-press",
                skillCategory === category
                  ? "accent-gradient glow-ring text-white font-medium shadow-md"
                  : "text-text-secondary hover:bg-white/10 hover:text-white border border-white/10",
              )}
              onClick={() => setSkillCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={skillCategory}
            animate={{ opacity: 1 }}
            className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
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

        <div className="mt-16 space-y-4 overflow-hidden py-2">
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
  return (
    <motion.div
      className="glass-panel glass-hover group rounded-2xl p-5 border border-white/10 transition-all duration-300 hover:border-accent-cyan/20"
      initial={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-4">
        <div className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white shadow-md">
          {skill.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <p className="font-medium text-white">{skill.name}</p>
            <span className="text-sm font-semibold text-gradient">{skill.level}%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full accent-gradient"
              initial={{ width: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.08 }}
              viewport={{ once: true }}
              whileInView={{ width: inView ? `${skill.level}%` : 0 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ items, reverse }: { items: string[]; reverse: boolean }) {
  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div className={cn("flex min-w-max", reverse ? "animate-marqueeRight" : "animate-marqueeLeft")}>
        {duplicated.map((item, index) => (
      <div
        key={`${item}-${index}`}
        className="glass-panel mx-2 flex h-10 items-center gap-3 rounded-full px-4 text-sm text-white border border-white/10 hover:border-accent-cyan/30 hover:text-accent-cyan transition-all duration-200"
      >
        <span className="text-gradient font-bold">{item.slice(0, 2).toUpperCase()}</span>
        <span className="font-medium">{item}</span>
      </div>
        ))}
      </div>
    </div>
  );
}
