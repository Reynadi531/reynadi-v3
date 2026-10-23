import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";
import type { Post } from "@/lib/posts";

interface NextArticleProps {
  /** The next older article. When there is none, links back to the journal. */
  next?: Post;
}

/** Closing band that leads to the next article. A brand wash sweeps up on hover. */
export function NextArticle({ next }: NextArticleProps) {
  const href = next?.href ?? "/writing";
  const label = next ? `Read next / ${next.meta.category}` : "Explore more / The journal";
  const title = next?.meta.title.replace(/\.$/, "") ?? "Back to all writing";

  return (
    <a
      href={href}
      className="group relative block w-full overflow-hidden bg-canvas-raised outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-inset"
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-brand/[0.08] transition-transform duration-700 ease-out group-hover:translate-y-0"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-700 ease-out group-hover:scale-x-100"
      />

      <Container className="relative flex flex-col gap-[15px] pt-[50px] pb-[58px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-[60px]">
        <div className="flex flex-col gap-[15px]">
          <Reveal>
            <Eyebrow className="tracking-[1px] lg:text-[11px] lg:tracking-[1.4px]">{label}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[26px]/[1.2] font-extrabold tracking-[-0.6px] text-white transition-transform duration-500 ease-out group-hover:translate-x-2 lg:text-[29px]/[normal] lg:tracking-[-1px]">
              {title}
            </p>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={220}>
          <ArrowUpRight
            aria-hidden
            className="size-[22px] text-white transition-[translate,color] duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-brand lg:size-[27px]"
          />
        </Reveal>
      </Container>
    </a>
  );
}
