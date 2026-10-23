import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/** View counter per article. `slug` is the MDX filename in `apps/web/content/writing`. */
export const postViews = pgTable("post_views", {
  slug: text("slug").primaryKey(),
  views: integer("views").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
