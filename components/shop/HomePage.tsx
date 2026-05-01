'use client';
import { useEffect, useState } from 'react';
import { client, urlFor } from '@/lib/sanity';
import { useLang } from '@/context/LangContext';
import { Banner } from '@/types';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const { lang, t } = useLang();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const b = await client.fetch<Banner[]>(`*[_type == "banner" && active == true] | order(order asc)[0..4]`);
        setBanners(b);
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="spinner" style={{ marginTop: '60px' }} />;

  const heroBanner = banners[0];

  return (
    <div>
      {/* Hero Banner */}
      {heroBanner ? (
        <div className="hero-banner" style={heroBanner.image2 ? { display: 'flex' } : {}}>
          {heroBanner.image2 ? (
            <>
              <div style={{ flex: 1, width: '50%', height: '100%' }}>
                <img className="hero-banner-img" src={urlFor(heroBanner.image).width(800).url()} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, width: '50%', height: '100%' }}>
                <img className="hero-banner-img" src={urlFor(heroBanner.image2).width(800).url()} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </>
          ) : (
            heroBanner.image && (
              <img className="hero-banner-img" src={urlFor(heroBanner.image).width(1600).url()} alt="" />
            )
          )}
          <div className="hero-banner-content">
            <h1 className="hero-title">{heroBanner.title?.[lang] || heroBanner.title?.fr}</h1>
            {heroBanner.subtitle && (
              <p className="hero-subtitle">{heroBanner.subtitle[lang] || heroBanner.subtitle.fr}</p>
            )}
            <button className="btn btn-primary" onClick={() => router.push('/categories')}>
              {heroBanner.buttonText?.[lang] || t('hero.cta')}
            </button>
          </div>
        </div>
      ) : (
        <div className="hero-banner">
          <div className="hero-banner-content" style={{ background: 'none' }}>
            <h1 className="hero-title">{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <button className="btn btn-primary" onClick={() => router.push('/categories')}>{t('hero.cta')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
