import { createFileRoute } from "@tanstack/react-router";

import { ContactDetailsSection } from "@/components/contact/contact-details-section";
import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { staticPages, staticPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => staticPageSeo(staticPages.contact),
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
