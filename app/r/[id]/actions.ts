"use server";

import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { hasUserPurchased } from "@/lib/purchases";
import { createReview, userHasReviewed } from "@/lib/reviews";
import { isAdmin } from "@/lib/admin";
import { sql } from "@/lib/db";

export type SubmitReviewResult = { ok: true } | { ok: false; error: string };

export async function submitReview(
  resourceId: number,
  rating: number,
  text: string,
): Promise<SubmitReviewResult> {
  const { userId } = await auth();
  if (!userId) return { ok: false, error: "Sign in to leave a review" };
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "Rating must be between 1 and 5 stars" };
  }
  if (!Number.isInteger(resourceId) || resourceId < 1) {
    return { ok: false, error: "Invalid resource" };
  }

  const purchased = await hasUserPurchased(userId, resourceId);
  if (!purchased) {
    return { ok: false, error: "Only buyers can review a resource" };
  }
  if (await userHasReviewed(userId, resourceId)) {
    return { ok: false, error: "You've already reviewed this resource" };
  }

  const user = await currentUser();
  const name =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "Anonymous";

  const trimmed = text.trim();
  await createReview({
    userId,
    resourceId,
    rating,
    text: trimmed.length > 0 ? trimmed : null,
    authorName: name,
  });

  revalidatePath(`/r/${resourceId}`);
  return { ok: true };
}

export type DeleteResourceResult = { ok: true } | { ok: false; error: string };

/**
 * Soft-delete a resource — sets resources.deleted_at = NOW().
 * The blob file and DB row stay intact so existing buyers can still
 * download via their library. Public browse/listing pages stop showing it.
 */
export async function deleteResource(resourceId: number): Promise<DeleteResourceResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Admin only" };
  }
  if (!Number.isInteger(resourceId) || resourceId < 1) {
    return { ok: false, error: "Invalid resource id" };
  }

  const result = (await sql`
    UPDATE resources SET deleted_at = now()
    WHERE id = ${resourceId} AND deleted_at IS NULL
    RETURNING id
  `) as { id: number }[];

  if (result.length === 0) {
    return { ok: false, error: "Resource not found (or already deleted)" };
  }

  revalidatePath("/");
  revalidatePath("/browse");
  revalidatePath(`/r/${resourceId}`);
  return { ok: true };
}

