import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SIPCalculator } from '@/components/calculators/SIPCalculator';

export const metadata: Metadata = {
  title: 'SIP Calculator — Calculate Mutual Fund Returns',
  description: 'Free SIP calculator to estimate returns on your systematic investment plan. See how your monthly investments grow over time with compound interest.',
};

export default function SIPPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/finance" className="hover:text-brand-sapphire">Finance</a> / <span className="text-brand-black dark:text-white">SIP Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">SIP Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Estimate returns on your Systematic Investment Plan and see how your wealth grows.</p>
          <SIPCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}

