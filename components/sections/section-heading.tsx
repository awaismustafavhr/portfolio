"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gradient">{eyebrow}</p>
      <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-[3px] w-[60px] rounded-full accent-gradient" />
      {subtitle ? (
        <p className="mt-5 text-base leading-8 text-text-secondary">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
