import "server-only";
import { sql } from "./db";

export type Review = {
  id: number;
  resourceId: number;
  rating: number;
  text: string | null;
  authorName: string;
  createdAt: Date;
};

export async function getReviewsForResource(resourceId: number): Promise<Review[]> {
  const rows = (await sql`
    SELECT id, resource_id, rating, text, author_name, created_at
    FROM reviews
    WHERE resource_id = ${resourceId}
    ORDER BY created_at DESC
  `) as {
    id: number;
    resource_id: number;
    rating: number;
    text: string | null;
    author_name: string;
    created_at: string;
  }[];

  return rows.map((r) => ({
    id: r.id,
    resourceId: r.resource_id,
    rating: r.rating,
    text: r.text,
    authorName: r.author_name,
    createdAt: new Date(r.created_at),
  }));
}

export async function userHasReviewed(userId: string, resourceId: number): Promise<boolean> {
  const rows = (await sql`
    SELECT 1 FROM reviews WHERE user_id = ${userId} AND resource_id = ${resourceId} LIMIT 1
  `) as unknown[];
  return rows.length > 0;
}

export async function getRatingBreakdown(resourceId: number): Promise<Record<1 | 2 | 3 | 4 | 5, number>> {
  const rows = (await sql`
    SELECT rating, COUNT(*)::int AS cnt
    FROM reviews
    WHERE resource_id = ${resourceId}
    GROUP BY rating
  `) as { rating: number; cnt: number }[];
  const out = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
  for (const row of rows) {
    if (row.rating >= 1 && row.rating <= 5) out[row.rating as 1 | 2 | 3 | 4 | 5] = row.cnt;
  }
  return out;
}

export async function createReview(opts: {
  userId: string;
  resourceId: number;
  rating: number;
  text: string | null;
  authorName: string;
}) {
  await sql`
    INSERT INTO reviews (resource_id, user_id, rating, text, author_name)
    VALUES (${opts.resourceId}, ${opts.userId}, ${opts.rating}, ${opts.text}, ${opts.authorName})
  `;
}
