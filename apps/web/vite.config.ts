import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { varlockVitePlugin } from "@varlock/vite-integration";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

import { remarkArticleMeta } from "./mdx/remark-article-meta.ts";

export default defineConfig(({ command }) => ({
  server: {
    port: 3001,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    varlockVitePlugin({ ssrInjectMode: "resolved-env" }),
    tailwindcss(),
    // Articles live in `content/writing/*.mdx`. Must run before the React plugin.
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkArticleMeta],
      }),
    },
    tanstackStart(),
    nitro(),
    viteReact({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  // These deployments run the standalone build artifact. Dev keeps deps external:
  // inlining CJS packages (e.g. react) breaks Vite's ESM module runner.
  ssr: {
    noExternal: command === "build" ? true : undefined,
  },
}));
