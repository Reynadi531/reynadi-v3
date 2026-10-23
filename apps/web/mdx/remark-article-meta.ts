import { valueToEstree } from "estree-util-value-to-estree";
import GithubSlugger from "github-slugger";
import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import { define } from "unist-util-mdx-define";

export interface ArticleHeading {
  id: string;
  title: string;
}

/** Average adult reading speed for on-screen prose. */
const wordsPerMinute = 200;

/**
 * Derives article metadata from the MDX source and exports it next to the front matter:
 * - `headings`: every top-level `##` heading with an id, for the reading rail and section markers.
 * - `readMinutes`: estimated reading time in whole minutes, never below 1.
 */
export function remarkArticleMeta() {
  return (tree: Root, file: Parameters<typeof define>[1]) => {
    const slugger = new GithubSlugger();
    const headings: ArticleHeading[] = [];

    for (const node of tree.children) {
      if (node.type !== "heading" || node.depth !== 2) continue;

      const title = toString(node);
      const id = slugger.slug(title);
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
      headings.push({ id, title });
    }

    // The front matter node is not reading material.
    const prose = toString({
      type: "root",
      children: tree.children.filter((n) => n.type !== "yaml"),
    });
    const words = prose.split(/\s+/).filter(Boolean).length;
    const readMinutes = Math.max(1, Math.round(words / wordsPerMinute));

    define(tree, file, {
      headings: valueToEstree(headings),
      readMinutes: valueToEstree(readMinutes),
    });
  };
}
