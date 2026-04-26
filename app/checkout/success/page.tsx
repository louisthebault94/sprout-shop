import Link from "next/link";
import CartCleanup from "@/components/CartCleanup";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div style={{ background: "#FDFAF6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <CartCleanup />
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #EDE8E2", padding: "40px 36px", maxWidth: "440px", width: "100%", boxShadow: "0 8px 32px rgba(26,23,20,0.08)", textAlign: "center" }}>
        <div style={{ width: "60px", height: "60px", borderRadius: "9999px", background: "#E8F5F3", color: "#2A9D8F", fontSize: "28px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          ✓
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "26px", fontWeight: 800, color: "#1A1714", marginBottom: "10px" }}>
          You&apos;ve got it!
        </h1>
        <p style={{ fontSize: "14px", color: "#635C55", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, marginBottom: "24px" }}>
          Your purchase is complete. We&apos;ve sent a receipt to your email and your resources are ready to download from your library.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/browse" style={{ padding: "11px 24px", borderRadius: "9999px", background: "#2A9D8F", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>
            Keep browsing
          </Link>
          <Link href="/" style={{ padding: "11px 24px", borderRadius: "9999px", background: "transparent", color: "#2A9D8F", border: "1.5px solid #2A9D8F", fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>
            Home
          </Link>
        </div>
        {session_id && (
          <div style={{ fontSize: "11px", color: "#BEB5AA", fontFamily: "'DM Mono', monospace", marginTop: "20px", wordBreak: "break-all" }}>
            Order: {session_id}
          </div>
        )}
      </div>
    </div>
  );
}
