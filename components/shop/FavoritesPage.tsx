'use client';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import ProductCard from './ProductCard';

interface FavoritesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const { favorites } = useCart();
  const { t } = useLang();

  return (
    <div className="fav-page">
      <div className="page-header">
        <h1 className="page-title">{t('favorites.title')}</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          <p style={{ fontSize: '16px', fontWeight: 600 }}>{t('favorites.empty')}</p>
          <button className="btn btn-primary" style={{ marginTop: '8px' }} onClick={() => onNavigate('boutique')}>
            {t('cart.continueShopping')}
          </button>
        </div>
      ) : (
        <div className="section" style={{ paddingTop: '16px' }}>
          <div className="products-grid">
            {favorites.map(p => (
              <ProductCard key={p._id} product={p} onClick={() => onNavigate('product', p)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
