'use client';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';
import { urlFor } from '@/lib/sanity';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { t, lang } = useLang();

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <span className="cart-drawer-title">{t('cart.title')}</span>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
              borderRadius: '50%', width: '34px', height: '34px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px 20px' }}>
              <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p>{t('cart.empty')}</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item.product._id}-${item.size}-${item.color}`} className="cart-item">
                <div className="cart-item-img" style={{ background: 'var(--gray-100)', borderRadius: '8px', overflow: 'hidden' }}>
                  {item.product.images?.[0] && (
                    <img
                      src={urlFor(item.product.images[0]).width(140).height(170).url()}
                      alt={item.product.name[lang] || item.product.name.fr}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product.name[lang] || item.product.name.fr}</p>
                  {item.size && <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{item.size}</p>}
                  <p className="cart-item-price">{(item.product.price * item.quantity).toLocaleString()} {item.product.currency}</p>
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>−</button>
                    <span style={{ minWidth: '20px', textAlign: 'center', fontSize: '14px' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--gray-500)', fontSize: '12px' }}>
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>{t('cart.total')}</span>
              <span className="cart-total-amount">{cartTotal.toLocaleString()} DZD</span>
            </div>
            <button className="btn btn-primary btn-full" onClick={onCheckout}>{t('cart.checkout')}</button>
            <button className="btn btn-outline btn-full" style={{ marginTop: '10px' }} onClick={onClose}>
              {t('cart.continueShopping')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
