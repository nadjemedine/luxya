'use client';
import { useLang } from '@/context/LangContext';
import ProductListPage from '@/components/shop/ProductListPage';

export default function BoutiquePage() {
  const { t } = useLang();
  return <ProductListPage title={t('nav.boutique')} filter="true" />;
}
