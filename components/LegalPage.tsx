import Link from "next/link";
import { ReactNode } from "react";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div style={{ background: "#FDFAF6", minHeight: "100vh", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "48px 32px" }}>
        <Link href="/" style={{ fontSize: "13px", color: "#2A9D8F", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
          ← Back to Sprout
        </Link>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "36px", fontWeight: 800, color: "#1A1714", marginTop: "20px", marginBottom: "8px", letterSpacing: "-0.01em" }}>
          {title}
        </h1>
        <div style={{ fontSize: "13px", color: "#9E958A", fontFamily: "'DM Mono', monospace", marginBottom: "32px" }}>
          Last updated: {updated}
        </div>
        <div className="legal-body">{children}</div>
      </div>
      <style>{`
        .legal-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #2E2A26;
        }
        .legal-body h2 {
          font-family: 'Nunito', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #1A1714;
          margin-top: 32px;
          margin-bottom: 12px;
        }
        .legal-body h3 {
          font-family: 'Nunito', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #1A1714;
          margin-top: 20px;
          margin-bottom: 8px;
        }
        .legal-body p { margin-bottom: 14px; }
        .legal-body ul { margin: 0 0 14px 22px; }
        .legal-body li { margin-bottom: 6px; }
        .legal-body a { color: #2A9D8F; text-decoration: underline; }
        .legal-body strong { font-weight: 700; color: #1A1714; }
      `}</style>
    </div>
  );
}
