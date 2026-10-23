import { sql } from "drizzle-orm";

import type { Database } from "./index";
import { postViews } from "./schema";

/** View counts by slug. Articles nobody has opened yet are absent. */
export async function getPostViewCounts(db: Database) {
  const rows = await db.select().from(postViews);
  return Object.fromEntries(rows.map(({ slug, views }) => [slug, views]));
}

/** Counts one view of an article and returns the new total. */
export async function recordPostView(db: Database, slug: string) {
  const [row] = await db
    .insert(postViews)
    .values({ slug, views: 1 })
    .onConflictDoUpdate({
      target: postViews.slug,
      set: { views: sql`${postViews.views} + 1`, updatedAt: new Date() },
    })
    .returning({ views: postViews.views });

  if (!row) throw new Error(`Failed to record a view for "${slug}"`);
  return row.views;
}
