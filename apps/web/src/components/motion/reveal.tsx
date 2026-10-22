import type { CSSProperties, ReactNode, RefObject } from "react";

import { useReveal, type RevealOptions } from "./use-reveal";

interface RevealProps extends RevealOptions {
  as?: "div" | "span" | "p";
  className?: string;
  children: ReactNode;
}

export function Reveal({ as = "div", variant, delay, className, children }: RevealProps) {
  const { ref, ...reveal } = useReveal<HTMLElement>({ variant, delay });
  const Tag = as as "div";

  return (
    <Tag ref={ref as RefObject<HTMLDivElement>} className={className} {...reveal}>
      {children}
    </Tag>
  );
}

interface RevealLinesProps {
  lines: ReactNode[];
  delay?: number;
}

/** Headline lines that slide up out of a mask, one after another. */
export function RevealLines({ lines, delay }: RevealLinesProps) {
  const { ref, ...reveal } = useReveal<HTMLSpanElement>({ variant: "lines", delay });

  return (
    <span ref={ref} className="block" {...reveal}>
      {lines.map((line, i) => (
        // Padding keeps descenders inside the mask on tight line-heights.
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <span data-line className="block" style={{ "--line-index": i } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
