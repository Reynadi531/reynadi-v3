import { cn } from "@reynad-v3/ui/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { RefObject } from "react";

import { useReveal } from "@/components/motion/use-reveal";

export interface Project {
  title: string;
  description: string;
  category: string;
  image: string;
  /** Background shown behind the preview while the image loads. */
  previewClassName?: string;
  href?: string;
}

interface ProjectCardProps extends Project {
  /** Stagger delay for the scroll reveal, in ms. */
  revealDelay?: number;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  category,
  image,
  previewClassName,
  href,
  revealDelay,
  className,
}: ProjectCardProps) {
  const { ref, ...reveal } = useReveal<HTMLElement>({ delay: revealDelay });
  const Root = (href ? "a" : "article") as "article";

  return (
    <Root
      ref={ref as RefObject<HTMLElement>}
      {...(href ? { href } : {})}
      className={cn("group flex w-full flex-col gap-3.5 lg:flex-1 lg:gap-0", className)}
      {...reveal}
    >
      <div
        className={cn(
          "h-[210px] w-full overflow-hidden rounded-[10px] lg:h-[348px] lg:rounded-xl",
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
      <div className="flex flex-col gap-3.5 lg:gap-[13px] lg:pt-[26px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[22px] font-extrabold tracking-[-0.5px] text-white lg:text-[29px] lg:tracking-[-1.1px]">
            {title}
          </h3>
          <ArrowUpRight
            aria-hidden
            className="size-5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:size-6"
          />
        </div>
        <p className="text-sm/5 text-fg-subtle lg:text-base/[23px]">{description}</p>
        <p className="text-[10px] font-bold tracking-[0.6px] text-fg-faint uppercase lg:text-[11px] lg:tracking-[1.2px]">
          {category}
        </p>
      </div>
    </Root>
  );
}
