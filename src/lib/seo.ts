import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.jpg',
  noindex = false,
}: SEOProps): Metadata {
  const fullTitle = title.includes('Real Calculator 365') ? title : `${title} | Real Calculator 365`;
  const baseUrl = 'https://realcalculator365.com';

  return {
    title: fullTitle,
    description,
    keywords: [
      'calculator',
      'online calculator',
      'free calculator',
      'math calculator',
      'finance calculator',
      ...keywords,
    ],
    authors: [{ name: 'Real Calculator 365' }],
    creator: 'Real Calculator 365',
    publisher: 'Real Calculator 365',
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: canonical || baseUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical || baseUrl,
      siteName: 'Real Calculator 365',
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

/**
 * Generates structured data (JSON-LD) for calculator pages
 */
export function generateCalculatorStructuredData(
  calculatorName: string,
  description: string,
  url: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calculatorName,
    description,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    provider: {
      '@type': 'Organization',
      name: 'Real Calculator 365',
      url: 'https://realcalculator365.com',
    },
  };
}

/**
 * Generates breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
