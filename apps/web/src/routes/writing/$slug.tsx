import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { ArticleInterlude } from "@/components/article/article-interlude";
import { ArticleMasthead } from "@/components/article/article-masthead";
import { articleContentId, ArticleOutline } from "@/components/article/article-outline";
import { ArticleContext, articleComponents } from "@/components/article/article-prose";
import { NextArticle } from "@/components/article/next-article";
import { ReadingProgress } from "@/components/article/reading-progress";
import { Container } from "@/components/site/container";
import { getNextPost, getPost } from "@/lib/posts";
import { getViewCounts, recordView } from "@/lib/views";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();

    // The article still renders, without a count, if the database is unreachable.
    const counts = await getViewCounts().catch(() => undefined);
    return {
      title: post.meta.title,
      description: post.meta.description,
      views: counts && (counts[params.slug] ?? 0),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Writing"} — reynadi.id` },
      { name: "description", content: loaderData?.description },
      { property: "og:title", content: loaderData?.title },
      { property: "og:description", content: loaderData?.description },
      { property: "og:type", content: "article" },
    ],
  }),
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

              <div
                id={articleContentId}
                className="min-w-0 flex-1 lg:max-w-[800px] [&>*+*]:mt-6 [&>[data-section-head]]:mt-[42px] lg:[&>[data-section-head]]:mt-12 [&>[data-section-head]+*]:mt-[15px] lg:[&>[data-section-head]+*]:mt-[17px] [&>blockquote]:my-[42px] lg:[&>blockquote]:my-12 [&>section]:mt-[42px] lg:[&>section]:mt-12 [&>p:first-child]:text-[17px] [&>p:first-child]:text-[#e4e4e4] lg:[&>p:first-child]:text-[20px] lg:[&>p:first-child]:text-white"
              >
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
