import { cn } from "@reynad-v3/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const eyebrowVariants = cva(
  "text-[11px] font-bold tracking-[1.3px] whitespace-nowrap uppercase lg:text-[12px] lg:tracking-[1.4px]",
  {
    variants: {
      tone: {
        brand: "text-brand",
        muted: "text-fg-quiet",
      },
    },
    defaultVariants: {
      tone: "brand",
    },
  },
);

type EyebrowProps = ComponentProps<"p"> & VariantProps<typeof eyebrowVariants>;

export function Eyebrow({ className, tone, ...props }: EyebrowProps) {
  return <p className={cn(eyebrowVariants({ tone }), className)} {...props} />;
}
