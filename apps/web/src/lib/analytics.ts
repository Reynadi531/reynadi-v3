import { siteUrl } from "./seo";

// Umami analytics. The tracker script is loaded from the root route's `head`; pageviews are
// recorded automatically, and the helpers below add custom events on top.

/** Self-hosted Umami tracker. */
export const umamiScriptSrc = "https://analytics.reynadi.id/script.js";
export const umamiWebsiteId = "5204eb12-f54b-4937-aee9-0254775c4092";
/** Only the production host is tracked, so local dev and preview deploys stay out of the stats. */
export const umamiDomains = new URL(siteUrl).hostname;

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

/**
 * Records a custom event from code. A no-op when the tracker hasn't loaded or is blocked, so it
 * never gets in the way of the action being measured.
 */
export function track(event: string, data?: EventData) {
  try {
    window.umami?.track(event, data);
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Props that make Umami record a click on the element, as `event` with `data` attached.
 * Spread onto links and buttons: `<a {...trackClick("nav-click", { label })}>`.
 */
export function trackClick(event: string, data: Record<string, string | number> = {}) {
  const props: Record<`data-umami-event${string}`, string> = { "data-umami-event": event };
  for (const [key, value] of Object.entries(data)) {
    props[`data-umami-event-${key}`] = String(value);
  }
  return props;
}

/** Whether `href` leaves the site. Relative links and hash links stay on it. */
export function isExternalHref(href: string | undefined): href is string {
  return !!href && /^https?:\/\//.test(href) && !href.startsWith(siteUrl);
}
