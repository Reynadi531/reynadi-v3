import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { ArticleInterlude } from "@/components/article/article-interlude";
import { ArticleMasthead } from "@/components/article/article-masthead";
import { articleContentId, ArticleOutline } from "@/components/article/article-outline";
import {
  ArticleContext,
  articleComponents,
  articleContentClassName,
} from "@/components/article/article-prose";
import { NextArticle } from "@/components/article/next-article";
import { ReadingProgress } from "@/components/article/reading-progress";
import { Container } from "@/components/site/container";
import { getNextPost, getPost } from "@/lib/posts";
import { absoluteUrl, ogImagePath, personJsonLd, seo } from "@/lib/seo";
import { getViewCounts, recordView } from "@/lib/views";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();

    // The article still renders, without a count, if the database is unreachable.
    const counts = await getViewCounts().catch(() => undefined);
    return {
      path: post.href,
      title: post.meta.title,
      description: post.meta.description,
      date: post.meta.date,
      category: post.meta.category,
      views: counts && (counts[params.slug] ?? 0),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { path, title, description, date, category } = loaderData;

    return seo({
      path,
      title,
      description,
      type: "article",
      article: { publishedTime: date, section: category },
      jsonLd: [
        {
          "@type": "BlogPosting",
          "@id": `${absoluteUrl(path)}#article`,
          headline: title,
          description,
          url: absoluteUrl(path),
          mainEntityOfPage: absoluteUrl(path),
          image: absoluteUrl(ogImagePath(path)),
          datePublished: date,
          dateModified: date,
          articleSection: category,
          inLanguage: "en",
          author: { "@id": personJsonLd["@id"] },
          publisher: { "@id": personJsonLd["@id"] },
        },
        personJsonLd,
      ],
    });
  },
  component: PostComponent,
});

function PostComponent() {
  const { slug } = Route.useParams();
  const post = getPost(slug);
  if (!post) throw notFound();

  const { meta, headings, Content } = post;
  const [views, setViews] = useState(Route.useLoaderData().views);

  // One count per browser session, so reloads and revisits don't inflate it.
  useEffect(() => {
    const key = `viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked: count the view anyway.
    }
    recordView({ data: { slug } })
      .then(setViews)
      .catch(() => {});
  }, [slug]);

  const context = useMemo(
    () => ({ headings, sectionLabel: meta.sectionLabel }),
    [headings, meta.sectionLabel],
  );

  return (
    <>
      <ReadingProgress />
      <main>
        <article>
          <ArticleMasthead meta={meta} views={views} />
          <ArticleInterlude meta={meta} />

          <div className="w-full bg-canvas">
            <Container className="flex gap-14 pt-[65px] pb-[83px] lg:pt-[104px] lg:pb-[120px] xl:gap-[100px]">
              <ArticleOutline headings={headings} meta={meta} />

              <div id={articleContentId} className={articleContentClassName}>
                <ArticleContext value={context}>
                  <Content components={articleComponents} />
                </ArticleContext>
              </div>
            </Container>
          </div>
        </article>

        <NextArticle next={getNextPost(slug)} />
      </main>
    </>
  );
}
