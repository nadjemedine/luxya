'use client';
import { useLang } from '@/context/LangContext';

export default function AnnouncementBar() {
  const { t } = useLang();
  const text = t('announcement');

  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="announcement-text">{text}</span>
        ))}
      </div>
    </div>
  );
}
