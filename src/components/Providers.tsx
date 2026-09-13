'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { LocaleProvider } from '@/components/LocaleProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <LocaleProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'text-sm font-medium',
            style: { background: '#1F1F4D', color: '#fff', borderRadius: '12px' },
          }}
        />
      </LocaleProvider>
    </NextThemesProvider>
  );
}

