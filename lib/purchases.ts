import "server-only";
import { sql } from "./db";

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
