'use client';
import { useLang } from '@/context/LangContext';
import ProductListPage from '@/components/shop/ProductListPage';

export default function CategoryClientPage({ category }: { category: any }) {
  const { lang } = useLang();
  
  const title = category.name[lang] || category.name.fr || 'Category';
  
  return <ProductListPage title={title} filter={`category._ref == "${category._id}"`} />;
}
