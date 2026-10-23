import { cn } from "@reynad-v3/ui/lib/utils";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/site/container";
import type { ProjectMeta } from "@/lib/projects";

/** Full-width preview image between the masthead and the case study text. */
export function ProjectPreview({ meta }: { meta: ProjectMeta }) {
  return (
    <section className="w-full bg-canvas-raised">
      <Container className="py-10 lg:py-[72px]">
        <Reveal>
          <div
            className={cn(
              "h-[240px] w-full overflow-hidden rounded-[10px] lg:h-[560px] lg:rounded-xl",
              meta.previewClassName,
            )}
          >
            <img
              src={meta.image}
              alt={`${meta.title} interface preview`}
              className="size-full object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
