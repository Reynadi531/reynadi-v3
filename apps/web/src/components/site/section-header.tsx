import { cn } from "@reynad-v3/ui/lib/utils";
import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";

import { Eyebrow } from "./eyebrow";
import { Heading } from "./heading";

interface SectionHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  titleSize?: "lg" | "md" | "sm" | "xs";
  /** Supporting copy shown beside the title on desktop only. */
  aside?: ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, titleSize, aside, className }: SectionHeaderProps) {
  return (
    <div
      className={cn("flex w-full flex-col lg:flex-row lg:items-end lg:justify-between", className)}
    >
      <div className="flex flex-col gap-7 lg:gap-4">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <Heading size={titleSize}>{title}</Heading>
        </Reveal>
      </div>
      {aside ? (
        <Reveal delay={180} className="hidden lg:block">
          <p className="max-w-[370px] text-[17px]/[25px] text-fg-subtle">{aside}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
