import { Reveal, RevealLines, RevealWords } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { Section } from "@/components/site/section";

export function StorySection() {
  return (
    <Section
      id="story"
      tone="base"
      containerClassName="flex flex-col gap-6 pt-[75px] pb-20 lg:flex-row lg:justify-between lg:gap-10 lg:pt-[105px] lg:pb-28"
    >
      <div className="flex flex-col gap-6 lg:w-[410px] lg:gap-5">
        <Reveal>
          <Eyebrow>A little context</Eyebrow>
        </Reveal>
        <Heading
          size="xs"
          className="text-[34px]/[1.1] tracking-[-1.4px] lg:text-[43px]/[1.1] lg:tracking-[-1.9px]"
        >
          <span className="lg:hidden">
            <RevealLines delay={90} lines={["Curiosity is the", "throughline."]} />
          </span>
          <span className="hidden lg:block">
            <RevealLines delay={90} lines={["Curiosity is", "the throughline."]} />
          </span>
        </Heading>
      </div>

      <div className="flex flex-col gap-6 lg:w-[680px] lg:gap-[25px]">
        <RevealWords
          delay={200}
          className="text-[17px]/[1.6] text-fg-soft lg:text-[20px]/[1.55] lg:text-white"
          text="I’m drawn to the space where ambitious ideas meet real-world constraints. That’s where thoughtful engineering turns a promising concept into something people can depend on."
        />
        <Reveal as="p" delay={420} className="text-base/[1.6] text-fg-subtle lg:text-lg/[1.55]">
          My work spans software development, DevOps, and cloud infrastructure. At Nusantara Wing
          Lab, I’m also learning what it means to build a team and a company with purpose.
        </Reveal>
      </div>
    </Section>
  );
}
