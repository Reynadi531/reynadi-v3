import { createFileRoute, notFound } from "@tanstack/react-router";
import { useMemo } from "react";

import { articleContentId, ArticleOutline } from "@/components/article/article-outline";
import {
  ArticleContext,
  articleComponents,
  articleContentClassName,
} from "@/components/article/article-prose";
import { ReadingProgress } from "@/components/article/reading-progress";
import { NextBand } from "@/components/article/next-article";
import { ProjectMasthead } from "@/components/project/project-masthead";
import { ProjectPreview } from "@/components/project/project-preview";
import { Container } from "@/components/site/container";
import { getNextProject, getProject } from "@/lib/projects";
import { absoluteUrl, ogImagePath, personJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();

    const { title, description, category, year, stack } = project.meta;
    return { path: project.href, title, description, category, year, stack };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { path, title, description, category, year, stack } = loaderData;

    return seo({
      path,
      title,
      description,
      jsonLd: [
        {
          "@type": "CreativeWork",
          "@id": `${absoluteUrl(path)}#work`,
          name: title,
          description,
          url: absoluteUrl(path),
          image: absoluteUrl(ogImagePath(path)),
          genre: category,
          dateCreated: year,
          keywords: stack.join(", "),
          inLanguage: "en",
          creator: { "@id": personJsonLd["@id"] },
        },
        personJsonLd,
      ],
    });
  },
  component: ProjectComponent,
});

function ProjectComponent() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) throw notFound();

  const { meta, headings, Content } = project;
  const next = getNextProject(slug);

  const context = useMemo(
    () => ({ headings, sectionLabel: meta.sectionLabel }),
    [headings, meta.sectionLabel],
  );

  return (
    <>
      <ReadingProgress />
      <main>
        <article>
          <ProjectMasthead meta={meta} />
          <ProjectPreview meta={meta} />

          <div className="w-full bg-canvas">
            <Container className="flex gap-14 pt-[65px] pb-[83px] lg:pt-[104px] lg:pb-[120px] xl:gap-[100px]">
              <ArticleOutline headings={headings} meta={meta} label="In this project" />

              <div id={articleContentId} className={articleContentClassName}>
                <ArticleContext value={context}>
                  <Content components={articleComponents} />
                </ArticleContext>
              </div>
            </Container>
          </div>
        </article>

        <NextBand
          href={next?.href ?? "/work"}
          label={next ? `Next project / ${next.meta.category}` : "Explore more / All work"}
          title={next?.meta.title ?? "Back to all work"}
        />
      </main>
    </>
  );
}
