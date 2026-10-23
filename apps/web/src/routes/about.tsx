import { createFileRoute } from "@tanstack/react-router";

import { AboutHeroSection } from "@/components/about/about-hero-section";
import { ApproachSection } from "@/components/about/approach-section";
import { StorySection } from "@/components/about/story-section";
import { absoluteUrl, personJsonLd, staticPages, staticPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    staticPageSeo(staticPages.about, [
      personJsonLd,
      {
        "@type": "ProfilePage",
        url: absoluteUrl(staticPages.about.path),
        mainEntity: { "@id": personJsonLd["@id"] },
      },
    ]),
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
