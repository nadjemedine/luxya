'use client';
import { Product } from '@/types';
import { urlFor } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { lang, t } = useLang();
  const { toggleFavorite, isFavorite, addToCart } = useCart();
  const fav = isFavorite(product._id);
  const name = product.name[lang] || product.name.fr;

  return (
    <div className="product-card" onClick={() => router.push(`/product/${product.slug?.current || product._id}`)}>
      <div className="product-img-wrap">
        {product.images?.[0] ? (
          <img
            className="product-img"
            src={urlFor(product.images[0]).width(400).height(530).url()}
            alt={name}
            loading="lazy"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--gray-100), var(--gray-200))',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {product.isNew && <span className="product-badge badge-new">{t('product.new')}</span>}
        {product.isSale && !product.isNew && <span className="product-badge badge-sale">{t('product.sale')}</span>}

        <button
          className={`product-fav-btn ${fav ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); toggleFavorite(product); }}
          aria-label="Favorite"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      <div className="product-info">
        <p className="product-name">{name}</p>
        <div className="product-price">
          <span className="price-current">{product.price?.toLocaleString()} {product.currency || 'DZD'}</span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="price-compare">{product.comparePrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
