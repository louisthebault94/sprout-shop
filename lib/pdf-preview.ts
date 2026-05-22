"use client";

/**
 * Render the first page of a PDF File to a PNG Blob using pdfjs-dist.
 * Runs entirely in the admin's browser — no server-side PDF rendering,
 * no timeout / memory risk on Vercel functions.
 *
 * Pulls the worker via the unpkg CDN so we don't have to bundle the
 * pdf.worker file into our /public.
 */
export async function renderPdfFirstPageAsPng(
  file: File,
  opts: { maxWidth?: number } = {},
): Promise<Blob> {
  const { maxWidth = 1200 } = opts;

  // Lazy-load pdfjs to keep it out of the listing/browse bundles.
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const buffer = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
  const page = await doc.getPage(1);

  // Scale to a sensible width — large enough to look crisp, small enough
  // to upload in a few hundred KB.
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(maxWidth / baseViewport.width, 2);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create 2D canvas context for PDF preview");

  await page.render({ canvasContext: ctx, viewport, canvas }).promise;

  // canvas.toBlob is async via callback — wrap in a promise.
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png", 0.92),
  );
  if (!blob) throw new Error("Failed to encode PDF preview as PNG");

  return blob;
}
