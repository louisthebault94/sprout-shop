// Server-only DB queries for resources.
// Do not import this file from client components.

import "server-only";
import { sql } from "./db";
import type { Resource, ResourceState, Curriculum } from "./resource-types";

type ResourceRow = {
  id: number;
  title: string;
  subject: string;
  type: string;
  year_group: string;
  price: string;
  rating: string;
  review_count: number;
  state: string;
  page_count: number;
  is_new: boolean;
  curriculum: string;
  description: string | null;
};

function rowToResource(r: ResourceRow): Resource {
  return {
    id: r.id,
    title: r.title,
    subject: r.subject,
    type: r.type,
    yearGroup: r.year_group,
    price: Number(r.price),
    rating: Number(r.rating),
    reviewCount: Number(r.review_count),
    state: r.state as ResourceState,
    pageCount: r.page_count,
    isNew: r.is_new,
    curriculum: r.curriculum as Curriculum,
    description: r.description,
  };
}

// Rating + review_count are derived from the reviews table on the fly so
// they always reflect reality — the rating/review_count columns on the
// resources row are ignored.
const SELECT_BASE = `
  SELECT
    r.id, r.title, r.subject, r.type, r.year_group, r.price,
    COALESCE(rv.avg_rating, 0)::numeric(3,2) AS rating,
    COALESCE(rv.cnt, 0)                       AS review_count,
    r.state, r.page_count, r.is_new, r.curriculum, r.description
  FROM resources r
  LEFT JOIN (
    SELECT resource_id, AVG(rating)::numeric(3,2) AS avg_rating, COUNT(*) AS cnt
    FROM reviews
    GROUP BY resource_id
  ) rv ON rv.resource_id = r.id
`;

export async function listResources(): Promise<Resource[]> {
  const rows = (await sql.query(`${SELECT_BASE} ORDER BY r.id`)) as ResourceRow[];
  return rows.map(rowToResource);
}

export async function getResource(id: number): Promise<Resource | undefined> {
  const rows = (await sql.query(`${SELECT_BASE} WHERE r.id = $1 LIMIT 1`, [id])) as ResourceRow[];
  return rows[0] ? rowToResource(rows[0]) : undefined;
}
