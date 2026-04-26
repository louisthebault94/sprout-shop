"use client";

import Link from "next/link";
import { CSSProperties } from "react";
import { useCart } from "@/lib/cart-context";
import { SUBJECT_COLORS } from "@/lib/resource-types";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, r) => sum + (r.price || 0), 0);
  const freeItems = cart.filter((r) => !r.price || r.price === 0);
  const paidItems = cart.filter((r) => r.price > 0);

  if (cart.length === 0) {
    return (
      <div style={s.page}>
        <div style={s.inner}>
          <div style={s.emptyState}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>🛒</div>
            <h2 style={s.emptyTitle}>Your cart is empty</h2>
            <p style={s.emptySub}>Browse our resources and add something you love.</p>
            <Link href="/browse" style={{ ...s.btnPrimary, display: "inline-block" }}>
              Browse resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <h1 style={s.pageTitle}>
          Your cart{" "}
          <span style={{ color: "#9E958A", fontSize: "22px", fontWeight: 400 }}>
            ({cart.length} {cart.length === 1 ? "item" : "items"})
          </span>
        </h1>

        <div style={s.layout}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {cart.map((r) => {
              const sc = SUBJECT_COLORS[r.subject] ?? SUBJECT_COLORS.Mathematics;
              return (
                <div key={r.id} style={s.cartItem}>
                  <div style={{ ...s.itemThumb, background: sc.thumb }}>{sc.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={s.itemTitle}>{r.title}</div>
                    <div style={s.itemMeta}>
                      {r.subject} · {r.yearGroup} · {r.type}
                    </div>
                    <div style={s.itemMeta}>📄 {r.pageCount} pages · PDF · Instant download</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flexShrink: 0 }}>
                    <div style={s.itemPrice}>{r.price > 0 ? `$${r.price.toFixed(2)}` : "Free"}</div>
                    <button style={s.removeBtn} onClick={() => removeFromCart(r.id)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={s.summaryPanel}>
            <div style={s.summaryTitle}>Order summary</div>

            {paidItems.map((r) => (
              <div key={r.id} style={s.summaryRow}>
                <span style={s.summaryLabel} title={r.title}>
                  {r.title.length > 30 ? r.title.slice(0, 30) + "…" : r.title}
                </span>
                <span style={s.summaryVal}>${r.price.toFixed(2)}</span>
              </div>
            ))}
            {freeItems.length > 0 && (
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>
                  {freeItems.length} free resource{freeItems.length > 1 ? "s" : ""}
                </span>
                <span style={{ ...s.summaryVal, color: "#2A9D8F" }}>Free</span>
              </div>
            )}

            <div style={s.summaryDivider} />
            <div style={{ ...s.summaryRow, marginBottom: "20px" }}>
              <span style={{ fontWeight: 700, fontSize: "15px", color: "#1A1714", fontFamily: "'DM Sans', sans-serif" }}>Total</span>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", fontWeight: 800, color: "#1A1714" }}>
                ${total.toFixed(2)}{" "}
                <span style={{ fontSize: "12px", fontWeight: 400, color: "#9E958A" }}>AUD</span>
              </span>
            </div>

            <Link href="/auth" style={{ ...s.btnPrimary, display: "block", textAlign: "center", textDecoration: "none" }}>
              {total > 0 ? `Checkout · $${total.toFixed(2)}` : "Download all free"}
            </Link>

            <div style={s.trustRow}>
              <span style={s.trustItem}>🔒 Secure checkout</span>
              <span style={s.trustItem}>↓ Instant download</span>
            </div>

            <div style={s.summaryDivider} />
            <div style={s.summaryNote}>
              All resources are delivered as PDF downloads immediately after payment. No subscription required.
            </div>
          </div>
        </div>

        <div style={{ marginTop: "16px" }}>
          <Link href="/browse" style={s.continueBtn}>← Continue browsing</Link>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  page: { background: "#FDFAF6", minHeight: "100vh", paddingBottom: "80px" },
  inner: { maxWidth: "1000px", margin: "0 auto", padding: "40px 32px" },
  pageTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "32px", fontWeight: 800, color: "#1A1714", marginBottom: "32px" },
  layout: { display: "flex", gap: "32px", alignItems: "flex-start" },
  cartItem: { background: "#fff", border: "1px solid #EDE8E2", borderRadius: "16px", padding: "20px", marginBottom: "12px", display: "flex", gap: "16px", alignItems: "flex-start", boxShadow: "0 1px 3px rgba(26,23,20,0.04)" },
  itemThumb: { width: "72px", height: "72px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 },
  itemTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: "#1A1714", marginBottom: "4px", lineHeight: 1.3 },
  itemMeta: { fontSize: "12px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" },
  itemPrice: { fontFamily: "'Nunito', sans-serif", fontSize: "17px", fontWeight: 800, color: "#1A1714" },
  removeBtn: { background: "none", border: "none", fontSize: "12px", color: "#9E958A", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0, textDecoration: "underline" },
  summaryPanel: { background: "#fff", border: "1px solid #EDE8E2", borderRadius: "20px", padding: "24px", width: "300px", flexShrink: 0, position: "sticky", top: "80px", boxShadow: "0 2px 8px rgba(26,23,20,0.06)" },
  summaryTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 800, color: "#1A1714", marginBottom: "16px" },
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px", marginBottom: "8px" },
  summaryLabel: { fontSize: "13px", color: "#635C55", fontFamily: "'DM Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "170px" },
  summaryVal: { fontSize: "14px", fontWeight: 600, color: "#1A1714", fontFamily: "'DM Sans', sans-serif", flexShrink: 0 },
  summaryDivider: { height: "1px", background: "#EDE8E2", margin: "14px 0" },
  btnPrimary: { width: "100%", padding: "13px", borderRadius: "9999px", background: "#2A9D8F", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: "none", cursor: "pointer", marginBottom: "12px" },
  trustRow: { display: "flex", gap: "12px", justifyContent: "center", marginBottom: "4px" },
  trustItem: { fontSize: "11px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" },
  summaryNote: { fontSize: "11px", color: "#BEB5AA", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, textAlign: "center" },
  continueBtn: { background: "none", border: "none", color: "#2A9D8F", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", padding: 0, textDecoration: "none" },
  emptyState: { textAlign: "center", padding: "80px 0" },
  emptyTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "26px", fontWeight: 800, color: "#1A1714", marginBottom: "8px" },
  emptySub: { fontSize: "15px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif", marginBottom: "24px" },
};
