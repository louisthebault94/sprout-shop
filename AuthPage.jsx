// AuthPage.jsx — Sign in / Create account

function AuthPage({ onSuccess, onBack }) {
  const [tab, setTab] = React.useState('signin'); // signin | signup
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('teacher');
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); setTimeout(onSuccess, 900); }, 1200);
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', border: '1.5px solid #D6CFC6',
    borderRadius: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
    color: '#1A1714', background: '#FDFAF6', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 150ms',
  };

  return (
    <div style={authStyles.page}>
      <div style={authStyles.card}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <svg width="36" height="36" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="28" fill="#2A9D8F"/>
              <ellipse cx="28" cy="44" rx="10" ry="3" fill="rgba(255,255,255,0.18)"/>
              <path d="M28 44 C28 44 28 32 28 23" stroke="white" strokeWidth="2.6" strokeLinecap="round"/>
              <path d="M28 34 C26 31 19 29 17 21 C17 21 24 18 28 27" fill="white"/>
              <path d="M28 27 C30 24 35 20 38 13 C38 13 31 12 28 21" fill="white" opacity="0.65"/>
              <circle cx="28" cy="22" r="3" fill="white" opacity="0.9"/>
            </svg>
            <span style={{ fontFamily: "'Quicksand', sans-serif", fontSize: '24px', fontWeight: 700, color: '#1A1714' }}>Sprout</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={authStyles.tabs}>
          <button style={{ ...authStyles.tab, ...(tab === 'signin' ? authStyles.tabActive : {}) }} onClick={() => setTab('signin')}>Sign in</button>
          <button style={{ ...authStyles.tab, ...(tab === 'signup' ? authStyles.tabActive : {}) }} onClick={() => setTab('signup')}>Create account</button>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '9999px', background: '#E8F5F3', color: '#2A9D8F', fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>✓</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '20px', fontWeight: 800, color: '#1A1714', marginBottom: '6px' }}>{tab === 'signin' ? 'Welcome back!' : 'Account created!'}</div>
            <div style={{ fontSize: '13px', color: '#9E958A', fontFamily: "'DM Sans', sans-serif" }}>Taking you to your account…</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tab === 'signup' && (
              <div>
                <label style={authStyles.label}>Your name</label>
                <input style={inputStyle} type="text" placeholder="e.g. Sarah Thompson" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            )}

            <div>
              <label style={authStyles.label}>Email address</label>
              <input style={inputStyle} type="email" placeholder="you@school.edu.au" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label style={authStyles.label}>Password</label>
                {tab === 'signin' && <button type="button" style={{ background: 'none', border: 'none', fontSize: '12px', color: '#2A9D8F', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", padding: 0 }}>Forgot password?</button>}
              </div>
              <input style={inputStyle} type="password" placeholder={tab === 'signin' ? '••••••••' : 'At least 8 characters'} value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            {tab === 'signup' && (
              <div>
                <label style={authStyles.label}>I am a…</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[['teacher', 'Teacher'], ['tutor', 'Tutor'], ['parent', 'Parent']].map(([val, lbl]) => (
                    <button key={val} type="button"
                      style={{ flex: 1, padding: '9px', borderRadius: '9px', border: `1.5px solid ${role === val ? '#2A9D8F' : '#D6CFC6'}`, background: role === val ? '#E8F5F3' : '#fff', color: role === val ? '#2A9D8F' : '#635C55', fontSize: '13px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'all 150ms' }}
                      onClick={() => setRole(val)}
                    >{lbl}</button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" style={{ ...authStyles.btnPrimary, opacity: loading ? 0.75 : 1, marginTop: '4px' }} disabled={loading}>
              {loading ? (tab === 'signin' ? 'Signing in…' : 'Creating account…') : (tab === 'signin' ? 'Sign in' : 'Create account')}
            </button>

            {tab === 'signup' && (
              <p style={{ fontSize: '11px', color: '#BEB5AA', fontFamily: "'DM Sans', sans-serif", textAlign: 'center', lineHeight: 1.5 }}>
                By creating an account you agree to our Terms of Service and Privacy Policy.
              </p>
            )}
          </form>
        )}

        {/* Divider */}
        {!done && (
          <>
            <div style={authStyles.divider}><span style={authStyles.dividerText}>or continue with</span></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['Google', 'Apple'].map(p => (
                <button key={p} style={authStyles.socialBtn}>
                  <span style={{ fontSize: '16px' }}>{p === 'Google' ? '🌐' : '🍎'}</span> {p}
                </button>
              ))}
            </div>
          </>
        )}

        {!done && (
          <button style={{ background: 'none', border: 'none', color: '#9E958A', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', marginTop: '20px', display: 'block', width: '100%', textAlign: 'center' }} onClick={onBack}>
            ← Back to shop
          </button>
        )}
      </div>
    </div>
  );
}

const authStyles = {
  page: { background: '#FDFAF6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' },
  card: { background: '#fff', borderRadius: '24px', border: '1px solid #EDE8E2', padding: '36px 40px', width: '100%', maxWidth: '420px', boxShadow: '0 8px 32px rgba(26,23,20,0.08)' },
  tabs: { display: 'flex', background: '#F7F3EE', borderRadius: '10px', padding: '3px', marginBottom: '24px' },
  tab: { flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: 'transparent', fontSize: '14px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', color: '#9E958A', transition: 'all 150ms' },
  tabActive: { background: '#fff', color: '#1A1714', boxShadow: '0 1px 3px rgba(26,23,20,0.08)' },
  label: { display: 'block', fontSize: '13px', fontWeight: 600, color: '#635C55', marginBottom: '5px', fontFamily: "'DM Sans', sans-serif" },
  btnPrimary: { width: '100%', padding: '13px', borderRadius: '9999px', background: '#2A9D8F', color: '#fff', fontSize: '15px', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' },
  dividerText: { fontSize: '12px', color: '#BEB5AA', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap', background: '#fff', padding: '0 8px' },
  socialBtn: { flex: 1, padding: '10px', border: '1.5px solid #D6CFC6', borderRadius: '10px', background: '#fff', fontSize: '13px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#635C55' },
};

Object.assign(window, { AuthPage });
