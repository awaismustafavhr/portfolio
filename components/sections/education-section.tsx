"use client";

import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Medal,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { education } from "@/data/education";
import { certifications } from "@/data/site";

export function EducationSection() {
  const mainEducation = education[0];

  return (
    <section className="section-shell bg-background-secondary py-24" id="education">
      <div className="container-shell">
        <SectionHeading eyebrow="MY BACKGROUND" title="Education" />

        {mainEducation ? (
          <motion.div
            className="mt-14"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              {/* Top ambient glow */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent-cyan/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-32 -bottom-32 h-72 w-72 rounded-full bg-accent-purple/10 blur-3xl" />

              {/* Header strip */}
              <div className="relative border-b border-white/10 px-8 py-8 md:px-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: logo + degree info */}
                  <div className="flex items-center gap-5">
                    <div className="accent-gradient font-heading flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg ring-2 ring-white/20">
                      {mainEducation.initials}
                    </div>
                    <div>
                      <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-cyan">
                        <GraduationCap className="h-3 w-3" />
                        {mainEducation.level}&apos;s Degree
                      </span>
                      <h3 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
                        {mainEducation.degree}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-text-secondary">
                        {mainEducation.institution}
                      </p>
                    </div>
                  </div>

                  {/* Right: year + GPA */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                      <Calendar className="h-3.5 w-3.5" />
                      {mainEducation.range}
                    </span>
                    <span className="accent-gradient inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md">
                      <Star className="h-3.5 w-3.5" />
                      {mainEducation.grade}
                    </span>
                  </div>
                </div>
              </div>

              {/* Body grid */}
              <div className="grid gap-0 md:grid-cols-[1.35fr_0.85fr]">
                {/* Academic Highlights column */}
                <div className="border-r border-white/10 px-8 py-8 md:px-10">
                  <h4 className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-text-muted">
                    <BookOpen className="h-4 w-4 text-accent-cyan" />
                    Key Focus &amp; Academic Highlights
                  </h4>
                  <ul className="space-y-4">
                    {mainEducation.highlights.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Competencies column */}
                <div className="flex flex-col justify-between px-8 py-8">
                  <div>
                    <h4 className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-text-muted">
                      <Award className="h-4 w-4 text-accent-cyan" />
                      Core Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mainEducation.skills.map((skill) => (
                        <span
                          key={skill}
                          className="glass-panel rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-200 hover:border-accent-cyan/40 hover:text-accent-cyan"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-6 border-t border-white/8 pt-4 text-[11px] italic leading-relaxed text-text-muted">
                    Field of Study:{" "}
                    <span className="text-text-secondary">{mainEducation.field}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* ── Certifications & Courses ── */}
        <div className="mt-24">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-purple">
              <Sparkles className="h-3 w-3" />
              Lifelong Learning
            </span>
            <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              Certifications &amp; Courses
            </h3>
            <p className="max-w-xl text-sm leading-7 text-text-secondary">
              Continuous growth through industry-recognized certifications and structured online programs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item, index) => (
              <motion.article
                key={item.title}
                className="group glass-panel relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {/* Ambient glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col justify-between gap-5">
                  <div className="space-y-3.5">
                    {/* Platform badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gradient">
                        {item.platform}
                      </span>
                      <Medal className="h-4 w-4 text-text-muted transition-colors duration-300 group-hover:text-accent-cyan" />
                    </div>

                    {/* Title */}
                    <p className="text-base font-semibold leading-snug text-white group-hover:text-white">
                      {item.title}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </div>
                  </div>

                  {/* Divider + credential link */}
                  <div className="border-t border-white/8 pt-4">
                    <a
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary transition-colors duration-200 hover:text-accent-cyan"
                      href={item.link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Trophy className="h-3.5 w-3.5" />
                      View Credential
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
