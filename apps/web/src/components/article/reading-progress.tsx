import { useLenis } from "lenis/react";
import { useRef } from "react";

/** Hairline at the top of the viewport that fills as the page is read. */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLenis(({ progress }) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-brand" />
    </div>
  );
}
