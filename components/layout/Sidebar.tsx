'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import { client, urlFor } from '@/lib/sanity';
import { Category } from '@/types';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: string, data?: any) => void;
}

const NAV_ITEMS = [
  { key: 'home', icon: '🏠', page: 'home' },
  { key: 'categories', icon: '📁', page: 'categories' },
  { key: 'favorites', icon: '❤️', page: 'favorites' },
  { key: 'contact', icon: '📩', page: 'contact' },
];

export default function Sidebar({ open, onClose, onNavigate }: SidebarProps) {
  const { lang, setLang, t, isRTL } = useLang();
  const [activeTab, setActiveTab] = useState<'pages' | 'categories'>('pages');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "category"] | order(order asc)`).then(setCategories).catch(console.error);
  }, []);

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

        <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginTop: '8px' }}>
          <button 
            onClick={() => setActiveTab('pages')}
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderBottom: activeTab === 'pages' ? '2px solid var(--aubergine)' : '2px solid transparent', 
              fontWeight: activeTab === 'pages' ? 'bold' : 'normal', 
              background: 'none', 
              borderTop: 'none', 
              borderLeft: 'none', 
              borderRight: 'none', 
              cursor: 'pointer', 
              color: activeTab === 'pages' ? 'var(--aubergine)' : 'var(--gray-500)',
              transition: 'all 0.3s ease'
            }}
          >
            {t('sidebar.pages')}
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderBottom: activeTab === 'categories' ? '2px solid var(--aubergine)' : '2px solid transparent', 
              fontWeight: activeTab === 'categories' ? 'bold' : 'normal', 
              background: 'none', 
              borderTop: 'none', 
              borderLeft: 'none', 
              borderRight: 'none', 
              cursor: 'pointer', 
              color: activeTab === 'categories' ? 'var(--aubergine)' : 'var(--gray-500)',
              transition: 'all 0.3s ease'
            }}
          >
            {t('sidebar.categories')}
          </button>
        </div>

        <nav className="sidebar-nav">
          {activeTab === 'pages' && NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className="sidebar-nav-item"
              onClick={() => { onNavigate(item.page); onClose(); }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span>{t(`sidebar.${item.key}`)}</span>
            </button>
          ))}
          
          {activeTab === 'categories' && categories.map(cat => (
            <button
              key={cat._id}
              className="sidebar-nav-item"
              onClick={() => { onNavigate('boutique', { categoryId: cat._id, categoryName: cat.name[lang] || cat.name.fr }); onClose(); }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', background: 'var(--gray-100)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                 {cat.image ? (
                   <img src={urlFor(cat.image).width(56).height(56).url()} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 ) : '👗'}
              </div>
              <span>{cat.name[lang] || cat.name.fr}</span>
            </button>
          ))}
          
          {activeTab === 'categories' && categories.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--gray-500)', fontSize: '13px' }}>
              {lang === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
            </div>
          )}
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
