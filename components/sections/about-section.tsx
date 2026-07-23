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

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-20">
          <motion.div
            className="relative order-1 mx-auto w-full max-w-[380px]"
            initial={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div
              className="absolute inset-8 -z-10 rounded-full opacity-70"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.45), rgba(6,182,212,0.4))",
                filter: "blur(80px)",
              }}
            />
            <div className="glass-panel group relative overflow-hidden rounded-[32px] p-4 border border-white/10 shadow-2xl">
              <div className="absolute inset-0 rounded-[28px] border border-transparent bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                alt="Awais Mustafa Portrait"
                className="aspect-square w-full rounded-[28px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                height={720}
                priority
                src="/images/profile-portrait.jpg"
                width={720}
              />
            </div>
            <FloatingBadge
              className="-bottom-4 left-0 sm:-bottom-5 sm:-left-5"
              icon={<Star className="h-4 w-4" />}
              subtitle="Experience"
              title="1+ Years"
            />
            <FloatingBadge
              className="-top-4 right-0 sm:-top-5 sm:-right-5"
              icon={<Rocket className="h-4 w-4" />}
              subtitle="Projects"
              title="10+ Built"
            />
          </motion.div>

          <motion.div
            className="order-2"
            initial={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-heading text-3xl font-semibold text-white md:text-[32px]">
              Passionate Full Stack Developer
            </h3>
            <div className="mt-6 space-y-5 text-base leading-8 text-text-secondary">
              <p>
                I&apos;m a dedicated full stack developer with a passion for creating
                modern, responsive web applications using the MERN stack. My
                journey has been driven by a love for clean code and elegant design.
              </p>
              <p>
                With 1+ years of experience, I&apos;ve worked on various personal and
                freelance projects, focusing on building user-friendly interfaces
                and robust backend systems.
              </p>
              <p>
                Today, I&apos;m focused on continuously learning and improving my skills
                while building meaningful digital products that make a difference.
              </p>
            </div>

            <div className="glass-panel mt-8 border-l-4 border-l-accent-purple px-5 py-4 italic text-text-secondary">
              I believe great products are built at the intersection of clean code
              and thoughtful design.
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {infoGrid.map((item) => (
                <div
                  key={item.label}
                  className="glass-panel glass-hover flex items-center gap-4 p-4 border border-white/10"
                >
                  <div className="accent-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white">
                    {item.label === "Location" ? (
                      <MapPin className="h-5 w-5" />
                    ) : item.label === "Email" ? (
                      <Mail className="h-5 w-5" />
                    ) : item.label === "Availability" ? (
                      <Sparkles className="h-5 w-5" />
                    ) : (
                      <BriefcaseBusiness className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-white truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              className="accent-gradient glow-ring mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white interactive-press"
              download
              href="/resume.pdf"
            >
              Download CV <Download className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

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
      className={`glass-panel absolute px-4 py-3 border border-white/10 shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-3">
        <div className="accent-gradient flex h-9 w-9 items-center justify-center rounded-full text-white">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">{subtitle}</p>
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
    <div className="glass-panel glass-hover p-8 text-center border border-white/10">
      <p className="font-heading text-4xl font-semibold text-gradient md:text-5xl">
        {count}
        {inView ? suffix : ""}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-text-secondary">
        {label}
      </p>
    </div>
  );
}
