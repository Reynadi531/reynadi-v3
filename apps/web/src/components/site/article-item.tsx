import { ArrowUpRight } from "lucide-react";

import { useReveal } from "@/components/motion/use-reveal";

export interface Article {
  title: string;
  /** Hand-set line breaks for large display titles. Falls back to `title`. */
  titleLines?: string[];
  excerpt: string;
  /** Shorter copy for small screens. Falls back to `excerpt`. */
  mobileExcerpt?: string;
  category: string;
  readTime: string;
  views: string;
  href?: string;
}

interface ArticleItemProps extends Article {
  index: number;
  /** Stagger delay for the scroll reveal, in ms. */
  revealDelay?: number;
  className?: string;
}

/** A journal entry in the writing list: numbered row on desktop, stacked card on mobile. */
export function ArticleItem({
  index,
  title,
  excerpt,
  mobileExcerpt,
  category,
  readTime,
  views,
  href,
  revealDelay,
  className,
}: ArticleItemProps) {
  const { ref, ...reveal } = useReveal<HTMLLIElement>({ delay: revealDelay });
  const Body = (href ? "a" : "div") as "div";

  return (
    <li ref={ref} data-reveal-rule className={className} {...reveal}>
      <Body
        {...(href ? { href } : {})}
        className="group flex flex-col gap-[11px] pt-[25px] lg:flex-row lg:items-center lg:gap-[34px] lg:py-[31px]"
      >
        <span className="hidden text-[12px] font-bold text-brand tabular-nums lg:block">
          {String(index).padStart(2, "0")}
        </span>

        <div className="flex flex-col gap-[11px] transition-transform duration-500 ease-out lg:w-[810px] lg:gap-2.5 lg:group-hover:translate-x-2">
          <p className="text-[11px] font-bold tracking-[1.3px] text-brand uppercase lg:tracking-[1.1px] lg:text-fg-faint">
            {category}
            <span className="hidden lg:inline">
              <span className="mx-2">/</span>
              {readTime}
              <span className="mx-2">/</span>
              {views} views
            </span>
          </p>
          <h3 className="text-[21px]/[1.2] font-extrabold tracking-[-0.4px] text-white lg:text-[24px]/[normal] lg:tracking-[-0.7px]">
            {title}
          </h3>
          <p className="text-sm/[1.45] text-fg-subtle transition-colors duration-300 lg:text-[15px]/[1.45] lg:group-hover:text-fg-muted">
            {mobileExcerpt ? (
              <>
                <span className="lg:hidden">{mobileExcerpt}</span>
                <span className="hidden lg:inline">{excerpt}</span>
              </>
            ) : (
              excerpt
            )}
          </p>
          <p className="text-[11px] font-bold text-fg-faint uppercase lg:hidden">
            {readTime}
            <span className="mx-2">·</span>
            {views} views
          </p>
        </div>

        <ArrowUpRight
          aria-hidden
          className="hidden size-[22px] shrink-0 text-white transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand lg:block"
        />
      </Body>
    </li>
  );
}
