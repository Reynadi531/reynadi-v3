import { Reveal, RevealLines } from "@/components/motion/reveal";
import { ActionLink } from "@/components/site/action-link";
import { CapabilityItem } from "@/components/site/capability-item";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { Section } from "@/components/site/section";
import { capabilities } from "@/lib/site";

export function AboutSection() {
  return (
    <Section
      id="about"
      tone="raised"
      containerClassName="flex flex-col gap-[18px] py-[68px] lg:gap-[75px] lg:pt-[106px] lg:pb-28"
    >
      <div className="flex flex-col gap-[18px] lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div className="flex max-w-[790px] flex-col gap-[18px] lg:gap-[26px]">
          <Reveal>
            <Eyebrow>
              04 / <span className="lg:hidden">About</span>
              <span className="hidden lg:inline">What I do</span>
            </Eyebrow>
          </Reveal>
          <Heading size="lg">
            <RevealLines delay={90} lines={["Engineer by trade.", "Builder by instinct."]} />
          </Heading>
        </div>
        <Reveal
          as="p"
          delay={260}
          className="text-[15px]/[23px] text-fg-subtle lg:max-w-[365px] lg:text-lg/7"
        >
          <span className="lg:hidden">
            I build, automate, and make the cloud work its magic — with care at every layer.
          </span>
          <span className="hidden lg:inline">
            Hey, I’m Rey. I build, automate, and make the cloud work its magic — bringing care and
            clarity to every layer of a product.
          </span>
        </Reveal>
      </div>

      {/* TODO: point at the about page once that route exists. */}
      <Reveal delay={340} className="lg:hidden">
        <ActionLink href="/#about" variant="text" size="none" className="text-[14px] text-brand">
          More about me ↗
        </ActionLink>
      </Reveal>

      <ul className="hidden gap-7 lg:flex">
        {capabilities.map((capability, i) => (
          <CapabilityItem key={capability.title} index={i + 1} {...capability} />
        ))}
      </ul>
    </Section>
  );
}
