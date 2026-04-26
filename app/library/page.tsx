import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserPurchases, type PurchasedResource } from "@/lib/purchases";
import { SUBJECT_COLORS } from "@/lib/resource-types";

export const dynamic = "force-dynamic";

function relativeTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default async function LibraryPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent("/library")}`);
  }

  const purchases = await getUserPurchases(userId);

  return (
    <div style={{ background: "#FDFAF6", minHeight: "100vh", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 32px" }}>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "32px", fontWeight: 800, color: "#1A1714", marginBottom: "6px" }}>
          Your library
        </h1>
        <p style={{ fontSize: "15px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif", marginBottom: "32px" }}>
          {purchases.length === 0
            ? "Nothing here yet — purchases land here automatically."
            : `${purchases.length} resource${purchases.length === 1 ? "" : "s"} purchased`}
        </p>

        {purchases.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #EDE8E2", borderRadius: "20px", padding: "60px 32px", textAlign: "center", boxShadow: "0 1px 3px rgba(26,23,20,0.04)" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📚</div>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "20px", fontWeight: 800, color: "#1A1714", marginBottom: "8px" }}>
              Nothing in your library yet
            </h2>
            <p style={{ fontSize: "14px", color: "#635C55", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px" }}>
              Browse the shop and pick up something your students will love.
            </p>
            <Link
              href="/browse"
              style={{ display: "inline-block", padding: "11px 26px", borderRadius: "9999px", background: "#2A9D8F", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}
            >
              Browse resources
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {purchases.map((p) => (
              <PurchaseRow key={p.id} purchase={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PurchaseRow({ purchase }: { purchase: PurchasedResource }) {
  const sc = SUBJECT_COLORS[purchase.subject] ?? SUBJECT_COLORS.Mathematics;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #EDE8E2",
        borderRadius: "16px",
        padding: "20px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
        boxShadow: "0 1px 3px rgba(26,23,20,0.04)",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "12px",
          background: sc.thumb,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          flexShrink: 0,
        }}
      >
        {sc.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link
          href={`/r/${purchase.id}`}
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: "#1A1714", lineHeight: 1.3, textDecoration: "none", display: "block", marginBottom: "4px" }}
        >
          {purchase.title}
        </Link>
        <div style={{ fontSize: "12px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
          {purchase.subject} · {purchase.yearGroup} · {purchase.type}
        </div>
        <div style={{ fontSize: "12px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>
          📄 {purchase.pageCount} pages · Purchased {relativeTime(purchase.purchasedAt)}
          {purchase.amount > 0 && ` · $${purchase.amount.toFixed(2)} ${purchase.currency}`}
        </div>
      </div>
      <a
        href={`/api/download/${purchase.id}`}
        style={{
          padding: "10px 20px",
          borderRadius: "9999px",
          background: "#2A9D8F",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          textDecoration: "none",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        ↓ Download
      </a>
    </div>
  );
}
