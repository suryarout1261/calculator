import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CompoundInterestCalculator } from '@/components/calculators/CompoundInterestCalculator';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — See Your Money Grow',
  description: 'Free compound interest calculator. Calculate how your investments grow with compounding over time. Supports monthly, quarterly, and annual compounding.',
};

export default function CompoundInterestPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/finance" className="hover:text-brand-sapphire">Finance</a> / <span className="text-brand-black dark:text-white">Compound Interest Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">Compound Interest Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">See the power of compounding and watch your money grow exponentially.</p>
          <CompoundInterestCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}

