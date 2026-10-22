import { cn } from "@reynad-v3/ui/lib/utils";
import { useLenis } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  /** Fraction of the scroll distance the layer drifts by. Positive values lag behind the page. */
  speed: number;
  className?: string;
  children: ReactNode;
}

/** Drifts its children against the page scroll. Meant for content near the top of the page. */
export function Parallax({ speed, className, children }: ParallaxProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useLenis(({ scroll }) => {
    if (reducedMotion.current || !layerRef.current) return;
    layerRef.current.style.transform = `translate3d(0, ${scroll * speed}px, 0)`;
  });

  return (
    <div ref={layerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
