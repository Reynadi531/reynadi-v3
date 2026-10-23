import type { Capability } from "@/components/site/capability-item";

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
] as const;

export const footerLinks = [...navLinks, { href: "/contact", label: "Contact" }] as const;

/** The email address itself lives in `contact-email.ts`, kept out of the markup on purpose. */
export const contactHref = "/contact";
// TODO: replace with the real résumé file and LinkedIn profile.
export const resumeHref = "/resume.pdf";

export const socialLinks = [
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "https://github.com/Reynadi531", label: "GitHub" },
] as const;

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

export const topics = ["Engineering & systems", "Automation & the cloud", "Product lessons"];
