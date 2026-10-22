import { cn } from "@reynad-v3/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { Container } from "./container";

const sectionVariants = cva("w-full", {
  variants: {
    tone: {
      base: "bg-canvas",
      raised: "bg-canvas-raised",
      deep: "bg-canvas-deep",
    },
  },
  defaultVariants: {
    tone: "base",
  },
});

interface SectionProps extends ComponentProps<"section">, VariantProps<typeof sectionVariants> {
  /** Classes for the inner content container (padding, layout, gap). */
  containerClassName?: string;
}

export function Section({ tone, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone }), className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
