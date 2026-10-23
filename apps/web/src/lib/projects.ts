import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import { z } from "zod";

import type { Project } from "@/components/site/project-card";

import type { ArticleHeading } from "../../mdx/remark-article-meta";

const frontmatterSchema = z.object({
  title: z.string(),
  /** The card blurb, also the deck under the title on the detail page. */
  description: z.string(),
  /** e.g. "Product concept / Analytics". */
  category: z.string(),
  /** Preview image path under `public/`. */
  image: z.string(),
  /** Background shown behind the preview while the image loads. */
  previewClassName: z.string().optional(),
  /** `card` shows in the two-up grid on the work page, `spotlight` as a full-width feature. */
  layout: z.enum(["card", "spotlight"]).default("card"),
  /** Position in the archive, ascending. */
  order: z.number().int().positive(),
  role: z.string(),
  year: z.string(),
  status: z.string(),
  stack: z.array(z.string()).default([]),
  /** Short titles for the reading rail, in heading order. Falls back to the headings. */
  outline: z.array(z.string()).optional(),
  /** Marker after the section number, e.g. "01 / Case study". */
  sectionLabel: z.string().default("Case study"),
});

export type ProjectMeta = z.infer<typeof frontmatterSchema>;

export interface ProjectEntry {
  slug: string;
  href: string;
  meta: ProjectMeta;
  headings: ArticleHeading[];
  Content: ComponentType<MDXProps>;
}

interface ProjectModule {
  default: ComponentType<MDXProps>;
  frontmatter: unknown;
  headings: ArticleHeading[];
}

// Eager so project pages render on the server and hydrate without a loading state.
const modules = import.meta.glob<ProjectModule>("../../content/work/*.mdx", { eager: true });

/** Every project in `content/work`, in archive order. */
export const projectEntries: ProjectEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.slice(path.lastIndexOf("/") + 1, -".mdx".length);

    return {
      slug,
      href: `/work/${slug}`,
      meta: frontmatterSchema.parse(mod.frontmatter),
      headings: mod.headings,
      Content: mod.default,
    };
  })
  .sort((a, b) => a.meta.order - b.meta.order);

export function getProject(slug: string) {
  return projectEntries.find((entry) => entry.slug === slug);
}

/** The next project in the archive, wrapping back to the first. `undefined` if it is the only one. */
export function getNextProject(slug: string) {
  const index = projectEntries.findIndex((entry) => entry.slug === slug);
  if (index === -1 || projectEntries.length < 2) return undefined;
  return projectEntries[(index + 1) % projectEntries.length];
}

const toProject = ({ href, meta }: ProjectEntry): Project => ({
  title: meta.title,
  description: meta.description,
  category: meta.category,
  image: meta.image,
  previewClassName: meta.previewClassName,
  href,
});

/** Projects for the two-up grid. */
export const projects: Project[] = projectEntries
  .filter(({ meta }) => meta.layout === "card")
  .map(toProject);

/** Full-width features shown after the grid. */
export const spotlightProjects: Project[] = projectEntries
  .filter(({ meta }) => meta.layout === "spotlight")
  .map(toProject);
