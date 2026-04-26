import BrowseClient from "@/components/BrowseClient";
import { listResources } from "@/lib/resources";

export const revalidate = 60;

export default async function BrowsePage() {
  const resources = await listResources();
  return <BrowseClient resources={resources} />;
}
