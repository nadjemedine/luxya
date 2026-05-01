'use client';
import { useLang } from '@/context/LangContext';
import ProductListPage from '@/components/shop/ProductListPage';

export default function FeaturedPage() {
  const { t } = useLang();
  return <ProductListPage title={t('sections.featured')} filter="isFeatured == true" />;
}
