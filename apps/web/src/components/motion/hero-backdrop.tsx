import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

const PARALLAX_SPEED = 0.3;

/** Desktop hero artwork: fades in on load and drifts slower than the page on scroll. */
export function HeroBackdrop() {
  const layerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useLenis(({ scroll }) => {
    if (reducedMotion.current || !layerRef.current) return;
    layerRef.current.style.transform = `translate3d(0, ${scroll * PARALLAX_SPEED}px, 0)`;
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        <div
          data-hero-backdrop
          className="size-full bg-[url(/images/reynadi-ascii-hero-v2.png)] bg-cover bg-center bg-no-repeat"
        />
      </div>
    </div>
  );
}
