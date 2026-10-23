import { ExperienceItem } from "@/components/site/experience-item";
import { Section } from "@/components/site/section";
import { SectionHeader } from "@/components/site/section-header";
import { experiences } from "@/lib/experience";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      tone="raised"
      containerClassName="flex flex-col gap-7 pt-[68px] pb-[74px] lg:gap-[55px] lg:pt-[105px] lg:pb-[110px]"
    >
      <SectionHeader
        eyebrow="02 / Work experience"
        title={
          <>
            The work behind
            <br className="lg:hidden" /> the work.
          </>
        }
        aside={
          <span className="block max-w-[360px] text-base/6">
            Roles where building products and building foundations go hand in hand.
          </span>
        }
      />
      <ol className="flex flex-col gap-7 lg:gap-0">
        {experiences.map((experience, i) => (
          <ExperienceItem key={experience.organization} index={i + 1} {...experience} />
        ))}
      </ol>
    </Section>
  );
}
