'use client';

import { useLocaleStore } from '@/lib/store';
import { createContext, useContext, useEffect, useState } from 'react';
import { Dictionary, Locale, getDictionary, LOCALE_META } from '@/lib/i18n';

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  dict: getDictionary('en'),
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // SSR always renders English; localStorage read happens only after mount
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = useLocaleStore.getState().locale || 'en';
    setLocale(stored as Locale);

    const sync = () => setLocale(useLocaleStore.getState().locale as Locale);
    window.addEventListener('language-changed', sync);
    const unsub = useLocaleStore.subscribe((s) => sync());

    return () => {
      window.removeEventListener('language-changed', sync);
      unsub();
    };
  }, []);

  // Keep <html lang> in sync whenever the active locale changes
  // Before mount: render English (matches SSR). After mount: real locale.
  const activeLocale = mounted ? locale : 'en';
  const dict = getDictionary(activeLocale);
  useEffect(() => {
    document.documentElement.lang = LOCALE_META[activeLocale]?.htmlLang || 'en';
  }, [activeLocale]);


  return (
    <LocaleContext.Provider value={{ locale: activeLocale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useI18n() {
  return useContext(LocaleContext);
}
