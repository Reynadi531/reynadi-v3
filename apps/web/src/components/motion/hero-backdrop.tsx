import { Parallax } from "./parallax";

/** The home page preloads it: as a CSS background the browser would find it late. */
export const heroBackdropImage = "/images/reynadi-ascii-hero.webp";

/** Desktop hero artwork: fades in on load and drifts slower than the page on scroll. */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      <Parallax speed={0.3} className="absolute inset-0">
        <div
          data-hero-backdrop
          className="size-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackdropImage})` }}
        />
      </Parallax>
    </div>
  );
}
