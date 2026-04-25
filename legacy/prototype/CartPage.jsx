// CartPage.jsx — Cart / order summary screen

function CartPage({ cart, onRemove, onCheckout, onBrowse }) {
  const total = cart.reduce((sum, r) => sum + (r.price || 0), 0);
  const freeItems = cart.filter(r => !r.price || r.price === 0);
  const paidItems = cart.filter(r => r.price > 0);

  const subjectColors = {
    'Mathematics': { bg: '#EEF1FD', thumb: 'linear-gradient(135deg,#EEF1FD,#C8D0FA)', icon: '📐' },
    'English':     { bg: '#FDECEE', thumb: 'linear-gradient(135deg,#FDECEE,#FAC8CB)', icon: '📖' },
    'Science':     { bg: '#E8F5F3', thumb: 'linear-gradient(135deg,#E8F5F3,#8FD1CA)', icon: '🔬' },
    'HASS':        { bg: '#FEF0EC', thumb: 'linear-gradient(135deg,#FEF0EC,#FAC8B0)', icon: '🌏' },
    'The Arts':    { bg: '#F4EFFE', thumb: 'linear-gradient(135deg,#F4EFFE,#DCC8FA)', icon: '🎨' },
    'HPE':         { bg: '#EDF7F2', thumb: 'linear-gradient(135deg,#EDF7F2,#B5E0CB)', icon: '🏃' },
    'Technologies':{ bg: '#FEF4EC', thumb: 'linear-gradient(135deg,#FEF4EC,#FAD8B0)', icon: '💻' },
  };

  if (cart.length === 0) return (
    <div style={cartStyles.page}>
      <div style={cartStyles.inner}>
        <div style={cartStyles.emptyState}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🛒</div>
          <h2 style={cartStyles.emptyTitle}>Your cart is empty</h2>
          <p style={cartStyles.emptySub}>Browse our resources and add something you love.</p>
          <button style={cartStyles.btnPrimary} onClick={onBrowse}>Browse resources</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={cartStyles.page}>
      <div style={cartStyles.inner}>
        <h1 style={cartStyles.pageTitle}>Your cart <span style={{ color: '#9E958A', fontSize: '22px', fontWeight: 400 }}>({cart.length} {cart.length === 1 ? 'item' : 'items'})</span></h1>

        <div style={cartStyles.layout}>
          {/* Items */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {cart.map((r, i) => {
              const sc = subjectColors[r.subject] || subjectColors['Mathematics'];
              return (
                <div key={r.id} style={cartStyles.cartItem}>
                  <div style={{ ...cartStyles.itemThumb, background: sc.thumb }}>{sc.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={cartStyles.itemTitle}>{r.title}</div>
                    <div style={cartStyles.itemMeta}>{r.subject} · {r.yearGroup} · {r.type}</div>
                    <div style={cartStyles.itemMeta}>📄 {r.pageCount} pages · PDF · Instant download</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                    <div style={cartStyles.itemPrice}>{r.price > 0 ? `$${r.price.toFixed(2)}` : 'Free'}</div>
                    <button style={cartStyles.removeBtn} onClick={() => onRemove(r.id)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary panel */}
          <div style={cartStyles.summaryPanel}>
            <div style={cartStyles.summaryTitle}>Order summary</div>

            {paidItems.length > 0 && paidItems.map(r => (
              <div key={r.id} style={cartStyles.summaryRow}>
                <span style={cartStyles.summaryLabel} title={r.title}>{r.title.length > 30 ? r.title.slice(0,30)+'…' : r.title}</span>
                <span style={cartStyles.summaryVal}>${r.price.toFixed(2)}</span>
              </div>
            ))}
            {freeItems.length > 0 && (
              <div style={cartStyles.summaryRow}>
                <span style={cartStyles.summaryLabel}>{freeItems.length} free resource{freeItems.length > 1 ? 's' : ''}</span>
                <span style={{ ...cartStyles.summaryVal, color: '#2A9D8F' }}>Free</span>
              </div>
            )}

            <div style={cartStyles.summaryDivider} />
            <div style={{ ...cartStyles.summaryRow, marginBottom: '20px' }}>
              <span style={{ fontWeight: 700, fontSize: '15px', color: '#1A1714', fontFamily: "'DM Sans', sans-serif" }}>Total</span>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '22px', fontWeight: 800, color: '#1A1714' }}>${total.toFixed(2)} <span style={{ fontSize: '12px', fontWeight: 400, color: '#9E958A' }}>AUD</span></span>
            </div>

            <button style={cartStyles.btnPrimary} onClick={onCheckout}>
              {total > 0 ? `Checkout · $${total.toFixed(2)}` : 'Download all free'}
            </button>

            <div style={cartStyles.trustRow}>
              <span style={cartStyles.trustItem}>🔒 Secure checkout</span>
              <span style={cartStyles.trustItem}>↓ Instant download</span>
            </div>

            <div style={cartStyles.summaryDivider} />
            <div style={cartStyles.summaryNote}>
              All resources are delivered as PDF downloads immediately after payment. No subscription required.
            </div>
          </div>
        </div>

        {/* Continue shopping */}
        <div style={{ marginTop: '16px' }}>
          <button style={cartStyles.continueBtn} onClick={onBrowse}>← Continue browsing</button>
        </div>
      </div>
    </div>
  );
}

const cartStyles = {
  page: { background: '#FDFAF6', minHeight: '100vh', paddingBottom: '80px' },
  inner: { maxWidth: '1000px', margin: '0 auto', padding: '40px 32px' },
  pageTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '32px', fontWeight: 800, color: '#1A1714', marginBottom: '32px' },
  layout: { display: 'flex', gap: '32px', alignItems: 'flex-start' },
  cartItem: { background: '#fff', border: '1px solid #EDE8E2', borderRadius: '16px', padding: '20px', marginBottom: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(26,23,20,0.04)' },
  itemThumb: { width: '72px', height: '72px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 },
  itemTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '15px', fontWeight: 700, color: '#1A1714', marginBottom: '4px', lineHeight: 1.3 },
  itemMeta: { fontSize: '12px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif", marginBottom: '2px' },
  itemPrice: { fontFamily: "'Nunito', sans-serif", fontSize: '17px', fontWeight: 800, color: '#1A1714' },
  removeBtn: { background: 'none', border: 'none', fontSize: '12px', color: '#9E958A', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", padding: 0, textDecoration: 'underline' },
  summaryPanel: { background: '#fff', border: '1px solid #EDE8E2', borderRadius: '20px', padding: '24px', width: '300px', flexShrink: 0, position: 'sticky', top: '80px', boxShadow: '0 2px 8px rgba(26,23,20,0.06)' },
  summaryTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '18px', fontWeight: 800, color: '#1A1714', marginBottom: '16px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '8px' },
  summaryLabel: { fontSize: '13px', color: '#635C55', fontFamily: "'DM Sans', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' },
  summaryVal: { fontSize: '14px', fontWeight: 600, color: '#1A1714', fontFamily: "'DM Sans', sans-serif", flexShrink: 0 },
  summaryDivider: { height: '1px', background: '#EDE8E2', margin: '14px 0' },
  btnPrimary: { width: '100%', padding: '13px', borderRadius: '9999px', background: '#2A9D8F', color: '#fff', fontSize: '15px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer', marginBottom: '12px' },
  trustRow: { display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '4px' },
  trustItem: { fontSize: '11px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" },
  summaryNote: { fontSize: '11px', color: '#BEB5AA', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5, textAlign: 'center' },
  continueBtn: { background: 'none', border: 'none', color: '#2A9D8F', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', padding: 0 },
  emptyState: { textAlign: 'center', padding: '80px 0' },
  emptyTitle: { fontFamily: "'Nunito', sans-serif", fontSize: '26px', fontWeight: 800, color: '#1A1714', marginBottom: '8px' },
  emptySub: { fontSize: '15px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px' },
};

Object.assign(window, { CartPage });
