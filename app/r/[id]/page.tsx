import { notFound } from "next/navigation";
import { getResource, RESOURCES } from "@/lib/resources";
import ListingClient from "@/components/ListingClient";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ id: String(r.id) }));
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resource = getResource(Number(id));
  if (!resource) notFound();
  return <ListingClient resource={resource} />;
}
