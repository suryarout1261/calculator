import type { Metadata } from 'next';
import { HomePage } from '@/components/home/HomePage';
import { BASE_URL, LOCALE_META, getDictionary, hreflangAlternates } from '@/lib/i18n';

const dict = getDictionary('pt');

export const metadata: Metadata = {
  title: dict.metaTitle,
  description: dict.metaDescription,
  alternates: {
    canonical: `${BASE_URL}/pt/`,
    languages: hreflangAlternates('/'),
  },
  openGraph: {
    type: 'website',
    locale: LOCALE_META.pt.ogLocale,
    url: `${BASE_URL}/pt/`,
    siteName: 'Real Calculator 365',
    title: dict.metaTitle,
    description: dict.metaDescription,
  },
};

export default function Page() {
  return <HomePage />;
}
