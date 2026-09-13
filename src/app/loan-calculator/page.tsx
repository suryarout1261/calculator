import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoanCalculator } from '@/components/calculators/LoanCalculator';

export const metadata: Metadata = {
  title: 'Loan Calculator — Free Online Loan EMI Calculator',
  description: 'Free loan calculator to compute monthly payments, total interest, and amortization. Use our online loan calculator for accurate EMI and repayment planning.',
};

export default function LoanPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/finance" className="hover:text-brand-sapphire">Finance</a> / <span className="text-brand-black dark:text-white">Loan Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">Loan Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate monthly payments and total cost for any loan.</p>
          <LoanCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}

