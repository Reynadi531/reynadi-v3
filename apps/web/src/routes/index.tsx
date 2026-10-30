import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { WritingSection } from "@/components/home/writing-section";
import { heroBackdropImage } from "@/components/motion/hero-backdrop";
import {
  personJsonLd,
  siteDescription,
  siteName,
  siteUrl,
  staticPages,
  staticPageSeo,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const head = staticPageSeo(staticPages.home, [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en",
        author: { "@id": personJsonLd["@id"] },
      },
      personJsonLd,
    ]);

    return {
      ...head,
      links: [
        ...head.links,
        // The desktop backdrop is the largest paint; only desktop shows it.
        {
          rel: "preload",
          as: "image",
          href: heroBackdropImage,
          type: "image/webp",
          media: "(min-width: 1024px)",
          fetchPriority: "high",
        },
      ],
    };
  },
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <WritingSection />
      <ContactSection />
    </main>
  );
}
