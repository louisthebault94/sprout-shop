"use server";

import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";
import { hasUserPurchased } from "@/lib/purchases";
import { createReview, userHasReviewed } from "@/lib/reviews";

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
