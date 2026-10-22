import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { Section } from "@/components/site/section";
import { TopicItem } from "@/components/site/topic-item";
import { topics } from "@/lib/site";

export function TopicsSection() {
  return (
    <Section
      id="topics"
      tone="base"
      containerClassName="flex flex-col gap-[19px] pt-[65px] pb-[75px] lg:flex-row lg:justify-between lg:gap-10 lg:pt-[92px] lg:pb-[98px]"
    >
      <div className="flex flex-col gap-[19px] lg:w-[500px] lg:gap-[21px]">
        <Reveal>
          <Eyebrow>Browse by theme</Eyebrow>
        </Reveal>
        <Heading
          size="xs"
          className="text-[32px]/[1.12] tracking-[-1.2px] lg:text-[36px]/[1.12] lg:tracking-[-1.4px]"
        >
          <RevealLines delay={90} lines={["Follow the ideas", "that interest you."]} />
        </Heading>
      </div>

      <ul className="flex flex-col lg:w-[600px]">
        {topics.map((topic, i) => (
          <TopicItem key={topic} index={i + 1} label={topic} />
        ))}
      </ul>
    </Section>
  );
}
