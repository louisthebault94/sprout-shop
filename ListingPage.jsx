// ListingPage.jsx — Individual resource listing page with checkout modal

function CheckoutModal({ resource, onClose, onComplete }) {
  const [step, setStep] = React.useState('cart'); // cart | payment | success
  const [cardNum, setCardNum] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('success'); }, 1400);
  };

  return (
    <div style={modalStyles.backdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modalStyles.modal}>
        {/* Header */}
        <div style={modalStyles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#2A9D8F"/><path d="M24 36 C24 36 24 26 24 19" stroke="white" strokeWidth="2.4" strokeLinecap="round"/><path d="M24 28 C22 26 16 24 15 17 C15 17 21 15 24 23" fill="white"/><path d="M24 23 C26 20 30 17 33 11 C33 11 27 11 24 19" fill="white" opacity="0.65"/></svg>
            <span style={modalStyles.brandName}>Sprout</span>
          </div>
          {step !== 'success' && <button style={modalStyles.closeBtn} onClick={onClose}>✕</button>}
        </div>

        {step === 'cart' && (
          <div style={modalStyles.body}>
            <div style={modalStyles.sectionTitle}>Your order</div>
            <div style={modalStyles.orderRow}>
              <div style={{ ...modalStyles.orderThumb, background: 'linear-gradient(135deg,#EEF1FD,#C8D0FA)' }}>📐</div>
              <div style={{ flex: 1 }}>
                <div style={modalStyles.orderTitle}>{resource.title}</div>
                <div style={modalStyles.orderMeta}>{resource.yearGroup} · {resource.type} · PDF</div>
              </div>
              <div style={modalStyles.orderPrice}>${resource.price?.toFixed(2)}</div>
            </div>
            <div style={modalStyles.divider} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={modalStyles.totalLabel}>Total</span>
              <span style={modalStyles.totalValue}>${resource.price?.toFixed(2)} AUD</span>
            </div>
            <div style={modalStyles.trustRow}>
              <span style={modalStyles.trustItem}>🔒 Secure checkout</span>
              <span style={modalStyles.trustItem}>↓ Instant download</span>
              <span style={modalStyles.trustItem}>✓ No subscription</span>
            </div>
            <button style={modalStyles.btnPrimary} onClick={() => setStep('payment')}>Continue to payment →</button>
          </div>
        )}

        {step === 'payment' && (
          <div style={modalStyles.body}>
            <div style={modalStyles.sectionTitle}>Payment details</div>
            <div style={modalStyles.fieldGroup}>
              <label style={modalStyles.fieldLabel}>Email</label>
              <input style={modalStyles.input} type="email" placeholder="you@school.edu.au" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div style={modalStyles.fieldGroup}>
              <label style={modalStyles.fieldLabel}>Card number</label>
              <input style={modalStyles.input} placeholder="1234 5678 9012 3456" value={cardNum} onChange={e => setCardNum(e.target.value)} maxLength={19} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ ...modalStyles.fieldGroup, flex: 1 }}>
                <label style={modalStyles.fieldLabel}>Expiry</label>
                <input style={modalStyles.input} placeholder="MM / YY" value={expiry} onChange={e => setExpiry(e.target.value)} maxLength={7} />
              </div>
              <div style={{ ...modalStyles.fieldGroup, flex: 1 }}>
                <label style={modalStyles.fieldLabel}>CVV</label>
                <input style={modalStyles.input} placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} maxLength={4} />
              </div>
            </div>
            <div style={modalStyles.divider} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={modalStyles.totalLabel}>Total due</span>
              <span style={modalStyles.totalValue}>${resource.price?.toFixed(2)} AUD</span>
            </div>
            <button style={{ ...modalStyles.btnPrimary, opacity: loading ? 0.7 : 1 }} onClick={handlePay} disabled={loading}>
              {loading ? 'Processing…' : `Pay $${resource.price?.toFixed(2)} AUD`}
            </button>
            <button style={modalStyles.btnBack} onClick={() => setStep('cart')}>← Back</button>
          </div>
        )}

        {step === 'success' && (
          <div style={{ ...modalStyles.body, textAlign: 'center', paddingTop: '32px' }}>
            <div style={modalStyles.successIcon}>✓</div>
            <div style={modalStyles.successTitle}>You've got it!</div>
            <div style={modalStyles.successSub}>Your resource is ready to download. We've also sent a receipt to {email || 'your email'}.</div>
            <button style={{ ...modalStyles.btnPrimary, marginTop: '20px' }} onClick={() => { onComplete(); onClose(); }}>↓ Download now</button>
            <div style={{ fontSize: '12px', color: '#9E958A', marginTop: '12px', fontFamily: "'DM Sans', sans-serif" }}>Your purchase is saved in your downloads library.</div>
          </div>
        )}
      </div>
    </div>
  );
}

