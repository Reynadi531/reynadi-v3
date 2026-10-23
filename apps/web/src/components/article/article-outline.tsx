import { cn } from "@reynad-v3/ui/lib/utils";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/site/eyebrow";
import type { ArticleHeading } from "../../../mdx/remark-article-meta";

export const articleContentId = "article-content";

interface ArticleOutlineProps {
  headings: ArticleHeading[];
  meta: { outline?: string[] };
  label?: string;
}

/** Sticky reading rail: lists the sections, follows the reader, and fills as they read. */
export function ArticleOutline({ headings, meta, label = "In this article" }: ArticleOutlineProps) {
  const [active, setActive] = useState(-1);
  const fillRef = useRef<HTMLSpanElement>(null);

  const update = () => {
    let current = -1;
    headings.forEach(({ id }, i) => {
      const element = document.getElementById(id);
      if (element && element.getBoundingClientRect().top < window.innerHeight * 0.4) current = i;
    });
    setActive(current);

    const content = document.getElementById(articleContentId);
    if (!content || !fillRef.current) return;
    const { top, height } = content.getBoundingClientRect();
    const progress = (window.innerHeight * 0.4 - top) / height;
    fillRef.current.style.transform = `scaleY(${Math.min(1, Math.max(0, progress))})`;
  };

  useEffect(update, [headings]);
  useLenis(update);

  return (
    <aside aria-label={label} className="hidden lg:block lg:w-[200px] xl:w-[260px]">
      <div className="flex flex-col gap-[26px] lg:sticky lg:top-[132px]">
        <Reveal>
          <Eyebrow className="text-[11px] tracking-[1.4px]">{label}</Eyebrow>
        </Reveal>

        <ol className="relative flex flex-col gap-[26px] pl-5">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line-subtle" />
          <span
            ref={fillRef}
            aria-hidden
            className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-brand"
          />

          {headings.map(({ id, title }, i) => (
            <li key={id}>
              <Reveal delay={90 + i * 90}>
                <a
                  href={`#${id}`}
                  aria-current={i === active ? "location" : undefined}
                  className="group flex gap-3 text-fg-muted transition-colors hover:text-white aria-[current=location]:text-white"
                >
                  <span
                    className={cn(
                      "text-[12px] font-bold text-fg-dim tabular-nums transition-colors duration-300 group-hover:text-brand",
                      i === active && "text-brand",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] font-semibold transition-transform duration-500 ease-out group-hover:translate-x-1 group-aria-[current=location]:translate-x-1">
                    {meta.outline?.[i] ?? title}
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
