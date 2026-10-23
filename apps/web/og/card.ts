import type { ReactNode } from "react";

import { ogImageSize } from "../src/lib/seo.ts";

// Mirrors the design tokens in `src/index.css`.
const color = {
  brand: "#0787f8",
  canvasDeep: "#050505",
  line: "#333333",
  fgMuted: "#b8b8b8",
  fgFaint: "#888888",
};

type Style = Record<string, string | number>;
type Child = ReactNode;

/** Satori takes React-shaped element objects; this keeps the template free of JSX. */
const h = (type: string, props: { style?: Style; src?: string }, ...children: Child[]) =>
  ({ type, key: null, props: { ...props, children } }) as unknown as ReactNode;

export interface CardContent {
  /** Small label above the heading. */
  eyebrow: string;
  /** Heading lines; a single entry wraps on its own. */
  heading: string[];
  description?: string;
  /** Pieces of the footer line, e.g. date and category. */
  details?: string[];
  /** Section shown top right, e.g. "Writing". */
  section?: string;
  /** Data URI of an image shown on the right. */
  image?: string;
}

function headingSize(lines: string[], narrow: boolean) {
  const longest = Math.max(...lines.map((line) => line.length));
  const total = lines.join(" ").length;
  if (narrow) return total <= 14 ? 92 : total <= 32 ? 64 : 52;
  if (lines.length > 2) return 64;
  if (total > 48) return longest <= 18 ? 72 : 60;
  return longest <= 20 ? 84 : 72;
}

export function card({ eyebrow, heading, description, details, section, image }: CardContent) {
  const size = headingSize(heading, Boolean(image));

  return h(
    "div",
    {
      style: {
        width: ogImageSize.width,
        height: ogImageSize.height,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: "64px 72px",
        backgroundColor: color.canvasDeep,
        backgroundImage: `radial-gradient(circle at 92% 0%, rgba(7, 135, 248, 0.22), transparent 55%)`,
        color: "#ffffff",
        fontFamily: "Inter",
      },
    },
    // Brand mark and section.
    h(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 14 } },
        h("div", { style: { width: 16, height: 16, backgroundColor: color.brand } }),
        h("div", { style: { fontSize: 30, fontWeight: 700, letterSpacing: -1 } }, "reynadi.id"),
      ),
      section
        ? h(
            "div",
            {
              style: {
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: color.fgFaint,
              },
            },
            section,
          )
        : null,
    ),
    // Body.
    h(
      "div",
      { style: { display: "flex", flex: 1, minHeight: 0, alignItems: "center", gap: 56 } },
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", flex: 1, minWidth: 0, gap: 26 } },
        h(
          "div",
          {
            style: {
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: color.brand,
            },
          },
          eyebrow,
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              fontSize: size,
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: -size * 0.035,
            },
          },
          ...heading.map((line) => h("div", {}, line)),
        ),
        description
          ? h(
              "div",
              {
                style: {
                  fontSize: 26,
                  lineHeight: 1.45,
                  color: color.fgMuted,
                  maxWidth: 920,
                  lineClamp: 2,
                },
              },
              description,
            )
          : null,
      ),
      image
        ? h("img", {
            src: image,
            style: {
              width: 440,
              height: 246,
              flexShrink: 0,
              objectFit: "cover",
              border: `1px solid ${color.line}`,
            },
          })
        : null,
    ),
    // Footer line.
    details?.length
      ? h(
          "div",
          {
            style: {
              display: "flex",
              gap: 18,
              paddingTop: 26,
              borderTop: `1px solid ${color.line}`,
              fontSize: 20,
              fontWeight: 500,
              color: color.fgFaint,
            },
          },
          ...details.flatMap((detail, i) => [
            i > 0 ? h("div", { style: { color: color.brand } }, "/") : null,
            h("div", {}, detail),
          ]),
        )
      : null,
  );
}
