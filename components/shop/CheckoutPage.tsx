'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import { urlFor } from '@/lib/sanity';
import { wilayas } from '@/lib/dzData';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { lang, t, isRTL } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    municipality: '',
    deliveryType: 'home', // 'home' | 'office'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="thank-you-card">
          <div className="success-icon">✓</div>
          <h1 className="page-title">{lang === 'fr' ? 'Merci pour votre commande !' : 'شكراً لطلبكم!'}</h1>
          <p style={{ marginTop: '16px', color: 'var(--gray-600)' }}>
            {lang === 'fr' 
              ? "Votre commande a été reçue avec succès. Nous vous contacterons bientôt pour la confirmation."
              : "تم استلام طلبكم بنجاح. سنتصل بكم قريباً لتأكيد الطلب."}
          </p>
          <button className="btn btn-primary" style={{ marginTop: '32px' }} onClick={() => window.location.href = '/'}>
            {lang === 'fr' ? 'Retour à la boutique' : 'العودة للمتجر'}
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2 className="page-title">{t('cart.empty')}</h2>
        <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => window.location.href = '/'}>
          {t('cart.continueShopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page section">
      <div className="container">
        <h1 className="page-title" style={{ marginBottom: '40px' }}>
          {lang === 'fr' ? 'Finaliser la commande' : 'إتمام الطلب'}
        </h1>

        <div className="checkout-grid">
          {/* Order Summary */}
          <div className="checkout-summary-card">
            <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '20px' }}>
              {lang === 'fr' ? 'Résumé de la commande' : 'ملخص الطلب'}
            </h3>
            <div className="checkout-items">
              {cart.map((item) => (
                <div key={`${item.product._id}-${item.size}-${item.color}`} className="checkout-item">
                  <div className="checkout-item-img">
                    {item.product.images?.[0] && <img src={urlFor(item.product.images[0]).width(80).url()} alt={item.product.name[lang] || item.product.name.fr} />}
                  </div>
                  <div className="checkout-item-info">
                    <h4>{item.product.name[lang] || item.product.name.fr}</h4>
                    <p>{t('cart.quantity')}: {item.quantity}</p>
                    {item.size && <p>{t('product.size')}: {item.size}</p>}
                    <span className="checkout-item-price">{item.product.price * item.quantity} DZD</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <span>{t('cart.total')}</span>
              <span className="total-amount">{cartTotal} DZD</span>
            </div>
          </div>

          {/* Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{lang === 'fr' ? 'Nom complet' : 'الاسم الكامل'}</label>
              <input 
                type="text" 
                required 
                placeholder={lang === 'fr' ? 'Votre nom complet' : 'اسمكم الكامل'}
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>{lang === 'fr' ? 'Numéro de téléphone' : 'رقم الهاتف'}</label>
              <input 
                type="tel" 
                required 
                placeholder="07XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{lang === 'fr' ? 'Wilaya' : 'الولاية'}</label>
                <select 
                  required 
                  value={formData.wilaya}
                  onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                >
                  <option value="">{lang === 'fr' ? 'Sélectionner' : 'اختر'}</option>
                  {wilayas.map(w => (
                    <option key={w.id} value={w.id}>{w.id} - {lang === 'fr' ? w.fr : w.ar}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>{lang === 'fr' ? 'Commune' : 'البلدية'}</label>
                <input 
                  type="text" 
                  required 
                  placeholder={lang === 'fr' ? 'Votre commune' : 'بلديتكم'}
                  value={formData.municipality}
                  onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>{lang === 'fr' ? 'Type de livraison' : 'نوع التوصيل'}</label>
              <div className="delivery-options">
                <label className={`delivery-option ${formData.deliveryType === 'home' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="home" 
                    checked={formData.deliveryType === 'home'}
                    onChange={() => setFormData({...formData, deliveryType: 'home'})} 
                  />
                  <span>🏠 {lang === 'fr' ? 'Domicile' : 'المنزل'}</span>
                </label>
                <label className={`delivery-option ${formData.deliveryType === 'office' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="office" 
                    checked={formData.deliveryType === 'office'}
                    onChange={() => setFormData({...formData, deliveryType: 'office'})} 
                  />
                  <span>🏢 {lang === 'fr' ? 'Bureau / Stop Desk' : 'المكتب'}</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary checkout-btn" disabled={loading}>
              {loading ? <div className="spinner-small" /> : (lang === 'fr' ? 'Commander' : 'طلب الآن')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
