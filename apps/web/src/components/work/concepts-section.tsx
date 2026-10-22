import { Reveal, RevealWords } from "@/components/motion/reveal";
import { useReveal } from "@/components/motion/use-reveal";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { ProjectCard } from "@/components/site/project-card";
import { ProjectSpotlight } from "@/components/site/project-spotlight";
import { Section } from "@/components/site/section";
import { projects, spotlightProject } from "@/lib/site";

const conceptCount = projects.length + 1;

export function ConceptsSection() {
  return (
    <Section
      id="concepts"
      tone="base"
      containerClassName="flex flex-col gap-7 pt-[70px] pb-[78px] lg:gap-[43px] lg:pt-[100px] lg:pb-[110px]"
    >
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-7">
          <Reveal className="lg:hidden">
            <Eyebrow>03 / Project concepts</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <Heading size="md" className="lg:text-[40px] lg:tracking-[-1.8px]">
              <span className="lg:hidden">Concepts, explored.</span>
              <span className="hidden lg:inline">Concept projects</span>
            </Heading>
          </Reveal>
        </div>
        <Reveal delay={180} className="hidden lg:block">
          <Eyebrow className="text-fg-subtle lg:tracking-[1.2px]">
            03 / Concepts<span className="mx-4">·</span>001 —{" "}
            {String(conceptCount).padStart(3, "0")}
          </Eyebrow>
        </Reveal>
      </div>

      <div className="flex flex-col gap-7 lg:flex-row lg:items-start">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} revealDelay={i * 140} {...project} />
        ))}
      </div>

      <ProjectSpotlight index={conceptCount} {...spotlightProject} />

      <CommonThread />
    </Section>
  );
}

/** Desktop-only closing statement tying the concepts together. */
function CommonThread() {
  const reveal = useReveal<HTMLDivElement>({ variant: "fade" });

  return (
    <div
      data-reveal-rule
      className="hidden justify-between gap-10 overflow-hidden rounded-lg bg-canvas-raised px-[30px] py-[34px] lg:flex"
      {...reveal}
    >
      <Eyebrow className="lg:tracking-[1.4px]">The common thread</Eyebrow>
      <RevealWords
        delay={150}
        className="max-w-[780px] text-[24px]/[1.3] font-bold tracking-[-0.6px] text-white"
        text="Three product explorations across analytics, knowledge, and workflow — designed to make complex work feel clearer."
      />
    </div>
  );
}
