import { Toaster } from "@reynad-v3/ui/components/sonner";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createMiddleware } from "@tanstack/react-start";
import { evlogErrorHandler } from "evlog/nitro/v3";

import { SiteHeader } from "../components/header";
import { SiteFooter } from "../components/site/site-footer";
import { SmoothScroll } from "../components/smooth-scroll";
import { author, siteDescription, siteName } from "../lib/seo";

import appCss from "../index.css?url";

// Scroll reveals start hidden; without JS they must stay visible.
const noScriptRevealCss =
  "[data-reveal],[data-reveal] [data-line],[data-reveal] [data-word],[data-reveal] [data-reveal-media]{opacity:1!important;transform:none!important}[data-reveal-rule]::before,[data-reveal-bar]::before{transform:none!important}";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  server: {
    middleware: [createMiddleware().server(evlogErrorHandler)],
  },

  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      // Fallbacks; every page sets its own title, description, canonical, and card.
      { title: `${siteName} — ${author.jobTitle}` },
      { name: "description", content: siteDescription },
      { name: "author", content: author.name },
      { name: "theme-color", content: "#050505" },
      { name: "color-scheme", content: "dark" },
      { property: "og:site_name", content: siteName },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // The .ico serves browsers without SVG favicon support; the rest pick the SVG.
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: `Writing — ${siteName}`,
        href: "/rss.xml",
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <noscript>
          <style>{noScriptRevealCss}</style>
        </noscript>
      </head>
      <body className="bg-canvas-deep leading-[normal] antialiased">
        <SmoothScroll />
        <div className="relative flex min-h-svh flex-col">
          <SiteHeader />
          <div className="flex-1">
            <Outlet />
          </div>
          <SiteFooter />
        </div>
        <Toaster richColors />
        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
