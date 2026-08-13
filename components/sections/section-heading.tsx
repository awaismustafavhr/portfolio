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
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full accent-gradient-animated" />
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gradient">{eyebrow}</p>
      </div>
      <h2 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-white md:text-[56px] md:leading-[1.08]">
        {title}
      </h2>
      <div className="mx-auto mt-6 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-accent-purple/60" />
        <span className="h-2 w-2 rotate-45 accent-gradient-animated rounded-[2px]" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent-cyan/60" />
      </div>
      {subtitle ? (
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary md:text-[17px]">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
