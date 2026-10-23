import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines, RevealWords } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";

export function ContactHeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas-deep">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={0.3} className="absolute inset-0">
          <div
            data-hero-backdrop
            className="absolute -top-32 -right-24 size-[360px] rounded-full bg-brand/20 blur-[110px] motion-safe:animate-drift lg:-top-48 lg:right-[-6%] lg:size-[640px] lg:blur-[140px]"
          />
        </Parallax>
      </div>

      {/* The desktop header floats over this section, hence the extra top padding. */}
      <Container className="relative pt-[76px] pb-[86px] lg:pt-[203px] lg:pb-[116px]">
        <Parallax speed={0.14} className="flex flex-col gap-[22px] lg:gap-6">
          <Reveal delay={100}>
            <Eyebrow className="lg:tracking-[1.5px]">
              04 / Contact
              <span className="hidden lg:inline">
                <span className="mx-3">—</span>Start a conversation
              </span>
            </Eyebrow>
          </Reveal>

          <Heading
            as="h1"
            size="page"
            className="text-[44px]/[1.05] tracking-[-2px] lg:text-[73px]/[1.03] lg:tracking-[-3.7px]"
          >
            <RevealLines delay={200} lines={["Have an idea?", "Let’s make it real."]} />
          </Heading>

          <RevealWords
            delay={500}
            className="text-base/[1.5] text-fg-subtle lg:max-w-[690px] lg:text-[20px]/[1.5] lg:text-fg-muted"
            text="Tell me what you’re building, what needs solving, or what you’d like to explore together."
          />
        </Parallax>
      </Container>
    </section>
  );
}
