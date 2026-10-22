import { ReactLenis } from "lenis/react";

/**
 * Page-wide Lenis smooth scrolling. Same-page hash links (e.g. `/#work`) are
 * animated via `anchors`; reduced-motion users keep native scrolling.
 */
export function SmoothScroll() {
  return <ReactLenis root options={{ anchors: true, allowNestedScroll: true }} />;
}
