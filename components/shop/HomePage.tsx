'use client';
import { useEffect, useState } from 'react';
import { client, urlFor } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { Product, Category, Banner } from '@/types';
import ProductCard from '@/components/shop/ProductCard';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { lang, t } = useLang();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [b, f, n, s, c] = await Promise.all([
          client.fetch<Banner[]>(`*[_type == "banner" && active == true] | order(order asc)[0..4]`),
          client.fetch<Product[]>(`*[_type == "product" && isFeatured == true] | order(_createdAt desc)[0..5]`),
          client.fetch<Product[]>(`*[_type == "product" && isNew == true] | order(_createdAt desc)[0..5]`),
          client.fetch<Product[]>(`*[_type == "product" && isSale == true] | order(_createdAt desc)[0..5]`),
          client.fetch<Category[]>(`*[_type == "category"] | order(order asc)[0..8]`),
        ]);
        setBanners(b); setFeatured(f); setNewProducts(n); setSaleProducts(s); setCategories(c);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="spinner" style={{ marginTop: '60px' }} />;

  const heroBanner = banners[0];

  return (
    <div>
      {/* Hero Banner */}
      {heroBanner ? (
        <div className="hero-banner" onClick={() => (document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' }))} style={heroBanner.image2 ? { display: 'flex' } : {}}>
          {heroBanner.image2 ? (
            <>
              <div style={{ flex: 1, width: '50%', height: '100%' }}>
                <img className="hero-banner-img" src={urlFor(heroBanner.image).width(800).url()} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, width: '50%', height: '100%' }}>
                <img className="hero-banner-img" src={urlFor(heroBanner.image2).width(800).url()} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </>
          ) : (
            heroBanner.image && (
              <img className="hero-banner-img" src={urlFor(heroBanner.image).width(1600).url()} alt="" />
            )
          )}
          <div className="hero-banner-content">
            <h1 className="hero-title">{heroBanner.title?.[lang] || heroBanner.title?.fr}</h1>
            {heroBanner.subtitle && (
              <p className="hero-subtitle">{heroBanner.subtitle[lang] || heroBanner.subtitle.fr}</p>
            )}
            <button className="btn btn-primary">
              {heroBanner.buttonText?.[lang] || t('hero.cta')}
            </button>
          </div>
        </div>
      ) : (
        <div className="hero-banner" onClick={() => (document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' }))}>
          <div className="hero-banner-content" style={{ background: 'none' }}>
            <h1 className="hero-title">{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <button className="btn btn-primary">{t('hero.cta')}</button>
          </div>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div style={{ paddingTop: '20px' }}>
          <div className="container">
            <div className="section-title" style={{ marginBottom: '10px', textAlign: 'center' }}>
              {t('sections.categories')}
            </div>
            <div className="section-line" style={{ margin: '0 auto 20px' }} />
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <div key={cat._id} className="category-pill">
                <div className="category-pill-img" style={{ overflow: 'hidden' }}>
                  {cat.image ? (
                    <img src={urlFor(cat.image).width(140).height(140).url()} alt={cat.name[lang] || cat.name.fr}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--aubergine-light), var(--aubergine-dark))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}>
                      👗
                    </div>
                  )}
                </div>
                <span className="category-pill-name">{cat.name[lang] || cat.name.fr}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <div className="section" id="featured-section">
          <h2 className="section-title" style={{ textAlign: 'center' }}>{t('sections.featured')}</h2>
          <div className="section-line" style={{ margin: '0 auto 24px' }} />
          <div className="products-grid">
            {featured.map(p => (
              <ProductCard key={p._id} product={p} onClick={() => onNavigate('product', p)} />
            ))}
          </div>
        </div>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <div className="section" id="new-section" style={{ paddingTop: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>{t('sections.newArrivals')}</h2>
          <div className="section-line" style={{ margin: '0 auto 24px' }} />
          <div className="products-grid">
            {newProducts.map(p => (
              <ProductCard key={p._id} product={p} onClick={() => onNavigate('product', p)} />
            ))}
          </div>
        </div>
      )}

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <div className="section" id="sale-section" style={{ paddingTop: 0 }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>{lang === 'ar' ? 'تخفيضات' : 'En Promotion'}</h2>
          <div className="section-line" style={{ margin: '0 auto 24px' }} />
          <div className="products-grid">
            {saleProducts.map(p => (
              <ProductCard key={p._id} product={p} onClick={() => onNavigate('product', p)} />
            ))}
          </div>
        </div>
      )}

      {featured.length === 0 && newProducts.length === 0 && (
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          <p style={{ fontSize: '16px', fontWeight: 600 }}>Aucun produit disponible</p>
          <p style={{ fontSize: '13px' }}>Ajoutez des produits depuis le studio Sanity</p>
        </div>
      )}
    </div>
  );
}
