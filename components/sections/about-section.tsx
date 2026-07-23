"use client";

import { type ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  BriefcaseBusiness,
  Download,
  Globe,
  Mail,
  MapPin,
  Quote,
  Rocket,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { infoGrid, stats } from "@/data/site";
import { useCounter } from "@/hooks/useCounter";

export function AboutSection() {
  const aboutStatsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(aboutStatsRef, { once: true, amount: 0.4 });

  return (
    <section className="section-shell bg-background-secondary py-28" id="about">
      <div className="container-shell">
        <SectionHeading eyebrow="GET TO KNOW ME" title="About Me" />

        {/* ── Main two-column grid ── */}
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">

          {/* ══ Left: Profile image column ══ */}
          <motion.div
            className="relative order-1 mx-auto w-full max-w-[380px]"
            initial={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {/* Ambient background glow */}
            <div
              className="absolute inset-4 -z-10 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.55), rgba(6,182,212,0.45))",
                filter: "blur(72px)",
                opacity: 0.8,
              }}
            />

            {/* Gradient border ring */}
            <div
              className="relative rounded-[38px] p-[2px] shadow-2xl"
              style={{
                background:
                  "linear-gradient(140deg, rgba(124,58,237,0.8) 0%, rgba(6,182,212,0.65) 50%, rgba(255,255,255,0.15) 100%)",
              }}
            >
              <div className="group relative overflow-hidden rounded-[36px] bg-[#0c0c16] p-3">
                <Image
                  alt="Awais Mustafa – Full Stack Developer"
                  className="aspect-square w-full rounded-[30px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  height={760}
                  priority
                  src="/images/profile-portrait.jpg"
                  width={760}
                />
                {/* Subtle bottom vignette on hover */}
                <div className="absolute inset-3 rounded-[30px] bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              </div>
            </div>

            {/* Floating badges */}
            <FloatingBadge
              className="-bottom-5 -left-5 sm:-bottom-6 sm:-left-7"
              delay={0.25}
              icon={<Star className="h-4 w-4" />}
              subtitle="Experience"
              title="1+ Years"
            />
            <FloatingBadge
              className="-top-5 -right-5 sm:-top-6 sm:-right-7"
              delay={0.35}
              icon={<Rocket className="h-4 w-4" />}
              subtitle="Projects"
              title="10+ Built"
            />

            {/* Tech stack indicator */}
            <motion.div
              className="glass-panel absolute -right-3 bottom-20 flex items-center gap-2 rounded-2xl border border-white/15 px-3.5 py-2.5 shadow-xl sm:-right-5"
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.45, type: "spring", stiffness: 180 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-cyan/20 text-accent-cyan">
                <Globe className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-white">MERN Stack</span>
            </motion.div>
          </motion.div>

          {/* ══ Right: Content column ══ */}
          <motion.div
            className="order-2 flex flex-col"
            initial={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {/* Eyebrow pill */}
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-accent-cyan">
              <Zap className="h-3 w-3" />
              Full Stack Developer
            </span>

            {/* Headline */}
            <h3 className="font-heading text-3xl font-bold leading-[1.2] text-white md:text-[34px]">
              Passionate about{" "}
              <span className="text-gradient">clean code</span>{" "}
              &amp;{" "}
              <span className="text-gradient">elegant design</span>
            </h3>

            {/* Bio paragraphs */}
            <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-text-secondary">
              <p>
                I&apos;m a dedicated full stack developer with a passion for creating modern,
                responsive web applications using the MERN stack. My journey has been driven by
                a love for clean code and elegant design.
              </p>
              <p>
                With 1+ years of experience, I&apos;ve worked on various personal and freelance
                projects, focusing on building user-friendly interfaces and robust backend systems.
              </p>
              <p>
                Today, I&apos;m focused on continuously learning and improving my skills while
                building meaningful digital products that make a difference.
              </p>
            </div>

            {/* Quote block — cohesively integrated */}
            <div className="relative mt-7 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-4">
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-gradient-to-b from-accent-purple via-accent-cyan to-accent-pink" />
              {/* Quote icon */}
              <Quote className="absolute right-4 top-3 h-8 w-8 text-white/5 rotate-180" />
              <p className="text-[13px] italic leading-relaxed text-text-secondary">
                &ldquo;I believe great products are built at the intersection of clean code and
                thoughtful design.&rdquo;
              </p>
            </div>

            {/* Info cards + CTA — unified block */}
            <div className="mt-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
              <div className="grid grid-cols-2 gap-3">
                {infoGrid.map((item) => (
                  <div
                    key={item.label}
                    className="glass-panel glass-hover flex items-center gap-3 rounded-xl border border-white/10 px-3.5 py-3 transition-all duration-300 hover:border-accent-cyan/25"
                  >
                    <div className="accent-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-md">
                      {item.label === "Location" ? (
                        <MapPin className="h-3.5 w-3.5" />
                      ) : item.label === "Email" ? (
                        <Mail className="h-3.5 w-3.5" />
                      ) : item.label === "Availability" ? (
                        <Sparkles className="h-3.5 w-3.5" />
                      ) : (
                        <BriefcaseBusiness className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-text-muted">
                        {item.label}
                      </p>
                      <p className="mt-0.5 truncate text-xs font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA — lives inside the unified block */}
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <a
                  className="accent-gradient glow-ring inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-accent-purple/30 active:scale-[0.98]"
                  download
                  href="/resume.pdf"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <div
          ref={aboutStatsRef}
          className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((item) => (
            <StatCard key={item.label} inView={statsInView} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingBadge({
  className,
  icon,
  title,
  subtitle,
  delay = 0.2,
}: {
  className: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`glass-panel absolute rounded-2xl border border-white/15 px-4 py-3 shadow-xl backdrop-blur-md ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200, damping: 18 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-3">
        <div className="accent-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md">
          {icon}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  inView,
}: {
  label: string;
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const count = useCounter(value, inView);

  return (
    <div className="glass-panel glass-hover group relative overflow-hidden rounded-2xl border border-white/10 p-7 text-center transition-all duration-300 hover:border-accent-cyan/25 hover:-translate-y-1">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="relative font-heading text-4xl font-bold text-gradient md:text-5xl">
        {count}
        {inView ? suffix : ""}
      </p>
      <p className="relative mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary">
        {label}
      </p>
    </div>
  );
}
