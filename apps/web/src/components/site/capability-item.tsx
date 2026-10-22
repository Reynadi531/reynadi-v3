import { useReveal } from "@/components/motion/use-reveal";

export interface Capability {
  title: string;
  description: string;
}

interface CapabilityItemProps extends Capability {
  index: number;
}

export function CapabilityItem({ index, title, description }: CapabilityItemProps) {
  const reveal = useReveal<HTMLLIElement>({ delay: (index - 1) * 120 });

  return (
    <li data-reveal-rule className="flex flex-1 flex-col gap-[21px] pt-6" {...reveal}>
      <span className="text-[12px] font-bold text-brand">{String(index).padStart(2, "0")}</span>
      <h3 className="text-[22px] font-extrabold tracking-[-0.5px] text-white">{title}</h3>
      <p className="text-[15px]/[23px] text-fg-subtle">{description}</p>
    </li>
  );
}
