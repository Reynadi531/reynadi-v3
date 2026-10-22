import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { WritingSection } from "@/components/home/writing-section";

export const Route = createFileRoute("/")({
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
