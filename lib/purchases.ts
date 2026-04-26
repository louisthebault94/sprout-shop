import "server-only";
import { sql } from "./db";

export type PurchasedResource = {
  id: number;
  title: string;
  subject: string;
  type: string;
  yearGroup: string;
  pageCount: number;
  amount: number;
  currency: string;
  purchasedAt: Date;
};

export async function getUserPurchases(userId: string): Promise<PurchasedResource[]> {
  const rows = (await sql`
    SELECT r.id, r.title, r.subject, r.type, r.year_group, r.page_count,
           p.amount, p.currency, p.created_at
    FROM purchases p
    JOIN resources r ON r.id = p.resource_id
    WHERE p.user_id = ${userId}
    ORDER BY p.created_at DESC
  `) as {
    id: number;
    title: string;
    subject: string;
    type: string;
    year_group: string;
    page_count: number;
    amount: string;
    currency: string;
    created_at: string;
  }[];

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    subject: r.subject,
    type: r.type,
    yearGroup: r.year_group,
    pageCount: r.page_count,
    amount: Number(r.amount),
    currency: r.currency,
    purchasedAt: new Date(r.created_at),
  }));
}

export async function hasUserPurchased(userId: string, resourceId: number): Promise<boolean> {
  const rows = (await sql`
    SELECT 1 FROM purchases WHERE user_id = ${userId} AND resource_id = ${resourceId} LIMIT 1
  `) as unknown[];
  return rows.length > 0;
}

export async function getPurchasedResourceIds(userId: string): Promise<Set<number>> {
  const rows = (await sql`
    SELECT resource_id FROM purchases WHERE user_id = ${userId}
  `) as { resource_id: number }[];
  return new Set(rows.map((r) => r.resource_id));
}

export async function recordPurchase(opts: {
  userId: string;
  resourceId: number;
  stripeSessionId: string;
  amount: number;
  currency: string;
}) {
  await sql`
    INSERT INTO purchases (user_id, resource_id, stripe_session_id, amount, currency)
    VALUES (${opts.userId}, ${opts.resourceId}, ${opts.stripeSessionId}, ${opts.amount}, ${opts.currency})
    ON CONFLICT (user_id, resource_id) DO NOTHING
  `;
}
