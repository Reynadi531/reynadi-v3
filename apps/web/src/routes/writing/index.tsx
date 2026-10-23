import { createFileRoute } from "@tanstack/react-router";

import { JournalSection } from "@/components/writing/journal-section";
import { TopicsSection } from "@/components/writing/topics-section";
import { WritingHeroSection } from "@/components/writing/writing-hero-section";
import { toArticles } from "@/lib/posts";
import { getViewCounts } from "@/lib/views";

export const Route = createFileRoute("/writing/")({
  // The list still renders, without counts, if the database is unreachable.
  loader: async () => ({ counts: await getViewCounts().catch(() => undefined) }),
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
  const { counts } = Route.useLoaderData();

  return (
    <main>
      <WritingHeroSection />
      <JournalSection articles={toArticles(counts)} />
      <TopicsSection />
    </main>
  );
}
