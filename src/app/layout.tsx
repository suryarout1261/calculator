import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: {
    default: 'SHIVARKAA CALCULATE — The Ultimate Calculation Operating System',
    template: '%s | SHIVARKAA CALCULATE',
  },
  description:
    'AI-powered calculators for finance, health, science, engineering, business, and everyday life. Calculate anything instantly with precision and intelligence.',
  keywords: [
    'calculator', 'online calculator', 'BMI calculator', 'EMI calculator',
    'compound interest calculator', 'scientific calculator', 'loan calculator',
    'SIP calculator', 'percentage calculator', 'age calculator',
  ],
  metadataBase: new URL('https://shivarkaa.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SHIVARKAA CALCULATE',
    title: 'SHIVARKAA CALCULATE — Calculate Anything. Instantly.',
    description: 'The modern operating system for calculations. AI-powered tools for finance, health, science, and more.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
