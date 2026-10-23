import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";
import { z } from "zod";

import type { Article } from "@/components/site/article-item";

import type { ArticleHeading } from "../../mdx/remark-article-meta";

const frontmatterSchema = z.object({
  title: z.string(),
  /** Hand-set line breaks for large display titles. */
  titleLines: z.array(z.string()).optional(),
  /** The deck under the title, also the excerpt in the journal. */
  description: z.string(),
  /** Shorter excerpt for small screens. */
  mobileExcerpt: z.string().optional(),
  category: z.string(),
  /** Extra label after the category, e.g. "Sample article 01". */
  kicker: z.string().optional(),
  /** ISO date, quoted: `"2025-05-14"`. */
  date: z.iso.date(),
  /** Issue number shown large in the interlude band. */
  issue: z.number().int().positive(),
  /** Line set beside the issue number. */
  theme: z.string(),
  series: z.string().default("Field notes"),
  /** Short titles for the reading rail, in heading order. Falls back to the headings. */
  outline: z.array(z.string()).optional(),
  /** Marker after the section number, e.g. "01 / Principle". */
  sectionLabel: z.string().default("Principle"),
});

/** Front matter plus values derived from the article text. */
export type PostMeta = z.infer<typeof frontmatterSchema> & { readTime: string };

export interface Post {
  slug: string;
  href: string;
  meta: PostMeta;
  headings: ArticleHeading[];
  Content: ComponentType<MDXProps>;
}

interface PostModule {
  default: ComponentType<MDXProps>;
  frontmatter: unknown;
  headings: ArticleHeading[];
  readMinutes: number;
}

// Eager so articles render on the server and hydrate without a loading state.
const modules = import.meta.glob<PostModule>("../../content/writing/*.mdx", { eager: true });

/** Every article in `content/writing`, newest first. */
export const posts: Post[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.slice(path.lastIndexOf("/") + 1, -".mdx".length);

    return {
      slug,
      href: `/writing/${slug}`,
      meta: {
        ...frontmatterSchema.parse(mod.frontmatter),
        readTime: `${mod.readMinutes} min read`,
      },
      headings: mod.headings,
      Content: mod.default,
    };
  })
  .sort((a, b) => b.meta.date.localeCompare(a.meta.date));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** The next older article, if any. */
export function getNextPost(slug: string) {
  const index = posts.findIndex((post) => post.slug === slug);
  return index === -1 ? undefined : posts[index + 1];
}

/**
 * Journal entries for the writing page, newest first. The first one is featured.
 * `views` is omitted from each entry when `counts` is unavailable.
 */
export const toArticles = (counts?: Record<string, number>): Article[] =>
  posts.map(({ slug, href, meta }) => ({
    title: meta.title,
    titleLines: meta.titleLines,
    excerpt: meta.description,
    mobileExcerpt: meta.mobileExcerpt,
    category: meta.category,
    readTime: meta.readTime,
    views: counts && (counts[slug] ?? 0),
    href,
  }));

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(date: string) {
  return dateFormat.format(new Date(`${date}T00:00:00Z`));
}
