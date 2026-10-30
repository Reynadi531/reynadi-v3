import { createFileRoute } from "@tanstack/react-router";

import { JournalSection } from "@/components/writing/journal-section";
import { TopicsSection } from "@/components/writing/topics-section";
import { WritingHeroSection } from "@/components/writing/writing-hero-section";
import { posts, toArticles } from "@/lib/posts";
import { getViewCounts } from "@/lib/views";
import { absoluteUrl, personJsonLd, staticPages, staticPageSeo } from "@/lib/seo";

const { writing } = staticPages;

export const Route = createFileRoute("/writing/")({
  // The list still renders, without counts, if the database is unreachable.
  loader: async () => ({ counts: await getViewCounts().catch(() => undefined) }),
  head: () =>
    staticPageSeo(writing, [
      {
        "@type": "Blog",
        "@id": `${absoluteUrl(writing.path)}#blog`,
        name: writing.title,
        description: writing.description,
        url: absoluteUrl(writing.path),
        inLanguage: "en",
        author: { "@id": personJsonLd["@id"] },
        blogPost: posts.map(({ href, meta }) => ({
          "@type": "BlogPosting",
          "@id": `${absoluteUrl(href)}#article`,
          headline: meta.title,
          url: absoluteUrl(href),
          datePublished: meta.date,
        })),
      },
      personJsonLd,
    ]),
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
