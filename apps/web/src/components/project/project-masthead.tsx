import { ArrowLeft } from "lucide-react";

import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealLines, RevealWords } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import { Eyebrow } from "@/components/site/eyebrow";
import { underlineOnHover } from "@/components/site/underline";
import type { ProjectMeta } from "@/lib/projects";

interface ProjectMastheadProps {
  meta: ProjectMeta;
}

export function ProjectMasthead({ meta }: ProjectMastheadProps) {
  const { title, category, description, role, year, status, stack } = meta;
  const facts = [
    { label: "Role", value: role },
    { label: "Year", value: year },
    { label: "Status", value: status },
    ...(stack.length ? [{ label: "Stack", value: stack.join(" · ") }] : []),
  ];

  return (
    <section className="relative w-full overflow-hidden bg-canvas-deep">
      {/* The desktop header floats over this section, hence the extra top padding. */}
      <Container className="pt-[55px] pb-[67px] lg:pt-[191px] lg:pb-24">
        <Parallax speed={0.14} className="flex flex-col gap-[22px] lg:gap-[34px]">
          <Reveal delay={60}>
            <a
              href="/work"
              className="group inline-flex items-center gap-[9px] text-[13px] font-semibold text-fg-subtle transition-colors hover:text-white lg:gap-[11px] lg:text-[14px]"
            >
              <ArrowLeft
                aria-hidden
                className="size-[17px] text-brand transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span className={underlineOnHover}>All work</span>
            </a>
          </Reveal>

          <Reveal delay={140}>
            <Eyebrow className="tracking-[1.1px] lg:tracking-[1.5px]">{category}</Eyebrow>
          </Reveal>

          <h1 className="text-[40px]/[1.07] font-black tracking-[-1.9px] text-white lg:max-w-[1040px] lg:text-[96px]/[1.03] lg:tracking-[-5px]">
            <RevealLines delay={220} lines={[title]} />
          </h1>

          <RevealWords
            delay={480}
            className="text-base/[1.5] text-fg-muted lg:max-w-[760px] lg:text-[21px]/[1.5]"
            text={description}
          />

          <Reveal variant="fade" delay={760}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-[18px] pt-2.5 lg:flex lg:gap-14 lg:pt-[13px]">
              {facts.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <dt className="text-[10px] font-bold tracking-[1.1px] text-fg-faint uppercase">
                    {label}
                  </dt>
                  <dd className="text-[13px] font-semibold text-white lg:text-[14px]">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Parallax>
      </Container>
    </section>
  );
}
