import { z } from "zod";

import type { Experience } from "@/components/site/experience-item";

const frontmatterSchema = z.object({
  organization: z.string(),
  /** Short line under the organization, e.g. "Digital tipjar platform". */
  descriptor: z.string(),
  role: z.string(),
  /** Display text, e.g. "Mar 2023 — Present". */
  period: z.string(),
  /** Position in the list, ascending. */
  order: z.number().int().positive(),
});

interface ExperienceModule {
  frontmatter: unknown;
}

// Only the front matter is read; the MDX body is free for a future detail view.
const modules = import.meta.glob<ExperienceModule>("../../content/experience/*.mdx", {
  eager: true,
});

/** Every role in `content/experience`, in list order. */
export const experiences: Experience[] = Object.values(modules)
  .map((mod) => frontmatterSchema.parse(mod.frontmatter))
  .sort((a, b) => a.order - b.order)
  .map(({ order: _order, ...experience }) => experience);
