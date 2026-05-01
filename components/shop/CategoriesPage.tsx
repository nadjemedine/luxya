'use client';
import { useEffect, useState } from 'react';
import { client, urlFor } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { Category } from '@/types';

import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const c = await client.fetch<Category[]>(`*[_type == "category"] | order(order asc)`);
        setCategories(c);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="spinner" style={{ marginTop: '60px' }} />;

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          {t('sections.categories')}
        </h2>
        <div className="section-line" style={{ margin: '0 auto 32px' }} />
        
        <div className="categories-list">
          {categories.map((cat) => (
            <div 
              key={cat._id} 
              className="category-card-large" 
              onClick={() => router.push(`/category/${cat.slug?.current || cat._id}`)}
            >
              <div className="category-card-img" style={{ width: '100%', height: '100%' }}>
                {cat.image ? (
                  <img 
                    src={urlFor(cat.image).width(1000).height(1000).url()} 
                    alt={cat.name[lang] || cat.name.fr} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--aubergine-light), var(--aubergine-dark))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '48px' }}>
                    👗
                  </div>
                )}
              </div>
              
              <div className="category-card-overlay">
                <h3 className="category-card-title">
                  {cat.name[lang] || cat.name.fr}
                </h3>
                <span className="category-card-cta">
                  {t('hero.cta')} <span style={{ fontSize: '18px' }}>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
