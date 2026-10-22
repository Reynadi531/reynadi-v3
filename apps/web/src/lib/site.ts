import type { Capability } from "@/components/site/capability-item";
import type { Experience } from "@/components/site/experience-item";
import type { Project } from "@/components/site/project-card";

export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#writing", label: "Writing" },
] as const;

export const footerLinks = [...navLinks, { href: "/#contact", label: "Contact" }] as const;

// TODO: replace with the real contact address and résumé file.
export const contactHref = "mailto:hello@reynadi.id";
export const resumeHref = "/resume.pdf";

export const experiences: Experience[] = [
  {
    organization: "Nusantara Wing Lab",
    descriptor: "Indonesian software house",
    role: "Founder",
    period: "Mar 2023 — Present",
  },
  {
    organization: "Tako · PT Rumah Kreasi Bersama",
    descriptor: "Digital tipjar platform",
    role: "DevOps Engineer · Freelance",
    period: "Dec 2023 — Jul 2024",
  },
];

export const projects: Project[] = [
  {
    title: "Orbit",
    description: "An analytics console concept that turns product signals into clear decisions.",
    category: "Product concept / Analytics",
    image: "/images/project-orbit.png",
    previewClassName: "bg-[#C9D8E8]",
  },
  {
    title: "Fieldnote",
    description:
      "A collaborative workspace concept for the notes and ideas that move teams forward.",
    category: "Product concept / Knowledge",
    image: "/images/project-fieldnote.png",
    previewClassName: "bg-[#D9E5DC]",
  },
];

export const capabilities: Capability[] = [
  {
    title: "BUILD",
    description: "From idea to working product, with engineering decisions built to last.",
  },
  {
    title: "AUTOMATE",
    description: "Simplifying the repetitive so teams can focus on what matters.",
  },
  {
    title: "SCALE",
    description: "Cloud and infrastructure that stay dependable as things grow.",
  },
];
