import { Fragment, type CSSProperties, type ReactNode, type RefObject } from "react";

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

interface RevealWordsProps {
  as?: "p" | "span" | "h2" | "h3";
  text: string;
  delay?: number;
  className?: string;
}

/** Copy whose words rise out of a mask in a quick left-to-right wave. */
export function RevealWords({ as = "p", text, delay, className }: RevealWordsProps) {
  const { ref, ...reveal } = useReveal<HTMLElement>({ variant: "words", delay });
  const Tag = as as "p";
  const words = text.split(" ");

  return (
    <Tag ref={ref as RefObject<HTMLParagraphElement>} className={className} {...reveal}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
            <span data-word className="inline-block" style={{ "--word-index": i } as CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
