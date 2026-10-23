import { ArrowLeft, Eye } from "lucide-react";

import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines, RevealWords } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";
import { underlineOnHover } from "@/components/site/underline";
import { formatViews } from "@/components/site/view-count";
import { formatPostDate, type Post } from "@/lib/posts";

const authorName = "Reynadi Andreas Priesley";

const bylineItem =
  "text-[10px] font-bold tracking-[0.2px] text-[#909090] uppercase lg:text-[11px] lg:tracking-[1.1px] lg:text-fg-faint";

interface ArticleMastheadProps extends Pick<Post, "meta"> {
  /** Omitted when the count is unavailable. */
  views?: number;
}

export function ArticleMasthead({ meta, views }: ArticleMastheadProps) {
  const { title, titleLines, category, kicker, description, date, readTime } = meta;
  const heading = titleLines?.join(" ") ?? title;

  return (
    <section className="relative w-full overflow-hidden bg-canvas-deep">
      {/* The desktop header floats over this section, hence the extra top padding. */}
      <Container className="pt-[55px] pb-[67px] lg:pt-[191px] lg:pb-24">
        <Parallax speed={0.14} className="flex flex-col gap-[22px] lg:gap-[34px]">
          <Reveal delay={60}>
            <a
              href="/writing"
              className="group inline-flex items-center gap-[9px] text-[13px] font-semibold text-fg-subtle transition-colors hover:text-white lg:gap-[11px] lg:text-[14px]"
            >
              <ArrowLeft
                aria-hidden
                className="size-[17px] text-brand transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span className={underlineOnHover}>All writing</span>
            </a>
          </Reveal>

          <Reveal delay={140}>
            <Eyebrow className="tracking-[1.1px] lg:tracking-[1.5px]">
              {category}
              {kicker ? (
                <>
                  <span className="mx-2">/</span>
                  {kicker}
                </>
              ) : null}
            </Eyebrow>
          </Reveal>

          <h1 className="text-[40px]/[1.07] font-black tracking-[-1.9px] text-white lg:max-w-[1040px] lg:text-[68px]/[1.03] lg:tracking-[-3.5px]">
            <span className="lg:hidden">
              <RevealLines delay={220} lines={[heading]} />
            </span>
            <span className="hidden lg:block">
              <RevealLines delay={220} lines={titleLines ?? [title]} />
            </span>
          </h1>

          <RevealWords
            delay={480}
            className="text-base/[1.5] text-fg-muted lg:max-w-[760px] lg:text-[21px]/[1.5]"
            text={description}
          />

          <Reveal variant="fade" delay={760}>
            <div className="flex flex-col gap-[13px] pt-2.5 lg:flex-row lg:items-center lg:gap-7 lg:pt-[13px]">
              <p className={bylineItem}>{authorName}</p>
              <p className="flex items-center gap-[13px] lg:contents">
                <span className={bylineItem}>{formatPostDate(date)}</span>
                <span className={bylineItem}>{readTime}</span>
                {views === undefined ? null : (
                  <span className={`${bylineItem} inline-flex items-center gap-[7px]`}>
                    <Eye aria-hidden className="hidden size-[15px] lg:block" />
                    {formatViews(views)}
                  </span>
                )}
              </p>
            </div>
          </Reveal>
        </Parallax>
      </Container>
    </section>
  );
}
