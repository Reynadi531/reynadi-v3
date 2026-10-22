import { cn } from "@reynad-v3/ui/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { useReveal } from "@/components/motion/use-reveal";

import { navLinks } from "@/lib/site";

import { ActionLink } from "./site/action-link";
import { BrandMark } from "./site/brand-mark";
import { Container } from "./site/container";
import { underlineOnHover } from "./site/underline";

/** Site navigation. Sits on top of the hero artwork on desktop. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reveal = useReveal<HTMLElement>({ variant: "down" });

  return (
    <header
      {...reveal}
      className="relative z-20 border-b border-line-subtle bg-canvas-deep lg:absolute lg:inset-x-0 lg:top-0 lg:border-0 lg:bg-transparent"
    >
      <Container>
        <div className="flex h-[75px] items-center justify-between lg:h-[100px] lg:border-b lg:border-line">
          <BrandMark />

          <nav aria-label="Primary" className="hidden items-center gap-[38px] lg:flex">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={cn(
                  "text-[14px] font-medium text-fg-muted transition-colors hover:text-white",
                  underlineOnHover,
                )}
              >
                {label}
              </a>
            ))}
          </nav>

          <ActionLink href="/#contact" size="md" className="hidden lg:inline-flex">
            Let’s talk
            <ArrowUpRight aria-hidden />
          </ActionLink>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="flex items-center gap-2 text-[11px] font-bold tracking-[1px] text-fg-subtle lg:hidden"
          >
            MENU
            {open ? (
              <X aria-hidden className="size-5 text-white" />
            ) : (
              <Menu aria-hidden className="size-5 text-white" />
            )}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={cn(
          "absolute inset-x-0 top-full border-b border-line-subtle bg-canvas-deep lg:hidden",
          !open && "hidden",
        )}
      >
        <Container className="flex flex-col py-2">
          {[...navLinks, { href: "/#contact", label: "Contact" }].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-3 text-[16px] font-medium text-fg-muted transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </Container>
      </nav>
    </header>
  );
}
