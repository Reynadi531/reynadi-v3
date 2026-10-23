import { createFileRoute } from "@tanstack/react-router";

import { posts } from "@/lib/posts";
import { projectEntries } from "@/lib/projects";
import { absoluteUrl, escapeXml, staticPages } from "@/lib/seo";

interface SitemapEntry {
  path: string;
  lastmod?: string;
}

const entries: SitemapEntry[] = [
  ...Object.values(staticPages).map(({ path }) => ({ path })),
  ...posts.map(({ href, meta }) => ({ path: href, lastmod: meta.date })),
  ...projectEntries.map(({ href }) => ({ path: href })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ path, lastmod }) =>
      `  <url><loc>${escapeXml(absoluteUrl(path))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
