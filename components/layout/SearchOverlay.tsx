'use client';
import { useState, useEffect, useRef } from 'react';
import { client, urlFor } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { t, lang } = useLang();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else { setQuery(''); setResults([]); }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await client.fetch<Product[]>(
          `*[_type == "product" && (name.fr match $q || name.ar match $q)] | order(_createdAt desc)[0..7]`,
          { q: `*${query}*` }
        );
        setResults(data);
      } catch (e) { setResults([]); }
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className={`search-overlay ${open ? 'open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="search-box">
        <div className="search-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--aubergine)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>✕</button>
          )}
        </div>

        {loading && <div className="spinner" style={{ width: '24px', height: '24px', margin: '20px auto' }} />}

        {!loading && results.length > 0 && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {results.map(p => (
              <div
                key={p._id}
                style={{ display: 'flex', gap: '12px', alignItems: 'center', cursor: 'pointer', padding: '8px', borderRadius: 'var(--radius)', transition: 'var(--transition)' }}
                onClick={() => { router.push(`/product/${p.slug?.current || p._id}`); onClose(); }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-100)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: '48px', height: '58px', borderRadius: '8px', overflow: 'hidden', background: 'var(--gray-100)', flexShrink: 0 }}>
                  {p.images?.[0] && (
                    <img src={urlFor(p.images[0]).width(96).height(116).url()} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>{p.name[lang] || p.name.fr}</p>
                  <p style={{ fontSize: '13px', color: 'var(--aubergine)', fontWeight: 600 }}>{p.price?.toLocaleString()} {p.currency}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--gray-500)', padding: '20px', fontSize: '14px' }}>
            {t('search.noResults')}
          </p>
        )}
      </div>
    </div>
  );
}
