import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { sql } from "@/lib/db";

type CheckoutBody = {
  resourceIds: number[];
};

type ResourceRow = {
  id: number;
  title: string;
  price: string;
};

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Sign in to check out" }, { status: 401 });
  }

  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const ids = (body.resourceIds ?? []).filter((id): id is number => Number.isInteger(id) && id > 0);
  if (ids.length === 0) {
    return NextResponse.json({ error: "No resource ids supplied" }, { status: 400 });
  }

  // Look up resources from DB so we can trust price/title (never trust the client).
  const rows = (await sql`
    SELECT id, title, price FROM resources WHERE id = ANY(${ids}::int[]) AND price > 0
  `) as ResourceRow[];

  if (rows.length === 0) {
    return NextResponse.json({ error: "No paid resources to check out" }, { status: 400 });
  }

  const origin = req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: rows.map((r) => ({
      quantity: 1,
      price_data: {
        currency: "aud",
        unit_amount: Math.round(Number(r.price) * 100),
        product_data: {
          name: r.title,
          metadata: { resource_id: String(r.id) },
        },
      },
    })),
    metadata: {
      user_id: userId,
      resource_ids: rows.map((r) => r.id).join(","),
    },
    client_reference_id: userId,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe did not return a URL" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
