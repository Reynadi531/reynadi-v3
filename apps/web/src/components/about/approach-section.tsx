import { Reveal } from "@/components/motion/reveal";
import { CapabilityItem } from "@/components/site/capability-item";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { Section } from "@/components/site/section";
import { approaches } from "@/lib/site";

export function ApproachSection() {
  return (
    <Section
      id="approach"
      tone="raised"
      containerClassName="flex flex-col gap-[27px] pt-[72px] pb-[78px] lg:gap-[49px] lg:pt-[90px] lg:pb-[105px]"
    >
      <Reveal className="lg:hidden">
        <Eyebrow>How I approach the work</Eyebrow>
      </Reveal>
      <Reveal delay={90}>
        <Heading size="xs" className="text-[33px]/[normal] lg:text-[38px] lg:tracking-[-1.5px]">
          <span className="lg:hidden">A few ways I build.</span>
          <span className="hidden lg:inline">How I approach the work</span>
        </Heading>
      </Reveal>
      <ul className="flex flex-col gap-[27px] lg:flex-row lg:gap-[35px]">
        {approaches.map((approach, i) => (
          <CapabilityItem
            key={approach.title}
            index={i + 1}
            className="lg:gap-[18px]"
            {...approach}
          />
        ))}
      </ul>
    </Section>
  );
}
