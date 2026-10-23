/**
 * Renders the site icon — a lowercase "r" with the brand square as its period — into
 * `public/`: favicon.svg, favicon.ico, apple-touch-icon.png, and the manifest icons.
 * The output is committed; rerun after changing the mark: `bun run icons`.
 */
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

import { Resvg } from "@resvg/resvg-js";
import type { ReactNode } from "react";
import satori from "satori";

const require = createRequire(import.meta.url);
const publicDir = path.join(import.meta.dirname, "..", "public");

const size = 512;
const font = await readFile(require.resolve("@fontsource/inter/files/inter-latin-900-normal.woff"));

const h = (type: string, style: Record<string, string | number>, ...children: ReactNode[]) =>
  ({ type, key: null, props: { style, children } }) as unknown as ReactNode;

/** `rounded` for browser tabs and manifests; iOS rounds the apple-touch icon itself. */
const mark = (rounded: boolean) =>
  h(
    "div",
    {
      width: size,
      height: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#050505",
      borderRadius: rounded ? 112 : 0,
      fontFamily: "Inter",
      fontWeight: 900,
      color: "#ffffff",
    },
    h(
      "div",
      { display: "flex", alignItems: "flex-end", marginTop: -92 },
      h("div", { fontSize: 520, lineHeight: 1, letterSpacing: -16 }, "r"),
      // Sits on the baseline, like a period.
      h("div", {
        width: 96,
        height: 96,
        marginLeft: 8,
        marginBottom: 70,
        backgroundColor: "#0787f8",
      }),
    ),
  );

const render = (rounded: boolean) =>
  satori(mark(rounded), {
    width: size,
    height: size,
    fonts: [{ name: "Inter", data: font, weight: 900, style: "normal" }],
  });

const png = (svg: string, width: number) =>
  new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();

/** An ICO file that wraps PNG images, one directory entry per size. */
function ico(images: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size % 256, entry); // 256 is stored as 0
    header.writeUInt8(size % 256, entry + 1);
    header.writeUInt16LE(1, entry + 4); // color planes
    header.writeUInt16LE(32, entry + 6); // bits per pixel
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });

  return Buffer.concat([header, ...images.map(({ data }) => data)]);
}

const rounded = await render(true);
const square = await render(false);

await Promise.all([
  writeFile(path.join(publicDir, "favicon.svg"), rounded),
  writeFile(
    path.join(publicDir, "favicon.ico"),
    ico([16, 32, 48].map((s) => ({ size: s, data: png(rounded, s) }))),
  ),
  writeFile(path.join(publicDir, "apple-touch-icon.png"), png(square, 180)),
  writeFile(path.join(publicDir, "icon-192.png"), png(rounded, 192)),
  writeFile(path.join(publicDir, "icon-512.png"), png(rounded, 512)),
]);
