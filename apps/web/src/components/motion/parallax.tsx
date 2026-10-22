import { cn } from "@reynad-v3/ui/lib/utils";
import { useLenis } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  /** Fraction of the scroll distance the layer drifts by. Positive values lag behind the page. */
  speed: number;
  /** Media query the drift is limited to, e.g. `(min-width: 1024px)`. Applies everywhere when omitted. */
  media?: string;
  className?: string;
  children: ReactNode;
}

/** Drifts its children against the page scroll. Meant for content near the top of the page. */
export function Parallax({ speed, media, className, children }: ParallaxProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!media) {
      active.current = true;
      return;
    }

    const query = window.matchMedia(media);
    const update = () => {
      active.current = query.matches;
      if (!query.matches && layerRef.current) layerRef.current.style.transform = "";
    };
    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, [media]);

  useLenis(({ scroll }) => {
    if (!active.current || !layerRef.current) return;
    layerRef.current.style.transform = `translate3d(0, ${scroll * speed}px, 0)`;
  });

  return (
    <div ref={layerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
