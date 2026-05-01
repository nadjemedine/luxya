'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import Sidebar from './Sidebar';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { isRTL, t, lang, setLang } = useLang();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <header className="header">
        {/* Mobile: Left side (menu) */}
        <div className="mobile-only" style={{ gap: '8px' }}>
          <button className="header-icon-btn" onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Desktop: Left – Logo + Nav */}
        <div className="desktop-only" style={{ alignItems: 'center', gap: '36px' }}>
          <Link href="/" className="header-logo" style={{ cursor: 'pointer', display: 'block' }}>
            <img src="/logo.png" alt="Luxya Boutique" style={{ width: '120px', height: 'auto', objectFit: 'contain' }} />
          </Link>
          <nav className="header-desktop-nav">
            <Link
              href="/"
              className={`header-desktop-nav-item ${pathname === '/' ? 'active' : ''}`}
            >
              {lang === 'ar' ? 'الرئيسية' : 'Accueil'}
            </Link>
            <Link
              href="/categories"
              className={`header-desktop-nav-item ${pathname === '/categories' ? 'active' : ''}`}
            >
              {t('sidebar.categories')}
            </Link>
            <Link
              href="/favorites"
              className={`header-desktop-nav-item ${pathname === '/favorites' ? 'active' : ''}`}
            >
              {t('nav.favorite')}
            </Link>
            <Link
              href="/contact"
              className={`header-desktop-nav-item ${pathname === '/contact' ? 'active' : ''}`}
            >
              {t('sidebar.contact')}
            </Link>
          </nav>
        </div>

        {/* Mobile: Center logo */}
        <Link href="/" className="header-logo mobile-only" style={{ cursor: 'pointer', display: 'block' }}>
          <img src="/logo.png" alt="Luxya Boutique" style={{ width: '100px', height: 'auto', objectFit: 'contain' }} />
        </Link>

        {/* Right side: search (desktop) + lang (desktop) + cart */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Desktop Language Switcher */}
          <div className="desktop-only" style={{ marginRight: '12px', display: 'flex', gap: '8px', borderRight: '1px solid rgba(255,255,255,0.2)', paddingRight: '12px' }}>
            <button 
              onClick={() => setLang('fr')}
              style={{ background: 'none', border: 'none', color: lang === 'fr' ? 'var(--white)' : 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '12px', fontWeight: lang === 'fr' ? 'bold' : 'normal' }}
            >
              FR
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>|</span>
            <button 
              onClick={() => setLang('ar')}
              style={{ background: 'none', border: 'none', color: lang === 'ar' ? 'var(--white)' : 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '12px', fontWeight: lang === 'ar' ? 'bold' : 'normal' }}
            >
              AR
            </button>
          </div>

          <button className="header-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="header-icon-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="badge">{cartCount > 9 ? '9+' : cartCount}</span>}
          </button>
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <CartDrawer 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
        onCheckout={() => {
          setCartOpen(false);
          router.push('/checkout');
        }}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
