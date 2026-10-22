import { Reveal } from "@/components/motion/reveal";
import { ArticleItem } from "@/components/site/article-item";
import { Eyebrow } from "@/components/site/eyebrow";
import { FeaturedArticle } from "@/components/site/featured-article";
import { Heading } from "@/components/site/heading";
import { Section } from "@/components/site/section";
import { articles } from "@/lib/site";

const [featured, ...rest] = articles;
const postCount = String(articles.length).padStart(2, "0");

export function JournalSection() {
  return (
    <Section
      id="journal"
      tone="raised"
      containerClassName="flex flex-col gap-[25px] pt-[70px] pb-[78px] lg:gap-9 lg:pt-[86px] lg:pb-[90px]"
    >
      <div className="flex items-center justify-between gap-6">
        <Reveal>
          <Heading
            size="xs"
            className="text-[31px]/[normal] tracking-[-1px] lg:text-[38px] lg:tracking-[-1.5px]"
          >
            The journal
          </Heading>
        </Reveal>
        <Reveal variant="fade" delay={180}>
          <Eyebrow className="text-[10px] tracking-[0.7px] text-fg-subtle lg:text-[12px] lg:tracking-[1.3px]">
            {postCount} <span className="lg:hidden">posts</span>
            <span className="hidden lg:inline">
              sample posts<span className="mx-2">/</span>A journal in progress
            </span>
          </Eyebrow>
        </Reveal>
      </div>

      <FeaturedArticle index={1} {...featured} />

      <ol className="flex flex-col gap-[25px] lg:gap-9">
        {rest.map((article, i) => (
          <ArticleItem key={article.title} index={i + 2} revealDelay={i * 120} {...article} />
        ))}
      </ol>
    </Section>
  );
}
