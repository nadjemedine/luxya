'use client';
import { useLang } from '@/context/LangContext';

export default function ContactPage() {
  const { t, lang } = useLang();

  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="page-title">{t('sidebar.contact')}</h1>
          <p style={{ color: 'var(--gray-500)', marginTop: '12px', fontSize: '16px' }}>
            {lang === 'fr' 
              ? "Nous sommes là pour vous aider. N'hésitez pas à nous contacter."
              : "نحن هنا لمساعدتكم. لا تترددوا في التواصل معنا."}
          </p>
        </div>

        <div className="contact-grid">
          {/* Phone Card */}
          <div className="contact-card">
            <div className="contact-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <h3>{lang === 'fr' ? 'Téléphone' : 'الهاتف'}</h3>
            <a href="tel:0563413607" className="contact-link">0563413607</a>
          </div>

          {/* Instagram Card */}
          <div className="contact-card">
            <div className="contact-icon-box" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <h3>Instagram</h3>
            <span className="contact-link" style={{ color: 'var(--gray-300)', cursor: 'default' }}>{lang === 'fr' ? 'Prochainement' : 'قريباً'}</span>
          </div>

          {/* Facebook Card */}
          <div className="contact-card">
            <div className="contact-icon-box" style={{ background: '#1877F2', color: 'white' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
            <h3>Facebook</h3>
            <span className="contact-link" style={{ color: 'var(--gray-300)', cursor: 'default' }}>{lang === 'fr' ? 'Prochainement' : 'قريباً'}</span>
          </div>

          {/* TikTok Card */}
          <div className="contact-card">
            <div className="contact-icon-box" style={{ background: '#000000', color: 'white' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </div>
            <h3>TikTok</h3>
            <span className="contact-link" style={{ color: 'var(--gray-300)', cursor: 'default' }}>{lang === 'fr' ? 'Prochainement' : 'قريباً'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
