import { ArrowRight } from "lucide-react";

import { ActionLink } from "@/components/site/action-link";
import { ProjectCard } from "@/components/site/project-card";
import { Section } from "@/components/site/section";
import { SectionHeader } from "@/components/site/section-header";
import { trackClick } from "@/lib/analytics";
import { projects } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <Section
      id="work"
      tone="base"
      containerClassName="flex flex-col gap-7 pt-[70px] pb-[78px] lg:gap-[54px] lg:pt-28 lg:pb-[122px]"
    >
      <SectionHeader
        eyebrow="03 / Selected projects"
        title="Built and shipped."
        titleSize="md"
        aside="Real products and research builds — from illegal-mining maps and mosque ledgers to ESP32 firmware."
      />
      <div className="grid gap-7 lg:grid-cols-2 lg:gap-y-[54px]">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            revealDelay={i * 140}
            trackLocation="home"
            {...project}
          />
        ))}
      </div>
      <ActionLink
        href="/work"
        {...trackClick("view-all-projects-click", { location: "home" })}
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
