import { cn } from "@reynad-v3/ui/lib/utils";

import { useReveal } from "@/components/motion/use-reveal";

interface TopicItemProps {
  index: number;
  label: string;
  className?: string;
}

/** A journal theme in the topic list, ruled underneath. */
export function TopicItem({ index, label, className }: TopicItemProps) {
  const reveal = useReveal<HTMLLIElement>({ delay: (index - 1) * 110 });

  return (
    <li
      data-reveal-rule="bottom"
      className={cn("group flex items-center gap-[22px] py-[15px] lg:py-5", className)}
      {...reveal}
    >
      <span className="hidden text-[12px] font-bold text-brand tabular-nums lg:block">
        {String(index).padStart(2, "0")}
      </span>
      <span className="text-[16px] font-semibold text-white transition-transform duration-500 ease-out lg:text-[19px] lg:font-bold lg:group-hover:translate-x-2">
        {label}
      </span>
    </li>
  );
}
