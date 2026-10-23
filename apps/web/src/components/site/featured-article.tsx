import { cn } from "@reynad-v3/ui/lib/utils";
import { ArrowUpRight } from "lucide-react";
import type { RefObject } from "react";

import { Parallax } from "@/components/motion/parallax";
import { RevealLines } from "@/components/motion/reveal";
import { useReveal } from "@/components/motion/use-reveal";

import type { Article } from "./article-item";
import { Eyebrow } from "./eyebrow";
import { ViewCount } from "./view-count";

interface FeaturedArticleProps extends Article {
  /** Issue number set large beside the copy on desktop. */
  index: number;
  className?: string;
}

/** The lead journal entry: a dark card with an oversized issue number drifting beside it. */
export function FeaturedArticle({
  index,
  title,
  titleLines,
  excerpt,
  mobileExcerpt,
  category,
  readTime,
  views,
  href,
  className,
}: FeaturedArticleProps) {
  const { ref, ...reveal } = useReveal<HTMLElement>();
  const Root = (href ? "a" : "article") as "article";
  const stats = (
    <>
      {readTime}
      <ViewCount views={views} leading="·" />
    </>
  );

  return (
    <Root
      ref={ref as RefObject<HTMLElement>}
      {...(href ? { href } : {})}
      className={cn(
        "group relative flex overflow-hidden rounded-[10px] bg-canvas-deep px-[25px] py-[30px] lg:items-center lg:justify-between lg:gap-[46px] lg:rounded-[14px] lg:px-16 lg:py-[62px]",
        className,
      )}
      {...reveal}
    >
      {/* Soft brand glow that follows the card in on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1/2 -left-1/4 size-[520px] rounded-full bg-brand/0 blur-3xl transition-colors duration-700 group-hover:bg-brand/[0.07]"
      />

      <div className="relative flex w-full flex-col gap-[18px] lg:w-[790px] lg:gap-[23px]">
        <Eyebrow className="lg:tracking-[1.3px]">
          Featured<span className="mx-2">/</span>
          {category}
          <span className="hidden lg:inline">
            <span className="mx-2">·</span>
            {stats}
          </span>
        </Eyebrow>

        <h3 className="text-[31px]/[1.08] font-black tracking-[-1.2px] text-white lg:text-[48px]/[1.08] lg:tracking-[-2.2px]">
          <RevealLines delay={150} lines={titleLines ?? [title]} />
        </h3>

        <p className="text-[15px]/[1.5] text-fg-subtle lg:max-w-[650px] lg:text-[17px]/[1.5] lg:text-fg-muted">
          {mobileExcerpt ? (
            <>
              <span className="lg:hidden">{mobileExcerpt}</span>
              <span className="hidden lg:inline">{excerpt}</span>
            </>
          ) : (
            excerpt
          )}
        </p>

        <p className="text-[11px] font-bold text-fg-faint uppercase lg:hidden">{stats}</p>

        <p className="flex items-center gap-[11px] text-[14px] font-bold text-brand lg:text-[15px] lg:text-white">
          Read the story
          <ArrowUpRight
            aria-hidden
            className="size-4 text-brand transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:size-[17px]"
          />
        </p>
      </div>

      <Parallax
        speed={-0.12}
        origin="viewport"
        media="(min-width: 1024px)"
        className="relative hidden h-[250px] w-[245px] shrink-0 flex-col items-end justify-end lg:flex"
      >
        <span
          aria-hidden
          className="text-[166px]/[normal] font-black tracking-[-12px] text-[#252525] transition-colors duration-700 group-hover:text-[#2c2c2c]"
        >
          <RevealLines delay={260} lines={[String(index).padStart(2, "0")]} />
        </span>
      </Parallax>
    </Root>
  );
}
