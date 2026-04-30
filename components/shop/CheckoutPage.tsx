'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import { urlFor } from '@/lib/sanity';
import { wilayas } from '@/lib/dzData';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          cart,
          cartTotal
        }),
      });

      if (!response.ok) throw new Error('Failed to send order');
      
      setSubmitted(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Order Error:', error);
      alert(lang === 'fr' ? 'Une erreur est سورvenue lors de la commande.' : 'حدث خطأ أثناء تقديم الطلب.');
    } finally {
      setLoading(false);
    }
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

        <div className="checkout-grid" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Order Summary - Moved ABOVE the form */}
          <div className="checkout-summary-card" style={{ order: 1, position: 'relative', top: '0', height: 'auto', marginBottom: '24px' }}>
            <div className="checkout-items">
              {cart.map((item) => (
                <div key={`${item.product._id}-${item.size}-${item.color}`} className="checkout-item" style={{ 
                  position: 'relative', 
                  paddingRight: '40px',
                  display: 'flex',
                  gap: '20px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  paddingBottom: '20px',
                  marginBottom: '20px'
                }}>
                  <div className="checkout-item-img" style={{ width: '80px', height: '100px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                    {item.product.images?.[0] && <img src={urlFor(item.product.images[0]).width(80).url()} alt={item.product.name[lang] || item.product.name.fr} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div className="checkout-item-info" style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '500', marginBottom: '8px', color: 'var(--white)' }}>
                      {item.product.name[lang] || item.product.name.fr}
                    </h4>
                    <div className="checkout-item-details" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      {item.size && <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>{item.size}</span>}
                      {item.color && <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>{item.color}</span>}
                    </div>
                    
                    <div className="checkout-item-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
                      <div className="qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1, item.size, item.color)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', color: 'white', width: '20px' }}
                        >−</button>
                        <span style={{ fontWeight: 'bold', fontSize: '14px', minWidth: '15px', textAlign: 'center' }}>{item.quantity}</span>
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1, item.size, item.color)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', color: 'white', width: '20px' }}
                        >+</button>
                      </div>
                      <span className="checkout-item-price" style={{ fontWeight: 'bold', color: 'var(--gold)', fontSize: '14px' }}>{item.product.price * item.quantity} DZD</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product._id, item.size, item.color)}
                    style={{ position: 'absolute', top: '0', right: '0', border: 'none', background: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '22px', padding: '0' }}
                    title={lang === 'fr' ? 'Supprimer' : 'حذف'}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form - Moved BELOW the items */}
          <div style={{ order: 2 }}>
            <h3 className="section-title" style={{ fontSize: '18px', marginBottom: '20px', textAlign: isRTL ? 'right' : 'left' }}>
              {lang === 'fr' ? 'Informations de livraison' : 'معلومات التوصيل'}
            </h3>
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
                    <span>🏢 {lang === 'fr' ? 'Bureau ' : 'المكتب'}</span>
                  </label>
                </div>
              </div>

              {/* Professional Summary Section BEFORE the button */}
              <div className="checkout-final-summary" style={{ 
                marginTop: '32px', 
                padding: '24px', 
                background: 'var(--aubergine)', 
                borderRadius: 'var(--radius)', 
                color: 'var(--white)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}>
                <h3 className="section-title" style={{ fontSize: '15px', marginBottom: '20px', textAlign: isRTL ? 'right' : 'left', color: 'var(--white)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                  {lang === 'fr' ? 'Résumé de la commande' : 'ملخص الطلب'}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', color: 'var(--gray-200)', gap: '10px' }}>
                  <span>{lang === 'fr' ? 'Sous-total' : 'المجموع الفرعي'}</span>
                  <span>{cartTotal} DZD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', color: 'var(--gray-200)', gap: '10px', flexWrap: 'wrap' }}>
                  <span>{lang === 'fr' ? 'Livraison' : 'التوصيل'}</span>
                  <span style={{ color: '#4ade80', fontWeight: '500', fontSize: '13px', textAlign: isRTL ? 'left' : 'right' }}>{lang === 'fr' ? 'Calculé à la confirmation' : 'يُحسب عند التأكيد'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{t('cart.total')}</span>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--white)' }}>{cartTotal} DZD</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary checkout-btn" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '18px', marginTop: '24px', borderRadius: ' var(--radius-lg)' }}>
                {loading ? <div className="spinner-small" /> : (lang === 'fr' ? 'Commander maintenant' : 'تأكيد الطلب الآن')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
