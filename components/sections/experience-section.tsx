"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { BriefcaseBusiness, ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const experienceRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start 80%", "end 20%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section-shell py-28" id="experience" ref={experienceRef}>
      <div className="container-shell">
        <SectionHeading eyebrow="MY JOURNEY" title="Work Experience" />

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute left-4 top-0 h-full w-6 md:left-1/2 md:-translate-x-1/2">
            <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 24 1000">
              <motion.path
                d="M12 0 L12 1000"
                fill="none"
                pathLength={pathLength}
                stroke="url(#timeline-gradient)"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-10">
            {experiences.map((item, index) => (
              <TimelineCard
                key={`${item.company}-${item.role}`}
                align={index % 2 === 0 ? "left" : "right"}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  align,
}: {
  item: (typeof experiences)[number];
  align: "left" | "right";
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <div
      className={cn(
        "relative pl-14 md:grid md:grid-cols-2 md:pl-0",
        align === "right" ? "md:[&>*:first-child]:order-2" : "",
      )}
    >
      <div className={cn("hidden md:block", align === "left" ? "pr-16" : "pl-16")} />
      <div
        className={cn(
          "absolute left-[9px] top-10 h-px w-10 accent-gradient md:left-1/2 md:-translate-x-1/2",
          align === "left" ? "md:-translate-x-[calc(100%+8px)]" : "md:translate-x-2",
        )}
      />
      <motion.span
        className="absolute left-0 top-8 h-4 w-4 rounded-full accent-gradient shadow-glow md:left-1/2 md:-translate-x-1/2"
        initial={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        whileInView={{ scale: 1 }}
      />
      <motion.article
        ref={cardRef}
        className={cn(
          "glass-panel glass-hover relative p-7 border border-white/10 rounded-2xl",
          align === "left" ? "md:col-start-1 md:mr-16" : "md:col-start-2 md:ml-16",
        )}
        initial={{ opacity: 0, x: align === "left" ? -60 : 60 }}
        transition={{ duration: 0.55 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-semibold text-white">{item.company}</p>
                <p className="text-sm text-gradient font-medium">{item.role}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="glass-panel rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-text-muted border border-white/10">
              {item.date}
            </span>
            <span className="glass-panel rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white border border-white/10">
              {item.type}
            </span>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {item.summary.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-7 text-text-secondary">
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-accent-cyan" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="glass-panel rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-text-secondary border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}
