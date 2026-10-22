import { Toaster } from "@reynad-v3/ui/components/sonner";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createMiddleware } from "@tanstack/react-start";
import { evlogErrorHandler } from "evlog/nitro/v3";

import { SiteHeader } from "../components/header";
import { SiteFooter } from "../components/site/site-footer";
import { SmoothScroll } from "../components/smooth-scroll";

import appCss from "../index.css?url";

// Scroll reveals start hidden; without JS they must stay visible.
const noScriptRevealCss =
  "[data-reveal],[data-reveal] [data-line],[data-reveal] [data-word],[data-reveal] [data-reveal-media]{opacity:1!important;transform:none!important}[data-reveal-rule]::before{transform:none!important}";

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
      {
        title: "reynadi.id — Software engineer",
      },
      {
        name: "description",
        content:
          "Reynadi is a software engineer turning complex ideas into products, systems, and experiences that work.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
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
