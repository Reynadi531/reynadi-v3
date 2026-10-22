import { ArrowUpRight } from "lucide-react";

import { Reveal, RevealLines } from "@/components/motion/reveal";
import { ActionLink } from "@/components/site/action-link";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { Section } from "@/components/site/section";
import { contactHref } from "@/lib/site";

export function ContactSection() {
  return (
    <Section
      id="contact"
      tone="deep"
      containerClassName="flex flex-col gap-[22px] py-[72px] lg:gap-0 lg:pt-[108px] lg:pb-0"
    >
      <Reveal>
        <Eyebrow tone="brand" className="lg:text-fg-quiet">
          <span className="lg:hidden">06 / Contact</span>
          <span className="hidden lg:inline">Have something in mind? / Let’s make it real</span>
        </Eyebrow>
      </Reveal>
      <div className="flex flex-col gap-[22px] lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pt-7 lg:pb-[115px]">
        <Heading size="xl" className="lg:max-w-[860px]">
          <RevealLines delay={90} lines={["Let’s build", "something great."]} />
        </Heading>
        <Reveal delay={360}>
          <ActionLink href={contactHref} size="cta">
            Contact me
            <ArrowUpRight aria-hidden />
          </ActionLink>
        </Reveal>
      </div>
    </Section>
  );
}
