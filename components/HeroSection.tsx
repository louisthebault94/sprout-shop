"use client";

import Link from "next/link";
import { CSSProperties, Fragment } from "react";

const CATEGORIES = [
  { label: "Mathematics", icon: "📐", bg: "#EEF1FD", color: "#4361EE" },
  { label: "English", icon: "📖", bg: "#FDECEE", color: "#E63946" },
  { label: "Science", icon: "🔬", bg: "#E8F5F3", color: "#2A9D8F" },
  { label: "HASS", icon: "🌏", bg: "#FEF0EC", color: "#E76F51" },
  { label: "The Arts", icon: "🎨", bg: "#F4EFFE", color: "#9B5DE5" },
  { label: "HPE", icon: "🏃", bg: "#EDF7F2", color: "#3D9A6A" },
  { label: "Technologies", icon: "💻", bg: "#FEF4EC", color: "#C47330" },
];

const TRUST = [
  { icon: "✓", text: "Curriculum aligned" },
  { icon: "↓", text: "Instant download" },
  { icon: "🔒", text: "Secure checkout" },
  { icon: "★", text: "Rated by teachers" },
];

export default function HeroSection() {
  return (
    <div>
      <section style={s.hero}>
        <div style={s.heroInner} className="hero-inner">
          <div style={s.heroContent}>
            <div style={s.eyebrow}>Trusted by teachers across Australia 🇦🇺 🌱</div>
            <h1 style={s.h1} className="hero-h1">
              Ready-to-teach resources<br />for primary classrooms
            </h1>
            <p style={s.sub}>
              Browse hundreds of curriculum-aligned worksheets, lesson plans and activity packs — download instantly after purchase.
            </p>
            <div style={s.ctaRow} className="hero-cta-row">
              <Link href="/browse" style={s.ctaPrimary}>Browse resources</Link>
              <Link href="/browse" style={s.ctaSecondary}>See free resources →</Link>
            </div>
          </div>
          <div style={s.heroIllustration} className="hero-illustration">
            <div style={s.illustrationGrid}>
              {[
                { bg: "#EEF1FD", icon: "📐", title: "Yr 3 Maths Pack", price: "$4.50" },
                { bg: "#FDECEE", icon: "📖", title: "Phonics Phase 3", price: "Free" },
                { bg: "#E8F5F3", icon: "🔬", title: "Science Unit", price: "$7.00" },
                { bg: "#F4EFFE", icon: "🎨", title: "Art Lessons", price: "$5.00" },
              ].map((c, i) => (
                <div key={i} style={{ ...s.miniCard, background: c.bg }}>
                  <span style={{ fontSize: "20px" }}>{c.icon}</span>
                  <div style={{ fontSize: "11px", fontWeight: 700, fontFamily: "'Nunito', sans-serif", color: "#1A1714", lineHeight: 1.2 }}>{c.title}</div>
                  <div style={{ fontSize: "12px", fontWeight: 800, fontFamily: "'Nunito', sans-serif", color: c.price === "Free" ? "#2A9D8F" : "#1A1714" }}>{c.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={s.trustStrip} className="trust-strip">
        {TRUST.map((t, i) => (
          <Fragment key={i}>
            <div style={s.trustItem}>
              <span style={s.trustIcon}>{t.icon}</span>
              <span style={s.trustText}>{t.text}</span>
            </div>
            {i < TRUST.length - 1 && <div style={s.trustDivider} className="trust-divider" />}
          </Fragment>
        ))}
      </div>

      <section style={s.section}>
        <div style={s.sectionInner}>
          <h2 style={s.sectionTitle}>Browse by subject</h2>
          <div style={s.catGrid} className="cat-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.label} href="/browse" style={{ ...s.catCard, background: cat.bg }}>
                <div style={{ ...s.catIcon, color: cat.color }}>{cat.icon}</div>
                <div style={{ ...s.catLabel, color: cat.color }}>{cat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  hero: { background: "linear-gradient(160deg, #E8F5F3 0%, #FDFAF6 60%)", padding: "64px 0 48px" },
  heroInner: { maxWidth: "1280px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: "48px" },
  heroContent: { flex: "1", maxWidth: "560px" },
  eyebrow: { fontSize: "13px", fontWeight: 600, color: "#2A9D8F", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", marginBottom: "12px" },
  h1: { fontFamily: "'Nunito', sans-serif", fontSize: "48px", fontWeight: 800, color: "#1A1714", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "18px" },
  sub: { fontFamily: "'DM Sans', sans-serif", fontSize: "18px", color: "#635C55", lineHeight: 1.6, marginBottom: "28px" },
  ctaRow: { display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" },
  ctaPrimary: { padding: "13px 28px", borderRadius: "9999px", background: "#2A9D8F", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: "none", cursor: "pointer", display: "inline-block" },
  ctaSecondary: { padding: "13px 0", background: "none", border: "none", color: "#2A9D8F", fontSize: "15px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" },
  heroIllustration: { flex: "0 0 auto" },
  illustrationGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", transform: "rotate(-2deg)" },
  miniCard: { borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "6px", width: "130px", boxShadow: "0 4px 12px rgba(26,23,20,0.08)" },
  trustStrip: { background: "#fff", borderTop: "1px solid #EDE8E2", borderBottom: "1px solid #EDE8E2", padding: "14px 32px", display: "flex", justifyContent: "center", gap: "0" },
  trustItem: { display: "flex", alignItems: "center", gap: "7px", padding: "0 24px" },
  trustIcon: { fontSize: "16px", color: "#2A9D8F" },
  trustText: { fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#635C55" },
  trustDivider: { width: "1px", background: "#EDE8E2", margin: "0" },
  section: { padding: "48px 0" },
  sectionInner: { maxWidth: "1280px", margin: "0 auto", padding: "0 32px" },
  sectionTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, color: "#1A1714", marginBottom: "24px" },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "12px" },
  catCard: { borderRadius: "16px", padding: "20px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", border: "none", cursor: "pointer", transition: "transform 150ms, box-shadow 150ms", textDecoration: "none" },
  catIcon: { fontSize: "28px" },
  catLabel: { fontFamily: "'Nunito', sans-serif", fontSize: "13px", fontWeight: 700, textAlign: "center" },
};
