CREATE TABLE "post_views" (
	"slug" text PRIMARY KEY,
	"views" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
