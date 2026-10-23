import { createFileRoute } from "@tanstack/react-router";

import { ExperienceSection } from "@/components/home/experience-section";
import { ConceptsSection } from "@/components/work/concepts-section";
import { WorkHeroSection } from "@/components/work/work-hero-section";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — reynadi.id" },
      {
        name: "description",
        content:
          "Products, platforms, and infrastructure shaped with equal parts curiosity and care.",
      },
    ],
  }),
  component: WorkComponent,
});

function WorkComponent() {
  return (
    <main>
      <WorkHeroSection />
      <ExperienceSection />
      <ConceptsSection />
    </main>
  );
}
