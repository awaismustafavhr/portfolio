"use client";

import { useEffect, useState } from "react";

type UseTypewriterOptions = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  startDelay?: number;
};

export function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  startDelay = 800,
}: UseTypewriterOptions) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    if (!words.length) return;

    const current = words[index % words.length];

    const timeout = window.setTimeout(
      () => {
        if (isWaiting) {
          setIsWaiting(false);
          return;
        }

        if (!isDeleting && displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
          return;
        }

        if (!isDeleting && displayText.length === current.length) {
          setIsDeleting(true);
          setIsWaiting(true);
          return;
        }

        if (isDeleting && displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
          return;
        }

        setIsDeleting(false);
        setIndex((value) => (value + 1) % words.length);
        setIsWaiting(true);
      },
      isWaiting
        ? displayText.length === 0 && index === 0 && !isDeleting
          ? startDelay
          : pauseDuration
        : isDeleting
          ? deletingSpeed
          : typingSpeed,
    );

    return () => window.clearTimeout(timeout);
  }, [
    deletingSpeed,
    displayText,
    index,
    isDeleting,
    isWaiting,
    pauseDuration,
    startDelay,
    typingSpeed,
    words,
  ]);

  return displayText;
}
