import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ActionLink } from "@/components/site/action-link";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { Section } from "@/components/site/section";

// TODO: point at the writing index once that route exists.
const writingHref = "/#writing";

export function WritingSection() {
  return (
    <Section
      id="writing"
      tone="base"
      containerClassName="flex flex-col gap-[17px] py-[65px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-[86px]"
    >
      <div className="flex max-w-[650px] flex-col gap-[17px]">
        <Reveal>
          <Eyebrow>
            05 / <span className="lg:hidden">Writing</span>
            <span className="hidden lg:inline">Notes &amp; ideas</span>
          </Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <Heading size="xs">
            Curiosity,
            <br className="lg:hidden" /> documented.
          </Heading>
        </Reveal>
        <Reveal
          as="p"
          delay={180}
          className="text-[15px]/[23px] text-fg-subtle lg:text-[17px]/[26px]"
        >
          <span className="lg:hidden">
            Notes on engineering, automation, and everything learned along the way.
          </span>
          <span className="hidden lg:inline">
            Thoughts on technology, engineering, and the lessons learned along the way.
          </span>
        </Reveal>
      </div>

      <Reveal delay={270}>
        <ActionLink
          href={writingHref}
          variant="text"
          size="none"
          className="text-[14px] text-brand lg:hidden"
        >
          Explore writing ↗
        </ActionLink>
        <ActionLink href={writingHref} className="hidden gap-[31px] lg:inline-flex">
          Explore writing
          <ArrowUpRight aria-hidden />
        </ActionLink>
      </Reveal>
    </Section>
  );
}
