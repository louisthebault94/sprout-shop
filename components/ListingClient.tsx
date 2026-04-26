"use client";

import Link from "next/link";
import { useState, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useCart } from "@/lib/cart-context";
import type { Resource, ResourceState } from "@/lib/resource-types";
import { SUBJECT_COLORS } from "@/lib/resource-types";

const reviews = [
  { author: "Sarah T.", role: "Year 3 teacher, VIC", rating: 5, text: "Absolutely love this pack. My students were engaged the whole lesson and the differentiation saved me so much planning time." },
  { author: "Rachel M.", role: "Tutor, QLD", rating: 5, text: "Well structured, clear layout, and perfectly matched to the Australian Curriculum v9. Will definitely buy more." },
  { author: "James K.", role: "Parent, NSW", rating: 4, text: "Great for home learning — my daughter found it fun and not too difficult. The answer key was a bonus!" },
];

export default function ListingClient({ resource, initialPurchased = false }: { resource: Resource; initialPurchased?: boolean }) {
  const initial: ResourceState | "previewing" = initialPurchased
    ? "purchased"
    : ((resource.state ?? "locked") as ResourceState);
  const [paywallState, setPaywallState] = useState<ResourceState | "previewing">(initial);
  const [activeTab, setActiveTab] = useState<"description" | "what's included" | "curriculum">("description");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { addToCart } = useCart();

  const sc = SUBJECT_COLORS[resource.subject] ?? SUBJECT_COLORS.Mathematics;

  const handleBuyNow = async () => {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(`/r/${resource.id}`)}`);
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resourceIds: [resource.id] }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? "Could not start checkout");
        setCheckoutLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setCheckoutError("Network error — please try again");
      setCheckoutLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: resource.id,
      title: resource.title,
      subject: resource.subject,
      type: resource.type,
      yearGroup: resource.yearGroup,
      price: resource.price,
      pageCount: resource.pageCount,
    });
    router.push("/cart");
  };

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <div style={s.breadcrumb}>
          <Link href="/browse" style={s.breadcrumbBtn}>← Browse</Link>
          <span style={s.breadcrumbSep}>/</span>
          <span style={{ ...s.breadcrumbChip, background: sc.bg, color: sc.color }}>{resource.subject}</span>
          <span style={s.breadcrumbSep}>/</span>
          <span style={s.breadcrumbCurrent}>{resource.title}</span>
        </div>

        <div style={s.layout} className="listing-layout">
          <div style={s.leftCol} className="listing-left">
            <div style={{ ...s.previewBox, background: `linear-gradient(135deg, ${sc.bg}, #fff)` }} className="listing-preview-box">
              <span style={{ fontSize: "72px", filter: paywallState === "locked" ? "blur(2px)" : "none", transition: "filter 300ms" }}>
                {sc.icon}
              </span>
              {paywallState === "locked" && (
                <div style={s.previewOverlay}>
                  <div style={s.lockPill}>🔒 Pages 3–{resource.pageCount} locked</div>
                </div>
              )}
              {paywallState === "purchased" && (
                <div style={{ ...s.previewOverlay, background: "rgba(42,157,143,0.06)" }}>
                  <div style={{ ...s.lockPill, background: "#2A9D8F" }}>✓ Full access unlocked</div>
                </div>
              )}
              {paywallState === "previewing" && (
                <div style={{ ...s.previewOverlay, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))" }}>
                  <div style={{ ...s.lockPill, background: "#F4A261" }}>Showing pages 1–2 of {resource.pageCount}</div>
                </div>
              )}
            </div>

            <div style={s.previewMeta}>
              <span style={s.metaChip}>📄 {resource.pageCount} pages</span>
              <span style={s.metaChip}>PDF · Printable</span>
              <span style={s.metaChip}>A4</span>
            </div>

            {paywallState === "locked" && (
              <button style={s.previewBtn} onClick={() => setPaywallState("previewing")}>
                Preview pages 1–2 free →
              </button>
            )}
            {paywallState === "previewing" && (
              <button
                style={{ ...s.previewBtn, background: "#FEF4EC", color: "#C47330", borderColor: "#F4A261" }}
                onClick={() => setPaywallState("locked")}
              >
                ✕ Close preview
              </button>
            )}
          </div>

          <div style={s.rightCol}>
            <div style={s.tagRow}>
              <span style={{ ...s.chip, background: sc.bg, color: sc.color }}>{resource.subject}</span>
              <span style={s.chip}>{resource.yearGroup}</span>
              <span style={s.chip}>{resource.type}</span>
              <span style={{ ...s.chip, background: "#EEF1FD", color: "#4361EE", letterSpacing: "0.04em" }}>AC v9.0</span>
            </div>

            <h1 style={s.title} className="listing-title">{resource.title}</h1>

            <div style={s.ratingRow}>
              <span style={{ color: "#F4A261", fontSize: "18px", letterSpacing: "2px" }}>
                {"★".repeat(Math.floor(resource.rating))}
                {"☆".repeat(5 - Math.floor(resource.rating))}
              </span>
              <span style={s.ratingNum}>{resource.rating}</span>
              <span style={s.ratingCount}>({resource.reviewCount} reviews)</span>
              <a href="#reviews" style={s.reviewLink}>Read reviews</a>
            </div>

            {paywallState === "purchased" ? (
              <div style={s.purchasedBlock}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "20px" }}>✓</span>
                  <span style={s.purchasedTitle}>You&apos;ve purchased this resource</span>
                </div>
                <a href={`/api/download/${resource.id}`} style={{ ...s.btnDownload, display: "block", textAlign: "center", textDecoration: "none" }}>
                  ↓ Download now
                </a>
                <div style={{ fontSize: "12px", color: "#3D9A6A", marginTop: "8px", fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
                  Also saved in your downloads library
                </div>
              </div>
            ) : resource.price === 0 || resource.state === "free" ? (
              <div style={s.ctaBlock}>
                <div style={s.priceDisplay}>Free</div>
                <a href={`/api/download/${resource.id}`} style={{ ...s.btnPrimary, display: "block", textAlign: "center", textDecoration: "none" }}>
                  ↓ Free download
                </a>
                <div style={s.trustRow}>
                  <span style={s.trustItem}>No account needed</span>
                  <span style={s.trustItem}>Instant download</span>
                </div>
              </div>
            ) : (
              <div style={s.ctaBlock}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "14px" }}>
                  <div style={s.priceDisplay}>${resource.price.toFixed(2)}</div>
                  <span style={{ fontSize: "13px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>AUD</span>
                </div>
                <div style={s.ctaBtns} className="cta-btns">
                  <button style={s.btnPrimary} onClick={handleAddToCart} disabled={checkoutLoading}>Add to cart</button>
                  <button style={{ ...s.btnBuyNow, opacity: checkoutLoading ? 0.7 : 1 }} onClick={handleBuyNow} disabled={checkoutLoading}>
                    {checkoutLoading ? "Redirecting…" : "Buy now"}
                  </button>
                </div>
                {checkoutError && (
                  <div style={{ fontSize: "12px", color: "#E63946", textAlign: "center", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>{checkoutError}</div>
                )}
                <div style={s.trustRow}>
                  <span style={s.trustItem}>🔒 Secure checkout</span>
                  <span style={s.trustItem}>↓ Instant download</span>
                </div>
              </div>
            )}

            <div style={s.tabs}>
              {(["description", "what's included", "curriculum"] as const).map((tab) => (
                <button
                  key={tab}
                  style={{ ...s.tab, ...(activeTab === tab ? s.tabActive : {}) }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <div style={s.tabContent}>
                <p style={s.bodyText}>
                  This comprehensive pack gives you everything needed to teach {resource.subject} to {resource.yearGroup} students. Designed by experienced Australian primary teachers — ready to print and teach with no extra prep.
                </p>
                <p style={s.bodyText}>
                  Includes differentiated activities for three ability levels, ensuring every student is challenged and supported. Full answer key included.
                </p>
              </div>
            )}
            {activeTab === "what's included" && (
              <div style={s.tabContent}>
                {[
                  "8 differentiated worksheets (3 ability levels)",
                  "Full answer key",
                  "Teacher notes + learning intentions",
                  "Australian Curriculum v9.0 alignment mapping",
                  "Printable A4 — PDF format",
                  "Editable version included",
                ].map((item, i) => (
                  <div key={i} style={s.includeItem}>
                    <span style={{ color: "#2A9D8F", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={s.bodyText}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "curriculum" && (
              <div style={s.tabContent}>
                <div style={s.curriculumBlock}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ ...s.chip, background: "#EEF1FD", color: "#4361EE", fontSize: "12px" }}>
                      Australian Curriculum v9.0
                    </span>
                  </div>
                  <p style={s.bodyText}>
                    Aligned to {resource.yearGroup} content descriptions in the {resource.subject} learning area. Covers key concepts identified in the AC v9.0 achievement standards.
                  </p>
                </div>
                <div style={s.curriculumBlock}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ ...s.chip, background: "#FDECEE", color: "#E63946", fontSize: "12px" }}>
                      UK National Curriculum
                    </span>
                  </div>
                  <p style={s.bodyText}>
                    Also suitable for UK KS1–KS2 {resource.subject} — maps to Key Stage statutory requirements.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <section id="reviews" style={s.reviewsSection}>
          <h2 style={s.reviewsTitle}>
            What teachers are saying
            <span style={{ fontSize: "18px", fontWeight: 400, color: "#9E958A", marginLeft: "10px" }}>
              ({resource.reviewCount} {resource.reviewCount === 1 ? "review" : "reviews"})
            </span>
          </h2>
          {resource.reviewCount === 0 ? (
            <div style={{ background: "#fff", border: "1px solid #EDE8E2", borderRadius: "16px", padding: "48px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>⭐</div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "16px", fontWeight: 700, color: "#1A1714", marginBottom: "6px" }}>
                No reviews yet
              </div>
              <div style={{ fontSize: "13px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>
                Be the first to share your thoughts after using this in your classroom.
              </div>
            </div>
          ) : (
            <>
          <div style={s.ratingOverview} className="listing-rating-overview">
            <div style={{ textAlign: "center", padding: "16px 24px", borderRight: "1px solid #EDE8E2" }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "48px", fontWeight: 800, color: "#1A1714", lineHeight: 1 }}>
                {resource.rating}
              </div>
              <div style={{ color: "#F4A261", fontSize: "18px", letterSpacing: "3px", margin: "4px 0" }}>
                {"★".repeat(Math.floor(resource.rating))}
              </div>
              <div style={{ fontSize: "12px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>
                {resource.reviewCount} reviews
              </div>
            </div>
            <div style={{ flex: 1, padding: "16px 24px", display: "flex", flexDirection: "column", gap: "6px", justifyContent: "center" }}>
              {[5, 4, 3, 2, 1].map((n) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif", width: "8px" }}>{n}</span>
                  <span style={{ color: "#F4A261", fontSize: "12px" }}>★</span>
                  <div style={{ flex: 1, height: "6px", background: "#EDE8E2", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "#F4A261", borderRadius: "3px", width: n === 5 ? "78%" : n === 4 ? "15%" : n === 3 ? "5%" : "1%" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif", width: "24px" }}>
                    {n === 5 ? "78%" : n === 4 ? "15%" : n === 3 ? "5%" : "1%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={s.reviewsGrid} className="listing-reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} style={s.reviewCard}>
                <div style={s.reviewHeader}>
                  <div style={s.reviewAvatar}>{r.author[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={s.reviewAuthor}>{r.author}</div>
                    <div style={s.reviewRole}>{r.role}</div>
                  </div>
                  <div style={{ color: "#F4A261", fontSize: "13px", letterSpacing: "1px" }}>{"★".repeat(r.rating)}</div>
                </div>
                <p style={s.reviewText}>{r.text}</p>
              </div>
            ))}
          </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  page: { background: "#FDFAF6", minHeight: "100vh", paddingBottom: "80px" },
  inner: { maxWidth: "1280px", margin: "0 auto", padding: "24px 32px" },
  breadcrumb: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", flexWrap: "wrap" },
  breadcrumbBtn: { background: "none", border: "none", color: "#2A9D8F", fontWeight: 600, fontSize: "14px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0, textDecoration: "none" },
  breadcrumbSep: { color: "#BEB5AA", fontSize: "14px" },
  breadcrumbChip: { fontSize: "12px", fontWeight: 600, padding: "2px 10px", borderRadius: "4px", fontFamily: "'DM Sans', sans-serif" },
  breadcrumbCurrent: { fontSize: "13px", color: "#635C55", fontFamily: "'DM Sans', sans-serif" },
  layout: { display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: "48px", alignItems: "flex-start", marginBottom: "56px" },
  leftCol: { position: "sticky", top: "80px" },
  previewBox: { borderRadius: "20px", border: "1px solid #EDE8E2", height: "320px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", marginBottom: "12px" },
  previewOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "90px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "14px" },
  lockPill: { background: "rgba(26,23,20,0.65)", color: "#fff", padding: "6px 16px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, backdropFilter: "blur(6px)", fontFamily: "'DM Sans', sans-serif" },
  previewMeta: { display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" },
  metaChip: { fontSize: "12px", color: "#635C55", background: "#F7F3EE", padding: "4px 10px", borderRadius: "9999px", fontFamily: "'DM Sans', sans-serif" },
  previewBtn: { width: "100%", padding: "11px", borderRadius: "9999px", border: "1.5px solid #2A9D8F", background: "transparent", color: "#2A9D8F", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" },
  rightCol: {},
  tagRow: { display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" },
  chip: { display: "inline-block", fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "4px", background: "#F7F3EE", color: "#635C55", fontFamily: "'DM Sans', sans-serif" },
  title: { fontFamily: "'Nunito', sans-serif", fontSize: "34px", fontWeight: 800, color: "#1A1714", lineHeight: 1.15, marginBottom: "14px" },
  ratingRow: { display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px", flexWrap: "wrap" },
  ratingNum: { fontWeight: 700, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", color: "#1A1714" },
  ratingCount: { fontSize: "14px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" },
  reviewLink: { fontSize: "13px", color: "#2A9D8F", fontFamily: "'DM Sans', sans-serif", textDecoration: "underline", cursor: "pointer", marginLeft: "4px" },
  ctaBlock: { background: "#fff", border: "1px solid #EDE8E2", borderRadius: "20px", padding: "22px", marginBottom: "24px", boxShadow: "0 2px 8px rgba(26,23,20,0.06)" },
  priceDisplay: { fontFamily: "'Nunito', sans-serif", fontSize: "36px", fontWeight: 800, color: "#1A1714" },
  ctaBtns: { display: "flex", gap: "10px", marginBottom: "14px" },
  btnPrimary: { flex: 1, padding: "13px 20px", borderRadius: "9999px", background: "#2A9D8F", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: "none", cursor: "pointer" },
  btnBuyNow: { flex: 1, padding: "13px 20px", borderRadius: "9999px", background: "#F4A261", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: "none", cursor: "pointer" },
  trustRow: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },
  trustItem: { fontSize: "12px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" },
  purchasedBlock: { background: "#E8F5F3", border: "1.5px solid #8FD1CA", borderRadius: "20px", padding: "20px 22px", marginBottom: "24px" },
  purchasedTitle: { fontSize: "15px", fontWeight: 700, color: "#2A9D8F", fontFamily: "'DM Sans', sans-serif" },
  btnDownload: { width: "100%", padding: "13px", borderRadius: "9999px", background: "#2A9D8F", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: "none", cursor: "pointer" },
  tabs: { display: "flex", borderBottom: "2px solid #EDE8E2", marginBottom: "18px" },
  tab: { padding: "10px 18px", background: "none", border: "none", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "#9E958A", cursor: "pointer", borderBottom: "2px solid transparent", marginBottom: "-2px", transition: "color 150ms" },
  tabActive: { color: "#2A9D8F", borderBottomColor: "#2A9D8F" },
  tabContent: { display: "flex", flexDirection: "column", gap: "10px" },
  bodyText: { fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#635C55", lineHeight: 1.7, margin: 0 },
  includeItem: { display: "flex", gap: "8px", alignItems: "flex-start" },
  curriculumBlock: { marginBottom: "14px", background: "#F7F3EE", borderRadius: "12px", padding: "14px 16px" },
  reviewsSection: { borderTop: "1px solid #EDE8E2", paddingTop: "48px" },
  reviewsTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "26px", fontWeight: 800, color: "#1A1714", marginBottom: "24px" },
  ratingOverview: { background: "#fff", border: "1px solid #EDE8E2", borderRadius: "16px", display: "flex", marginBottom: "24px", overflow: "hidden" },
  reviewsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
  reviewCard: { background: "#fff", borderRadius: "14px", border: "1px solid #EDE8E2", padding: "18px", boxShadow: "0 1px 3px rgba(26,23,20,0.04)" },
  reviewHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  reviewAvatar: { width: "38px", height: "38px", borderRadius: "9999px", background: "#E8F5F3", color: "#2A9D8F", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "14px", fontFamily: "'Nunito', sans-serif", flexShrink: 0 },
  reviewAuthor: { fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#1A1714" },
  reviewRole: { fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#9E958A" },
  reviewText: { fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#635C55", lineHeight: 1.65, margin: 0 },
};
