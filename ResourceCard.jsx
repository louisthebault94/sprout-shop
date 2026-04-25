// ResourceCard.jsx — TeachReach resource grid card
// States: default (paid), free, locked, purchased

const SUBJECT_COLORS = {
  'Mathematics':  { bg: '#EEF1FD', color: '#4361EE', thumb: 'linear-gradient(135deg,#EEF1FD,#C8D0FA)' },
  'English':      { bg: '#FDECEE', color: '#E63946', thumb: 'linear-gradient(135deg,#FDECEE,#FAC8CB)' },
  'Science':      { bg: '#E8F5F3', color: '#2A9D8F', thumb: 'linear-gradient(135deg,#E8F5F3,#8FD1CA)' },
  'HASS':         { bg: '#FEF0EC', color: '#E76F51', thumb: 'linear-gradient(135deg,#FEF0EC,#FAC8B0)' },
  'The Arts':     { bg: '#F4EFFE', color: '#9B5DE5', thumb: 'linear-gradient(135deg,#F4EFFE,#DCC8FA)' },
  'HPE':          { bg: '#EDF7F2', color: '#3D9A6A', thumb: 'linear-gradient(135deg,#EDF7F2,#B5E0CB)' },
  'Technologies': { bg: '#FEF4EC', color: '#C47330', thumb: 'linear-gradient(135deg,#FEF4EC,#FAD8B0)' },
};

const SUBJECT_ICONS = {
  'Mathematics': '📐', 'English': '📖', 'Science': '🔬',
  'HASS': '🌏', 'The Arts': '🎨', 'HPE': '🏃', 'Technologies': '💻',
};

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: '#F4A261', fontSize: '12px', letterSpacing: '1px' }}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

function ResourceCard({ resource, onClick }) {
  const { title, subject, type, yearGroup, price, rating, reviewCount, state, isNew } = resource;
  const subjectStyle = SUBJECT_COLORS[subject] || SUBJECT_COLORS['Maths'];
  const [hovered, setHovered] = React.useState(false);

  const isPurchased = state === 'purchased';
  const isFree = state === 'free' || price === 0;
  const isLocked = state === 'locked';

  return (
    <div
      style={{
        ...rcStyles.card,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(26,23,20,0.10), 0 2px 6px rgba(26,23,20,0.06)' : '0 1px 3px rgba(26,23,20,0.06), 0 1px 2px rgba(26,23,20,0.04)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick && onClick(resource)}
    >
      {/* Thumbnail */}
      <div style={{ ...rcStyles.thumb, background: subjectStyle.thumb, filter: isLocked ? 'blur(0px)' : 'none', position: 'relative' }}>
        <span style={{ fontSize: '32px', filter: isLocked ? 'blur(2px)' : 'none' }}>{SUBJECT_ICONS[subject] || '📄'}</span>

        {isNew && !isPurchased && (
          <div style={{ ...rcStyles.badge, background: '#F4A261', top: 8, left: 8 }}>NEW</div>
        )}
        {isLocked && (
          <div style={{ ...rcStyles.badge, background: 'rgba(26,23,20,0.6)', backdropFilter: 'blur(4px)', top: 8, right: 8 }}>
            🔒 Preview only
          </div>
        )}
        {isPurchased && (
          <div style={{ ...rcStyles.badge, background: '#2A9D8F', top: 8, right: 8 }}>✓ Purchased</div>
        )}
        {isLocked && (
          <div style={rcStyles.blurOverlay}></div>
        )}
      </div>

      {/* Meta */}
      <div style={rcStyles.meta}>
        <span style={{ ...rcStyles.subjectTag, background: subjectStyle.bg, color: subjectStyle.color }}>{subject}</span>
        <div style={rcStyles.title}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
          <Stars rating={rating} />
          <span style={{ fontSize: '11px', color: '#9E958A' }}>{rating} ({reviewCount})</span>
        </div>
        <div style={rcStyles.yearType}>{yearGroup} · {type}</div>
        <div style={rcStyles.priceRow}>
          {isPurchased ? (
            <span style={{ ...rcStyles.price, color: '#2A9D8F' }}>↓ Download</span>
          ) : isFree ? (
            <span style={{ ...rcStyles.price, color: '#2A9D8F' }}>Free</span>
          ) : (
            <span style={rcStyles.price}>${price.toFixed(2)} <span style={{ fontSize: '11px', fontWeight: 400, color: '#9E958A' }}>AUD</span></span>
          )}
        </div>
      </div>
    </div>
  );
}

const rcStyles = {
  card: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #EDE8E2',
    overflow: 'hidden',
    transition: 'transform 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
    flexDirection: 'column',
  },
  thumb: {
    width: '100%',
    paddingTop: '62%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbInner: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '10px',
    fontWeight: 700,
    color: '#fff',
    fontFamily: "'DM Sans', sans-serif",
    zIndex: 2,
  },
  blurOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '50%',
    background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.85))',
    zIndex: 1,
  },
  meta: { padding: '12px 14px 14px' },
  subjectTag: {
    display: 'inline-block',
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: '4px',
    marginBottom: '5px',
    fontFamily: "'DM Sans', sans-serif",
  },
  title: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: '13px',
    fontWeight: 700,
    color: '#1A1714',
    lineHeight: 1.3,
    marginBottom: '5px',
  },
  yearType: { fontSize: '11px', color: '#9E958A', marginBottom: '6px' },
  priceRow: { marginTop: '2px' },
  price: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: '15px',
    fontWeight: 800,
    color: '#1A1714',
  },
};

Object.assign(window, { ResourceCard, SUBJECT_COLORS, SUBJECT_ICONS });
