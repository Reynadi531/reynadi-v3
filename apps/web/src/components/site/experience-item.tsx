import { useReveal } from "@/components/motion/use-reveal";

export interface Experience {
  organization: string;
  descriptor: string;
  role: string;
  period: string;
}

interface ExperienceItemProps extends Experience {
  index: number;
}

export function ExperienceItem({
  index,
  organization,
  descriptor,
  role,
  period,
}: ExperienceItemProps) {
  const reveal = useReveal<HTMLLIElement>({ delay: (index - 1) * 120 });

  return (
    <li
      data-reveal-rule
      className="group flex flex-col gap-[9px] pt-[22px] lg:flex-row lg:items-center lg:gap-6 lg:py-7"
      {...reveal}
    >
      <span className="text-[11px] font-bold text-brand lg:text-[12px]">
        {String(index).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-[9px] transition-transform duration-500 ease-out lg:w-[490px] lg:group-hover:translate-x-2">
        <h3 className="text-[21px] font-extrabold tracking-[-0.5px] text-white lg:text-[24px] lg:tracking-[-0.7px] lg:whitespace-nowrap">
          {organization}
        </h3>
        <p className="hidden text-[11px] font-bold tracking-[1.1px] whitespace-nowrap text-fg-faint uppercase lg:block">
          {descriptor}
        </p>
      </div>
      <p className="text-[15px] text-fg-soft transition-colors duration-300 lg:w-[360px] lg:text-[17px] lg:font-medium lg:group-hover:text-white">
        {role}
      </p>
      <p className="text-[10px]/[14px] font-bold tracking-[0.5px] text-fg-faint uppercase lg:text-[11px]/[normal] lg:tracking-[1px] lg:whitespace-nowrap">
        <span className="lg:hidden">{descriptor} · </span>
        {period}
      </p>
    </li>
  );
}
