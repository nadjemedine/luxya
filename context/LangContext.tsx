'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang } from '@/types';
import fr from '@/messages/fr.json';
import ar from '@/messages/ar.json';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const messages = { fr, ar };

const LangContext = createContext<LangContextType | undefined>(undefined);

function getNestedValue(obj: any, key: string): string {
  return key.split('.').reduce((acc, k) => acc?.[k], obj) ?? key;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('luxya-lang') as Lang;
    if (saved && (saved === 'fr' || saved === 'ar')) setLangState(saved);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('luxya-lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => getNestedValue(messages[lang], key);
  const isRTL = lang === 'ar';

  return (
    <LangContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
