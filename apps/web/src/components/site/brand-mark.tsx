import { cn } from "@reynad-v3/ui/lib/utils";

interface BrandMarkProps {
  href?: string;
  className?: string;
}

export function BrandMark({ href = "/", className }: BrandMarkProps) {
  return (
    <a
      href={href}
      className={cn("flex items-center gap-[9px] text-white lg:gap-2.5", className)}
      aria-label="reynadi.id — home"
    >
      <span aria-hidden className="size-2.5 bg-brand lg:size-3" />
      <span className="text-[18px] font-bold tracking-[-0.6px] lg:text-[21px] lg:tracking-[-0.7px]">
        reynadi.id
      </span>
    </a>
  );
}
