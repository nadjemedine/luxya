'use client';
import { useLang } from '@/context/LangContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { key: 'home', icon: '🏠', page: 'home' },
  { key: 'boutique', icon: '👗', page: 'boutique' },
  { key: 'categories', icon: '🗂️', page: 'boutique' },
  { key: 'favorites', icon: '❤️', page: 'favorites' },
  { key: 'contact', icon: '📩', page: 'contact' },
];

export default function Sidebar({ open, onClose, onNavigate }: SidebarProps) {
  const { lang, setLang, t, isRTL } = useLang();

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header" style={{ position: 'relative' }}>
          <button className="sidebar-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="sidebar-logo">
            <img src="/logo.png" alt="Luxya Boutique" style={{ width: '120px', height: 'auto', objectFit: 'contain' }} />
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className="sidebar-nav-item"
              onClick={() => { onNavigate(item.page); onClose(); }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span>{t(`sidebar.${item.key}`)}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-lang">
          <p style={{ fontSize: '12px', color: 'var(--gray-500)', marginBottom: '10px', letterSpacing: '0.05em' }}>
            {t('sidebar.language')}
          </p>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} onClick={() => setLang('fr')}>
              🇫🇷 Français
            </button>
            <button className={`lang-btn ${lang === 'ar' ? 'active' : ''}`} onClick={() => setLang('ar')}>
              🇩🇿 عربية
            </button>
          </div>
        </div>

        <div style={{ padding: '16px 24px', fontSize: '11px', color: 'var(--gray-500)', textAlign: 'center' }}>
          © 2026 Luxya Boutique
        </div>
      </aside>
    </>
  );
}
