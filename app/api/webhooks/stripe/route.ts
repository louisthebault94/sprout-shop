import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { recordPurchase } from "@/lib/purchases";

// Webhooks must read the raw body to verify the signature. Do not parse as JSON.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET not configured" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown signature error";
    return NextResponse.json({ error: `Webhook signature verification failed: ${msg}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id ?? session.client_reference_id;
    const resourceIds = (session.metadata?.resource_ids ?? "")
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isInteger(n) && n > 0);

    if (!userId) {
      console.error("checkout.session.completed without user_id", session.id);
      return NextResponse.json({ received: true });
    }

    // Fetch line items so we can attribute amounts per resource.
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
    const currency = (session.currency ?? "aud").toUpperCase();

    for (const id of resourceIds) {
      // Match line item by metadata if possible, else split evenly.
      const li = lineItems.data.find((li) => {
        const product = li.price?.product;
        if (typeof product === "string" || !product || !("metadata" in product)) return false;
        return product.metadata?.resource_id === String(id);
      });
      const amountCents = li?.amount_total ?? Math.floor((session.amount_total ?? 0) / Math.max(resourceIds.length, 1));
      await recordPurchase({
        userId,
        resourceId: id,
        stripeSessionId: session.id,
        amount: amountCents / 100,
        currency,
      });
    }
  }

  return NextResponse.json({ received: true });
}
