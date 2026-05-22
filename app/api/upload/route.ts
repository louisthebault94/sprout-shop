import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin";
import { sql } from "@/lib/db";

/**
 * The /api/upload route handles two kinds of client-direct blob uploads:
 *
 *   kind = "preview"  → small PNG of PDF page 1, no DB row.
 *                       Just returns a blob URL the client can pass back.
 *   kind = "resource" → the actual PDF + form metadata + previewUrl.
 *                       The onUploadCompleted callback INSERTs the resource
 *                       row, linking to both file_path and preview_path.
 */

type PreviewPayload = { kind: "preview" };

type ResourcePayload = {
  kind: "resource";
  title: string;
  subject: string;
  type: string;
  yearGroup: string;
  price: number;
  isFree: boolean;
  description: string;
  curriculum: "AU";
  pageCount: number;
  previewUrl: string | null;
};

type Payload = PreviewPayload | ResourcePayload;

function parsePayload(json: string | null | undefined): Payload {
  if (!json) throw new Error("Missing client payload");
  const parsed = JSON.parse(json);
  if (parsed?.kind !== "preview" && parsed?.kind !== "resource") {
    throw new Error("Invalid client payload kind");
  }
  return parsed as Payload;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;
  console.log("[/api/upload] incoming", { type: body.type });

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayloadJson) => {
        const admin = await isAdmin();
        console.log("[/api/upload] onBeforeGenerateToken admin=", admin);
        if (!admin) throw new Error("Only admins can upload resources");

        const payload = parsePayload(clientPayloadJson);
        if (payload.kind === "preview") {
          return {
            allowedContentTypes: ["image/png", "image/jpeg"],
            maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB — previews are small
            addRandomSuffix: true,
          };
        }
        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const payload = parsePayload(tokenPayload);
        if (payload.kind === "preview") {
          // Preview uploads don't trigger an INSERT — the URL is returned
          // to the client, which passes it back with the main PDF.
          console.log("[/api/upload] preview ready", { url: blob.url });
          return;
        }

        const finalPrice = payload.isFree ? 0 : Number(payload.price) || 0;
        try {
          await sql`
            INSERT INTO resources (
              title, subject, type, year_group, price, page_count,
              state, is_new, curriculum, description, file_path, preview_path
            ) VALUES (
              ${payload.title}, ${payload.subject}, ${payload.type}, ${payload.yearGroup},
              ${finalPrice}, ${payload.pageCount},
              ${finalPrice === 0 ? "free" : "default"}, true, ${payload.curriculum},
              ${payload.description}, ${blob.url}, ${payload.previewUrl}
            )
          `;
          console.log("[/api/upload] INSERT ok for", payload.title);
          revalidatePath("/");
          revalidatePath("/browse");
        } catch (err) {
          console.error("[/api/upload] INSERT failed", err);
          throw err;
        }
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/upload] handler error", err);
    const msg = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
