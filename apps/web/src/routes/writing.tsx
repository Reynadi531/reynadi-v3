import { createFileRoute } from "@tanstack/react-router";

import { JournalSection } from "@/components/writing/journal-section";
import { TopicsSection } from "@/components/writing/topics-section";
import { WritingHeroSection } from "@/components/writing/writing-hero-section";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Writing — reynadi.id" },
      {
        name: "description",
        content:
          "A place for what I’m learning about engineering, technology, and the process of making things better.",
      },
    ],
  }),
  component: WritingComponent,
});

function WritingComponent() {
  return (
    <main>
      <WritingHeroSection />
      <JournalSection />
      <TopicsSection />
    </main>
  );
}
