"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, CSSProperties, Fragment } from "react";
import { upload } from "@vercel/blob/client";

const UPLOAD_STEPS = ["Details", "Curriculum", "Files", "Preview & publish"];

const subjects = ["Mathematics", "English", "Science", "HASS", "The Arts", "HPE", "Technologies"];
const years = ["Foundation", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"];
const types = ["Worksheets", "Lesson Plans", "Flashcards", "Activity Pack", "Assessments", "Digital Slides"];

type FormState = {
  title: string;
  subject: string;
  yearFrom: string;
  yearTo: string;
  type: string;
  price: string;
  isFree: boolean;
  description: string;
  pageCount: string;
};

const EMPTY_FORM: FormState = {
  title: "", subject: "", yearFrom: "", yearTo: "", type: "",
  price: "", isFree: false, description: "", pageCount: "",
};

export default function UploadForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const inputStyle: CSSProperties = {
    width: "100%", padding: "10px 14px", border: "1.5px solid #D6CFC6",
    borderRadius: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
    color: "#1A1714", background: "#FDFAF6", outline: "none", boxSizing: "border-box",
  };
  const selectStyle: CSSProperties = { ...inputStyle, cursor: "pointer" };

  const validate = (): string | null => {
    if (!form.title.trim()) return "Add a title (step 1)";
    if (!form.subject) return "Pick a subject (step 1)";
    if (!form.type) return "Pick a resource type (step 1)";
    if (!form.yearFrom) return "Pick a year group (step 1)";
    if (!form.isFree && (!form.price || parseFloat(form.price) <= 0)) return "Set a price or mark as free (step 1)";
    if (!file) return "Attach a PDF (step 3)";
    if (!form.pageCount || parseInt(form.pageCount, 10) <= 0) return "Add the page count (step 3)";
    return null;
  };

  const handlePublish = async () => {
    const validationError = validate();
    if (validationError) {
      setPublishError(validationError);
      return;
    }
    if (!file) return; // narrowed by validate
    setPublishing(true);
    setPublishError(null);
    try {
      const yearGroup =
        form.yearTo && form.yearTo !== form.yearFrom ? `${form.yearFrom}–${form.yearTo}` : form.yearFrom;

      const payload = {
        title: form.title,
        subject: form.subject,
        type: form.type,
        yearGroup,
        price: form.isFree ? 0 : parseFloat(form.price) || 0,
        isFree: form.isFree,
        description: form.description,
        curriculum: "AU" as const,
        pageCount: parseInt(form.pageCount, 10) || 0,
      };

      await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        clientPayload: JSON.stringify(payload),
      });

      router.push("/browse");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setPublishError(msg);
      setPublishing(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <button style={s.backBtn} onClick={() => router.push("/browse")}>←</button>
          <div>
            <h1 style={s.pageTitle}>Publish a resource</h1>
            <p style={{ fontSize: "13px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>
              Admin only — add a new resource to the Sprout shop
            </p>
          </div>
        </div>

        <div style={s.stepper}>
          {UPLOAD_STEPS.map((label, i) => (
            <Fragment key={label}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: i <= step ? "pointer" : "default" }} onClick={() => i <= step && setStep(i)}>
                <div style={{ ...s.stepDot, background: i < step ? "#2A9D8F" : i === step ? "#2A9D8F" : "#EDE8E2", color: i <= step ? "#fff" : "#9E958A" }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "13px", fontWeight: i === step ? 700 : 500, color: i === step ? "#1A1714" : i < step ? "#2A9D8F" : "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
              </div>
              {i < UPLOAD_STEPS.length - 1 && (
                <div style={{ flex: 1, height: "2px", background: i < step ? "#2A9D8F" : "#EDE8E2", borderRadius: "1px" }} />
              )}
            </Fragment>
          ))}
        </div>

        <div style={s.panel}>
          {step === 0 && (
            <div style={s.stepBody}>
              <h2 style={s.stepTitle}>Resource details</h2>
              <div style={s.formGrid}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={s.label}>Title *</label>
                  <input style={inputStyle} placeholder="e.g. Year 3 Multiplication Worksheets" value={form.title} onChange={(e) => set("title", e.target.value)} />
                </div>
                <div>
                  <label style={s.label}>Subject *</label>
                  <select style={selectStyle} value={form.subject} onChange={(e) => set("subject", e.target.value)}>
                    <option value="">Select subject…</option>
                    {subjects.map((sub) => <option key={sub}>{sub}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Resource type *</label>
                  <select style={selectStyle} value={form.type} onChange={(e) => set("type", e.target.value)}>
                    <option value="">Select type…</option>
                    {types.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Year group — from</label>
                  <select style={selectStyle} value={form.yearFrom} onChange={(e) => set("yearFrom", e.target.value)}>
                    <option value="">Select…</option>
                    {years.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Year group — to</label>
                  <select style={selectStyle} value={form.yearTo} onChange={(e) => set("yearTo", e.target.value)}>
                    <option value="">Select…</option>
                    {years.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={s.label}>Description</label>
                  <textarea style={{ ...inputStyle, height: "90px", resize: "vertical" }} placeholder="What's in this resource? What will students learn?" value={form.description} onChange={(e) => set("description", e.target.value)} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={s.label}>Pricing</label>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                      <input type="checkbox" checked={form.isFree} onChange={(e) => set("isFree", e.target.checked)} style={{ accentColor: "#2A9D8F", width: "16px", height: "16px" }} />
                      <span style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: "#1A1714" }}>List as free resource</span>
                    </label>
                    {!form.isFree && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "14px", color: "#635C55", fontFamily: "'DM Sans', sans-serif" }}>$</span>
                        <input style={{ ...inputStyle, width: "100px" }} type="number" min="0.50" step="0.50" placeholder="4.50" value={form.price} onChange={(e) => set("price", e.target.value)} />
                        <span style={{ fontSize: "13px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>AUD</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={s.stepBody}>
              <h2 style={s.stepTitle}>Curriculum alignment</h2>
              <p style={s.stepSub}>All Sprout resources are aligned to the Australian Curriculum v9.0 — no further tagging needed.</p>
              <div style={{ padding: "16px 18px", background: "#E8F5F3", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "24px" }}>🇦🇺</span>
                <div style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: "#1A1714" }}>
                  <strong>Australian Curriculum v9.0</strong> · {form.subject || "subject TBC"} · {form.yearFrom || "year TBC"}
                  {form.yearTo && form.yearTo !== form.yearFrom ? `–${form.yearTo}` : ""}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={s.stepBody}>
              <h2 style={s.stepTitle}>Upload files</h2>
              <p style={s.stepSub}>Upload your PDF resource. Max 100 MB.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              <div style={s.dropZone} onClick={() => fileInputRef.current?.click()}>
                {file ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "36px", marginBottom: "8px" }}>📄</div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1A1714", marginBottom: "4px" }}>{file.name}</div>
                    <div style={{ fontSize: "12px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB · click to replace
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>☁️</div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#1A1714", marginBottom: "4px" }}>Drop your PDF here</div>
                    <div style={{ fontSize: "13px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>or click to browse — PDF up to 100MB</div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label style={s.label}>Number of pages</label>
                  <input style={inputStyle} type="number" min="1" placeholder="e.g. 24" value={form.pageCount} onChange={(e) => set("pageCount", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={s.stepBody}>
              <h2 style={s.stepTitle}>Preview &amp; publish</h2>
              <p style={s.stepSub}>Check your listing looks right before going live.</p>
              <div style={s.previewCard}>
                <div style={{ background: "linear-gradient(135deg,#EEF1FD,#C8D0FA)", height: "120px", borderRadius: "10px 10px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>
                  {["Mathematics", "Science", "HASS"].includes(form.subject) ? "📐" : form.subject === "English" ? "📖" : form.subject === "The Arts" ? "🎨" : form.subject === "HPE" ? "🏃" : "💻"}
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", background: "#EEF1FD", color: "#4361EE", display: "inline-block", marginBottom: "6px" }}>{form.subject || "Subject"}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: "#1A1714", marginBottom: "6px" }}>{form.title || "Your resource title"}</div>
                  <div style={{ fontSize: "12px", color: "#9E958A", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>
                    {form.yearFrom || "Year"}
                    {form.yearTo && form.yearTo !== form.yearFrom ? ` – ${form.yearTo}` : ""} · {form.type || "Type"}
                  </div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 800, color: form.isFree ? "#2A9D8F" : "#1A1714" }}>
                    {form.isFree ? "Free" : form.price ? `$${parseFloat(form.price).toFixed(2)}` : "—"}
                  </div>
                </div>
              </div>

              <div style={s.checklist}>
                {[
                  ["Title", !!form.title],
                  ["Subject & type", !!(form.subject && form.type)],
                  ["Year group", !!form.yearFrom],
                  ["Pricing set", !!(form.isFree || form.price)],
                  ["Description added", !!form.description.trim()],
                  ["File attached", !!file],
                ].map(([label, ok]) => (
                  <div key={String(label)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0", borderBottom: "1px solid #F7F3EE" }}>
                    <span style={{ color: ok ? "#2A9D8F" : "#D6CFC6", fontWeight: 700 }}>{ok ? "✓" : "○"}</span>
                    <span style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: ok ? "#1A1714" : "#BEB5AA" }}>{label}</span>
                    {!ok && <span style={{ fontSize: "12px", color: "#F4A261", fontFamily: "'DM Sans', sans-serif", marginLeft: "auto" }}>Missing</span>}
                  </div>
                ))}
              </div>

              {publishError && (
                <div style={{ background: "#FDECEE", color: "#E63946", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", marginTop: "16px" }}>
                  {publishError}
                </div>
              )}
            </div>
          )}

          <div style={s.navRow}>
            {step > 0 && <button style={s.btnBack} onClick={() => setStep((x) => x - 1)} disabled={publishing}>← Back</button>}
            <div style={{ flex: 1 }} />
            {step < UPLOAD_STEPS.length - 1 ? (
              <button style={s.btnPrimary} onClick={() => setStep((x) => x + 1)}>Continue →</button>
            ) : (
              <button style={{ ...s.btnPrimary, opacity: publishing ? 0.7 : 1 }} onClick={handlePublish} disabled={publishing}>
                {publishing ? "Publishing…" : "🌱 Publish resource"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, CSSProperties> = {
  page: { background: "#FDFAF6", minHeight: "100vh", paddingBottom: "80px" },
  inner: { maxWidth: "720px", margin: "0 auto", padding: "40px 32px" },
  pageTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, color: "#1A1714", marginBottom: "2px" },
  backBtn: { width: "36px", height: "36px", borderRadius: "9999px", border: "1.5px solid #EDE8E2", background: "#fff", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#635C55", flexShrink: 0 },
  stepper: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" },
  stepDot: { width: "28px", height: "28px", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 },
  panel: { background: "#fff", borderRadius: "20px", border: "1px solid #EDE8E2", overflow: "hidden", boxShadow: "0 2px 8px rgba(26,23,20,0.06)" },
  stepBody: { padding: "28px 32px" },
  stepTitle: { fontFamily: "'Nunito', sans-serif", fontSize: "20px", fontWeight: 800, color: "#1A1714", marginBottom: "6px" },
  stepSub: { fontSize: "14px", color: "#9E958A", fontFamily: "'DM Sans', sans-serif", marginBottom: "20px", lineHeight: 1.5 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#635C55", marginBottom: "5px", fontFamily: "'DM Sans', sans-serif" },
  navRow: { display: "flex", alignItems: "center", padding: "16px 32px", borderTop: "1px solid #F7F3EE", background: "#FDFAF6" },
  btnPrimary: { padding: "11px 28px", borderRadius: "9999px", background: "#2A9D8F", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: "none", cursor: "pointer" },
  btnBack: { padding: "11px 20px", borderRadius: "9999px", background: "transparent", color: "#9E958A", border: "none", fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" },
  dropZone: { border: "2px dashed #D6CFC6", borderRadius: "16px", padding: "40px 24px", cursor: "pointer", textAlign: "center", background: "#FDFAF6", transition: "border-color 150ms" },
  previewCard: { border: "1px solid #EDE8E2", borderRadius: "14px", overflow: "hidden", width: "180px", marginBottom: "20px", boxShadow: "0 2px 8px rgba(26,23,20,0.06)" },
  checklist: { background: "#F7F3EE", borderRadius: "12px", padding: "8px 16px" },
};
