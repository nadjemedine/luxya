'use client';
import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { LangProvider } from '@/context/LangContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import HomePage from '@/components/shop/HomePage';
import FavoritesPage from '@/components/shop/FavoritesPage';
import ProductDetail from '@/components/shop/ProductDetail';
import ContactPage from '@/components/shop/ContactPage';
import CheckoutPage from '@/components/shop/CheckoutPage';
import ProductListPage from '@/components/shop/ProductListPage';
import Footer from '@/components/layout/Footer';
import { Product } from '@/types';
import { useLang } from '@/context/LangContext';

type Page = 'home' | 'boutique' | 'favorites' | 'product' | 'contact' | 'checkout' | 'featured' | 'new' | 'sale';

function AppContent({ 
  currentPage, 
  selectedProduct, 
  navigate 
}: { 
  currentPage: Page, 
  selectedProduct: Product | null, 
  navigate: (page: string, data?: any) => void 
}) {
  const { t } = useLang();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'favorites': return <FavoritesPage onNavigate={navigate} />;
      case 'featured': return <ProductListPage title={t('sections.featured')} filter="isFeatured == true" onNavigate={navigate} />;
      case 'new': return <ProductListPage title={t('sections.newArrivals')} filter="isNew == true" onNavigate={navigate} />;
      case 'sale': return <ProductListPage title={t('sections.sale')} filter="isSale == true" onNavigate={navigate} />;
      case 'product': return selectedProduct
        ? <ProductDetail product={selectedProduct} onBack={() => navigate('home')} onNavigate={navigate} />
        : <HomePage onNavigate={navigate} />;
      case 'contact': return <ContactPage />;
      case 'checkout': return <CheckoutPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Header onNavigate={navigate} currentPage={currentPage} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigate} />
      <BottomNav currentPage={currentPage} onNavigate={navigate} />
    </>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [navData, setNavData] = useState<any>(null);

  const navigate = (page: string, data?: any) => {
    if (page === 'product' && data) setSelectedProduct(data);
    setNavData(data || null);
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LangProvider>
      <CartProvider>
        <AppContent currentPage={currentPage} selectedProduct={selectedProduct} navigate={navigate} />
      </CartProvider>
    </LangProvider>
  );
}
