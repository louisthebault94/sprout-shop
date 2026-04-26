"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Resource } from "./resource-types";

export type CartItem = Pick<Resource, "id" | "title" | "subject" | "type" | "yearGroup" | "price" | "pageCount">;

type CartContextValue = {
  cart: CartItem[];
  addToCart: (r: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "sprout-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {
      // Ignore — starts empty.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  const addToCart = (r: CartItem) => {
    setCart((prev) => (prev.find((x) => x.id === r.id) ? prev : [...prev, r]));
  };
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((r) => r.id !== id));
  };
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, count: cart.length }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
