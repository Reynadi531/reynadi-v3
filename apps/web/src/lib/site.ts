import type { Article } from "@/components/site/article-item";
import type { Capability } from "@/components/site/capability-item";
import type { Experience } from "@/components/site/experience-item";
import type { Project } from "@/components/site/project-card";

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
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

/** Shown after the featured pair on the work page. */
export const spotlightProject: Project = {
  title: "Relay",
  description:
    "A workflow board concept for keeping every request moving from first touch to done.",
  category: "Product concept / Workflow",
  image: "/images/project-relay.png",
  previewClassName: "bg-[#1A1A2E]",
};

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

export const approaches: Capability[] = [
  {
    title: "Product engineering",
    description: "Building practical experiences that solve the right problem.",
    mobileDescription: "Practical experiences that solve the right problem.",
  },
  {
    title: "Automation & DevOps",
    description: "Turning complex workflows into reliable, repeatable systems.",
    mobileDescription: "Reliable workflows that give teams more room to focus.",
  },
  {
    title: "Cloud infrastructure",
    description: "Creating foundations ready for the next stage of growth.",
    mobileDescription: "Foundations ready for the next stage of growth.",
  },
];

/** Journal entries, newest first. The first one is featured on the writing page. */
export const articles: Article[] = [
  {
    title: "Building systems that stay boring.",
    titleLines: ["Building systems", "that stay boring."],
    excerpt:
      "Reliability is rarely dramatic. It’s the quiet result of clear boundaries, good defaults, and thoughtful trade-offs.",
    mobileExcerpt:
      "Reliability is the quiet result of clear boundaries, good defaults, and thoughtful trade-offs.",
    category: "Engineering",
    readTime: "8 min read",
    views: "1,284",
  },
  {
    title: "From manual steps to dependable automation",
    excerpt: "How small, repeatable workflows free teams to focus on the work only people can do.",
    mobileExcerpt: "Making repeatable workflows the team can trust.",
    category: "Automation",
    readTime: "6 min read",
    views: "864",
  },
  {
    title: "Cloud infrastructure without the guesswork",
    excerpt: "A practical way to make deployment decisions with clarity instead of complexity.",
    mobileExcerpt: "Making deployment decisions with clarity.",
    category: "Cloud",
    readTime: "7 min read",
    views: "642",
  },
];

export const topics = ["Engineering & systems", "Automation & the cloud", "Product lessons"];
