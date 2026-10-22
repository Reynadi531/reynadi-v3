import { cn } from "@reynad-v3/ui/lib/utils";
import { useLenis } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxProps {
  /** Fraction of the scroll distance the layer drifts by. Positive values lag behind the page. */
  speed: number;
  /**
   * What the drift is measured from. `page` drifts by the scroll offset, for content near the top
   * of the page; `viewport` drifts by the layer's distance from the viewport centre, so content
   * further down sits at rest when centred on screen.
   */
  origin?: "page" | "viewport";
  /** Media query the drift is limited to, e.g. `(min-width: 1024px)`. Applies everywhere when omitted. */
  media?: string;
  className?: string;
  children: ReactNode;
}

/** Drifts its children against the page scroll. */
export function Parallax({ speed, origin = "page", media, className, children }: ParallaxProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const offset = useRef(0);

  const apply = (scroll: number) => {
    const layer = layerRef.current;
    if (!active.current || !layer) return;

    if (origin === "page") {
      offset.current = scroll * speed;
    } else {
      // Undo the current drift so the measurement doesn't feed back into itself.
      const rect = layer.getBoundingClientRect();
      const centre = rect.top - offset.current + rect.height / 2;
      offset.current = (centre - window.innerHeight / 2) * speed;
    }
    layer.style.transform = `translate3d(0, ${offset.current}px, 0)`;
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const query = media ? window.matchMedia(media) : undefined;
    const update = () => {
      active.current = query?.matches ?? true;
      offset.current = 0;
      if (layerRef.current) layerRef.current.style.transform = "";
      apply(window.scrollY);
    };
    update();
    query?.addEventListener("change", update);

    return () => query?.removeEventListener("change", update);
  }, [media, origin, speed]);

  useLenis(({ scroll }) => apply(scroll));

  return (
    <div ref={layerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
