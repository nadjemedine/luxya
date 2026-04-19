'use client';
import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { LangProvider } from '@/context/LangContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import HomePage from '@/components/shop/HomePage';
import BoutiquePage from '@/components/shop/BoutiquePage';
import FavoritesPage from '@/components/shop/FavoritesPage';
import ProductDetail from '@/components/shop/ProductDetail';
import ContactPage from '@/components/shop/ContactPage';
import CheckoutPage from '@/components/shop/CheckoutPage';
import Footer from '@/components/layout/Footer';
import { Product } from '@/types';

type Page = 'home' | 'boutique' | 'favorites' | 'product' | 'contact' | 'checkout';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('boutique');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [navData, setNavData] = useState<any>(null);

  const navigate = (page: string, data?: any) => {
    if (page === 'product' && data) setSelectedProduct(data);
    setNavData(data || null);
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'boutique': return <BoutiquePage onNavigate={navigate} initialCategoryId={navData?.categoryId} />;
      case 'favorites': return <FavoritesPage onNavigate={navigate} />;
      case 'product': return selectedProduct
        ? <ProductDetail product={selectedProduct} onBack={() => navigate('boutique')} />
        : <BoutiquePage onNavigate={navigate} />;
      case 'contact': return <ContactPage />;
      case 'checkout': return <CheckoutPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <LangProvider>
      <CartProvider>
        <AnnouncementBar />
        <Header onNavigate={navigate} currentPage={currentPage} />
        <main>{renderPage()}</main>
        <Footer onNavigate={navigate} />
        <BottomNav currentPage={currentPage} onNavigate={navigate} />
      </CartProvider>
    </LangProvider>
  );
}
