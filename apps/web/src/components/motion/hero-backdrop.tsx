import { Parallax } from "./parallax";

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
          className="size-full bg-[url(/images/reynadi-ascii-hero-v2.png)] bg-cover bg-center bg-no-repeat"
        />
      </Parallax>
    </div>
  );
}
