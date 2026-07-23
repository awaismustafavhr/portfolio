"use client";

import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className="section-shell py-28 bg-background-secondary/40" id="testimonials">
      <div className="container-shell">
        <SectionHeading
          eyebrow="CLIENT & TEAM FEEDBACK"
          title="Testimonials"
          subtitle="Feedback from clients, team leads, and project collaborators."
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
    <div className="overflow-hidden">
      <div className={cn("flex min-w-max gap-4", reverse ? "animate-marqueeRight" : "animate-marqueeLeft")}>
        {duplicated.map((item, index) => {
          const initials = item.name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <article
              key={`${item.name}-${index}`}
              className="glass-panel glass-hover group relative flex w-[340px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-accent-cyan/30 md:w-[400px]"
            >
              {/* Background ambient glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                {/* 5 Stars + Quote Icon */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-white/10" />
                </div>

                <p className="text-sm leading-relaxed text-text-secondary italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="relative mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div className="accent-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-heading text-sm font-bold text-white shadow-md">
                  {initials}
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-text-muted">{item.role}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
