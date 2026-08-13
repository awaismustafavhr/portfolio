"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

type SmoothScrollContextType = {
  lenis: Lenis | null;
  scrollTo: (
    target: string | HTMLElement | number,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
      immediate?: boolean;
    },
  ) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches;
    };

    mediaQuery.addEventListener("change", handleMotionPreference);

    if (prefersReducedMotionRef.current) {
      return () => mediaQuery.removeEventListener("change", handleMotionPreference);
    }

    // High-performance Lenis smooth scroll setup
    // Optimized easing and duration for 60/120Hz displays
    // Native touch scrolling enabled for zero-lag mobile experience
    const lenisInstance = new Lenis({
      autoRaf: true,
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenis(null);
      mediaQuery.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement | number,
      options?: {
        offset?: number;
        duration?: number;
        easing?: (t: number) => number;
        immediate?: boolean;
      },
    ) => {
      const activeLenis = lenisRef.current || lenis;
      if (activeLenis) {
        activeLenis.scrollTo(target, {
          duration: 1.0,
          ...options,
          immediate: prefersReducedMotionRef.current || options?.immediate,
        });
        return;
      }

      const behavior = prefersReducedMotionRef.current ? "auto" : "smooth";

      if (typeof target === "string") {
        const el = document.querySelector<HTMLElement>(target);
        if (el) {
          el.scrollIntoView({ behavior, block: "start" });
        }
        return;
      }

      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior });
        return;
      }

      target.scrollIntoView({ behavior, block: "start" });
    },
    [lenis],
  );

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
