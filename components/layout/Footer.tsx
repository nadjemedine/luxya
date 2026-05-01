'use client';
import { useLang } from '@/context/LangContext';
import Link from 'next/link';

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand">
            <Link href="/boutique" className="footer-logo" style={{ cursor: 'pointer', display: 'block' }}>
              <img src="/logo.png" alt="Luxya Boutique" style={{ width: '120px', height: 'auto' }} />
            </Link>
            <p className="footer-about">
              {lang === 'fr' 
                ? "Luxya Boutique — Votre destination pour l'élégance et le raffinement. Découvrez nos collections exclusives sélectionnées pour vous."
                : "لوكسيا بوتيك — وجهتك للأناقة والرقي. اكتشفي مجموعاتنا الحصرية المختارة بعناية من أجلك."}
            </p>
          </div>

          {/* Links Column */}
          <div className="footer-col">
            <h4 className="footer-title">{t('footer.links')}</h4>
            <ul className="footer-links">
              <li><Link href="/boutique" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav.boutique')}</Link></li>
              <li><Link href="/favorites" style={{ color: 'inherit', textDecoration: 'none' }}>{t('nav.favorite')}</Link></li>
              <li><Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>{t('sidebar.contact')}</Link></li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="footer-col">
            <h4 className="footer-title">{t('footer.contact')}</h4>
            <div className="social-links">
              <span className="social-icon" style={{ cursor: 'default' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </span>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Luxya Boutique. {t('footer.rights')}</p>
          <div className="payment-methods">
             {/* Simple payment icons mock */}
             <div className="payment-icon">💳</div>
             <div className="payment-icon">💵</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
