import { cn } from "@reynad-v3/ui/lib/utils";
import type { MDXComponents } from "mdx/types";
import { createContext, use, type ComponentProps, type ReactNode, type RefObject } from "react";

import { Reveal, RevealLines, RevealWords } from "@/components/motion/reveal";
import { useReveal } from "@/components/motion/use-reveal";
import { underlineOnHover } from "@/components/site/underline";
import type { Post } from "@/lib/posts";

interface ArticleContextValue {
  headings: Post["headings"];
  sectionLabel: string;
}

export const ArticleContext = createContext<ArticleContextValue>({
  headings: [],
  sectionLabel: "Principle",
});

function Paragraph({ children }: ComponentProps<"p">) {
  return (
    <Reveal as="p" className="text-base/[1.65] text-fg-muted lg:text-[18px]/[1.65]">
      {children}
    </Reveal>
  );
}

/** Plain text of a node, or `undefined` once it holds anything but strings and paragraphs. */
function plainText(node: ReactNode): string | undefined {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) {
    const parts = node.map(plainText);
    return parts.every((part) => part !== undefined) ? parts.join("") : undefined;
  }
  if (
    typeof node === "object" &&
    node &&
    "type" in node &&
    (node.type === "p" || node.type === Paragraph)
  ) {
    return plainText((node.props as { children?: ReactNode }).children);
  }
  return undefined;
}

/** Numbered section opener: marker line, then the heading sliding out of a mask. */
function SectionHeading({ id, children }: ComponentProps<"h2">) {
  const { headings, sectionLabel } = use(ArticleContext);
  const number = String(headings.findIndex((heading) => heading.id === id) + 1).padStart(2, "0");

  return (
    <div data-section-head className="flex flex-col gap-[15px] lg:gap-[17px]">
      <Reveal>
        <p className="text-[11px] font-bold tracking-[1.1px] text-brand uppercase lg:tracking-[1.3px]">
          {number}
          <span className="mx-2">/</span>
          {sectionLabel}
        </p>
      </Reveal>
      <h2
        id={id}
        className="scroll-mt-28 text-[26px]/[1.18] font-extrabold tracking-[-0.6px] text-white lg:text-[31px]/[1.18] lg:tracking-[-1.1px]"
      >
        <RevealLines delay={80} lines={[children]} />
      </h2>
    </div>
  );
}

/** Pull quote: the brand bar grows down the edge, then the words rise into place. */
function PullQuote({ children }: ComponentProps<"blockquote">) {
  const { ref, ...reveal } = useReveal<HTMLQuoteElement>();
  const text = plainText(children);

  return (
    <blockquote
      ref={ref as RefObject<HTMLQuoteElement>}
      data-reveal-bar
      className="bg-canvas-raised px-[23px] py-[25px] lg:px-[39px] lg:py-[34px]"
      {...reveal}
    >
      <div className="text-xl/[1.4] font-bold tracking-[-0.4px] text-white lg:text-2xl/[1.35] lg:tracking-[-0.5px]">
        {text ? <RevealWords delay={240} text={text} /> : children}
      </div>
    </blockquote>
  );
}

/** Closing note: a rule draws in above it. Use as `<Takeaway>…</Takeaway>` in MDX. */
export function Takeaway({
  title = "The takeaway",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const { ref, ...reveal } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      data-reveal-rule
      className="flex flex-col gap-4 pt-[25px] lg:gap-[19px] lg:pt-7"
      {...reveal}
    >
      <h2 className="text-[23px] font-extrabold text-white lg:text-[25px] lg:tracking-[-0.6px]">
        {title}
      </h2>
      <div className="[&_p]:lg:leading-[1.6]">{children}</div>
    </section>
  );
}

const components: MDXComponents = {
  h2: SectionHeading,
  blockquote: PullQuote,
  Takeaway,
  p: Paragraph,
  h3: ({ children, id }) => (
    <Reveal>
      <h3
        id={id}
        className="mt-2 text-[21px]/[1.25] font-extrabold tracking-[-0.4px] text-white lg:text-[24px]"
      >
        {children}
      </h3>
    </Reveal>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className={cn(
        "font-semibold text-white transition-colors hover:text-brand",
        underlineOnHover,
      )}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
  ul: ({ children }) => (
    <ul className="flex list-disc flex-col gap-2 pl-6 text-base/[1.65] text-fg-muted marker:text-brand lg:text-[18px]/[1.65]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="flex list-decimal flex-col gap-2 pl-6 text-base/[1.65] text-fg-muted marker:font-bold marker:text-brand lg:text-[18px]/[1.65]">
      {children}
    </ol>
  ),
  code: ({ children }) => (
    <code className="rounded bg-canvas-raised px-1.5 py-0.5 font-mono text-[0.85em] text-white">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-[10px] bg-canvas-raised p-5 font-mono text-[14px]/[1.6] text-fg-soft [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-line-subtle" />,
};

export { components as articleComponents };
