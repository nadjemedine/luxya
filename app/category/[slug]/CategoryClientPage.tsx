'use client';
import { useLang } from '@/context/LangContext';
import ProductListPage from '@/components/shop/ProductListPage';

export default function CategoryClientPage({ category }: { category: any }) {
  const { lang } = useLang();
  return <ProductListPage title={category.name[lang] || category.name.fr} filter={`category._ref == "${category._id}"`} />;
}
