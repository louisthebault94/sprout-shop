"use client";

import { useState, CSSProperties } from "react";
import type { Resource } from "@/lib/resources";

type Step = "cart" | "payment" | "success";

export default function CheckoutModal({
  resource,
  onClose,
  onComplete,
}: {
  resource: Resource;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<Step>("cart");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1400);
  };

  return (
    <div style={s.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>
        <div style={s.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#2A9D8F" />
              <path d="M24 36 C24 36 24 26 24 19" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M24 28 C22 26 16 24 15 17 C15 17 21 15 24 23" fill="white" />
              <path d="M24 23 C26 20 30 17 33 11 C33 11 27 11 24 19" fill="white" opacity="0.65" />
            </svg>
            <span style={s.brandName}>Sprout</span>
          </div>
          {step !== "success" && (
            <button style={s.closeBtn} onClick={onClose}>✕</button>
          )}
        </div>

        {step === "cart" && (
          <div style={s.body}>
            <div style={s.sectionTitle}>Your order</div>
            <div style={s.orderRow}>
              <div style={{ ...s.orderThumb, background: "linear-gradient(135deg,#EEF1FD,#C8D0FA)" }}>📐</div>
              <div style={{ flex: 1 }}>
                <div style={s.orderTitle}>{resource.title}</div>
                <div style={s.orderMeta}>{resource.yearGroup} · {resource.type} · PDF</div>
              </div>
              <div style={s.orderPrice}>${resource.price.toFixed(2)}</div>
            </div>
            <div style={s.divider} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <span style={s.totalLabel}>Total</span>
              <span style={s.totalValue}>${resource.price.toFixed(2)} AUD</span>
            </div>
            <div style={s.trustRow}>
              <span style={s.trustItem}>🔒 Secure checkout</span>
              <span style={s.trustItem}>↓ Instant download</span>
              <span style={s.trustItem}>✓ No subscription</span>
            </div>
            <button style={s.btnPrimary} onClick={() => setStep("payment")}>
              Continue to payment →
            </button>
          </div>
        )}

        {step === "payment" && (
          <div style={s.body}>
            <div style={s.sectionTitle}>Payment details</div>
            <div style={s.fieldGroup}>
              <label style={s.fieldLabel}>Email</label>
              <input style={s.input} type="email" placeholder="you@school.edu.au" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div style={s.fieldGroup}>
              <label style={s.fieldLabel}>Card number</label>
              <input style={s.input} placeholder="1234 5678 9012 3456" value={cardNum} onChange={(e) => setCardNum(e.target.value)} maxLength={19} />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ ...s.fieldGroup, flex: 1 }}>
                <label style={s.fieldLabel}>Expiry</label>
                <input style={s.input} placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} maxLength={7} />
              </div>
              <div style={{ ...s.fieldGroup, flex: 1 }}>
                <label style={s.fieldLabel}>CVV</label>
                <input style={s.input} placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength={4} />
              </div>
            </div>
            <div style={s.divider} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={s.totalLabel}>Total due</span>
              <span style={s.totalValue}>${resource.price.toFixed(2)} AUD</span>
            </div>
            <button style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }} onClick={handlePay} disabled={loading}>
              {loading ? "Processing…" : `Pay $${resource.price.toFixed(2)} AUD`}
            </button>
            <button style={s.btnBack} onClick={() => setStep("cart")}>← Back</button>
          </div>
        )}

        {step === "success" && (
          <div style={{ ...s.body, textAlign: "center", paddingTop: "32px" }}>
            <div style={s.successIcon}>✓</div>
            <div style={s.successTitle}>You&apos;ve got it!</div>
            <div style={s.successSub}>
              Your resource is ready to download. We&apos;ve also sent a receipt to {email || "your email"}.
            </div>
            <button style={{ ...s.btnPrimary, marginTop: "20px" }} onClick={() => { onComplete(); onClose(); }}>
              ↓ Download now
            </button>
            <div style={{ fontSize: "12px", color: "#9E958A", marginTop: "12px", fontFamily: "'DM Sans', sans-serif" }}>
              Your purchase is saved in your downloads library.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  backdrop: { position: "fixed", inset: 0, background: "rgba(26,23,20,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(4px)" },
  modal: { background: "#fff", borderRadius: "20px", width: "100%", maxWidth: "440px", boxShadow: "0 24px 48px rgba(26,23,20,0.18)", overflow: "hidden" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #EDE8E2" },
  brandName: { fontFamily: "'Quicksand', sans-serif", fontSize: "18px", fontWeight: 700, color: "#1A1714" },
  closeBtn: { background: "none", border: "none", fontSize: "16px", color: "#9E958A", cursor: "pointer", padding: "4px", lineHeight: 1 },
  body: { padding: "24px" },
  sectionTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "17px", fontWeight: 800, color: "#1A1714", marginBottom: "16px" },
  orderRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
  orderThumb: { width: "52px", height: "52px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 },
  orderTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A1714", marginBottom: "3px" },
  orderMeta: { fontSize: "12px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" },
  orderPrice: { fontFamily: "'Nunito', sans-serif", fontSize: "17px", fontWeight: 800, color: "#1A1714" },
  divider: { height: "1px", background: "#EDE8E2", margin: "16px 0" },
  totalLabel: { fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#635C55" },
  totalValue: { fontFamily: "'Nunito', sans-serif", fontSize: "20px", fontWeight: 800, color: "#1A1714" },
  trustRow: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" },
  trustItem: { fontSize: "11px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" },
  btnPrimary: { width: "100%", padding: "13px", borderRadius: "9999px", background: "#2A9D8F", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: "none", cursor: "pointer", display: "block" },
  btnBack: { width: "100%", padding: "10px", borderRadius: "9999px", background: "transparent", color: "#9E958A", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", border: "none", cursor: "pointer", marginTop: "8px" },
  fieldGroup: { marginBottom: "14px" },
  fieldLabel: { display: "block", fontSize: "12px", fontWeight: 600, color: "#635C55", marginBottom: "5px", fontFamily: "'DM Sans', sans-serif" },
  input: { width: "100%", padding: "10px 12px", border: "1.5px solid #D6CFC6", borderRadius: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#1A1714", background: "#FDFAF6", outline: "none", boxSizing: "border-box" },
  successIcon: { width: "60px", height: "60px", borderRadius: "9999px", background: "#E8F5F3", color: "#2A9D8F", fontSize: "28px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" },
  successTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "24px", fontWeight: 800, color: "#1A1714", marginBottom: "8px" },
  successSub: { fontSize: "14px", color: "#635C55", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: "300px", margin: "0 auto" },
};
