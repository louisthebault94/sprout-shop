import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/admin";
import UploadForm from "@/components/UploadForm";

export default async function UploadPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent("/upload")}`);
  }
  if (!(await isAdmin())) {
    return (
      <div style={{ background: "#FDFAF6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ background: "#fff", border: "1px solid #EDE8E2", borderRadius: "20px", padding: "40px 36px", maxWidth: "440px", textAlign: "center", boxShadow: "0 8px 32px rgba(26,23,20,0.08)" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔒</div>
          <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", fontWeight: 800, color: "#1A1714", marginBottom: "8px" }}>Admin only</h1>
          <p style={{ fontSize: "14px", color: "#635C55", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
            Resource uploads are currently restricted to the Sprout admin. If that&apos;s you, sign in with your admin email.
          </p>
        </div>
      </div>
    );
  }

  return <UploadForm />;
}
