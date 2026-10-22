import { createFileRoute } from "@tanstack/react-router";

import { AboutHeroSection } from "@/components/about/about-hero-section";
import { ApproachSection } from "@/components/about/approach-section";
import { StorySection } from "@/components/about/story-section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — reynadi.id" },
      {
        name: "description",
        content:
          "Reynadi Andreas Priesley — a software engineer who builds products, automates the hard parts, and makes the cloud work its magic.",
      },
    ],
  }),
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <main>
      <AboutHeroSection />
      <StorySection />
      <ApproachSection />
    </main>
  );
}
