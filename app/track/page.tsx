'use client';
import { useState } from 'react';
import { useLang } from '@/context/LangContext';

export default function TrackOrderPage() {
  const { lang, t } = useLang();
  const [trackingCode, setTrackingCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/track?tracking=${trackingCode}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Tracking information not found');
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--aubergine)' }}>
        {lang === 'ar' ? 'تتبع طلبيتك' : 'Suivre votre commande'}
      </h1>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--white)', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--gray-500)' }}>
          {lang === 'ar' 
            ? 'أدخل رقم التتبع الخاص بك لمعرفة حالة الطلب ومساره الحالي.' 
            : 'Entrez votre numéro de suivi pour connaître l\'état et l\'itinéraire de votre commande.'}
        </p>

        <form onSubmit={handleTrack} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <input 
            type="text" 
            placeholder={lang === 'ar' ? 'رقم التتبع (مثال: LX-12345)' : 'Numéro de suivi (ex: LX-12345)'}
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            style={{ padding: '15px', borderRadius: '8px', border: '1px solid var(--gray-300)', fontSize: '16px', width: '100%' }}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
            style={{ padding: '15px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}
          >
            {loading 
              ? (lang === 'ar' ? 'جاري البحث...' : 'Recherche...') 
              : (lang === 'ar' ? 'تتبع الآن' : 'Suivre maintenant')}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#ffebee', color: '#c62828', borderRadius: '8px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '30px', borderTop: '1px solid var(--gray-200)', paddingTop: '20px' }}>
            <h3 style={{ marginBottom: '15px', color: 'var(--black)' }}>
              {lang === 'ar' ? 'حالة الطلب:' : 'État de la commande :'} 
              <span style={{ color: 'var(--aubergine)', marginLeft: '10px' }}>
                {result.status}
              </span>
            </h3>
            
            <div style={{ background: 'var(--gray-100)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
              <p><strong>{lang === 'ar' ? 'تاريخ التحديث:' : 'Date de mise à jour :'}</strong> {new Date(result.updated_at || result.date).toLocaleString(lang === 'ar' ? 'ar-DZ' : 'fr-FR')}</p>
              <p><strong>{lang === 'ar' ? 'الموقع الحالي:' : 'Position actuelle :'}</strong> {result.location || (lang === 'ar' ? 'غير متوفر' : 'Non disponible')}</p>
            </div>

            {/* Timeline Placeholder - Assuming history array might be provided */}
            {result.history && result.history.length > 0 && (
              <div>
                <h4 style={{ marginBottom: '10px' }}>{lang === 'ar' ? 'سجل التتبعات' : 'Historique'}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {result.history.map((item: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: idx === 0 ? 'var(--aubergine)' : 'var(--gray-400)' }} />
                      <div>
                        <div style={{ fontWeight: idx === 0 ? 'bold' : 'normal' }}>{item.status}</div>
                        <div style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{item.date} - {item.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
