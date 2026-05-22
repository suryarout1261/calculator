import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CALCULATORS, CATEGORIES } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryPageClient } from './CategoryPageClient';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.id === slug);
  if (!cat) return {};
  return {
    title: `${cat.label} Calculators — Free Online Tools`,
    description: `Browse ${cat.count}+ free ${cat.label.toLowerCase()} calculators. Accurate, fast, and AI-powered tools.`,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.id }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.id === slug);
  if (!cat) notFound();
  const calculators = CALCULATORS.filter((c) => c.category === slug);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <span className="text-brand-black dark:text-white">{cat.label}</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">{cat.label} Calculators</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {calculators.length} professional {cat.label.toLowerCase()} calculators. Accurate, fast, and free.
          </p>
          <CategoryPageClient calculators={calculators} />
        </div>
      </main>
      <Footer />
    </>
  );
}

