import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";

export function WorkHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas-deep">
      {/* The desktop header floats over this section, hence the extra top padding. */}
      <Container className="pt-[75px] pb-[83px] lg:pt-[196px] lg:pb-[110px]">
        <Parallax speed={0.14} className="flex max-w-[900px] flex-col gap-[22px] lg:gap-[23px]">
          <Reveal delay={100}>
            <Eyebrow className="lg:tracking-[1.5px]">
              01 / Work
              <span className="hidden lg:inline">
                <span className="mx-3">—</span>Selected projects
              </span>
            </Eyebrow>
          </Reveal>

          <Heading as="h1" size="page">
            <RevealLines delay={200} lines={["Work that moves", "ideas forward."]} />
          </Heading>

          <Reveal
            as="p"
            delay={480}
            className="max-w-[670px] text-base/6 text-fg-subtle lg:text-[19px]/[1.5] lg:text-fg-muted"
          >
            Products, platforms, and infrastructure shaped with
            <span className="hidden lg:inline"> equal parts</span> curiosity and care.
          </Reveal>
        </Parallax>
      </Container>
    </section>
  );
}
