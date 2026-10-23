// No `@/` imports here: `og/plugin.ts` loads this file from the Vite config to render the cards.

/** Production origin. Canonical URLs, social cards, and the sitemap are absolute against it. */
export const siteUrl = "https://reynadi.id";
export const siteName = "reynadi.id";
export const siteDescription =
  "Reynadi is a software engineer turning complex ideas into products, systems, and experiences that work.";

export const author = {
  name: "Reynadi Andreas Priesley",
  jobTitle: "Software engineer",
  // TODO: add the LinkedIn profile once `socialLinks` points at it.
  sameAs: ["https://github.com/Reynadi531"],
};

export const ogImageSize = { width: 1200, height: 630 } as const;

/** Copy for the hand-written pages: their `<head>` and their generated social card. */
export interface StaticPage {
  path: string;
  title: string;
  description: string;
  /** Small label above the card heading. */
  eyebrow: string;
  /** Large card heading, one entry per line. */
  heading: string[];
}

export const staticPages = {
  home: {
    path: "/",
    title: "Software engineer",
    description: siteDescription,
    eyebrow: "Software engineer / Builder / Indonesia",
    heading: ["Building what’s", "next, reliably."],
  },
  work: {
    path: "/work",
    title: "Work",
    description:
      "Products, platforms, and infrastructure shaped with equal parts curiosity and care.",
    eyebrow: "01 / Work — Selected projects",
    heading: ["Work that moves", "ideas forward."],
  },
  about: {
    path: "/about",
    title: "About",
    description:
      "Reynadi Andreas Priesley — a software engineer who builds products, automates the hard parts, and makes the cloud work its magic.",
    eyebrow: "02 / About — The person behind the work",
    heading: ["Hi, I’m Rey.", "I make things", "work better."],
  },
  writing: {
    path: "/writing",
    title: "Writing",
    description:
      "A place for what I’m learning about engineering, technology, and the process of making things better.",
    eyebrow: "03 / Writing — Notes & ideas",
    heading: ["Curiosity,", "documented."],
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description:
      "Tell me what you’re building, what needs solving, or what you’d like to explore together.",
    eyebrow: "04 / Contact — Start a conversation",
    heading: ["Have an idea?", "Let’s make it real."],
  },
} satisfies Record<string, StaticPage>;

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

/** Where the generated card for a page lives under `public/`, e.g. `/og/writing/slug.png`. */
export const ogImagePath = (path: string) => `/og/${path === "/" ? "index" : path.slice(1)}.png`;

export const personJsonLd = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: author.name,
  jobTitle: author.jobTitle,
  url: siteUrl,
  image: absoluteUrl("/images/reynadi-ascii-portrait.png"),
  sameAs: author.sameAs,
};

interface SeoInput {
  path: string;
  /** Page name; combined with the site name. */
  title: string;
  description: string;
  type?: "website" | "article";
  /** Card image path. Defaults to the card generated for `path`. */
  image?: string;
  imageAlt?: string;
  article?: { publishedTime: string; section?: string };
  /** Schema.org nodes, merged into one `@graph`. */
  jsonLd?: Record<string, unknown>[];
}

/** `<head>` tags for a page: title, description, canonical, Open Graph, Twitter, JSON-LD. */
export function seo({
  path,
  title,
  description,
  type = "website",
  image = ogImagePath(path),
  imageAlt = title,
  article,
  jsonLd,
}: SeoInput) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  // The home page leads with the site name; every other page leads with its own.
  const fullTitle = path === "/" ? `${siteName} — ${title}` : `${title} — ${siteName}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: String(ogImageSize.width) },
      { property: "og:image:height", content: String(ogImageSize.height) },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: imageAlt },
      ...(article
        ? [
            { property: "article:published_time", content: article.publishedTime },
            { property: "article:author", content: author.name },
            ...(article.section ? [{ property: "article:section", content: article.section }] : []),
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd?.length
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd }),
          },
        ]
      : [],
  };
}

export function staticPageSeo(page: StaticPage, jsonLd?: Record<string, unknown>[]) {
  return seo({ ...page, imageAlt: page.heading.join(" "), jsonLd });
}

const xmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

export const escapeXml = (value: string) => value.replace(/[&<>"']/g, (char) => xmlEntities[char]);
