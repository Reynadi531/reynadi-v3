import { cn } from "@reynad-v3/ui/lib/utils";

import { useReveal } from "@/components/motion/use-reveal";

export interface Capability {
  title: string;
  description: string;
  /** Shorter copy for small screens. Falls back to `description`. */
  mobileDescription?: string;
}

interface CapabilityItemProps extends Capability {
  index: number;
  className?: string;
}

export function CapabilityItem({
  index,
  title,
  description,
  mobileDescription,
  className,
}: CapabilityItemProps) {
  const reveal = useReveal<HTMLLIElement>({ delay: (index - 1) * 120 });

  return (
    <li
      data-reveal-rule
      className={cn("flex flex-col gap-2.5 pt-[21px] lg:flex-1 lg:gap-[21px] lg:pt-6", className)}
      {...reveal}
    >
      <span className="text-[11px] font-bold text-brand lg:text-[12px]">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="text-[21px] font-extrabold tracking-[-0.5px] text-white lg:text-[22px]">
        {title}
      </h3>
      <p className="text-[15px]/[23px] text-fg-subtle">
        {mobileDescription ? (
          <>
            <span className="lg:hidden">{mobileDescription}</span>
            <span className="hidden lg:inline">{description}</span>
          </>
        ) : (
          description
        )}
      </p>
    </li>
  );
}
