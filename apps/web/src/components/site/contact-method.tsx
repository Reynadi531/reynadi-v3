import { cn } from "@reynad-v3/ui/lib/utils";
import type { ReactNode } from "react";

import { useReveal } from "@/components/motion/use-reveal";

interface ContactMethodProps {
  label: string;
  /** Stagger delay for the scroll reveal, in ms. */
  revealDelay?: number;
  className?: string;
  children: ReactNode;
}

/** A labelled way to reach out, ruled on top with a line that draws in on reveal. */
export function ContactMethod({ label, revealDelay, className, children }: ContactMethodProps) {
  const reveal = useReveal<HTMLDivElement>({ delay: revealDelay });

  return (
    <div
      data-reveal-rule
      className={cn("flex flex-col gap-2.5 pt-5 lg:gap-2.5 lg:pt-[19px]", className)}
      {...reveal}
    >
      <p className="text-[11px] font-bold tracking-[1px] text-fg-subtle uppercase lg:tracking-[1.3px]">
        {label}
      </p>
      {children}
    </div>
  );
}
