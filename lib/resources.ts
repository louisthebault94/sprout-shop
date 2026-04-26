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
  price: string;        // numeric → string from neon driver
  rating: string;
  review_count: number;
  state: string;
  page_count: number;
  is_new: boolean;
  curriculum: string;
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
    reviewCount: r.review_count,
    state: r.state as ResourceState,
    pageCount: r.page_count,
    isNew: r.is_new,
    curriculum: r.curriculum as Curriculum,
  };
}

export async function listResources(): Promise<Resource[]> {
  const rows = (await sql`
    SELECT id, title, subject, type, year_group, price, rating, review_count, state, page_count, is_new, curriculum
    FROM resources
    ORDER BY id
  `) as ResourceRow[];
  return rows.map(rowToResource);
}

export async function getResource(id: number): Promise<Resource | undefined> {
  const rows = (await sql`
    SELECT id, title, subject, type, year_group, price, rating, review_count, state, page_count, is_new, curriculum
    FROM resources
    WHERE id = ${id}
    LIMIT 1
  `) as ResourceRow[];
  return rows[0] ? rowToResource(rows[0]) : undefined;
}
