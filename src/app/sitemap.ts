import { MetadataRoute } from 'next';
import { CALCULATORS, CATEGORIES } from '@/lib/store';

const BASE_URL = 'https://shivarkaa.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
  ];

  CALCULATORS.forEach((calculator) => {
    pages.push({ url: `${BASE_URL}${calculator.href}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 });
  });

  CATEGORIES.forEach((category) => {
    pages.push({ url: `${BASE_URL}${category.href}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 });
  });

  return pages;
}



