import { cn } from "@reynad-v3/ui/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { RefObject } from "react";

import { useReveal } from "@/components/motion/use-reveal";

import type { Project } from "./project-card";

interface ProjectSpotlightProps extends Project {
  /** Position in the archive, shown as `003 /` before the category on desktop. */
  index: number;
  /** Stagger delay for the scroll reveal, in ms. */
  revealDelay?: number;
  className?: string;
}

/**
 * A full-width project feature: preview beside its details on desktop, and the
 * same stacked layout as `ProjectCard` on mobile.
 */
export function ProjectSpotlight({
  index,
  title,
  description,
  category,
  image,
  previewClassName,
  href,
  revealDelay,
  className,
}: ProjectSpotlightProps) {
  const { ref, ...reveal } = useReveal<HTMLElement>({ delay: revealDelay });
  const Root = (href ? "a" : "article") as "article";
  const arrowHover =
    "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

  return (
    <Root
      ref={ref as RefObject<HTMLElement>}
      {...(href ? { href } : {})}
      className={cn(
        "group flex w-full flex-col gap-3.5 lg:flex-row lg:items-center lg:gap-0 lg:overflow-hidden lg:rounded-xl lg:bg-canvas-raised",
        className,
      )}
      {...reveal}
    >
      {/* Matches one column of the two-up project grid above it. */}
      <div
        className={cn(
          "h-[210px] w-full shrink-0 overflow-hidden rounded-[10px] lg:h-[348px] lg:w-[calc(50%-14px)] lg:rounded-none",
          previewClassName,
        )}
      >
        <img
          data-reveal-media
          src={image}
          alt={`${title} interface preview`}
          loading="lazy"
          className="size-full object-cover group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-3.5 lg:flex-1 lg:gap-[17px] lg:p-[38px]">
        <p className="order-last text-[10px] font-bold tracking-[0.6px] text-fg-faint uppercase lg:order-first lg:text-[11px] lg:tracking-[1px] lg:text-brand">
          <span className="hidden lg:inline">{String(index).padStart(3, "0")} / </span>
          {category}
        </p>
        <div className="flex items-center justify-between">
          <h3 className="text-[22px] font-extrabold tracking-[-0.5px] text-white lg:text-[33px] lg:tracking-[-1px]">
            {title}
          </h3>
          <ArrowUpRight aria-hidden className={cn("size-5 text-white lg:hidden", arrowHover)} />
        </div>
        <p className="text-sm/5 text-fg-subtle lg:max-w-[578px] lg:text-base/6">{description}</p>
        <p className="hidden items-center gap-[9px] text-[14px] font-bold text-white lg:flex">
          Explore concept
          <ArrowUpRight aria-hidden className={cn("size-[17px] text-brand", arrowHover)} />
        </p>
      </div>
    </Root>
  );
}
