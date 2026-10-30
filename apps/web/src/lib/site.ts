import type { Capability } from "@/components/site/capability-item";

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
] as const;

export const footerLinks = [...navLinks, { href: "/contact", label: "Contact" }] as const;

/** The email address itself lives in `contact-email.ts`, kept out of the markup on purpose. */
export const contactHref = "/contact";
/** `/resume` redirects here; served raw so the browser downloads the latest build from the résumé repo. */
export const resumeSourceUrl = "https://raw.githubusercontent.com/Reynadi531/resume/main/main.pdf";
export const resumeHref = "/resume";

export const socialLinks = [
  { href: "https://linkedin.com/in/reynadiap", label: "LinkedIn" },
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
