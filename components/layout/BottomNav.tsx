'use client';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const { t } = useLang();
  const { favoritesCount } = useCart();

  return (
    <nav className="bottom-nav">
      <button
        className={`bottom-nav-item ${currentPage === 'boutique' || currentPage === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('boutique')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>{t('nav.boutique')}</span>
      </button>

      <button
        className={`bottom-nav-item ${currentPage === 'favorites' ? 'active' : ''}`}
        onClick={() => onNavigate('favorites')}
        style={{ position: 'relative' }}
      >
        <span style={{ position: 'relative', display: 'inline-flex' }}>
          <svg width="24" height="24" viewBox="0 0 24 24"
            fill={currentPage === 'favorites' ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          {favoritesCount > 0 && (
            <span style={{
              position: 'absolute', top: '-6px', right: '-8px',
              width: '16px', height: '16px', borderRadius: '50%',
              background: 'var(--gold)', color: 'var(--aubergine-dark)',
              fontSize: '9px', fontWeight: '700',
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
