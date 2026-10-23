import { createFileRoute } from "@tanstack/react-router";

import { ExperienceSection } from "@/components/home/experience-section";
import { ConceptsSection } from "@/components/work/concepts-section";
import { WorkHeroSection } from "@/components/work/work-hero-section";
import { staticPages, staticPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  head: () => staticPageSeo(staticPages.work),
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
