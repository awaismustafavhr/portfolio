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
    <section className="section-shell relative py-28 md:py-32" id="education">
      {/* Background elements */}
      <div className="section-grid-bg opacity-22" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb absolute left-[-110px] top-[8%] h-[370px] w-[370px] bg-accent-cyan/13"
          style={{ animationDuration: "18s" }}
        />
        <div
          className="section-orb section-orb-alt absolute right-[-90px] bottom-[6%] h-[350px] w-[350px] bg-accent-purple/13"
          style={{ animationDelay: "2.5s", animationDuration: "19s" }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="MY BACKGROUND"
          title="Education & Certifications"
          subtitle="Formal computer science education combined with industry-recognized certifications and a commitment to lifelong learning."
        />

        {mainEducation ? (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="border-gradient glass-panel glass-hover relative overflow-hidden rounded-[28px] border border-white/[0.08] shadow-2xl">
              {/* Large ambient glows */}
              <div className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full bg-accent-cyan/12 blur-[100px]" />
              <div className="pointer-events-none absolute -left-40 -bottom-40 h-80 w-80 rounded-full bg-accent-purple/12 blur-[100px]" />

              {/* Corner accent dots */}
              <span className="pointer-events-none absolute left-4 top-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-60" />
              <span className="pointer-events-none absolute right-4 top-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-30" />
              <span className="pointer-events-none absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-40" />

              {/* Header strip */}
              <div className="relative border-b border-white/[0.08] px-7 py-8 sm:px-10 md:px-12 md:py-9">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: logo + degree info */}
                  <div className="flex items-start gap-5">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-2xl accent-gradient opacity-30 blur-lg" />
                      <div className="glass-panel-strong relative flex h-16 w-16 items-center justify-center rounded-2xl border-white/[0.12]">
                        <div className="absolute inset-[2px] rounded-[14px] accent-gradient-animated" />
                        <span className="relative font-heading text-[22px] font-bold text-white drop-shadow-sm">
                          {mainEducation.initials}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.08] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-accent-cyan">
                        <GraduationCap className="h-3 w-3" />
                        {mainEducation.level}&apos;s Degree
                      </span>
                      <h3 className="font-heading text-[26px] font-bold tracking-tight text-white sm:text-[30px] md:text-[34px]">
                        {mainEducation.degree}
                      </h3>
                      <p className="mt-1.5 text-[14px] font-medium text-text-secondary sm:text-[15px]">
                        {mainEducation.institution}
                      </p>
                    </div>
                  </div>

                  {/* Right: year + GPA */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                    <span className="glass-panel inline-flex items-center gap-2 rounded-full border-white/[0.1] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-text-secondary">
                      <Calendar className="h-3.5 w-3.5 text-accent-cyan" />
                      {mainEducation.range}
                    </span>
                    <span className="glow-ring inline-flex items-center gap-1.5 rounded-full accent-gradient-animated px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
                      <Star className="h-3.5 w-3.5" />
                      {mainEducation.grade}
                    </span>
                  </div>
                </div>
              </div>

              {/* Body grid */}
              <div className="grid gap-0 md:grid-cols-[1.35fr_0.85fr]">
                {/* Academic Highlights column */}
                <div className="border-b border-white/[0.06] px-7 py-8 md:border-b-0 md:border-r md:border-white/[0.08] sm:px-10 md:px-12 md:py-9">
                  <h4 className="mb-5 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-accent-cyan/20 bg-accent-cyan/[0.08]">
                      <BookOpen className="h-3.5 w-3.5 text-accent-cyan" />
                    </span>
                    Key Focus &amp; Academic Highlights
                  </h4>
                  <ul className="space-y-4">
                    {mainEducation.highlights.map((point) => (
                      <li
                        key={point}
                        className="group/highlight flex gap-3 text-[13.5px] leading-[1.8] text-text-secondary sm:text-[14px]"
                      >
                        <span className="mt-1 flex shrink-0 items-center justify-center">
                          <span className="relative flex h-5 w-5 items-center justify-center rounded-md border border-accent-cyan/20 bg-accent-cyan/[0.06] transition-all duration-300 group-hover/highlight:border-accent-cyan/40">
                            <CheckCircle2 className="h-3 w-3 text-accent-cyan" />
                          </span>
                        </span>
                        <span className="transition-colors duration-300 group-hover/highlight:text-white/90">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Competencies column */}
                <div className="flex flex-col justify-between px-7 py-8 sm:px-10 md:px-10 md:py-9">
                  <div>
                    <h4 className="mb-5 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.22em] text-text-muted">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-accent-purple/20 bg-accent-purple/[0.08]">
                        <Award className="h-3.5 w-3.5 text-accent-purple" />
                      </span>
                      Core Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mainEducation.skills.map((skill) => (
                        <span
                          key={skill}
                          className="glass-panel inline-flex items-center rounded-xl border-white/[0.08] px-3.5 py-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/90 transition-all duration-300 hover:border-accent-cyan/40 hover:bg-white/[0.04] hover:text-accent-cyan"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-6 border-t border-white/[0.07] pt-4 text-[11.5px] italic leading-relaxed text-text-muted">
                    Field of Study:{" "}
                    <span className="font-medium text-text-secondary">{mainEducation.field}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* ── Certifications & Courses ── */}
        <div className="mt-24">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-purple/25 bg-accent-purple/[0.08] px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-accent-purple">
              <Sparkles className="h-3 w-3" />
              Lifelong Learning
            </span>
            <h3 className="font-heading text-[26px] font-semibold text-white sm:text-[30px] md:text-[34px]">
              Certifications &amp; Courses
            </h3>
            <p className="max-w-xl text-[14px] leading-[1.8] text-text-secondary sm:text-[15px]">
              Continuous growth through industry-recognized certifications and structured online programs that keep my skills sharp.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item, index) => (
              <motion.article
                key={item.title}
                className="group/cert"
                initial={{ opacity: 0, y: 36 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="border-gradient glass-panel glass-hover relative h-full overflow-hidden rounded-[22px] border border-white/[0.08] p-6 transition-all duration-[450ms] hover:-translate-y-2 hover:border-accent-cyan/30">
                  {/* Ambient glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br from-accent-cyan/[0.06] via-transparent to-accent-purple/[0.06] opacity-0 transition-opacity duration-500 group-hover/cert:opacity-100" />
                  <div
                    className="pointer-events-none absolute -top-20 -right-16 h-48 w-48 rounded-full bg-accent-cyan/[0.08] blur-3xl opacity-0 transition-opacity duration-500 group-hover/cert:opacity-100"
                  />

                  {/* Corner dot */}
                  <span className="pointer-events-none absolute right-4 top-4 h-1.5 w-1.5 rounded-full accent-gradient opacity-40" />

                  <div className="relative flex h-full flex-col justify-between gap-5">
                    <div className="space-y-4">
                      {/* Platform badge + Medal */}
                      <div className="flex items-center justify-between">
                        <span className="glass-panel inline-flex items-center gap-1.5 rounded-full border-white/[0.09] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-gradient">
                          {item.platform}
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-text-muted transition-all duration-300 group-hover/cert:border-accent-cyan/30 group-hover/cert:bg-accent-cyan/[0.08] group-hover/cert:text-accent-cyan">
                          <Medal className="h-4 w-4" />
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-[16px] font-semibold leading-[1.45] tracking-tight text-white sm:text-[17px]">
                        {item.title}
                      </h4>

                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-[11.5px] text-text-muted">
                        <Calendar className="h-3.5 w-3.5 text-accent-cyan/80" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* Divider + credential link */}
                    <div className="border-t border-white/[0.07] pt-4">
                      <a
                        className="group/link inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-wider text-text-secondary transition-colors duration-300 hover:text-accent-cyan"
                        href={item.link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 group-hover/link:border-accent-cyan/30 group-hover/link:bg-accent-cyan/[0.08]">
                          <Trophy className="h-3.5 w-3.5" />
                        </span>
                        View Credential
                        <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </div>
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
