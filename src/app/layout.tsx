import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://realcalculator365.com'),
  title: {
    default: 'Real Calculator 365 — Free Online Calculators for Finance, Health, Math & More',
    template: '%s | Real Calculator 365',
  },
  description:
    'No sign-in, no premium, no hassle — all handled by ads. Access 120+ free online calculators for finance, health, science, math, engineering, and more. Fast, accurate, and 100% free forever.',
  keywords: [
    'free calculator',
    'online calculator',
    'EMI calculator',
    'BMI calculator',
    'compound interest calculator',
    'percentage calculator',
    'scientific calculator',
    'loan calculator',
    'age calculator',
    'finance calculator',
    'health calculator',
    'math calculator',
    'conversion calculator',
    'mortgage calculator',
    'SIP calculator',
    'calorie calculator',
    'tax calculator',
    'salary calculator',
  ],
  authors: [{ name: 'Real Calculator 365' }],
  creator: 'Real Calculator 365',
  publisher: 'Real Calculator 365',
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://realcalculator365.com',
    siteName: 'Real Calculator 365',
    title: 'Real Calculator 365 — Free Online Calculators',
    description: 'No sign-in, no premium, no hassle — all handled by ads. 120+ professional calculators for finance, health, math, and more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Real Calculator 365 - Free Online Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Calculator 365 — Free Online Calculators',
    description: 'No sign-in, no premium, no hassle — all handled by ads.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://realcalculator365.com',
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Real Calculator 365',
  url: 'https://realcalculator365.com',
  description: 'No sign-in, no premium, no hassle — all handled by ads. 120+ free online calculators for finance, health, math, science, and more.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://realcalculator365.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Real Calculator 365',
    url: 'https://realcalculator365.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://realcalculator365.com/logo.png',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Calco" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* hreflang alternates — all locales */}
        <link rel="alternate" hrefLang="en" href="https://realcalculator365.com/" />
        <link rel="alternate" hrefLang="es" href="https://realcalculator365.com/es/" />
        <link rel="alternate" hrefLang="ja" href="https://realcalculator365.com/ja/" />
        <link rel="alternate" hrefLang="fr" href="https://realcalculator365.com/fr/" />
        <link rel="alternate" hrefLang="de" href="https://realcalculator365.com/de/" />
        <link rel="alternate" hrefLang="pt" href="https://realcalculator365.com/pt/" />
        <link rel="alternate" hrefLang="ko" href="https://realcalculator365.com/ko/" />
        <link rel="alternate" hrefLang="it" href="https://realcalculator365.com/it/" />
        <link rel="alternate" hrefLang="x-default" href="https://realcalculator365.com/" />

        {/* Theme Color */}
        <meta name="theme-color" content="#0F52BA" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1F1F4D" media="(prefers-color-scheme: dark)" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TY76NV5650" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-TY76NV5650');`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
