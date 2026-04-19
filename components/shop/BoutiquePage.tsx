'use client';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { Product, Category, Banner } from '@/types';
import ProductCard from './ProductCard';
import { urlFor } from '@/lib/sanity';

interface BoutiquePageProps {
  onNavigate: (page: string, data?: any) => void;
  initialCategoryId?: string;
}

export default function BoutiquePage({ onNavigate, initialCategoryId }: BoutiquePageProps) {
  const { lang, t } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategoryId || null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'sale'>('all');
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    client.fetch<Category[]>(`*[_type == "category"] | order(order asc)`)
      .then(setCategories).catch(() => {});
    client.fetch<Banner[]>(`*[_type == "banner" && active == true] | order(order asc)[0..0]`)
      .then(setBanners).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    let q = `*[_type == "product"`;
    if (activeCategory) q += ` && category._ref == "${activeCategory}"`;
    if (filter === 'new') q += ` && isNew == true`;
    if (filter === 'sale') q += ` && isSale == true`;
    q += `] | order(_createdAt desc)`;
    client.fetch<Product[]>(q).then(data => { setProducts(data); setLoading(false); }).catch(() => setLoading(false));
  }, [activeCategory, filter]);

  const heroBanner = banners[0];

  return (
    <div>
      {/* Hero Banner */}
      {heroBanner ? (
        <div className="hero-banner" style={{ marginBottom: '20px' }}>
          {heroBanner.image && (
            <img className="hero-banner-img" src={urlFor(heroBanner.image).width(1200).url()} alt="" />
          )}
          <div className="hero-banner-content">
            <h1 className="hero-title">{heroBanner.title?.[lang] || heroBanner.title?.fr}</h1>
            {heroBanner.subtitle && (
              <p className="hero-subtitle">{heroBanner.subtitle[lang] || heroBanner.subtitle.fr}</p>
            )}
            <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
              {heroBanner.buttonText?.[lang] || t('hero.cta')}
            </button>
          </div>
        </div>
      ) : (
        <div className="hero-banner" style={{ marginBottom: '20px' }}>
          <div className="hero-banner-content" style={{ background: 'none' }}>
            <h1 className="hero-title">{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}>{t('hero.cta')}</button>
          </div>
        </div>
      )}




      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="container">
          <div className="categories-scroll" style={{ padding: '0 0 12px' }}>
            <button
              className={`size-chip ${!activeCategory ? 'active' : ''}`}
              style={{ whiteSpace: 'nowrap' }}
              onClick={() => setActiveCategory(null)}
            >
              {lang === 'fr' ? 'Tout' : 'الكل'}
            </button>
            {categories.map(cat => (
              <button
                key={cat._id}
                className={`size-chip ${activeCategory === cat._id ? 'active' : ''}`}
                style={{ whiteSpace: 'nowrap' }}
                onClick={() => setActiveCategory(cat._id)}
              >
                {cat.name[lang] || cat.name.fr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="container">
        <div style={{ display: 'flex', gap: '8px', padding: '0 0 16px' }}>
          {(['all', 'new', 'sale'] as const).map(f => (
            <button
              key={f}
              className={`size-chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              style={{ fontSize: '12px' }}
            >
              {f === 'all' ? (lang === 'fr' ? 'Tous' : 'الكل') :
               f === 'new' ? t('product.new') : t('product.sale')}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="spinner" />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          <p>{lang === 'fr' ? 'Aucun produit trouvé' : 'لا توجد منتجات'}</p>
        </div>
      ) : (
        <div className="section" style={{ paddingTop: 0 }}>
          <div className="products-grid">
            {products.map(p => (
              <ProductCard key={p._id} product={p} onClick={() => onNavigate('product', p)} />
            ))}
          </div>
          <div style={{ height: '20px' }} />
        </div>
      )}
    </div>
  );
}
