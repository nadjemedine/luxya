'use client';

import { useState } from 'react';

export default function MaintenanceInquiry() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setMessage('');
        setTimeout(() => {
          setShowForm(false);
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ width: '100%', marginTop: '24px' }}>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: '#4a1942',
            color: '#ffffff',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '9999px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Tajawal, sans-serif',
            letterSpacing: '0.02em',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 14px rgba(74, 25, 66, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6b2d63';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 25, 66, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4a1942';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(74, 25, 66, 0.3)';
          }}
        >
          لديك تساؤل؟ تواصل معنا
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e8e4e6',
                fontSize: '0.95rem',
                fontFamily: 'Tajawal, sans-serif',
                outline: 'none',
                direction: 'rtl',
                textAlign: 'right',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#4a1942')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e4e6')}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <textarea
              placeholder="اكتب تساؤلك هنا..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid #e8e4e6',
                fontSize: '0.95rem',
                fontFamily: 'Tajawal, sans-serif',
                outline: 'none',
                resize: 'vertical',
                direction: 'rtl',
                textAlign: 'right',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#4a1942')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e8e4e6')}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                backgroundColor: status === 'sending' ? '#7a3d73' : '#4a1942',
                color: '#ffffff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                fontFamily: 'Tajawal, sans-serif',
                opacity: status === 'sending' ? 0.7 : 1,
                transition: 'all 0.3s ease',
              }}
            >
              {status === 'sending' ? 'جاري الإرسال...' : 'إرسال'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setStatus('idle');
              }}
              style={{
                backgroundColor: 'transparent',
                color: '#4a1942',
                border: '2px solid #4a1942',
                padding: '12px 28px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Tajawal, sans-serif',
                transition: 'all 0.3s ease',
              }}
            >
              إلغاء
            </button>
          </div>
          {status === 'success' && (
            <p style={{ color: '#16a34a', marginTop: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
              ✓ تم إرسال تساؤلك بنجاح! سنرد عليك قريباً
            </p>
          )}
          {status === 'error' && (
            <p style={{ color: '#dc2626', marginTop: '12px', fontSize: '0.9rem', fontWeight: 600 }}>
              حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى
            </p>
          )}
        </form>
      )}
    </div>
  );
}
