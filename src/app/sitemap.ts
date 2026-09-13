export const dynamic = 'force-static';

import { MetadataRoute } from 'next';
import { CALCULATORS, CATEGORIES } from '@/lib/store';
import { LOCALES, BASE_URL } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];

  // All locale homepages (the only localized routes that exist today —
  // deep localized routes are added here as their translations land).
  pages.push({ url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 });
  LOCALES.filter((l) => l !== 'en').forEach((l) => {
    pages.push({ url: `${BASE_URL}/${l}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 });
  });

  // Static informational pages
  const staticPages = [
    { href: '/about', changeFrequency: 'monthly' as const, priority: 0.6 },
    { href: '/blog', changeFrequency: 'weekly' as const, priority: 0.7 },
    { href: '/contact', changeFrequency: 'monthly' as const, priority: 0.5 },
    { href: '/privacy', changeFrequency: 'monthly' as const, priority: 0.4 },
    { href: '/terms', changeFrequency: 'monthly' as const, priority: 0.4 },
  ];
  staticPages.forEach(({ href, changeFrequency, priority }) => {
    pages.push({ url: `${BASE_URL}${href}`, lastModified: new Date(), changeFrequency, priority });
  });

  // English calculator and category pages
  CALCULATORS.forEach((calculator) => {
    pages.push({ url: `${BASE_URL}${calculator.href}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 });
  });

  CATEGORIES.forEach((category) => {
    pages.push({ url: `${BASE_URL}${category.href}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  });

  return pages;
}
