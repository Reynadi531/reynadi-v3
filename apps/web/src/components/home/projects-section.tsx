import { ArrowRight } from "lucide-react";

import { ActionLink } from "@/components/site/action-link";
import { ProjectCard } from "@/components/site/project-card";
import { Section } from "@/components/site/section";
import { SectionHeader } from "@/components/site/section-header";
import { projects } from "@/lib/site";

export function ProjectsSection() {
  return (
    <Section
      id="work"
      tone="base"
      containerClassName="flex flex-col gap-7 pt-[70px] pb-[78px] lg:gap-[54px] lg:pt-28 lg:pb-[122px]"
    >
      <SectionHeader
        eyebrow={
          <>
            03 / <span className="lg:hidden">Project concepts</span>
            <span className="hidden lg:inline">Selected projects</span>
          </>
        }
        title="Concepts, explored."
        titleSize="md"
        aside="Exploratory product concepts — imagined interfaces for useful, dependable digital tools."
      />
      <div className="flex flex-col gap-7 lg:flex-row lg:items-start">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} revealDelay={i * 140} {...project} />
        ))}
      </div>
      <ActionLink
        href="/work"
        variant="text"
        size="none"
        className="hidden gap-3 text-[15px] lg:inline-flex [&_svg]:size-[18px] [&_svg]:text-brand"
      >
        View all projects
        <ArrowRight aria-hidden />
      </ActionLink>
    </Section>
  );
}
