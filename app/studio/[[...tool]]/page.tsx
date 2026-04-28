'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/sanity.config';
import { useEffect } from 'react';

export default function StudioPage() {
  useEffect(() => {
    // Hide header after component mounts
    const style = document.createElement('style');
    style.textContent = `
      [data-ui="Header"],
      header[class*="Header__"],
      .sanity-header,
      [class*="header-wrapper"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <NextStudio config={config} />;
}
