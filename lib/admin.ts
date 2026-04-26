import "server-only";
import { currentUser } from "@clerk/nextjs/server";

/**
 * Returns true if the currently signed-in user matches the ADMIN_EMAIL env var.
 * Single-seller MVP: one admin, set via env. Replace with role-based check
 * (e.g. Clerk publicMetadata.admin) when multi-admin is needed.
 */
export async function isAdmin(): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!adminEmail) return false;
  const user = await currentUser();
  if (!user) return false;
  return user.emailAddresses.some((e) => e.emailAddress.toLowerCase() === adminEmail);
}
