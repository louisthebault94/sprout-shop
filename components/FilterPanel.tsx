"use client";

import { CSSProperties } from "react";
import { ALL_SUBJECTS, ALL_TYPES, ALL_YEARS } from "@/lib/resource-types";

export type Filters = {
  subjects: string[];
  yearGroups: string[];
  resourceTypes: string[];
  priceMin: string;
  priceMax: string;
};

export const EMPTY_FILTERS: Filters = {
  subjects: [],
  yearGroups: [],
  resourceTypes: [],
  priceMin: "",
  priceMax: "",
};

export default function FilterPanel({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const { subjects, yearGroups, resourceTypes, priceMin, priceMax } = filters;

  const toggle = (arr: string[], val: string) => (arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  return (
    <aside style={s.panel}>
      <div style={s.header}>
        <span style={s.title}>Filters</span>
        <button style={s.resetBtn} onClick={() => onChange(EMPTY_FILTERS)}>Reset</button>
      </div>

      <div style={s.section}>
        <div style={s.sectionLabel}>Subject</div>
        {ALL_SUBJECTS.map((sub) => (
          <label key={sub} style={s.checkRow}>
            <input
              type="checkbox"
              checked={subjects.includes(sub)}
              onChange={() => onChange({ ...filters, subjects: toggle(subjects, sub) })}
              style={{ accentColor: "#2A9D8F", width: "15px", height: "15px" }}
            />
            <span style={s.checkLabel}>{sub}</span>
          </label>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionLabel}>Year group</div>
        {ALL_YEARS.map((y) => (
          <label key={y} style={s.checkRow}>
            <input
              type="checkbox"
              checked={yearGroups.includes(y)}
              onChange={() => onChange({ ...filters, yearGroups: toggle(yearGroups, y) })}
              style={{ accentColor: "#2A9D8F", width: "15px", height: "15px" }}
            />
            <span style={s.checkLabel}>{y}</span>
          </label>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionLabel}>Resource type</div>
        {ALL_TYPES.map((t) => (
          <label key={t} style={s.checkRow}>
            <input
              type="checkbox"
              checked={resourceTypes.includes(t)}
              onChange={() => onChange({ ...filters, resourceTypes: toggle(resourceTypes, t) })}
              style={{ accentColor: "#2A9D8F", width: "15px", height: "15px" }}
            />
            <span style={s.checkLabel}>{t}</span>
          </label>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionLabel}>Price (AUD)</div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <input
            style={s.rangeInput}
            placeholder="Free"
            value={priceMin}
            onChange={(e) => onChange({ ...filters, priceMin: e.target.value })}
          />
          <span style={{ fontSize: "12px", color: "#9E958A" }}>–</span>
          <input
            style={s.rangeInput}
            placeholder="$20"
            value={priceMax}
            onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
          />
        </div>
      </div>
    </aside>
  );
}

const s: Record<string, CSSProperties> = {
  panel: { background: "#FFFFFF", borderRadius: "12px", border: "1px solid #EDE8E2", padding: "20px", width: "240px", flexShrink: 0, boxShadow: "0 1px 3px rgba(26,23,20,0.06)", alignSelf: "flex-start", position: "sticky", top: "80px" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" },
  title: { fontFamily: "'Nunito', sans-serif", fontSize: "16px", fontWeight: 800, color: "#1A1714" },
  resetBtn: { fontSize: "12px", color: "#2A9D8F", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
  section: { marginBottom: "18px", borderTop: "1px solid #F7F3EE", paddingTop: "14px" },
  sectionLabel: { fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#9E958A", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" },
  toggle: { display: "flex", background: "#F7F3EE", borderRadius: "8px", padding: "2px" },
  toggleOpt: { flex: 1, padding: "5px 4px", fontSize: "12px", fontWeight: 600, borderRadius: "6px", cursor: "pointer", border: "none", background: "transparent", color: "#9E958A", fontFamily: "'DM Sans', sans-serif", transition: "all 150ms" },
  toggleActive: { background: "#FFFFFF", color: "#2A9D8F", boxShadow: "0 1px 2px rgba(26,23,20,0.06)" },
  checkRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px", cursor: "pointer" },
  checkLabel: { fontSize: "13px", color: "#2E2A26", fontFamily: "'DM Sans', sans-serif" },
  rangeInput: { flex: 1, padding: "6px 8px", border: "1.5px solid #D6CFC6", borderRadius: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#1A1714", background: "#FDFAF6", outline: "none", minWidth: 0 },
};
