import { notFound } from "next/navigation";
import { getResource } from "@/lib/resources";
import ListingClient from "@/components/ListingClient";

export const revalidate = 60;

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const resource = await getResource(numericId);
  if (!resource) notFound();

  return <ListingClient resource={resource} />;
}
