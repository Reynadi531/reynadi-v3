import { createFileRoute } from "@tanstack/react-router";

import { resumeSourceUrl } from "@/lib/site";

export const Route = createFileRoute("/resume")({
  server: {
    handlers: {
      GET: () => Response.redirect(resumeSourceUrl, 302),
    },
  },
});
