'use client';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const { t, lang } = useLang();
  const { favoritesCount } = useCart();

  const handleNav = (page: string, sectionId?: string) => {
    if (currentPage === 'home' && sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate(page);
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <nav className="bottom-nav">
      <button
        className={`bottom-nav-item ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
      </button>

      <button
        className={`bottom-nav-item ${currentPage === 'sale' ? 'active' : ''}`}
        onClick={() => onNavigate('sale')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill={currentPage === 'sale' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        <span>{lang === 'ar' ? 'تخفيض' : 'Solde'}</span>
      </button>

      <button
        className={`bottom-nav-item ${currentPage === 'favorites' ? 'active' : ''}`}
        onClick={() => onNavigate('favorites')}
        style={{ position: 'relative' }}
      >
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <svg width="22" height="22" viewBox="0 0 24 24"
            fill={currentPage === 'favorites' ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          {favoritesCount > 0 && (
            <span style={{
              position: 'absolute', top: '-6px', right: '-8px',
              width: '15px', height: '15px', borderRadius: '50%',
              background: 'var(--gold)', color: 'var(--aubergine-dark)',
              fontSize: '8px', fontWeight: '800',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {favoritesCount}
            </span>
          )}
        </span>
        <span>{t('nav.favorite')}</span>
      </button>
    </nav>
  );
}
