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

    const lenisInstance = new Lenis({
      autoRaf: true,
      duration: 1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.09,
      touchMultiplier: 1,
      wheelMultiplier: 0.95,
      overscroll: true,
      autoResize: true,
    });

    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
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
      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1,
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
