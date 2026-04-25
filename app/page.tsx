import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ResourceCard from "@/components/ResourceCard";
import { RESOURCES } from "@/lib/resources";

export default function HomePage() {
  const featured = RESOURCES.filter((r) => r.rating >= 4.7).slice(0, 4);
  const recent = RESOURCES.filter((r) => r.isNew).slice(0, 3);

  return (
    <div style={{ background: "#FDFAF6" }}>
      <HeroSection />

      <section style={{ background: "#fff", padding: "48px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, color: "#1A1714" }}>Top rated resources</h2>
            <Link href="/browse" style={{ color: "#2A9D8F", fontWeight: 600, fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
              View all →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }} className="featured-grid">
            {featured.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section style={{ padding: "48px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, color: "#1A1714" }}>Recently added</h2>
              <Link href="/browse" style={{ color: "#2A9D8F", fontWeight: 600, fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
                See all new →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="featured-grid">
              {recent.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{ background: "#1A1714", color: "#fff", padding: "40px 32px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Quicksand', 'Nunito', sans-serif", fontSize: "22px", fontWeight: 700, marginBottom: "8px", color: "#fff" }}>Sprout</div>
        <div style={{ fontSize: "13px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>
          Quality teaching resources for Australian and UK primary classrooms.
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          {["About", "Contact", "Privacy", "Terms", "Refunds"].map((l) => (
            <span key={l} style={{ fontSize: "13px", color: "#635C55", fontFamily: "'DM Sans', sans-serif" }}>
              {l}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
