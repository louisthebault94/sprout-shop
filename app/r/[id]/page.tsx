import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getResource } from "@/lib/resources";
import { hasUserPurchased } from "@/lib/purchases";
import { getReviewsForResource, getRatingBreakdown, userHasReviewed } from "@/lib/reviews";
import ListingClient from "@/components/ListingClient";

export const revalidate = 0;

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const resource = await getResource(numericId);
  if (!resource) notFound();

  const { userId } = await auth();
  const [purchased, reviews, breakdown, alreadyReviewed] = await Promise.all([
    userId ? hasUserPurchased(userId, resource.id) : Promise.resolve(false),
    getReviewsForResource(resource.id),
    getRatingBreakdown(resource.id),
    userId ? userHasReviewed(userId, resource.id) : Promise.resolve(false),
  ]);

  const canReview = Boolean(userId) && purchased && !alreadyReviewed;

  return (
    <ListingClient
      resource={resource}
      initialPurchased={purchased}
      reviews={reviews}
      ratingBreakdown={breakdown}
      canReview={canReview}
      alreadyReviewed={alreadyReviewed}
    />
  );
}
