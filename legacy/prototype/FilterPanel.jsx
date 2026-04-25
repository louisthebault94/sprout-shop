// FilterPanel.jsx — Left-rail filter panel

function FilterPanel({ filters, onChange }) {
  const { curriculum, subjects, yearGroups, resourceTypes, priceMin, priceMax } = filters;

  const allSubjects = ['Mathematics', 'English', 'Science', 'HASS', 'The Arts', 'HPE', 'Technologies'];
  const allYears = ['Foundation', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];
  const allTypes = ['Worksheets', 'Lesson Plans', 'Flashcards', 'Activity Packs', 'Assessments', 'Digital Slides'];

  const toggle = (arr, val) => arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];

  return (
    <aside style={fpStyles.panel}>
      <div style={fpStyles.header}>
        <span style={fpStyles.title}>Filters</span>
        <button style={fpStyles.resetBtn} onClick={() => onChange({ curriculum: 'AU', subjects: [], yearGroups: [], resourceTypes: [], priceMin: '', priceMax: '' })}>
          Reset
        </button>
      </div>

      {/* Curriculum toggle */}
      <div style={fpStyles.section}>
        <div style={fpStyles.sectionLabel}>Curriculum</div>
        <div style={fpStyles.toggle}>
          {['AU', 'UK'].map(c => (
            <button key={c} style={{ ...fpStyles.toggleOpt, ...(curriculum === c ? fpStyles.toggleActive : {}) }} onClick={() => onChange({ ...filters, curriculum: c })}>
              {c === 'AU' ? 'AU Curriculum' : 'UK National'}
            </button>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div style={fpStyles.section}>
        <div style={fpStyles.sectionLabel}>Subject</div>
        {allSubjects.map(s => (
          <label key={s} style={fpStyles.checkRow}>
            <input type="checkbox" checked={subjects.includes(s)} onChange={() => onChange({ ...filters, subjects: toggle(subjects, s) })} style={{ accentColor: '#2A9D8F', width: '15px', height: '15px' }} />
            <span style={fpStyles.checkLabel}>{s}</span>
          </label>
        ))}
      </div>

      {/* Year group */}
      <div style={fpStyles.section}>
        <div style={fpStyles.sectionLabel}>Year group</div>
        {allYears.map(y => (
          <label key={y} style={fpStyles.checkRow}>
            <input type="checkbox" checked={yearGroups.includes(y)} onChange={() => onChange({ ...filters, yearGroups: toggle(yearGroups, y) })} style={{ accentColor: '#2A9D8F', width: '15px', height: '15px' }} />
            <span style={fpStyles.checkLabel}>{y}</span>
          </label>
        ))}
      </div>

      {/* Resource type */}
      <div style={fpStyles.section}>
        <div style={fpStyles.sectionLabel}>Resource type</div>
        {allTypes.map(t => (
          <label key={t} style={fpStyles.checkRow}>
            <input type="checkbox" checked={resourceTypes.includes(t)} onChange={() => onChange({ ...filters, resourceTypes: toggle(resourceTypes, t) })} style={{ accentColor: '#2A9D8F', width: '15px', height: '15px' }} />
            <span style={fpStyles.checkLabel}>{t}</span>
          </label>
        ))}
      </div>

      {/* Price range */}
      <div style={fpStyles.section}>
        <div style={fpStyles.sectionLabel}>Price (AUD)</div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input style={fpStyles.rangeInput} placeholder="Free" value={priceMin} onChange={e => onChange({ ...filters, priceMin: e.target.value })} />
          <span style={{ fontSize: '12px', color: '#9E958A' }}>–</span>
          <input style={fpStyles.rangeInput} placeholder="$20" value={priceMax} onChange={e => onChange({ ...filters, priceMax: e.target.value })} />
        </div>
      </div>
    </aside>
  );
}

const fpStyles = {
  panel: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #EDE8E2',
    padding: '20px',
    width: '240px',
    flexShrink: 0,
    boxShadow: '0 1px 3px rgba(26,23,20,0.06)',
    alignSelf: 'flex-start',
    position: 'sticky',
    top: '80px',
  },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' },
  title: { fontFamily: "'Nunito', sans-serif", fontSize: '16px', fontWeight: 800, color: '#1A1714' },
  resetBtn: { fontSize: '12px', color: '#2A9D8F', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
  section: { marginBottom: '18px', borderTop: '1px solid #F7F3EE', paddingTop: '14px' },
  sectionLabel: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#9E958A', marginBottom: '8px', fontFamily: "'DM Sans', sans-serif" },
  toggle: { display: 'flex', background: '#F7F3EE', borderRadius: '8px', padding: '2px' },
  toggleOpt: { flex: 1, padding: '5px 4px', fontSize: '12px', fontWeight: 600, borderRadius: '6px', cursor: 'pointer', border: 'none', background: 'transparent', color: '#9E958A', fontFamily: "'DM Sans', sans-serif", transition: 'all 150ms' },
  toggleActive: { background: '#FFFFFF', color: '#2A9D8F', boxShadow: '0 1px 2px rgba(26,23,20,0.06)' },
  checkRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px', cursor: 'pointer' },
  checkLabel: { fontSize: '13px', color: '#2E2A26', fontFamily: "'DM Sans', sans-serif" },
  rangeInput: { flex: 1, padding: '6px 8px', border: '1.5px solid #D6CFC6', borderRadius: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#1A1714', background: '#FDFAF6', outline: 'none', minWidth: 0 },
};

Object.assign(window, { FilterPanel });
