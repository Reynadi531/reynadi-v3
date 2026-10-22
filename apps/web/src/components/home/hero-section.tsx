import { ArrowUpRight, Download } from "lucide-react";

import { HeroBackdrop } from "@/components/motion/hero-backdrop";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { ActionLink } from "@/components/site/action-link";
import { Container } from "@/components/site/container";
import { Heading } from "@/components/site/heading";
import { contactHref, resumeHref } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas-deep lg:flex lg:h-[790px] lg:flex-col lg:pt-[100px]">
      <HeroBackdrop />

      <Container className="relative flex flex-col gap-[22px] pt-[63px] lg:flex-1 lg:justify-center lg:pt-0">
        <div className="flex max-w-[740px] flex-col gap-[22px] lg:gap-[26px]">
          <Reveal
            as="p"
            delay={100}
            className="flex items-center gap-[11px] text-[11px] font-bold tracking-[1.3px] whitespace-nowrap text-brand lg:text-[12px] lg:tracking-[1.7px] lg:text-fg-subtle"
          >
            <span aria-hidden className="relative hidden size-2 lg:block">
              <span className="absolute inset-0 rounded-full bg-brand motion-safe:animate-ping" />
              <span className="absolute inset-0 rounded-full bg-brand" />
            </span>
            <span className="lg:hidden">SOFTWARE ENGINEER / INDONESIA</span>
            <span className="hidden lg:inline">SOFTWARE ENGINEER / BUILDER / INDONESIA</span>
          </Reveal>

          <Heading as="h1" size="hero">
            <RevealLines delay={200} lines={["Building what’s", "next, reliably."]} />
          </Heading>

          <Reveal
            as="p"
            delay={480}
            className="max-w-[610px] text-base/6 text-fg-muted lg:text-xl/[30px]"
          >
            <span className="lg:hidden">
              I’m Reynadi — turning complex ideas into products, systems, and experiences that work.
            </span>
            <span className="hidden lg:inline">
              I’m Reynadi — a software engineer turning complex ideas into products, systems, and
              experiences that work.
            </span>
          </Reveal>

          <Reveal
            delay={580}
            className="flex flex-wrap items-start gap-2.5 lg:items-center lg:gap-[26px]"
          >
            <ActionLink href="/#work" size="hero">
              <span className="lg:hidden">Explore work</span>
              <span className="hidden lg:inline">Explore my work</span>
              <ArrowUpRight aria-hidden />
            </ActionLink>
            <ActionLink
              href={resumeHref}
              download
              variant="outline"
              size="hero"
              className="lg:flex-row-reverse lg:gap-[13px] lg:px-[21px]"
            >
              Download Resume
              <Download aria-hidden />
            </ActionLink>
            <ActionLink
              href={contactHref}
              variant="text"
              size="none"
              className="hidden text-[15px] font-semibold lg:inline-flex"
            >
              Get in touch ↗
            </ActionLink>
          </Reveal>
        </div>

        <Reveal
          delay={680}
          className="h-[390px] w-full overflow-hidden rounded-[10px] bg-canvas-deep lg:hidden"
        >
          <img
            data-reveal-media
            src="/images/reynadi-ascii-portrait.png"
            alt="ASCII portrait of Reynadi"
            className="size-full object-cover"
          />
        </Reveal>
      </Container>

      <Container className="relative hidden lg:block">
        <Reveal
          variant="fade"
          delay={900}
          className="flex h-[100px] items-center justify-between border-t border-line text-[12px] font-bold tracking-[1.3px] text-fg-faint"
        >
          <p>01 / 04 PORTFOLIO</p>
          <a href="/#experience" className="transition-colors hover:text-white">
            SCROLL TO EXPLORE <span className="inline-block motion-safe:animate-nudge">↓</span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
