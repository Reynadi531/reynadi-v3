import { createFileRoute } from "@tanstack/react-router";

import { ContactDetailsSection } from "@/components/contact/contact-details-section";
import { ContactHeroSection } from "@/components/contact/contact-hero-section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — reynadi.id" },
      {
        name: "description",
        content:
          "Tell me what you’re building, what needs solving, or what you’d like to explore together.",
      },
    ],
  }),
  component: ContactComponent,
});

function ContactComponent() {
  return (
    <main>
      <ContactHeroSection />
      <ContactDetailsSection />
    </main>
  );
}
