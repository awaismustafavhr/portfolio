"use client";

import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className="section-shell relative py-28 md:py-32" id="testimonials">
      {/* Background elements */}
      <div className="section-grid-bg opacity-22" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb section-orb-alt absolute left-[-110px] top-[6%] h-[370px] w-[370px] bg-accent-purple/12"
          style={{ animationDuration: "18s" }}
        />
        <div
          className="section-orb absolute right-[-90px] bottom-[8%] h-[350px] w-[350px] bg-accent-cyan/12"
          style={{ animationDelay: "3s", animationDuration: "19s" }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="CLIENT & TEAM FEEDBACK"
          title="Testimonials"
          subtitle="Words of appreciation from clients, team leads, and collaborators I've had the pleasure of building with."
        />

        <div className="mt-14 space-y-5 overflow-hidden py-2">
          <TestimonialRow items={testimonials.slice(0, 3)} reverse={false} />
          <TestimonialRow items={testimonials.slice(3)} reverse />
        </div>
      </div>
    </section>
  );
}

function TestimonialRow({
  items,
  reverse,
}: {
  items: typeof testimonials;
  reverse: boolean;
}) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="group/row relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-background)] to-transparent" />

      <div
        className={cn(
          "flex min-w-max gap-5 py-1",
          reverse ? "animate-marqueeRight" : "animate-marqueeLeft",
        )}
        style={{ animationDuration: reverse ? "48s" : "55s" }}
      >
        {duplicated.map((item, index) => {
          const initials = item.name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <article
              key={`${item.name}-${index}`}
              className="border-gradient glass-panel glass-hover group/tcard relative flex w-[340px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-[22px] border border-white/[0.08] p-6 transition-all duration-400 hover:border-accent-cyan/30 md:w-[410px]"
            >
              {/* Ambient glows */}
              <div
                className="pointer-events-none absolute -top-10 -right-8 h-40 w-40 rounded-full bg-accent-cyan/[0.07] blur-3xl opacity-0 transition-opacity duration-500 group-hover/tcard:opacity-100"
              />
              <div
                className="pointer-events-none absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-accent-purple/[0.07] blur-3xl opacity-0 transition-opacity duration-500 group-hover/tcard:opacity-100"
              />

              {/* Corner accent dots */}
              <span className="pointer-events-none absolute left-3 top-3 h-1 w-1 rounded-full accent-gradient opacity-50" />
              <span className="pointer-events-none absolute right-3 bottom-3 h-1 w-1 rounded-full accent-gradient opacity-30" />

              <div className="relative">
                {/* 5 Stars + Quote Icon */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]"
                      />
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 accent-gradient opacity-10 blur-md rounded-full" />
                    <Quote className="relative h-5 w-5 text-white/15 transition-colors duration-300 group-hover/tcard:text-accent-cyan/40" />
                  </div>
                </div>

                <p className="text-[13.5px] leading-[1.8] text-text-secondary italic sm:text-[14px]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="relative mt-6 flex items-center gap-3.5 border-t border-white/[0.07] pt-4.5">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-2xl accent-gradient opacity-30 blur-md transition-opacity duration-300 group-hover/tcard:opacity-50" />
                  <div className="glass-panel-strong relative flex h-11 w-11 items-center justify-center rounded-2xl border-white/[0.1]">
                    <div className="absolute inset-[2px] rounded-[14px] accent-gradient-animated" />
                    <span className="relative font-heading text-[13px] font-bold text-white drop-shadow-sm">
                      {initials}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading text-[14px] font-bold tracking-tight text-white transition-colors duration-300 group-hover/tcard:text-accent-cyan">
                    {item.name}
                  </h4>
                  <p className="mt-0.5 truncate text-[11.5px] text-text-muted">{item.role}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
