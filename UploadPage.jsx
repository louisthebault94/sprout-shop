// UploadPage.jsx — Seller resource upload flow (multi-step)

const UPLOAD_STEPS = ['Details', 'Curriculum', 'Files', 'Preview & publish'];

function UploadPage({ onBack }) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    title: '', subject: '', yearFrom: '', yearTo: '', type: '',
    price: '', isFree: false, description: '', curriculum: [],
    acStrands: [], fileName: '', pageCount: '',
  });
  const [published, setPublished] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const subjects = ['Mathematics', 'English', 'Science', 'HASS', 'The Arts', 'HPE', 'Technologies'];
  const years = ['Foundation', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];
  const types = ['Worksheets', 'Lesson Plans', 'Flashcards', 'Activity Pack', 'Assessments', 'Digital Slides'];
  const acStrands = {
    Mathematics: ['Number', 'Algebra', 'Measurement', 'Space', 'Statistics', 'Probability'],
    English: ['Language', 'Literature', 'Literacy'],
    Science: ['Biological sciences', 'Chemical sciences', 'Earth sciences', 'Physical sciences'],
    HASS: ['History', 'Geography', 'Civics & Citizenship', 'Economics & Business'],
    'The Arts': ['Visual Arts', 'Music', 'Drama', 'Dance', 'Media Arts'],
    HPE: ['Personal, Social & Community Health', 'Movement & Physical Activity'],
    Technologies: ['Design & Technologies', 'Digital Technologies'],
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '1.5px solid #D6CFC6',
    borderRadius: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
    color: '#1A1714', background: '#FDFAF6', outline: 'none', boxSizing: 'border-box',
  };
  const selectStyle = { ...inputStyle, cursor: 'pointer' };

  const toggleCurriculum = (c) => set('curriculum', form.curriculum.includes(c) ? form.curriculum.filter(x => x !== c) : [...form.curriculum, c]);
  const toggleStrand = (s) => set('acStrands', form.acStrands.includes(s) ? form.acStrands.filter(x => x !== s) : [...form.acStrands, s]);

  if (published) return (
    <div style={upStyles.page}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '9999px', background: '#E8F5F3', color: '#2A9D8F', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>🌱</div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: '30px', fontWeight: 800, color: '#1A1714', marginBottom: '10px' }}>Resource published!</h1>
        <p style={{ fontSize: '15px', color: '#635C55', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, marginBottom: '28px' }}>
          <strong>{form.title || 'Your resource'}</strong> is now live in the Sprout shop. Students and teachers can find and purchase it immediately.
        </p>
        <div style={{ background: '#F7F3EE', borderRadius: '16px', padding: '20px', marginBottom: '28px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
          {[['Price', form.isFree ? 'Free' : `$${form.price} AUD`], ['Type', form.type || '—'], ['Year group', form.yearFrom ? `${form.yearFrom}${form.yearTo && form.yearTo !== form.yearFrom ? ` – ${form.yearTo}` : ''}` : '—']].map(([l,v]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#9E958A', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'DM Sans', sans-serif" }}>{l}</div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1714', marginTop: '3px' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button style={upStyles.btnPrimary} onClick={onBack}>View in shop</button>
          <button style={upStyles.btnOutline} onClick={() => { setPublished(false); setStep(0); setForm({ title:'',subject:'',yearFrom:'',yearTo:'',type:'',price:'',isFree:false,description:'',curriculum:[],acStrands:[],fileName:'',pageCount:'' }); }}>Upload another</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={upStyles.page}>
      <div style={upStyles.inner}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <button style={upStyles.backBtn} onClick={onBack}>←</button>
          <div>
            <h1 style={upStyles.pageTitle}>Upload a resource</h1>
            <p style={{ fontSize: '13px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" }}>Share your teaching resources with thousands of educators</p>
          </div>
        </div>

        {/* Stepper */}
        <div style={upStyles.stepper}>
          {UPLOAD_STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: i <= step ? 'pointer' : 'default' }} onClick={() => i <= step && setStep(i)}>
                <div style={{ ...upStyles.stepDot, background: i < step ? '#2A9D8F' : i === step ? '#2A9D8F' : '#EDE8E2', color: i <= step ? '#fff' : '#9E958A' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '13px', fontWeight: i === step ? 700 : 500, color: i === step ? '#1A1714' : i < step ? '#2A9D8F' : '#9E958A', fontFamily: "'DM Sans', sans-serif" }}>{s}</span>
              </div>
              {i < UPLOAD_STEPS.length - 1 && <div style={{ flex: 1, height: '2px', background: i < step ? '#2A9D8F' : '#EDE8E2', borderRadius: '1px' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step panels */}
        <div style={upStyles.panel}>

          {/* Step 0 — Details */}
          {step === 0 && (
            <div style={upStyles.stepBody}>
              <h2 style={upStyles.stepTitle}>Resource details</h2>
              <div style={upStyles.formGrid}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={upStyles.label}>Title *</label>
                  <input style={inputStyle} placeholder="e.g. Year 3 Multiplication Worksheets" value={form.title} onChange={e => set('title', e.target.value)} />
                </div>
                <div>
                  <label style={upStyles.label}>Subject *</label>
                  <select style={selectStyle} value={form.subject} onChange={e => set('subject', e.target.value)}>
                    <option value="">Select subject…</option>
                    {subjects.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={upStyles.label}>Resource type *</label>
                  <select style={selectStyle} value={form.type} onChange={e => set('type', e.target.value)}>
                    <option value="">Select type…</option>
                    {types.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={upStyles.label}>Year group — from</label>
                  <select style={selectStyle} value={form.yearFrom} onChange={e => set('yearFrom', e.target.value)}>
                    <option value="">Select…</option>
                    {years.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label style={upStyles.label}>Year group — to</label>
                  <select style={selectStyle} value={form.yearTo} onChange={e => set('yearTo', e.target.value)}>
                    <option value="">Select…</option>
                    {years.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={upStyles.label}>Description</label>
                  <textarea style={{ ...inputStyle, height: '90px', resize: 'vertical' }} placeholder="What's in this resource? What will students learn?" value={form.description} onChange={e => set('description', e.target.value)} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={upStyles.label}>Pricing</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.isFree} onChange={e => set('isFree', e.target.checked)} style={{ accentColor: '#2A9D8F', width: '16px', height: '16px' }} />
                      <span style={{ fontSize: '14px', fontFamily: "'DM Sans', sans-serif", color: '#1A1714' }}>List as free resource</span>
                    </label>
                    {!form.isFree && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '14px', color: '#635C55', fontFamily: "'DM Sans', sans-serif" }}>$</span>
                        <input style={{ ...inputStyle, width: '100px' }} type="number" min="0.50" step="0.50" placeholder="4.50" value={form.price} onChange={e => set('price', e.target.value)} />
                        <span style={{ fontSize: '13px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" }}>AUD</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Curriculum */}
          {step === 1 && (
            <div style={upStyles.stepBody}>
              <h2 style={upStyles.stepTitle}>Curriculum alignment</h2>
              <p style={upStyles.stepSub}>Help buyers find your resource by aligning it to one or both curricula.</p>
              <div style={{ marginBottom: '24px' }}>
                <label style={upStyles.label}>Curriculum *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[['AU', 'Australian Curriculum v9.0'], ['UK', 'UK National Curriculum']].map(([val, lbl]) => (
                    <button key={val} type="button"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: `2px solid ${form.curriculum.includes(val) ? '#2A9D8F' : '#EDE8E2'}`, background: form.curriculum.includes(val) ? '#E8F5F3' : '#fff', color: form.curriculum.includes(val) ? '#2A9D8F' : '#635C55', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'all 150ms' }}
                      onClick={() => toggleCurriculum(val)}
                    >
                      <div style={{ fontSize: '18px', marginBottom: '4px' }}>{val === 'AU' ? '🇦🇺' : '🇬🇧'}</div>
                      {lbl}
                      {form.curriculum.includes(val) && <div style={{ fontSize: '12px', color: '#2A9D8F', marginTop: '3px' }}>✓ Selected</div>}
                    </button>
                  ))}
                </div>
              </div>
              {form.curriculum.includes('AU') && form.subject && (
                <div>
                  <label style={upStyles.label}>AC v9.0 strands (select all that apply)</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(acStrands[form.subject] || []).map(s => (
                      <button key={s} type="button"
                        style={{ padding: '6px 14px', borderRadius: '9999px', border: `1.5px solid ${form.acStrands.includes(s) ? '#2A9D8F' : '#D6CFC6'}`, background: form.acStrands.includes(s) ? '#E8F5F3' : '#fff', color: form.acStrands.includes(s) ? '#2A9D8F' : '#635C55', fontSize: '13px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'all 150ms' }}
                        onClick={() => toggleStrand(s)}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2 — Files */}
          {step === 2 && (
            <div style={upStyles.stepBody}>
              <h2 style={upStyles.stepTitle}>Upload files</h2>
              <p style={upStyles.stepSub}>Upload your PDF resource. You can also add a preview file (pages 1–2) that buyers see before purchasing.</p>

              {/* Main file drop zone */}
              <div style={upStyles.dropZone} onClick={() => set('fileName', 'Year_3_Multiplication_Worksheets.pdf')}>
                {form.fileName ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>📄</div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#1A1714', marginBottom: '4px' }}>{form.fileName}</div>
                    <div style={{ fontSize: '12px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" }}>Click to replace</div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>☁️</div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#1A1714', marginBottom: '4px' }}>Drop your PDF here</div>
                    <div style={{ fontSize: '13px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" }}>or click to browse — PDF up to 100MB</div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={upStyles.label}>Number of pages</label>
                  <input style={inputStyle} type="number" min="1" placeholder="e.g. 24" value={form.pageCount} onChange={e => set('pageCount', e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={upStyles.label}>Preview pages (optional)</label>
                  <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#9E958A', userSelect: 'none' }}>
                    <span>📎</span> Attach preview PDF
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Preview & publish */}
          {step === 3 && (
            <div style={upStyles.stepBody}>
              <h2 style={upStyles.stepTitle}>Preview &amp; publish</h2>
              <p style={upStyles.stepSub}>Check your listing looks right before going live.</p>
              <div style={upStyles.previewCard}>
                <div style={{ background: 'linear-gradient(135deg,#EEF1FD,#C8D0FA)', height: '120px', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                  {['Mathematics','Science','HASS'].includes(form.subject) ? '📐' : form.subject === 'English' ? '📖' : form.subject === 'The Arts' ? '🎨' : form.subject === 'HPE' ? '🏃' : '💻'}
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: '#EEF1FD', color: '#4361EE', display: 'inline-block', marginBottom: '6px' }}>{form.subject || 'Subject'}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '15px', fontWeight: 700, color: '#1A1714', marginBottom: '6px' }}>{form.title || 'Your resource title'}</div>
                  <div style={{ fontSize: '12px', color: '#9E958A', marginBottom: '8px', fontFamily: "'DM Sans', sans-serif" }}>{form.yearFrom || 'Year'}{form.yearTo && form.yearTo !== form.yearFrom ? ` – ${form.yearTo}` : ''} · {form.type || 'Type'}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '18px', fontWeight: 800, color: form.isFree ? '#2A9D8F' : '#1A1714' }}>
                    {form.isFree ? 'Free' : form.price ? `$${parseFloat(form.price).toFixed(2)}` : '—'}
                  </div>
                </div>
              </div>

              <div style={upStyles.checklist}>
                {[
                  ['Title', !!form.title],
                  ['Subject & type', !!(form.subject && form.type)],
                  ['Year group', !!form.yearFrom],
                  ['Pricing set', !!(form.isFree || form.price)],
                  ['Curriculum alignment', form.curriculum.length > 0],
                  ['File uploaded', !!form.fileName],
                ].map(([label, ok]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid #F7F3EE' }}>
                    <span style={{ color: ok ? '#2A9D8F' : '#D6CFC6', fontWeight: 700 }}>{ok ? '✓' : '○'}</span>
                    <span style={{ fontSize: '14px', fontFamily: "'DM Sans', sans-serif", color: ok ? '#1A1714' : '#BEB5AA' }}>{label}</span>
                    {!ok && <span style={{ fontSize: '12px', color: '#F4A261', fontFamily: "'DM Sans', sans-serif", marginLeft: 'auto' }}>Missing</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={upStyles.navRow}>
            {step > 0 && <button style={upStyles.btnBack} onClick={() => setStep(s => s - 1)}>← Back</button>}
            <div style={{ flex: 1 }} />
            {step < UPLOAD_STEPS.length - 1 ? (
              <button style={upStyles.btnPrimary} onClick={() => setStep(s => s + 1)}>Continue →</button>
            ) : (
              <button style={{ ...upStyles.btnPrimary, background: '#2A9D8F' }} onClick={() => setPublished(true)}>🌱 Publish resource</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const upStyles = {
  page: { background: '#FDFAF6', minHeight: '100vh', paddingBottom: '80px' },
  inner: { maxWidth: '720px', margin: '0 auto', padding: '40px 32px' },
  pageTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '28px', fontWeight: 800, color: '#1A1714', marginBottom: '2px' },
  backBtn: { width: '36px', height: '36px', borderRadius: '9999px', border: '1.5px solid #EDE8E2', background: '#fff', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#635C55', flexShrink: 0 },
  stepper: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' },
  stepDot: { width: '28px', height: '28px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 },
  panel: { background: '#fff', borderRadius: '20px', border: '1px solid #EDE8E2', overflow: 'hidden', boxShadow: '0 2px 8px rgba(26,23,20,0.06)' },
  stepBody: { padding: '28px 32px' },
  stepTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '20px', fontWeight: 800, color: '#1A1714', marginBottom: '6px' },
  stepSub: { fontSize: '14px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif", marginBottom: '20px', lineHeight: 1.5 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  label: { display: 'block', fontSize: '13px', fontWeight: 600, color: '#635C55', marginBottom: '5px', fontFamily: "'DM Sans', sans-serif" },
  navRow: { display: 'flex', alignItems: 'center', padding: '16px 32px', borderTop: '1px solid #F7F3EE', background: '#FDFAF6' },
  btnPrimary: { padding: '11px 28px', borderRadius: '9999px', background: '#2A9D8F', color: '#fff', fontSize: '14px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer' },
  btnOutline: { padding: '11px 28px', borderRadius: '9999px', background: 'transparent', color: '#2A9D8F', border: '1.5px solid #2A9D8F', fontSize: '14px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' },
  btnBack: { padding: '11px 20px', borderRadius: '9999px', background: 'transparent', color: '#9E958A', border: 'none', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' },
  dropZone: { border: '2px dashed #D6CFC6', borderRadius: '16px', padding: '40px 24px', cursor: 'pointer', textAlign: 'center', background: '#FDFAF6', transition: 'border-color 150ms' },
  previewCard: { border: '1px solid #EDE8E2', borderRadius: '14px', overflow: 'hidden', width: '180px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(26,23,20,0.06)' },
  checklist: { background: '#F7F3EE', borderRadius: '12px', padding: '8px 16px' },
};

Object.assign(window, { UploadPage });
