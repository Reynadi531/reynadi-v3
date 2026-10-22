import { cn } from "@reynad-v3/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

/** Display headings. Each size pairs the mobile scale with its desktop (`lg`) scale. */
const headingVariants = cva("font-black text-white", {
  variants: {
    size: {
      hero: "text-[49px]/[49px] tracking-[-2.7px] lg:text-[78px]/[77px] lg:tracking-[-4.8px]",
      page: "text-[44px]/[46px] tracking-[-2px] lg:text-[74px]/[76px] lg:tracking-[-3.8px]",
      xl: "text-[42px]/[44px] tracking-[-1.9px] lg:text-[78px]/[79px] lg:tracking-[-4.5px]",
      lg: "text-[34px]/[37px] tracking-[-1.3px] lg:text-[58px]/[61px] lg:tracking-[-2.8px]",
      md: "text-[35px]/[normal] tracking-[-1.4px] lg:text-[54px] lg:tracking-[-2.5px]",
      sm: "text-[35px]/[38px] tracking-[-1.4px] lg:text-5xl/[normal] lg:tracking-[-2.2px]",
      xs: "text-[34px]/[37px] tracking-[-1.2px] lg:text-[42px]/[normal] lg:tracking-[-1.8px]",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3";
  };

export function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />;
}
