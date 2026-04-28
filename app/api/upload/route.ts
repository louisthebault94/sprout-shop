import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin } from "@/lib/admin";
import { sql } from "@/lib/db";

type ResourcePayload = {
  title: string;
  subject: string;
  type: string;
  yearGroup: string;
  price: number;
  isFree: boolean;
  description: string;
  curriculum: "AU";
  pageCount: number;
};

function parseClientPayload(json: string | null | undefined): ResourcePayload {
  if (!json) throw new Error("Missing client payload");
  return JSON.parse(json) as ResourcePayload;
}

/**
 * Vercel Blob client-upload handler.
 *  - onBeforeGenerateToken: gate token issuance to admins only
 *  - onUploadCompleted: insert the resource row once the file lands in Blob
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) {
          throw new Error("Only admins can upload resources");
        }
        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: 100 * 1024 * 1024, // 100 MB
          addRandomSuffix: true,
          // The client passes the form metadata via `clientPayload`.
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const meta = parseClientPayload(tokenPayload);
        const finalPrice = meta.isFree ? 0 : Number(meta.price) || 0;
        await sql`
          INSERT INTO resources (
            title, subject, type, year_group, price, page_count,
            state, is_new, curriculum, description, file_path
          ) VALUES (
            ${meta.title}, ${meta.subject}, ${meta.type}, ${meta.yearGroup}, ${finalPrice}, ${meta.pageCount},
            ${finalPrice === 0 ? "free" : "default"}, true, ${meta.curriculum}, ${meta.description}, ${blob.url}
          )
        `;
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
