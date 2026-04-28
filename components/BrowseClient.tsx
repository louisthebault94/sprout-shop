"use client";

import { useMemo, useState, CSSProperties, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FilterPanel, { Filters, EMPTY_FILTERS } from "@/components/FilterPanel";
import ResourceCard from "@/components/ResourceCard";
import type { Resource } from "@/lib/resource-types";

export default function BrowseClient({ resources }: { resources: Resource[] }) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#FDFAF6" }} />}>
      <BrowseInner resources={resources} />
    </Suspense>
  );
}

function BrowseInner({ resources }: { resources: Resource[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState(initialQuery);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let res = [...resources];
    if (filters.subjects.length) res = res.filter((r) => filters.subjects.includes(r.subject));
    if (filters.yearGroups.length) res = res.filter((r) => filters.yearGroups.includes(r.yearGroup));
    if (filters.resourceTypes.length) res = res.filter((r) => filters.resourceTypes.includes(r.type));
    if (search) {
      const q = search.toLowerCase();
      res = res.filter((r) => r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q));
    }
    if (sort === "popular") res.sort((a, b) => b.reviewCount - a.reviewCount);
    if (sort === "rating") res.sort((a, b) => b.rating - a.rating);
    if (sort === "price-low") res.sort((a, b) => a.price - b.price);
    if (sort === "price-high") res.sort((a, b) => b.price - a.price);
    if (sort === "newest") res.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return res;
  }, [resources, filters, sort, search]);

  const activeFilterCount =
    filters.subjects.length +
    filters.yearGroups.length +
    filters.resourceTypes.length +
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0);

  return (
    <div style={{ background: "#FDFAF6", minHeight: "100vh" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #EDE8E2", padding: "20px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, color: "#1A1714" }}>Browse resources</h1>
              <p style={{ fontSize: "14px", color: "#9E958A", marginTop: "2px" }}>
                {filtered.length} resources · Australian Curriculum v9.0
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button
                className="mobile-filter-btn"
                onClick={() => setFilterOpen((o) => !o)}
                style={{
                  display: "none",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  border: "1.5px solid #D6CFC6",
                  borderRadius: "9999px",
                  background: filterOpen ? "#2A9D8F" : "#fff",
                  color: filterOpen ? "#fff" : "#635C55",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span style={{ background: "#F4A261", color: "#fff", borderRadius: "9999px", width: "18px", height: "18px", fontSize: "10px", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9E958A" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter results…"
                  style={inputStyle}
                />
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="newest">Newest first</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 32px", display: "flex", gap: "28px", alignItems: "flex-start" }} className="browse-layout">
        <div className={`filter-panel${filterOpen ? " open" : ""}`}>
          <FilterPanel filters={filters} onChange={setFilters} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#9E958A", fontFamily: "'DM Sans', sans-serif" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
              <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>No results yet</div>
              <div style={{ fontSize: "14px" }}>Try adjusting your filters.</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }} className="resource-grid">
              {filtered.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle: CSSProperties = {
  padding: "8px 12px 8px 32px",
  border: "1.5px solid #D6CFC6",
  borderRadius: "9999px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13px",
  background: "#F7F3EE",
  outline: "none",
  width: "200px",
  color: "#1A1714",
};

const selectStyle: CSSProperties = {
  padding: "8px 12px",
  border: "1.5px solid #D6CFC6",
  borderRadius: "8px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13px",
  color: "#1A1714",
  background: "#fff",
  cursor: "pointer",
  outline: "none",
};
