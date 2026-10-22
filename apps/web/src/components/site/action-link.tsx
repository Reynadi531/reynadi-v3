import { cn } from "@reynad-v3/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const actionLinkVariants = cva(
  "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-lg font-bold text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-deep [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_.lucide-arrow-right]:translate-x-1 hover:[&_.lucide-arrow-up-right]:translate-x-0.5 hover:[&_.lucide-arrow-up-right]:-translate-y-0.5 hover:[&_.lucide-download]:translate-y-0.5",
  {
    variants: {
      variant: {
        primary: "bg-brand hover:bg-brand/85",
        outline:
          "bg-canvas-raised ring-1 ring-line-strong ring-inset hover:bg-white/10 lg:bg-[#111111]/80 lg:ring-fg-dim",
        text: "rounded-none hover:opacity-80",
      },
      size: {
        none: "",
        /** Mobile hero actions. */
        sm: "gap-1.5 px-[13px] py-3.5 text-[12px] [&_svg]:size-3.5",
        /** Navigation call to action. */
        md: "gap-[15px] px-[19px] py-[13px] text-[14px] font-semibold [&_svg]:size-4",
        /** Desktop section actions. */
        lg: "gap-7 px-[22px] py-[17px] text-[15px] [&_svg]:size-[18px]",
        /** Hero actions: `sm` on mobile, `lg` on desktop. */
        hero: "gap-1.5 px-[13px] py-3.5 text-[12px] [&_svg]:size-3.5 lg:gap-7 lg:px-[22px] lg:py-[17px] lg:text-[15px] lg:[&_svg]:size-[18px]",
        /** Closing contact call to action. */
        cta: "gap-[22px] px-5 py-4 text-[15px] [&_svg]:size-[18px] lg:gap-[26px] lg:px-[22px] lg:py-[18px] lg:text-[16px] lg:[&_svg]:size-[19px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

type ActionLinkProps = ComponentProps<"a"> & VariantProps<typeof actionLinkVariants>;

export function ActionLink({ className, variant, size, ...props }: ActionLinkProps) {
  return <a className={cn(actionLinkVariants({ variant, size }), className)} {...props} />;
}