const modalStyles = {
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(26,23,20,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' },
  modal: { background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '440px', boxShadow: '0 24px 48px rgba(26,23,20,0.18)', overflow: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #EDE8E2' },
  brandName: { fontFamily: "'Quicksand', sans-serif", fontSize: '18px', fontWeight: 700, color: '#1A1714' },
  closeBtn: { background: 'none', border: 'none', fontSize: '16px', color: '#9E958A', cursor: 'pointer', padding: '4px', lineHeight: 1 },
  body: { padding: '24px' },
  sectionTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '17px', fontWeight: 800, color: '#1A1714', marginBottom: '16px' },
  orderRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  orderThumb: { width: '52px', height: '52px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 },
  orderTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1A1714', marginBottom: '3px' },
  orderMeta: { fontSize: '12px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" },
  orderPrice: { fontFamily: "'Nunito', sans-serif", fontSize: '17px', fontWeight: 800, color: '#1A1714' },
  divider: { height: '1px', background: '#EDE8E2', margin: '16px 0' },
  totalLabel: { fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#635C55' },
  totalValue: { fontFamily: "'Nunito', sans-serif", fontSize: '20px', fontWeight: 800, color: '#1A1714' },
  trustRow: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' },
  trustItem: { fontSize: '11px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" },
  btnPrimary: { width: '100%', padding: '13px', borderRadius: '9999px', background: '#2A9D8F', color: '#fff', fontSize: '15px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer', display: 'block' },
  btnBack: { width: '100%', padding: '10px', borderRadius: '9999px', background: 'transparent', color: '#9E958A', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer', marginTop: '8px' },
  fieldGroup: { marginBottom: '14px' },
  fieldLabel: { display: 'block', fontSize: '12px', fontWeight: 600, color: '#635C55', marginBottom: '5px', fontFamily: "'DM Sans', sans-serif" },
  input: { width: '100%', padding: '10px 12px', border: '1.5px solid #D6CFC6', borderRadius: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#1A1714', background: '#FDFAF6', outline: 'none', boxSizing: 'border-box' },
  successIcon: { width: '60px', height: '60px', borderRadius: '9999px', background: '#E8F5F3', color: '#2A9D8F', fontSize: '28px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  successTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '24px', fontWeight: 800, color: '#1A1714', marginBottom: '8px' },
  successSub: { fontSize: '14px', color: '#635C55', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, maxWidth: '300px', margin: '0 auto' },
};

// ── Listing page ───────────────────────────────────────────
function ListingPage({ resource, onBack, onAddToCart }) {
  const [paywallState, setPaywallState] = React.useState(resource.state || 'locked');
  const [activeTab, setActiveTab] = React.useState('description');
  const [showCheckout, setShowCheckout] = React.useState(false);

  const subjectColors = {
    'Mathematics': { bg: '#EEF1FD', color: '#4361EE' },
    'English':     { bg: '#FDECEE', color: '#E63946' },
    'Science':     { bg: '#E8F5F3', color: '#2A9D8F' },
    'HASS':        { bg: '#FEF0EC', color: '#E76F51' },
    'The Arts':    { bg: '#F4EFFE', color: '#9B5DE5' },
    'HPE':         { bg: '#EDF7F2', color: '#3D9A6A' },
    'Technologies':{ bg: '#FEF4EC', color: '#C47330' },
  };
  const icons = { 'Mathematics':'📐','English':'📖','Science':'🔬','HASS':'🌏','The Arts':'🎨','HPE':'🏃','Technologies':'💻' };
  const sc = subjectColors[resource.subject] || subjectColors['Mathematics'];

  const reviews = [
    { author: 'Sarah T.', role: 'Year 3 teacher, VIC', rating: 5, text: 'Absolutely love this pack. My students were engaged the whole lesson and the differentiation saved me so much planning time.' },
    { author: 'Rachel M.', role: 'Tutor, QLD', rating: 5, text: 'Well structured, clear layout, and perfectly matched to the Australian Curriculum v9. Will definitely buy more.' },
    { author: 'James K.', role: 'Parent, NSW', rating: 4, text: 'Great for home learning — my daughter found it fun and not too difficult. The answer key was a bonus!' },
  ];

  return (
    <div style={lpStyles.page}>
      {showCheckout && (
        <CheckoutModal
          resource={resource}
          onClose={() => setShowCheckout(false)}
          onComplete={() => { setPaywallState('purchased'); onAddToCart && onAddToCart(resource); }}
        />
      )}

      <div style={lpStyles.inner}>
        {/* Breadcrumb */}
        <div style={lpStyles.breadcrumb}>
          <button style={lpStyles.breadcrumbBtn} onClick={onBack}>← Browse</button>
          <span style={lpStyles.breadcrumbSep}>/</span>
          <span style={{ ...lpStyles.breadcrumbChip, background: sc.bg, color: sc.color }}>{resource.subject}</span>
          <span style={lpStyles.breadcrumbSep}>/</span>
          <span style={lpStyles.breadcrumbCurrent}>{resource.title}</span>
        </div>

        <div style={lpStyles.layout} className="listing-layout">
          {/* Left col — preview */}
          <div style={lpStyles.leftCol} className="listing-left">
            <div style={{ ...lpStyles.previewBox, background: `linear-gradient(135deg, ${sc.bg}, #fff)` }} className="listing-preview-box">
              <span style={{ fontSize: '72px', filter: paywallState === 'locked' ? 'blur(2px)' : 'none', transition: 'filter 300ms' }}>{icons[resource.subject] || '📄'}</span>
              {paywallState === 'locked' && (
                <div style={lpStyles.previewOverlay}>
                  <div style={lpStyles.lockPill}>🔒 Pages 3–{resource.pageCount || 24} locked</div>
                </div>
              )}
              {paywallState === 'purchased' && (
                <div style={{ ...lpStyles.previewOverlay, background: 'rgba(42,157,143,0.06)' }}>
                  <div style={{ ...lpStyles.lockPill, background: '#2A9D8F' }}>✓ Full access unlocked</div>
                </div>
              )}
              {paywallState === 'previewing' && (
                <div style={{ ...lpStyles.previewOverlay, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))' }}>
                  <div style={{ ...lpStyles.lockPill, background: '#F4A261' }}>Showing pages 1–2 of {resource.pageCount}</div>
                </div>
              )}
            </div>

            <div style={lpStyles.previewMeta}>
              <span style={lpStyles.metaChip}>📄 {resource.pageCount || 24} pages</span>
              <span style={lpStyles.metaChip}>PDF · Printable</span>
              <span style={lpStyles.metaChip}>A4</span>
            </div>

            {paywallState === 'locked' && (
              <button style={lpStyles.previewBtn} onClick={() => setPaywallState('previewing')}>
                Preview pages 1–2 free →
              </button>
            )}
            {paywallState === 'previewing' && (
              <button style={{ ...lpStyles.previewBtn, background: '#FEF4EC', color: '#C47330', borderColor: '#F4A261' }} onClick={() => setPaywallState('locked')}>
                ✕ Close preview
              </button>
            )}
          </div>

          {/* Right col */}
          <div style={lpStyles.rightCol}>
            <div style={lpStyles.tagRow}>
              <span style={{ ...lpStyles.chip, background: sc.bg, color: sc.color }}>{resource.subject}</span>
              <span style={lpStyles.chip}>{resource.yearGroup}</span>
              <span style={lpStyles.chip}>{resource.type}</span>
              <span style={{ ...lpStyles.chip, background: '#EEF1FD', color: '#4361EE', letterSpacing: '0.04em' }}>AC v9.0</span>
            </div>

            <h1 style={lpStyles.title}>{resource.title}</h1>

            <div style={lpStyles.ratingRow}>
              <span style={{ color: '#F4A261', fontSize: '18px', letterSpacing: '2px' }}>
                {'★'.repeat(Math.floor(resource.rating))}{'☆'.repeat(5 - Math.floor(resource.rating))}
              </span>
              <span style={lpStyles.ratingNum}>{resource.rating}</span>
              <span style={lpStyles.ratingCount}>({resource.reviewCount} reviews)</span>
              <a href="#reviews" style={lpStyles.reviewLink}>Read reviews</a>
            </div>

            {/* CTA block */}
            {paywallState === 'purchased' ? (
              <div style={lpStyles.purchasedBlock}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>✓</span>
                  <span style={lpStyles.purchasedTitle}>You've purchased this resource</span>
                </div>
                <button style={lpStyles.btnDownload}>↓ Download now</button>
                <div style={{ fontSize: '12px', color: '#3D9A6A', marginTop: '8px', fontFamily: "'DM Sans', sans-serif", textAlign: 'center' }}>Also saved in your downloads library</div>
              </div>
            ) : resource.price === 0 || resource.state === 'free' ? (
              <div style={lpStyles.ctaBlock}>
                <div style={lpStyles.priceDisplay}>Free</div>
                <button style={lpStyles.btnPrimary} onClick={() => setPaywallState('purchased')}>↓ Free download</button>
                <div style={lpStyles.trustRow}>
                  <span style={lpStyles.trustItem}>No account needed</span>
                  <span style={lpStyles.trustItem}>Instant download</span>
                </div>
              </div>
            ) : (
              <div style={lpStyles.ctaBlock}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                  <div style={lpStyles.priceDisplay}>${resource.price?.toFixed(2)}</div>
                  <span style={{ fontSize: '13px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" }}>AUD</span>
                </div>
                <div style={lpStyles.ctaBtns}>
                  <button style={lpStyles.btnPrimary} onClick={() => setShowCheckout(true)}>Add to cart</button>
                  <button style={lpStyles.btnBuyNow} onClick={() => setShowCheckout(true)}>Buy now</button>
                </div>
                <div style={lpStyles.trustRow}>
                  <span style={lpStyles.trustItem}>🔒 Secure checkout</span>
                  <span style={lpStyles.trustItem}>↓ Instant download</span>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={lpStyles.tabs}>
              {['description', "what's included", 'curriculum'].map(tab => (
                <button key={tab} style={{ ...lpStyles.tab, ...(activeTab === tab ? lpStyles.tabActive : {}) }} onClick={() => setActiveTab(tab)}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <div style={lpStyles.tabContent}>
                <p style={lpStyles.bodyText}>This comprehensive pack gives you everything needed to teach {resource.subject} to {resource.yearGroup} students. Designed by experienced Australian primary teachers — ready to print and teach with no extra prep.</p>
                <p style={lpStyles.bodyText}>Includes differentiated activities for three ability levels, ensuring every student is challenged and supported. Full answer key included.</p>
              </div>
            )}
            {activeTab === "what's included" && (
              <div style={lpStyles.tabContent}>
                {['8 differentiated worksheets (3 ability levels)', 'Full answer key', 'Teacher notes + learning intentions', 'Australian Curriculum v9.0 alignment mapping', 'Printable A4 — PDF format', 'Editable version included'].map((item, i) => (
                  <div key={i} style={lpStyles.includeItem}>
                    <span style={{ color: '#2A9D8F', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={lpStyles.bodyText}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'curriculum' && (
              <div style={lpStyles.tabContent}>
                <div style={lpStyles.curriculumBlock}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ ...lpStyles.chip, background: '#EEF1FD', color: '#4361EE', fontSize: '12px' }}>Australian Curriculum v9.0</span>
                  </div>
                  <p style={lpStyles.bodyText}>Aligned to {resource.yearGroup} content descriptions in the {resource.subject} learning area. Covers key concepts identified in the AC v9.0 achievement standards.</p>
                </div>
                <div style={lpStyles.curriculumBlock}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ ...lpStyles.chip, background: '#FDECEE', color: '#E63946', fontSize: '12px' }}>UK National Curriculum</span>
                  </div>
                  <p style={lpStyles.bodyText}>Also suitable for UK KS1–KS2 {resource.subject} — maps to Key Stage statutory requirements.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <section id="reviews" style={lpStyles.reviewsSection}>
          <h2 style={lpStyles.reviewsTitle}>
            What teachers are saying
            <span style={{ fontSize: '18px', fontWeight: 400, color: '#9E958A', marginLeft: '10px' }}>({resource.reviewCount} reviews)</span>
          </h2>
          <div style={lpStyles.ratingOverview} className="listing-rating-overview">
            <div style={{ textAlign: 'center', padding: '16px 24px', borderRight: '1px solid #EDE8E2' }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '48px', fontWeight: 800, color: '#1A1714', lineHeight: 1 }}>{resource.rating}</div>
              <div style={{ color: '#F4A261', fontSize: '18px', letterSpacing: '3px', margin: '4px 0' }}>{'★'.repeat(Math.floor(resource.rating))}</div>
              <div style={{ fontSize: '12px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" }}>{resource.reviewCount} reviews</div>
            </div>
            <div style={{ flex: 1, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
              {[5,4,3,2,1].map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif", width: '8px' }}>{n}</span>
                  <span style={{ color: '#F4A261', fontSize: '12px' }}>★</span>
                  <div style={{ flex: 1, height: '6px', background: '#EDE8E2', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: '#F4A261', borderRadius: '3px', width: n === 5 ? '78%' : n === 4 ? '15%' : n === 3 ? '5%' : '1%' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif", width: '24px' }}>{n === 5 ? '78%' : n === 4 ? '15%' : n === 3 ? '5%' : '1%'}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={lpStyles.reviewsGrid} className="listing-reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} style={lpStyles.reviewCard}>
                <div style={lpStyles.reviewHeader}>
                  <div style={lpStyles.reviewAvatar}>{r.author[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={lpStyles.reviewAuthor}>{r.author}</div>
                    <div style={lpStyles.reviewRole}>{r.role}</div>
                  </div>
                  <div style={{ color: '#F4A261', fontSize: '13px', letterSpacing: '1px' }}>{'★'.repeat(r.rating)}</div>
                </div>
                <p style={lpStyles.reviewText}>{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const lpStyles = {
  page: { background: '#FDFAF6', minHeight: '100vh', paddingBottom: '80px' },
  inner: { maxWidth: '1280px', margin: '0 auto', padding: '24px 32px' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' },
  breadcrumbBtn: { background: 'none', border: 'none', color: '#2A9D8F', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", padding: 0 },
  breadcrumbSep: { color: '#BEB5AA', fontSize: '14px' },
  breadcrumbChip: { fontSize: '12px', fontWeight: 600, padding: '2px 10px', borderRadius: '4px', fontFamily: "'DM Sans', sans-serif" },
  breadcrumbCurrent: { fontSize: '13px', color: '#635C55', fontFamily: "'DM Sans', sans-serif" },
  layout: { display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '48px', alignItems: 'flex-start', marginBottom: '56px' },
  leftCol: { position: 'sticky', top: '80px' },
  previewBox: { borderRadius: '20px', border: '1px solid #EDE8E2', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: '12px' },
  previewOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '90px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '14px' },
  lockPill: { background: 'rgba(26,23,20,0.65)', color: '#fff', padding: '6px 16px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, backdropFilter: 'blur(6px)', fontFamily: "'DM Sans', sans-serif" },
  previewMeta: { display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' },
  metaChip: { fontSize: '12px', color: '#635C55', background: '#F7F3EE', padding: '4px 10px', borderRadius: '9999px', fontFamily: "'DM Sans', sans-serif" },
  previewBtn: { width: '100%', padding: '11px', borderRadius: '9999px', border: '1.5px solid #2A9D8F', background: 'transparent', color: '#2A9D8F', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' },
  rightCol: {},
  tagRow: { display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' },
  chip: { display: 'inline-block', fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px', background: '#F7F3EE', color: '#635C55', fontFamily: "'DM Sans', sans-serif" },
  title: { fontFamily: "'Nunito', sans-serif", fontSize: '34px', fontWeight: 800, color: '#1A1714', lineHeight: 1.15, marginBottom: '14px' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' },
  ratingNum: { fontWeight: 700, fontSize: '15px', fontFamily: "'DM Sans', sans-serif", color: '#1A1714' },
  ratingCount: { fontSize: '14px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" },
  reviewLink: { fontSize: '13px', color: '#2A9D8F', fontFamily: "'DM Sans', sans-serif", textDecoration: 'underline', cursor: 'pointer', marginLeft: '4px' },
  ctaBlock: { background: '#fff', border: '1px solid #EDE8E2', borderRadius: '20px', padding: '22px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(26,23,20,0.06)' },
  priceDisplay: { fontFamily: "'Nunito', sans-serif", fontSize: '36px', fontWeight: 800, color: '#1A1714' },
  ctaBtns: { display: 'flex', gap: '10px', marginBottom: '14px' },
  btnPrimary: { flex: 1, padding: '13px 20px', borderRadius: '9999px', background: '#2A9D8F', color: '#fff', fontSize: '15px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer' },
  btnBuyNow: { flex: 1, padding: '13px 20px', borderRadius: '9999px', background: '#F4A261', color: '#fff', fontSize: '15px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer' },
  trustRow: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  trustItem: { fontSize: '12px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" },
  purchasedBlock: { background: '#E8F5F3', border: '1.5px solid #8FD1CA', borderRadius: '20px', padding: '20px 22px', marginBottom: '24px' },
  purchasedTitle: { fontSize: '15px', fontWeight: 700, color: '#2A9D8F', fontFamily: "'DM Sans', sans-serif" },
  btnDownload: { width: '100%', padding: '13px', borderRadius: '9999px', background: '#2A9D8F', color: '#fff', fontSize: '15px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer' },
  tabs: { display: 'flex', borderBottom: '2px solid #EDE8E2', marginBottom: '18px' },
  tab: { padding: '10px 18px', background: 'none', border: 'none', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: '#9E958A', cursor: 'pointer', borderBottom: '2px solid transparent', marginBottom: '-2px', transition: 'color 150ms' },
  tabActive: { color: '#2A9D8F', borderBottomColor: '#2A9D8F' },
  tabContent: { display: 'flex', flexDirection: 'column', gap: '10px' },
  bodyText: { fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#635C55', lineHeight: 1.7, margin: 0 },
  includeItem: { display: 'flex', gap: '8px', alignItems: 'flex-start' },
  curriculumBlock: { marginBottom: '14px', background: '#F7F3EE', borderRadius: '12px', padding: '14px 16px' },
  reviewsSection: { borderTop: '1px solid #EDE8E2', paddingTop: '48px' },
  reviewsTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '26px', fontWeight: 800, color: '#1A1714', marginBottom: '24px' },
  ratingOverview: { background: '#fff', border: '1px solid #EDE8E2', borderRadius: '16px', display: 'flex', marginBottom: '24px', overflow: 'hidden' },
  reviewsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  reviewCard: { background: '#fff', borderRadius: '14px', border: '1px solid #EDE8E2', padding: '18px', boxShadow: '0 1px 3px rgba(26,23,20,0.04)' },
  reviewHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  reviewAvatar: { width: '38px', height: '38px', borderRadius: '9999px', background: '#E8F5F3', color: '#2A9D8F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', fontFamily: "'Nunito', sans-serif", flexShrink: 0 },
  reviewAuthor: { fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 700, color: '#1A1714' },
  reviewRole: { fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#9E958A' },
  reviewText: { fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#635C55', lineHeight: 1.65, margin: 0 },
};

Object.assign(window, { ListingPage });
