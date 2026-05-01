'use client';
import { useLang } from '@/context/LangContext';
import ProductListPage from '@/components/shop/ProductListPage';

export default function SalePage() {
  const { t } = useLang();
  return <ProductListPage title={t('sections.sale')} filter="isSale == true" />;
}
