// Header.jsx — TeachReach top navigation
// Shared between all screens

function Header({ cartCount = 0, onNavigate, currentScreen }) {
  const [searchVal, setSearchVal] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) onNavigate('browse');
  };

  return (
    <header style={headerStyles.nav}>
      <div style={headerStyles.inner}>
        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('home'); }} style={headerStyles.logo}>
          <div style={headerStyles.logoMark}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="34" height="34">
              <circle cx="24" cy="24" r="24" fill="#2A9D8F"/>
              <line x1="24" y1="36" x2="24" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M24 28 C24 28 15 23 14 15 C14 15 22 14 26 22" fill="white" opacity="0.95"/>
              <path d="M24 22 C24 22 31 17 35 10 C35 10 28 10 25 17" fill="white" opacity="0.72"/>
              <circle cx="20" cy="38" r="1.8" fill="white" opacity="0.4"/>
              <circle cx="24" cy="40" r="1.8" fill="white" opacity="0.4"/>
              <circle cx="28" cy="38" r="1.8" fill="white" opacity="0.4"/>
            </svg>
          </div>
          <span style={headerStyles.logoText}>Sprout</span>
        </a>

        {/* Search */}
        <form onSubmit={handleSearch} style={headerStyles.searchForm} className="nav-search">
          <div style={headerStyles.searchWrap}>
            <span style={headerStyles.searchIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
            <input
              style={headerStyles.searchInput}
              type="text"
              placeholder="Search by subject, year group, type…"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onFocus={e => e.target.style.borderColor = '#2A9D8F'}
              onBlur={e => e.target.style.borderColor = '#D6CFC6'}
            />
          </div>
        </form>

        {/* Actions */}
        <div style={headerStyles.actions}>
          <button style={headerStyles.btnGhost} onClick={() => onNavigate('auth')}>Sign in</button>
          <button style={headerStyles.btnOutline} onClick={() => onNavigate('upload')}>+ Upload</button>
          <button style={headerStyles.btnPrimary} onClick={() => onNavigate('home')}>Get started</button>
          <button style={headerStyles.cartBtn} onClick={() => onNavigate('cart')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {cartCount > 0 && <span style={headerStyles.cartBadge}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

const headerStyles = {
  nav: {
    background: '#FFFFFF',
    borderBottom: '1px solid #EDE8E2',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(26,23,20,0.06)',
  },
  inner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    flexShrink: 0,
  },
  logoMark: { display: 'flex' },
  logoText: {
    fontFamily: "'Quicksand', 'Nunito', sans-serif",
    fontSize: '22px',
    fontWeight: 700,
    color: '#1A1714',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.01em',
  },
  searchForm: { flex: 1, maxWidth: '440px' },
  searchWrap: { position: 'relative' },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9E958A',
    display: 'flex',
  },
  searchInput: {
    width: '100%',
    padding: '9px 12px 9px 38px',
    border: '1.5px solid #D6CFC6',
    borderRadius: '9999px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    background: '#F7F3EE',
    color: '#1A1714',
    outline: 'none',
    transition: 'border-color 150ms',
    boxSizing: 'border-box',
  },
  actions: { display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto', flexShrink: 0 },
  btnGhost: {
    padding: '7px 16px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#635C55',
  },
  btnOutline: {
    padding: '7px 14px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    border: '1.5px solid #2A9D8F',
    background: 'transparent',
    color: '#2A9D8F',
  },
  btnPrimary: {
    padding: '8px 18px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    border: 'none',
    background: '#2A9D8F',
    color: '#fff',
  },
  cartBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '9999px',
    border: '1.5px solid #D6CFC6',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    color: '#635C55',
  },
  cartBadge: {
    position: 'absolute',
    top: '-3px',
    right: '-3px',
    background: '#F4A261',
    color: '#fff',
    borderRadius: '9999px',
    width: '16px',
    height: '16px',
    fontSize: '10px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Sans', sans-serif",
  },
};

Object.assign(window, { Header });
