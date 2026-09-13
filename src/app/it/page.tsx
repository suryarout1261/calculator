import type { Metadata } from 'next';
import { HomePage } from '@/components/home/HomePage';
import { BASE_URL, LOCALE_META, getDictionary, hreflangAlternates } from '@/lib/i18n';

const dict = getDictionary('it');

export const metadata: Metadata = {
  title: dict.metaTitle,
  description: dict.metaDescription,
  alternates: {
    canonical: `${BASE_URL}/it/`,
    languages: hreflangAlternates('/'),
  },
  openGraph: {
    type: 'website',
    locale: LOCALE_META.it.ogLocale,
    url: `${BASE_URL}/it/`,
    siteName: 'Real Calculator 365',
    title: dict.metaTitle,
    description: dict.metaDescription,
  },
};

export default function Page() {
  return <HomePage />;
}
