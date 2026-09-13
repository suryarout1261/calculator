import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScientificCalculator } from '@/components/calculators/ScientificCalculator';

export const metadata: Metadata = {
  title: 'Scientific Calculator — Free Online Scientific Calculator',
  description: 'Free online scientific calculator with trigonometry, logarithms, exponents, roots, and more. Full-featured math calculator for students and professionals.',
};

export default function ScientificPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/math" className="hover:text-brand-sapphire">Math</a> / <span className="text-brand-black dark:text-white">Scientific Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">Scientific Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Free scientific calculator online for trigonometry, logarithms, exponents, and roots. A powerful calculus-ready math calculator tool for students and professionals.</p>
          <ScientificCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}

