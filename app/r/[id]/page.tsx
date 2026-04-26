import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getResource } from "@/lib/resources";
import { hasUserPurchased } from "@/lib/purchases";
import ListingClient from "@/components/ListingClient";

export const revalidate = 0; // depends on per-user purchase status

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const resource = await getResource(numericId);
  if (!resource) notFound();

  const { userId } = await auth();
  const purchased = userId ? await hasUserPurchased(userId, resource.id) : false;

  return <ListingClient resource={resource} initialPurchased={purchased} />;
}
