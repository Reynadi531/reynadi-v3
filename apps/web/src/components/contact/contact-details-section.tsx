import { Reveal, RevealLines, RevealWords } from "@/components/motion/reveal";
import { ContactMethod } from "@/components/site/contact-method";
import { CopyEmailButton } from "@/components/site/copy-email";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { underlineOnHover } from "@/components/site/underline";
import { socialLinks } from "@/lib/site";
import { cn } from "@reynad-v3/ui/lib/utils";

import { InquiryForm } from "./inquiry-form";

export function ContactDetailsSection() {
  return (
    <section className="w-full bg-canvas">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:flex-row lg:gap-[95px] lg:px-20 lg:pt-[105px] lg:pb-[125px]">
        <DirectLine />
        <InquiryForm />
      </div>
    </section>
  );
}

function DirectLine() {
  return (
    <div className="flex flex-col gap-[22px] px-6 pt-[67px] pb-[70px] lg:w-[500px] lg:shrink-0 lg:gap-[34px] lg:p-0">
      <div className="flex flex-col gap-[22px] lg:gap-[18px]">
        <Reveal>
          <Eyebrow>Direct line</Eyebrow>
        </Reveal>
        <Heading
          size="xs"
          className="text-[32px]/[1.12] tracking-[-1.2px] lg:text-[38px]/[1.12] lg:tracking-[-1.6px]"
        >
          <RevealLines delay={90} lines={["The best projects", "start with hello."]} />
        </Heading>
      </div>

      <RevealWords
        delay={260}
        className="text-[15px]/[1.5] text-fg-subtle lg:max-w-[430px] lg:text-[17px]/[1.5]"
        text="Prefer to skip the form? Reach out directly. I’d love to hear what’s on your mind."
      />

      <div className="flex flex-col gap-[22px] lg:gap-[34px]">
        <ContactMethod label="Email" revealDelay={120}>
          <CopyEmailButton />
        </ContactMethod>

        <ContactMethod label="Find me online" revealDelay={240} className="gap-3">
          <ul className="flex gap-6 lg:gap-7">
            {socialLinks.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "group inline-flex text-[15px] font-semibold text-white transition-colors hover:text-brand lg:text-[16px]",
                    underlineOnHover,
                  )}
                >
                  {label}&nbsp;
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </ContactMethod>
      </div>
    </div>
  );
}
