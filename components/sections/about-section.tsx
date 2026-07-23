"use client";

import { type ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  BriefcaseBusiness,
  Download,
  Mail,
  MapPin,
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
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16 xl:gap-20">

          {/* ── Left: Profile image ── */}
          <motion.div
            className="relative order-1 mx-auto w-full max-w-[360px] lg:sticky lg:top-28"
            initial={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-6 -z-10 rounded-full opacity-75"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.45))",
                filter: "blur(70px)",
              }}
            />

            {/* Outer ring frame */}
            <div className="relative rounded-[36px] p-[2px]"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(6,182,212,0.5), rgba(255,255,255,0.1))"
              }}
            >
              {/* Card */}
              <div className="group relative overflow-hidden rounded-[34px] bg-[#0d0d14] p-3.5 shadow-2xl">
                <Image
                  alt="Awais Mustafa Portrait"
                  className="aspect-square w-full rounded-[28px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  height={720}
                  priority
                  src="/images/profile-portrait.jpg"
                  width={720}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-3.5 rounded-[28px] bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>

            {/* Floating badges */}
            <FloatingBadge
              className="-bottom-5 -left-4 sm:-bottom-6 sm:-left-6"
              icon={<Star className="h-4 w-4" />}
              subtitle="Experience"
              title="1+ Years"
            />
            <FloatingBadge
              className="-top-5 -right-4 sm:-top-6 sm:-right-6"
              icon={<Rocket className="h-4 w-4" />}
              subtitle="Projects"
              title="10+ Built"
            />
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            className="order-2"
            initial={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {/* Section eyebrow */}
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-cyan">
              <Zap className="h-3 w-3" />
              Full Stack Developer
            </span>

            <h3 className="font-heading text-3xl font-bold leading-tight text-white md:text-[34px]">
              Passionate about{" "}
              <span className="text-gradient">clean code</span> &amp;{" "}
              <span className="text-gradient">elegant design</span>
            </h3>

            <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-8 text-text-secondary">
              <p>
                I&apos;m a dedicated full stack developer with a passion for creating modern,
                responsive web applications using the MERN stack. My journey has been driven by a
                love for clean code and elegant design.
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

            {/* Quote block */}
            <div className="glass-panel relative mt-8 overflow-hidden rounded-2xl border border-white/10 px-6 py-5">
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-accent-purple via-accent-cyan to-accent-purple" />
              <p className="text-sm italic leading-7 text-text-secondary">
                &ldquo;I believe great products are built at the intersection of clean code and
                thoughtful design.&rdquo;
              </p>
            </div>

            {/* Info grid */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {infoGrid.map((item) => (
                <div
                  key={item.label}
                  className="glass-panel glass-hover flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition-all duration-300 hover:border-accent-cyan/20"
                >
                  <div className="accent-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-md">
                    {item.label === "Location" ? (
                      <MapPin className="h-4 w-4" />
                    ) : item.label === "Email" ? (
                      <Mail className="h-4 w-4" />
                    ) : item.label === "Availability" ? (
                      <Sparkles className="h-4 w-4" />
                    ) : (
                      <BriefcaseBusiness className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 truncate text-sm font-medium text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              className="accent-gradient glow-ring mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-accent-purple/30"
              download
              href="/resume.pdf"
            >
              Download CV <Download className="h-4 w-4" />
            </a>
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
}: {
  className: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      className={`glass-panel absolute rounded-2xl border border-white/15 px-4 py-3 shadow-xl backdrop-blur-md ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
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
    <div className="glass-panel glass-hover group relative overflow-hidden rounded-2xl border border-white/10 p-7 text-center transition-all duration-300 hover:border-accent-cyan/20 hover:-translate-y-1">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
