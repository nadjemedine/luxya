'use client';
import { useLang } from '@/context/LangContext';
import ProductListPage from '@/components/shop/ProductListPage';

export default function NewArrivalsPage() {
  const { t } = useLang();
  return <ProductListPage title={t('sections.newArrivals')} filter="isNew == true" />;
}
