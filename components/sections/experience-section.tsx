"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { BriefcaseBusiness, CalendarCheck, ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const experienceRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start 85%", "end 20%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section-shell relative py-28 md:py-32" id="experience" ref={experienceRef}>
      {/* Background elements */}
      <div className="section-grid-bg opacity-22" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb absolute right-[-100px] top-[5%] h-[380px] w-[380px] bg-accent-blue/14"
          style={{ animationDelay: "1.5s", animationDuration: "19s" }}
        />
        <div
          className="section-orb section-orb-alt absolute left-[-90px] bottom-[10%] h-[340px] w-[340px] bg-accent-purple/13"
          style={{ animationDelay: "3.5s", animationDuration: "18s" }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="MY JOURNEY"
          title="Work Experience"
          subtitle="A track record of building production-grade software, leading engineering initiatives, and collaborating with cross-functional teams."
        />

        <div className="relative mx-auto mt-16 max-w-6xl">
          {/* Timeline SVG column */}
          <div className="absolute left-5 top-0 h-full w-6 md:left-1/2 md:-translate-x-1/2">
            <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 24 1000">
              {/* Faint dashed base line */}
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="1000"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="2"
                strokeDasharray="2 10"
                strokeLinecap="round"
              />
              <motion.path
                d="M12 0 L12 1000"
                fill="none"
                pathLength={pathLength}
                stroke="url(#timeline-gradient)"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          <div className="space-y-12">
            {experiences.map((item, index) => (
              <TimelineCard
                key={`${item.company}-${item.role}`}
                align={index % 2 === 0 ? "left" : "right"}
                index={index}
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
  index,
}: {
  item: (typeof experiences)[number];
  align: "left" | "right";
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <div
      className={cn(
        "relative pl-16 md:grid md:grid-cols-2 md:pl-0",
        align === "right" ? "md:[&>*:first-child]:order-2" : "",
      )}
    >
      <div className={cn("hidden md:block", align === "left" ? "pr-16" : "pl-16")} />

      {/* Connector line from node to card */}
      <div
        className={cn(
          "absolute left-[9px] top-[52px] h-px w-11 origin-left scale-x-0 accent-gradient transition-transform duration-[700ms] ease-out md:left-1/2 md:-translate-x-1/2",
          align === "left" ? "md:-translate-x-[calc(100%+8px)] md:origin-right md:scale-x-100" : "md:translate-x-2",
          inView && "scale-x-100",
        )}
        style={{ transitionDelay: "120ms" }}
      />

      {/* Timeline Node */}
      <div className="absolute left-0 top-[38px] md:left-1/2 md:-translate-x-1/2">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.45, type: "spring", bounce: 0.35 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ scale: 1, opacity: 1 }}
        >
          {/* Outer ring glow */}
          <span className="absolute inset-0 rounded-full accent-gradient blur-md opacity-50" />
          {/* Outer ring */}
          <span className="absolute -inset-[6px] rounded-full border border-white/[0.14] bg-black/40 backdrop-blur-md" />
          {/* Core dot */}
          <span className="relative block h-5 w-5 rounded-full accent-gradient shadow-lg">
            <span className="absolute inset-[3px] rounded-full bg-white/80" />
          </span>
        </motion.div>
      </div>

      <motion.article
        ref={cardRef}
        className={cn(
          "border-gradient glass-panel glass-hover relative overflow-hidden rounded-[22px] border border-white/[0.08] p-7 sm:p-8 transition-all duration-500",
          align === "left" ? "md:col-start-1 md:mr-16" : "md:col-start-2 md:ml-16",
        )}
        initial={{ opacity: 0, x: align === "left" ? -70 : 70, y: 10 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      >
        {/* Corner accent dots */}
        <span className="pointer-events-none absolute left-3 top-3 h-1.5 w-1.5 rounded-full accent-gradient opacity-60" />
        <span className="pointer-events-none absolute right-3 top-3 h-1.5 w-1.5 rounded-full accent-gradient opacity-30" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full accent-gradient opacity-40" />

        {/* Ambient color wash */}
        <div
          className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-accent-cyan/[0.08] blur-3xl opacity-0 transition-opacity duration-500 hover:opacity-100"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-accent-purple/[0.08] blur-3xl opacity-0 transition-opacity duration-500 hover:opacity-100"
        />

        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-start gap-4">
                {/* Icon with gradient glow */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-2xl accent-gradient opacity-30 blur-md" />
                  <div className="glass-panel-strong relative flex h-12 w-12 items-center justify-center rounded-2xl border-white/[0.14]">
                    <div className="absolute inset-[2px] rounded-[14px] accent-gradient-animated" />
                    <BriefcaseBusiness className="relative h-5 w-5 text-white drop-shadow-sm" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-[19px] font-bold tracking-tight text-white sm:text-[21px]">
                    {item.company}
                  </h3>
                  <p className="mt-0.5 text-[14px] font-semibold text-gradient sm:text-[15px]">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Date + Type stack */}
            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="glass-panel inline-flex items-center gap-1.5 rounded-full border-white/[0.08] px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                <CalendarCheck className="h-3 w-3 text-accent-cyan" />
                {item.date}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/20 bg-accent-cyan/[0.08] px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                {item.type}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

          {/* Bullet summary */}
          <ul className="space-y-3.5">
            {item.summary.map((point) => (
              <li key={point} className="group/bullet flex gap-3 text-[13.5px] leading-[1.8] text-text-secondary sm:text-[14px]">
                <span className="mt-1.5 flex shrink-0 items-center justify-center">
                  <span className="relative flex h-5 w-5 items-center justify-center rounded-md border border-accent-cyan/20 bg-accent-cyan/[0.06] transition-all duration-300 group-hover/bullet:border-accent-cyan/40">
                    <ChevronRight className="h-3 w-3 text-accent-cyan" />
                  </span>
                </span>
                <span className="transition-colors duration-300 group-hover/bullet:text-white/90">{point}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="mt-7 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="glass-panel inline-flex items-center gap-1.5 rounded-xl border-white/[0.07] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-text-secondary transition-all duration-300 hover:border-white/[0.16] hover:text-white"
              >
                <span className="h-1 w-1 rounded-full accent-gradient" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
