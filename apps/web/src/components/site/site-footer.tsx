import { cn } from "@reynad-v3/ui/lib/utils";

import { footerLinks } from "@/lib/site";

import { Container } from "./container";
import { underlineOnHover } from "./underline";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-subtle bg-canvas-deep lg:border-0">
      <Container>
        <div className="flex flex-col gap-7 pt-[42px] pb-[45px] lg:h-28 lg:flex-row lg:items-center lg:justify-between lg:border-t lg:border-line lg:py-0">
          <p className="text-[20px] font-bold text-white lg:text-[14px] lg:font-semibold">
            reynadi.id<span className="hidden lg:inline"> © {year}</span>
          </p>
          <nav aria-label="Footer" className="flex justify-between lg:gap-8">
            {footerLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={cn(
                  "text-[13px] font-medium text-fg-subtle transition-colors hover:text-white",
                  underlineOnHover,
                )}
              >
                {label}
              </a>
            ))}
          </nav>
          <p className="text-[11px] text-fg-dim lg:font-bold lg:tracking-[1.1px]">
            <span className="lg:hidden">© {year} Reynadi Andreas Priesley · Indonesia</span>
            <span className="hidden lg:inline">BUILT WITH INTENT · INDONESIA</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
