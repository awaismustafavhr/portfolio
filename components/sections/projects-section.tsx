"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { type Project, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectsSectionProps = {
  onSelectProject: (project: Project) => void;
};

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Cursor-position controlled auto-scroll refs (desktop only)
  const reducedMotionRef = useRef(false);
  const cursorInsideRef = useRef(false);
  const draggingRef = useRef(false);
  const targetVelocityRef = useRef(0); // px/s
  const currentVelocityRef = useRef(0); // px/s
  const manualPauseUntilRef = useRef(0); // epoch ms
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const maxSpeedRef = useRef(58); // subtle premium max speed
    // Autoplay when not hovered: slow, subtle movement and direction control
    const autoplaySpeedRef = useRef(12); // px/s when not hovered
    const autoDirectionRef = useRef(1); // 1 = right, -1 = left

  const beginManualPause = (ms = 900) => {
    manualPauseUntilRef.current = Date.now() + ms;
    targetVelocityRef.current = 0;
    currentVelocityRef.current = 0;
  };

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured).slice(0, 6),
    [],
  );

  const updateArrowState = useCallback(() => {
    const track = carouselRef.current;
    if (!track) return;

    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    const left = track.scrollLeft;
    const tolerance = 2;

    setCanScrollPrev(left > tolerance);
    setCanScrollNext(left < maxScrollLeft - tolerance);
  }, []);

  useEffect(() => {
    const track = carouselRef.current;
    if (!track) return;

    updateArrowState();

    const handleScroll = () => updateArrowState();
    const handleResize = () => updateArrowState();

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const toVelocityFromClientX = (clientX: number) => {
      const rect = track.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const raw = (clientX - centerX) / (rect.width / 2); // -1..1 nominal
      const clamped = Math.max(-1, Math.min(1, raw));
      const deadZone = 0.15;
      if (Math.abs(clamped) <= deadZone) {
        return 0;
      }
      const normalized = (Math.abs(clamped) - deadZone) / (1 - deadZone);
      const curved = normalized * normalized; // smooth acceleration near edges
      return Math.sign(clamped) * curved * maxSpeedRef.current;
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotionRef.current) return;
      cursorInsideRef.current = true;
      track.style.scrollSnapType = "none";
      targetVelocityRef.current = toVelocityFromClientX(event.clientX);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!cursorInsideRef.current || event.pointerType !== "mouse" || reducedMotionRef.current) return;
      targetVelocityRef.current = toVelocityFromClientX(event.clientX);
    };

    const onPointerLeave = () => {
      cursorInsideRef.current = false;
      targetVelocityRef.current = 0;
      currentVelocityRef.current = 0;
      track.style.scrollSnapType = "x mandatory";
    };

    const onPointerDown = () => {
      draggingRef.current = true;
      beginManualPause(1000);
    };

    const onPointerUp = () => {
      draggingRef.current = false;
      beginManualPause(700);
    };

    const onWheel = () => beginManualPause(900);

    track.addEventListener("pointerenter", onPointerEnter);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerleave", onPointerLeave);
    track.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchend", onPointerUp);
    window.addEventListener("touchcancel", onPointerUp);
    track.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      track.removeEventListener("pointerenter", onPointerEnter);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerleave", onPointerLeave);
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("touchstart", onPointerDown as EventListener);
      window.removeEventListener("touchend", onPointerUp as EventListener);
      window.removeEventListener("touchcancel", onPointerUp as EventListener);
      track.removeEventListener("wheel", onWheel as EventListener);
      track.style.scrollSnapType = "x mandatory";
    };
  }, [updateArrowState]);

  const scrollByCard = (direction: "prev" | "next") => {
    const track = carouselRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-project-card]");
    if (!firstCard) return;

    const styles = getComputedStyle(track);
    // Robustly read gap: try 'gap', then 'column-gap', then fallback to 0
    const gapValue = styles.getPropertyValue("gap") || styles.getPropertyValue("column-gap") || "0";
    const gap = Number.parseFloat(gapValue.replace("px", "")) || 0;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const step = Math.round(cardWidth + gap);

    // Temporarily prioritize manual navigation
    beginManualPause(1200);

    // Use native smooth scroll where supported
    track.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });

    // After scrolling, arrow states are updated by the scroll listener
  };

  // Cursor-position controlled auto-scroll loop
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setReducedMotion = () => {
      reducedMotionRef.current = media.matches;
      if (reducedMotionRef.current) {
        targetVelocityRef.current = 0;
        currentVelocityRef.current = 0;
      }
    };

    setReducedMotion();
    media.addEventListener("change", setReducedMotion);

    const stepLoop = (time: number) => {
      const track = carouselRef.current;
      if (track) {
        if (!lastFrameTimeRef.current) {
          lastFrameTimeRef.current = time;
        }
        const dt = Math.min(0.05, (time - lastFrameTimeRef.current) / 1000);
        lastFrameTimeRef.current = time;

        const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
        const canMove = maxScrollLeft > 1;
        const isPaused = Date.now() < manualPauseUntilRef.current;

        // Determine desired velocity:
        // - If reduced motion, paused, dragging, or nothing to move => 0
        // - If cursor inside => use cursor target velocity
        // - Else => gentle autoplay using autoplaySpeedRef and autoDirectionRef
        let desiredVelocity = 0;
        if (!canMove || isPaused || reducedMotionRef.current || draggingRef.current) {
          desiredVelocity = 0;
        } else if (cursorInsideRef.current) {
          desiredVelocity = targetVelocityRef.current;
        } else {
          desiredVelocity = autoplaySpeedRef.current * autoDirectionRef.current;
        }

        const smoothing = 1 - Math.exp(-10 * dt); // smooth accel/decel
        currentVelocityRef.current += (desiredVelocity - currentVelocityRef.current) * smoothing;

        if (Math.abs(currentVelocityRef.current) < 0.05) {
          currentVelocityRef.current = 0;
        }

        if (currentVelocityRef.current !== 0) {
          const next = track.scrollLeft + currentVelocityRef.current * dt;
          const clamped = Math.max(0, Math.min(maxScrollLeft, next));
          track.scrollLeft = clamped;

          // If at edge and still pushing outwards, damp motion to avoid jitter.
          if (
            (clamped <= 0.5 && currentVelocityRef.current < 0) ||
            (clamped >= maxScrollLeft - 0.5 && currentVelocityRef.current > 0)
          ) {
            // If autoplay (not cursor-controlled) then reverse direction smoothly
            if (!cursorInsideRef.current && Math.abs(currentVelocityRef.current) > 0.5) {
              autoDirectionRef.current *= -1;
              // gently nudge velocity toward the new direction
              currentVelocityRef.current = autoDirectionRef.current * Math.abs(currentVelocityRef.current) * 0.45;
            } else {
              currentVelocityRef.current *= 0.35;
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(stepLoop);
    };

    rafRef.current = requestAnimationFrame(stepLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastFrameTimeRef.current = null;
      media.removeEventListener("change", setReducedMotion);
    };
  }, []);

  return (
    <section className="section-shell relative py-28 md:py-32" id="projects">
      <div className="section-grid-bg opacity-25" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="section-orb section-orb-alt absolute left-[-120px] top-[8%] h-[400px] w-[400px] bg-accent-purple/14"
          style={{ animationDuration: "18s" }}
        />
        <div
          className="section-orb absolute right-[-80px] bottom-[8%] h-[360px] w-[360px] bg-accent-cyan/13"
          style={{ animationDelay: "2.5s", animationDuration: "17s" }}
        />
      </div>

      <div className="container-shell relative">
        <SectionHeading
          eyebrow="WHAT I&apos;VE BUILT"
          title="Featured Projects"
          subtitle="A focused showcase of production work with a polished, swipe-friendly browsing experience."
        />

        <div className="mt-16 flex items-end justify-between gap-4">
          <div>
            <p className="font-heading text-[24px] font-bold tracking-tight text-white md:text-[28px]">
              Selected Work
            </p>
            <p className="mt-1 text-[12px] text-text-muted">
              Scroll, swipe, or use arrows to explore case studies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous project"
              className={cn(
                "focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
                canScrollPrev
                  ? "border-white/[0.18] bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-accent-cyan/45 hover:bg-white/[0.08]"
                  : "cursor-not-allowed border-white/[0.08] bg-white/[0.02] text-white/35",
              )}
              disabled={!canScrollPrev}
              onClick={() => scrollByCard("prev")}
              type="button"
            >
              <ChevronLeft className="h-[18px] w-[18px]" />
            </button>
            <button
              aria-label="Next project"
              className={cn(
                "focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
                canScrollNext
                  ? "border-white/[0.18] bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-accent-cyan/45 hover:bg-white/[0.08]"
                  : "cursor-not-allowed border-white/[0.08] bg-white/[0.02] text-white/35",
              )}
              disabled={!canScrollNext}
              onClick={() => scrollByCard("next")}
              type="button"
            >
              <ChevronRight className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        <div
          className="hide-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 sm:gap-6"
          ref={carouselRef}
          role="list"
          aria-label="Featured projects carousel"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
        >
          {featuredProjects.map((project, index) => (
            <ProjectCarouselCard
              index={index}
              key={project.id}
              onOpen={() => onSelectProject(project)}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCarouselCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  const hasLiveUrl =
    project.liveUrl &&
    project.liveUrl !== "#" &&
    !project.liveUrl.includes("demo.com") &&
    !project.liveUrl.includes("yourportfolio.com");

  return (
    <motion.article
      className={cn(
        "group/card border-gradient glass-panel relative flex min-h-[420px] flex-none snap-start flex-col overflow-hidden rounded-[24px] border border-white/[0.09] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.18]",
        "w-[88%] sm:w-[72%] md:w-[56%] lg:w-[calc((100%-3rem)/3.35)] xl:w-[calc((100%-3.4rem)/3.35)]",
      )}
      data-project-card
      initial={{ opacity: 0, y: 26 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

      <button
        className="focus-ring group/img relative block aspect-[16/9] w-full overflow-hidden bg-black/45"
        onClick={onOpen}
        type="button"
      >
        <Image
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.035]"
          height={720}
          src={project.image}
          width={1280}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />
      </button>

      <div className="relative z-10 flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
        <h3 className="font-heading text-[20px] font-bold leading-tight tracking-tight text-white">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-[13.5px] leading-7 text-text-secondary">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          {hasLiveUrl ? (
            <a
              className="group/link focus-ring inline-flex items-center gap-1.5 rounded-md text-[12px] font-semibold uppercase tracking-[0.14em] text-white/88 transition-colors duration-300 hover:text-accent-cyan"
              href={project.liveUrl}
              onClick={(event) => event.stopPropagation()}
              rel="noreferrer noopener"
              target="_blank"
            >
              <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover/link:after:scale-x-100">
                View Case Study
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <button
              className="group/link focus-ring inline-flex items-center gap-1.5 rounded-md text-[12px] font-semibold uppercase tracking-[0.14em] text-white/88 transition-colors duration-300 hover:text-accent-cyan"
              onClick={onOpen}
              type="button"
            >
              <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover/link:after:scale-x-100">
                View Case Study
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </button>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[0_14px_38px_-28px_rgba(0,0,0,0.75)] transition-all duration-300 group-hover/card:shadow-[0_30px_58px_-24px_rgba(0,0,0,0.82)]" />
    </motion.article>
  );
}
