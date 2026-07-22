"use client";

import { motion } from "framer-motion";
import { ExternalLink, GraduationCap } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { education } from "@/data/education";
import { certifications } from "@/data/site";

export function EducationSection() {
  return (
    <section className="section-shell bg-background-secondary py-24" id="education">
      <div className="container-shell">
        <SectionHeading eyebrow="MY BACKGROUND" title="Education" />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {education.map((item, index) => (
            <motion.article
              key={item.institution}
              className="glass-panel glass-hover p-8 border border-white/10 rounded-3xl"
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start gap-4">
                <div className="accent-gradient flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold text-white shadow-md">
                  {item.initials}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-white">{item.institution}</p>
                      <p className="mt-1 text-sm text-text-secondary">{item.field}</p>
                    </div>
                    <span className="glass-panel rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-text-secondary border border-white/10">
                      {item.level}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="mt-6 font-heading text-2xl font-semibold text-gradient">
                {item.degree}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-text-muted">
                <span>{item.range}</span>
                <span className="glass-panel rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-white border border-white/10">
                  {item.grade}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-text-secondary">
                    <GraduationCap className="mt-1 h-4 w-4 shrink-0 text-accent-cyan" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="glass-panel rounded-full px-3 py-2 text-xs uppercase tracking-[0.18em] text-text-secondary border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <h3 className="font-heading text-2xl font-semibold text-white">
              Certifications & Courses
            </h3>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {certifications.map((item, index) => (
              <motion.article
                key={item.title}
                className="glass-panel glass-hover flex flex-col gap-4 p-6 border border-white/10 rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="glass-panel w-fit rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-gradient border border-white/10">
                  {item.platform}
                </span>
                <div>
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-text-muted">{item.date}</p>
                </div>
                <a
                  className="mt-auto inline-flex items-center gap-2 text-sm text-white hover:text-accent-cyan transition-colors interactive-press"
                  href={item.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  Credential <ExternalLink className="h-4 w-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
