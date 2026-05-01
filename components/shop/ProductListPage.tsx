'use client';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductListPageProps {
  title: string;
  filter: string;
}

export default function ProductListPage({ title, filter }: ProductListPageProps) {
  const { lang, t } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await client.fetch<Product[]>(`*[_type == "product" && ${filter}] | order(_createdAt desc)`);
        setProducts(data);
      } catch (e) {
        console.error('Error fetching products for list page:', e);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [filter]);

  if (loading) return <div className="spinner" style={{ marginTop: '60px' }} />;

  return (
    <div className="product-list-page">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="section" style={{ paddingTop: '16px', paddingBottom: '100px' }}>
        {products.length === 0 ? (
          <div className="empty-state">
            <p style={{ fontSize: '16px', color: 'var(--gray-500)' }}>{lang === 'ar' ? 'لا توجد منتجات حالياً' : 'Aucun produit trouvé'}</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
