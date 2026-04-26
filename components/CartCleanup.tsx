"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

/**
 * On checkout success, clear the cart so the user doesn't see stale items.
 * Webhook is the source of truth for what was purchased.
 */
export default function CartCleanup() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}
