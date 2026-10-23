import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { posts } from "@/lib/posts";

const viewSchema = z.object({
  slug: z.string().refine((slug) => posts.some((post) => post.slug === slug)),
});

/** View counts by slug. Articles nobody has opened yet are absent. */
export const getViewCounts = createServerFn({ method: "GET" }).handler(async () => {
  const [{ getPostViewCounts }, { db }] = await Promise.all([
    import("@reynad-v3/db/post-views"),
    import("@/services"),
  ]);
  return getPostViewCounts(db);
});

/** Counts one view of an article and returns the new total. */
export const recordView = createServerFn({ method: "POST" })
  .validator((data: unknown) => viewSchema.parse(data))
  .handler(async ({ data }) => {
    const [{ recordPostView }, { db }] = await Promise.all([
      import("@reynad-v3/db/post-views"),
      import("@/services"),
    ]);
    return recordPostView(db, data.slug);
  });
