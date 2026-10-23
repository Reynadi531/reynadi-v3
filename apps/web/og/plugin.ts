import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import type { Plugin } from "vite";
import { parse } from "yaml";

import { ogImagePath, ogImageSize, staticPages } from "../src/lib/seo.ts";
import { card, type CardContent } from "./card.ts";

const require = createRequire(import.meta.url);

/** Satori needs static font files; the site's variable Inter woff2 is not one. */
const fonts = await Promise.all(
  ([400, 500, 700, 900] as const).map(async (weight) => ({
    name: "Inter",
    weight,
    style: "normal" as const,
    data: await readFile(
      require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`),
    ),
  })),
);

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

type Frontmatter = Record<string, unknown>;

async function readFrontmatter(file: string): Promise<Frontmatter> {
  const source = await readFile(file, "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  return match ? (parse(match[1]) as Frontmatter) : {};
}

const str = (value: unknown) => (typeof value === "string" ? value : undefined);

/** One card per MDX collection entry. Fields mirror the schemas in `src/lib/posts.ts` and `projects.ts`. */
const collections: Record<
  string,
  (fm: Frontmatter, readPublic: (src: string) => Promise<string>) => Promise<CardContent>
> = {
  writing: async (fm) => ({
    section: "Writing",
    eyebrow: [fm.category, fm.kicker].filter(Boolean).join(" / "),
    heading: Array.isArray(fm.titleLines) ? fm.titleLines.map(String) : [String(fm.title)],
    description: str(fm.description),
    details: [
      str(fm.date) && dateFormat.format(new Date(`${fm.date}T00:00:00Z`)),
      typeof fm.issue === "number" && `Issue ${String(fm.issue).padStart(2, "0")}`,
      str(fm.series) ?? "Field notes",
    ].filter((detail): detail is string => Boolean(detail)),
  }),
  work: async (fm, readPublic) => ({
    section: "Work",
    eyebrow: String(fm.category),
    heading: [String(fm.title)],
    description: str(fm.description),
    details: [str(fm.role), str(fm.year), str(fm.status)].filter((detail): detail is string =>
      Boolean(detail),
    ),
    image: str(fm.image) && (await readPublic(String(fm.image))),
  }),
};

async function render(content: CardContent, outFile: string) {
  const svg = await satori(card(content), { ...ogImageSize, fonts });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: ogImageSize.width } })
    .render()
    .asPng();
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, png);
}

/**
 * Renders a 1200×630 social card for every static page and every MDX entry in
 * `content/{writing,work}` into `public/og/` (see `ogImagePath`). Runs at build start
 * and again in dev whenever an entry changes.
 */
export function ogImages(): Plugin {
  let root = process.cwd();
  let generated: Promise<void> | undefined;

  const publicDir = () => path.join(root, "public");
  const outFile = (pagePath: string) => path.join(publicDir(), ogImagePath(pagePath));

  const readPublic = async (src: string) => {
    const data = await readFile(path.join(publicDir(), src));
    return `data:image/${path.extname(src).slice(1)};base64,${data.toString("base64")}`;
  };

  async function renderEntry(collection: string, file: string) {
    const slug = path.basename(file, ".mdx");
    const content = await collections[collection](await readFrontmatter(file), readPublic);
    await render(content, outFile(`/${collection}/${slug}`));
  }

  async function generateAll() {
    // Start clean so deleted entries don't leave stale cards behind.
    await rm(path.join(publicDir(), "og"), { recursive: true, force: true });

    const jobs: Promise<void>[] = Object.values(staticPages).map((page) =>
      render(
        { ...page, details: ["Reynadi Andreas Priesley", "Software engineer"] },
        outFile(page.path),
      ),
    );
    for (const collection of Object.keys(collections)) {
      const dir = path.join(root, "content", collection);
      for (const name of await readdir(dir)) {
        if (name.endsWith(".mdx")) jobs.push(renderEntry(collection, path.join(dir, name)));
      }
    }
    await Promise.all(jobs);
  }

  return {
    name: "og-images",
    configResolved(config) {
      root = config.root;
    },
    // Build start fires once per environment; one pass covers them all.
    buildStart() {
      generated ??= generateAll();
      return generated;
    },
    configureServer(server) {
      const onChange = (file: string) => {
        const collection = path.basename(path.dirname(file));
        if (!file.endsWith(".mdx") || !(collection in collections)) return;
        renderEntry(collection, file).catch((error: unknown) =>
          server.config.logger.error(`[og-images] ${file}: ${String(error)}`),
        );
      };
      server.watcher.on("add", onChange);
      server.watcher.on("change", onChange);
    },
  };
}
