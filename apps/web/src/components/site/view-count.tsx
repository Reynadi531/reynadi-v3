interface ViewCountProps {
  /** Renders nothing while the count is unavailable. */
  views?: number;
  /** Separator set before the count. */
  leading?: string;
}

/** "N views", preceded by a separator, for article meta lines. */
export function ViewCount({ views, leading = "/" }: ViewCountProps) {
  if (views === undefined) return null;

  return (
    <>
      <span className="mx-2">{leading}</span>
      {formatViews(views)}
    </>
  );
}

/** "1,284 views". Fixed locale so server and client render the same text. */
export function formatViews(views: number) {
  return `${views.toLocaleString("en-US")} ${views === 1 ? "view" : "views"}`;
}
