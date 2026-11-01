import { useLenis } from "lenis/react";
import { useRef } from "react";

import { track } from "@/lib/analytics";

/** Scroll depths, in percent, reported once per page as `read-depth` events. */
const depthMilestones = [25, 50, 75, 100];

/** Hairline at the top of the viewport that fills as the page is read. */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reached = useRef({ path: "", depth: 0 });

  useLenis(({ progress }) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;

    const path = window.location.pathname;
    if (reached.current.path !== path) reached.current = { path, depth: 0 };
    // `progress` can stop just shy of 1 at the very bottom, hence the small allowance.
    const percent = Math.min(100, Math.round(progress * 100) + 1);
    for (const depth of depthMilestones) {
      if (depth > reached.current.depth && percent >= depth) {
        reached.current.depth = depth;
        track("read-depth", { depth });
      }
    }
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-brand" />
    </div>
  );
}
