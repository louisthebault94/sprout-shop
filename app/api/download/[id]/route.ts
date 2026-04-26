import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDownloadUrl } from "@vercel/blob";
import { getResource } from "@/lib/resources";
import { hasUserPurchased } from "@/lib/purchases";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) {
    return NextResponse.json({ error: "Bad id" }, { status: 400 });
  }

  const resource = await getResource(numericId);
  if (!resource) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Pull file_path directly — getResource doesn't expose it.
  // Re-query so we don't widen the public Resource type for this one use.
  const { sql } = await import("@/lib/db");
  const rows = (await sql`SELECT file_path FROM resources WHERE id = ${numericId} LIMIT 1`) as { file_path: string | null }[];
  const filePath = rows[0]?.file_path;

  if (!filePath) {
    return NextResponse.json({ error: "This resource has no file uploaded yet" }, { status: 404 });
  }

  // Free resources: anyone signed in or out can download.
  if (resource.price > 0) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Sign in to download" }, { status: 401 });
    }
    const purchased = await hasUserPurchased(userId, resource.id);
    if (!purchased) {
      return NextResponse.json({ error: "Purchase required" }, { status: 403 });
    }
  }

  // Force a download instead of inline display.
  const downloadUrl = getDownloadUrl(filePath);
  return NextResponse.redirect(downloadUrl);
}
