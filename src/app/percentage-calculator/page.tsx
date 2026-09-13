import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PercentageCalculator } from '@/components/calculators/PercentageCalculator';

export const metadata: Metadata = {
  title: 'Percentage Calculator — Calculate Percentages Instantly',
  description: 'Free online percentage calculator. Calculate percentage of a number, percentage increase, percentage decrease, percentage change, and percentage difference instantly. Best percentage calculator tool.',
};

export default function PercentagePage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/math" className="hover:text-brand-sapphire">Math</a> / <span className="text-brand-black dark:text-white">Percentage Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">Percentage Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Use our free online percentage calculator to find percentages, percentage change, percentage increase, percentage decrease, and percentage difference with multiple modes. Fast, accurate, mobile-friendly calculator tool.</p>
          <PercentageCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}

