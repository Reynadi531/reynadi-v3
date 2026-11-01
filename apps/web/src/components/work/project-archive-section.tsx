import { Reveal, RevealWords } from "@/components/motion/reveal";
import { useReveal } from "@/components/motion/use-reveal";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { ProjectCard } from "@/components/site/project-card";
import { ProjectSpotlight } from "@/components/site/project-spotlight";
import { Section } from "@/components/site/section";
import { projects, spotlightProjects } from "@/lib/projects";

const projectCount = projects.length + spotlightProjects.length;

export function ProjectArchiveSection() {
  return (
    <Section
      id="projects"
      tone="base"
      containerClassName="flex flex-col gap-7 pt-[70px] pb-[78px] lg:gap-[43px] lg:pt-[100px] lg:pb-[110px]"
    >
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex flex-col gap-7">
          <Reveal className="lg:hidden">
            <Eyebrow>03 / Projects</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <Heading size="md" className="lg:text-[40px] lg:tracking-[-1.8px]">
              <span className="lg:hidden">Built and shipped.</span>
              <span className="hidden lg:inline">Selected projects</span>
            </Heading>
          </Reveal>
        </div>
        <Reveal delay={180} className="hidden lg:block">
          <Eyebrow className="text-fg-subtle lg:tracking-[1.2px]">
            03 / Projects<span className="mx-4">·</span>001 —{" "}
            {String(projectCount).padStart(3, "0")}
          </Eyebrow>
        </Reveal>
      </div>

      <div className="grid gap-7 lg:grid-cols-2 lg:gap-y-[54px]">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            revealDelay={i * 140}
            trackLocation="work-archive"
            {...project}
          />
        ))}
      </div>

      {spotlightProjects.map((project, i) => (
        <ProjectSpotlight
          key={project.title}
          index={projects.length + i + 1}
          trackLocation="work-archive"
          {...project}
        />
      ))}

      <CommonThread />
    </Section>
  );
}

/** Desktop-only closing statement tying the projects together. */
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
        text="Six builds across mapping, finance, commerce, firmware, AI, and open data — each made to turn messy real-world work into something dependable."
      />
    </div>
  );
}
