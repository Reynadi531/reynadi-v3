import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";

const desktop = "(min-width: 1024px)";

export function AboutHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas-raised">
      {/* The desktop header floats over this section, hence the extra top padding. */}
      <Container className="flex flex-col gap-[23px] pt-[68px] pb-[76px] lg:flex-row lg:items-center lg:gap-[90px] lg:pt-[192px] lg:pb-[100px]">
        <Parallax
          speed={0.14}
          media={desktop}
          className="flex flex-col gap-[23px] lg:w-[680px] lg:shrink-0 lg:gap-[27px]"
        >
          <Reveal delay={100}>
            <Eyebrow className="lg:tracking-[1.4px]">
              02 / About
              <span className="hidden lg:inline">
                <span className="mx-3">—</span>The person behind the work
              </span>
            </Eyebrow>
          </Reveal>

          <Heading as="h1" size="page" className="lg:text-[65px]/[66px] lg:tracking-[-3.3px]">
            <RevealLines delay={200} lines={["Hi, I’m Rey.", "I make things", "work better."]} />
          </Heading>

          <Reveal
            as="p"
            delay={560}
            className="text-base/[1.55] text-fg-subtle lg:max-w-[550px] lg:text-[19px]/[1.55]"
          >
            Reynadi Andreas Priesley — a software engineer who
            <span className="lg:hidden">
              {" "}
              builds products, automates the hard parts, and makes the cloud work its magic.
            </span>
            <span className="hidden lg:inline">
              {" "}
              wears many hats. I build products, automate the hard parts, and make the cloud work
              its magic.
            </span>
          </Reveal>
        </Parallax>

        <Parallax speed={0.05} media={desktop} className="lg:shrink-0">
          <Portrait />
        </Parallax>
      </Container>
    </section>
  );
}

/** ASCII portrait that settles from a zoom, with a slow scan line sweeping over it. */
function Portrait() {
  return (
    <Reveal
      delay={680}
      className="relative h-[375px] w-full overflow-hidden rounded-xl bg-canvas-deep lg:h-[574px] lg:w-[500px] lg:rounded-2xl"
    >
      <img
        data-reveal-media
        src="/images/reynadi-ascii-portrait.png"
        alt="ASCII portrait of Reynadi"
        className="size-full object-cover"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-1/3 bg-linear-to-b from-transparent via-brand/10 to-transparent mix-blend-screen motion-safe:block motion-safe:animate-scan"
      />
    </Reveal>
  );
}
