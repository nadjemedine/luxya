'use client';
import { useEffect, useState } from 'react';
import { client, urlFor } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { Category } from '@/types';

interface CategoriesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function CategoriesPage({ onNavigate }: CategoriesPageProps) {
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
        
        <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '24px' }}>
          {categories.map((cat) => (
            <div 
              key={cat._id} 
              className="category-pill" 
              onClick={() => onNavigate('boutique', { categoryId: cat._id, categoryName: cat.name[lang] || cat.name.fr })}
              style={{ paddingBottom: '20px' }}
            >
              <div className="category-pill-img" style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                {cat.image ? (
                  <img 
                    src={urlFor(cat.image).width(200).height(200).url()} 
                    alt={cat.name[lang] || cat.name.fr} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--aubergine-light), var(--aubergine-dark))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px' }}>
                    👗
                  </div>
                )}
              </div>
              <span className="category-pill-name" style={{ fontSize: '15px', fontWeight: 600, marginTop: '8px' }}>
                {cat.name[lang] || cat.name.fr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
