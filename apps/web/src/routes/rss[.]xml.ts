import { createFileRoute } from "@tanstack/react-router";

import { posts } from "@/lib/posts";
import { absoluteUrl, author, escapeXml, siteName, staticPages } from "@/lib/seo";

const { writing } = staticPages;

const items = posts.map(({ href, meta }) => {
  const url = escapeXml(absoluteUrl(href));
  return `    <item>
      <title>${escapeXml(meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${meta.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(meta.description)}</description>
      <category>${escapeXml(meta.category)}</category>
      <dc:creator>${escapeXml(author.name)}</dc:creator>
    </item>`;
});

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${writing.title} — ${siteName}`)}</title>
    <link>${absoluteUrl(writing.path)}</link>
    <description>${escapeXml(writing.description)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(feed, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
