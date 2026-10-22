import { useEffect, useRef, useState, type CSSProperties } from "react";

export type RevealVariant = "up" | "down" | "fade" | "lines" | "words";

export interface RevealOptions {
  variant?: RevealVariant;
  /** Delay before the transition starts, in ms. Use for staggering siblings. */
  delay?: number;
}

/**
 * Marks an element for a one-shot reveal when it scrolls into view.
 * Spread the returned props onto the element; styles live in `index.css`.
 */
export function useReveal<T extends HTMLElement>({
  variant = "up",
  delay = 0,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return {
    ref,
    "data-reveal": variant,
    "data-revealed": revealed ? "" : undefined,
    style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
  };
}
