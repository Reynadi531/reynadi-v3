declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { MDXProps } from "mdx/types";

  import type { ArticleHeading } from "../mdx/remark-article-meta";

  /** Raw YAML front matter; validated in `lib/posts.ts`. */
  export const frontmatter: Record<string, unknown>;
  export const headings: ArticleHeading[];
  /** Estimated reading time in whole minutes. */
  export const readMinutes: number;
  const MDXContent: ComponentType<MDXProps>;
  export default MDXContent;
}
