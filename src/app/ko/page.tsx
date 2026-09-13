import type { Metadata } from 'next';
import { HomePage } from '@/components/home/HomePage';
import { BASE_URL, LOCALE_META, getDictionary, hreflangAlternates } from '@/lib/i18n';

const dict = getDictionary('ko');

export const metadata: Metadata = {
  title: dict.metaTitle,
  description: dict.metaDescription,
  alternates: {
    canonical: `${BASE_URL}/ko/`,
    languages: hreflangAlternates('/'),
  },
  openGraph: {
    type: 'website',
    locale: LOCALE_META.ko.ogLocale,
    url: `${BASE_URL}/ko/`,
    siteName: 'Real Calculator 365',
    title: dict.metaTitle,
    description: dict.metaDescription,
  },
};

export default function Page() {
  return <HomePage />;
}
