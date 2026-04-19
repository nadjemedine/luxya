'use client';
import { useState } from 'react';
import { Product } from '@/types';
import { urlFor } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { lang, t } = useLang();
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const fav = isFavorite(product._id);

  const name = product.name[lang] || product.name.fr;
  const desc = product.description?.[lang] || product.description?.fr;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize || undefined, selectedColor || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  /* ── Reusable blocks ── */
  const imagesBlock = (
    <>
      <div className="product-detail-imgs">
        {product.images?.[selectedImg] ? (
          <img
            src={urlFor(product.images[selectedImg]).width(800).url()}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {product.isNew && <span className="product-badge badge-new" style={{ top: '14px', left: '14px' }}>{t('product.new')}</span>}
      </div>

      {/* Thumbnail strip */}
      {product.images && product.images.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', padding: '10px 0', overflowX: 'auto' }}>
          {product.images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImg(i)}
              style={{
                width: '60px', height: '75px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0,
                cursor: 'pointer', border: `2.5px solid ${i === selectedImg ? 'var(--aubergine)' : 'transparent'}`
              }}>
              <img src={urlFor(img).width(120).url()} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </>
  );

  const infoBlock = (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, lineHeight: 1.2, flex: 1 }}>{name}</h1>
        <button
          onClick={() => toggleFavorite(product)}
          style={{ width: '40px', height: '40px', borderRadius: '50%', background: fav ? 'var(--aubergine)' : 'var(--gray-100)',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: fav ? 'white' : 'var(--gray-500)', flexShrink: 0, marginLeft: '12px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--aubergine)' }}>
          {product.price?.toLocaleString()} {product.currency || 'DZD'}
        </span>
        {product.comparePrice && product.comparePrice > product.price && (
          <span style={{ fontSize: '16px', color: 'var(--gray-500)', textDecoration: 'line-through' }}>
            {product.comparePrice.toLocaleString()}
          </span>
        )}
      </div>

      {/* Stock status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: product.inStock ? '#48bb78' : '#e53e3e' }} />
        <span style={{ fontSize: '13px', color: product.inStock ? '#48bb78' : '#e53e3e', fontWeight: 500 }}>
          {product.inStock ? t('product.inStock') : t('product.outOfStock')}
        </span>
      </div>

      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--gray-500)' }}>{t('product.size')}</p>
          <div className="size-grid">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >{size}</button>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--gray-500)' }}>{t('product.color')}</p>
          <div className="color-dots">
            {product.colors.map(c => (
              <div
                key={c.hex}
                className={`color-dot ${selectedColor === c.name ? 'active' : ''}`}
                style={{ background: c.hex }}
                title={c.name}
                onClick={() => setSelectedColor(c.name)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {desc && (
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{t('product.description')}</p>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--gray-500)' }}>{desc}</p>
        </div>
      )}

      {/* Add to Cart (becomes static on desktop via CSS) */}
      <div className="product-detail-add-to-cart-bar">
        <button
          className="btn btn-primary btn-full"
          disabled={!product.inStock || added}
          onClick={handleAddToCart}
          style={{ background: added ? '#48bb78' : undefined }}
        >
          {added ? (lang === 'fr' ? '✓ Ajouté !' : '✓ تمت الإضافة!') : t('product.addToCart')}
        </button>
      </div>
    </>
  );

  return (
    <div>
      {/* Back button */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--aubergine)', fontWeight: 600 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {lang === 'fr' ? 'Retour' : 'رجوع'}
        </button>
      </div>

      {/* ═══ Mobile layout (stacked) ═══ */}
      <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px' }}>{imagesBlock}</div>
        <div style={{ padding: '16px 20px 100px' }}>{infoBlock}</div>
      </div>

      {/* ═══ Desktop layout (side-by-side) ═══ */}
      <div className="desktop-only product-detail-layout">
        <div className="product-detail-left">{imagesBlock}</div>
        <div className="product-detail-right">{infoBlock}</div>
      </div>
    </div>
  );
}
