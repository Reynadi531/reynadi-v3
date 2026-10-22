import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines, RevealWords } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";

export function WritingHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas">
      {/* The desktop header floats over this section, hence the extra top padding. */}
      <Container className="pt-[74px] pb-20 lg:pt-[207px] lg:pb-28">
        <Parallax speed={0.14} className="flex flex-col gap-[23px] lg:gap-[26px]">
          <Reveal delay={100}>
            <Eyebrow className="lg:tracking-[1.5px]">
              03 / Writing
              <span className="hidden lg:inline">
                <span className="mx-3">—</span>Notes &amp; ideas
              </span>
            </Eyebrow>
          </Reveal>

          <Heading
            as="h1"
            size="page"
            className="text-[46px]/[1.04] tracking-[-2.1px] lg:text-[75px]/[1.02] lg:tracking-[-4px]"
          >
            <RevealLines delay={200} lines={["Curiosity,", "documented."]} />
          </Heading>

          <RevealWords
            delay={440}
            className="text-base/[1.5] text-fg-subtle lg:hidden"
            text="Ideas, lessons, and little discoveries from building software and systems."
          />
          <RevealWords
            delay={440}
            className="hidden max-w-[760px] text-[20px]/[1.5] text-fg-subtle lg:block"
            text="A place for what I’m learning about engineering, technology, and the process of making things better."
          />
        </Parallax>
      </Container>
    </section>
  );
}
