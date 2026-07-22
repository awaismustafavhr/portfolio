"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, ExternalLink, GraduationCap } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { education } from "@/data/education";
import { certifications } from "@/data/site";

export function EducationSection() {
  const mainEducation = education[0];

  return (
    <section className="section-shell bg-background-secondary py-24" id="education">
      <div className="container-shell max-w-6xl mx-auto">
        <SectionHeading eyebrow="MY BACKGROUND" title="Education" />

        {mainEducation ? (
          <div className="mt-14 max-w-4xl mx-auto">
            <motion.article
              className="glass-panel glass-hover relative overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl md:p-10"
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {/* Subtle top glow background highlight */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-cyan/10 blur-3xl" />

              {/* Header section */}
              <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
                <div className="flex items-center gap-5">
                  <div className="accent-gradient font-heading flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg ring-1 ring-white/20">
                    {mainEducation.initials}
                  </div>
                  <div>
                    <span className="glass-panel mb-2 inline-block rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                      {mainEducation.level} Degree
                    </span>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
                      {mainEducation.degree}
                    </h3>
                    <p className="mt-1 text-base font-medium text-text-secondary">
                      {mainEducation.institution}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-start gap-2.5 sm:flex-col sm:items-end">
                  <span className="glass-panel rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                    {mainEducation.range}
                  </span>
                  <span className="accent-gradient rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                    {mainEducation.grade}
                  </span>
                </div>
              </div>

              {/* Body grid */}
              <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_0.9fr]">
                {/* Highlights column */}
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                    <BookOpen className="h-4 w-4 text-accent-cyan" />
                    Key Focus & Academic Highlights
                  </h4>
                  <ul className="space-y-3.5">
                    {mainEducation.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-text-secondary"
                      >
                        <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills & Competencies column */}
                <div className="glass-panel flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                      <Award className="h-4 w-4 text-accent-cyan" />
                      Core Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mainEducation.skills.map((skill) => (
                        <span
                          key={skill}
                          className="glass-panel rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 border-t border-white/5 pt-4 text-xs italic leading-relaxed text-text-muted">
                    Field of Study: {mainEducation.field}
                  </p>
                </div>
              </div>
            </motion.article>
          </div>
        ) : null}

        {/* Certifications section */}
        <div className="mt-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <h3 className="font-heading text-2xl font-semibold text-white">
              Certifications & Courses
            </h3>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item, index) => (
              <motion.article
                key={item.title}
                className="glass-panel glass-hover flex flex-col justify-between gap-4 rounded-2xl border border-white/10 p-6"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="space-y-3">
                  <span className="glass-panel text-gradient inline-block rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                    {item.platform}
                  </span>
                  <p className="text-base font-semibold leading-snug text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-text-muted">{item.date}</p>
                </div>
                <a
                  className="interactive-press inline-flex items-center gap-2 pt-2 text-xs font-medium uppercase tracking-wider text-text-secondary transition-colors hover:text-accent-cyan"
                  href={item.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  Credential <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
