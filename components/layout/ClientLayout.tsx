'use client';

import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import { LangProvider } from '@/context/LangContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <LangProvider>
      <CartProvider>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        {pathname !== '/' && <Footer />}
        <BottomNav />
      </CartProvider>
    </LangProvider>
  );
}
