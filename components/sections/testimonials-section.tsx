"use client";

import { SectionHeading } from "./section-heading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  return (
    <section className="section-shell py-24" id="testimonials">
      <div className="container-shell">
        <SectionHeading eyebrow="WHAT PEOPLE SAY" title="Testimonials" />

        <div className="mt-14 space-y-4 overflow-hidden py-2">
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
  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div className={cn("flex min-w-max", reverse ? "animate-marqueeRight" : "animate-marqueeLeft")}>
        {duplicated.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="glass-panel mx-2 w-[320px] flex-shrink-0 p-6 md:w-[420px] border border-white/10 rounded-2xl"
          >
            <p className="text-base leading-8 text-text-secondary">&ldquo;{item.quote}&rdquo;</p>
            <div className="mt-6">
              <p className="font-heading text-xl font-semibold text-white">{item.name}</p>
              <p className="mt-2 text-sm text-gradient font-medium">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
