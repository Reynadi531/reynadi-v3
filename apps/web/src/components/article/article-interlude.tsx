import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import type { Post } from "@/lib/posts";

/** Band between the masthead and the text: issue number, theme line, and a slow scan. */
export function ArticleInterlude({ meta }: Pick<Post, "meta">) {
  const { series, issue, theme } = meta;
  const number = String(issue).padStart(2, "0");

  return (
    <section aria-hidden className="relative w-full overflow-hidden bg-canvas-raised">
      <span className="pointer-events-none absolute -top-1/2 -right-[10%] size-[420px] animate-drift rounded-full bg-brand/[0.07] blur-3xl" />
      <span className="pointer-events-none absolute inset-y-0 left-0 w-px animate-scan bg-linear-to-b from-transparent via-brand/60 to-transparent" />
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px animate-pulse bg-linear-to-r from-transparent via-brand/40 to-transparent" />

      <Container className="relative flex h-[148px] items-center justify-between lg:h-[260px]">
        <div className="flex w-[220px] flex-col gap-[11px] lg:w-auto lg:gap-3.5">
          <Reveal>
            <p className="text-[10px] font-bold tracking-[0.8px] text-brand uppercase lg:text-[12px] lg:tracking-[1.6px]">
              {series}
              <span className="mx-2">/</span>
              No. {number}
            </p>
          </Reveal>
          <p className="text-[15px]/[1.25] font-extrabold tracking-normal text-white uppercase lg:text-[21px]/[normal] lg:tracking-[-0.4px]">
            <RevealLines delay={120} lines={[theme]} />
          </p>
        </div>

        <Parallax speed={-0.12} origin="viewport">
          <span className="block text-[86px]/[normal] font-black tracking-[-6px] text-[#303030] lg:text-[165px] lg:tracking-[-10px] lg:text-[#292929]">
            <RevealLines delay={240} lines={[number]} />
          </span>
        </Parallax>
      </Container>
    </section>
  );
}
