import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EMICalculator } from '@/components/calculators/EMICalculator';

export const metadata: Metadata = {
  title: 'EMI Calculator — Calculate Loan EMI Instantly',
  description: 'Free EMI calculator to compute monthly installments for home loans, car loans, and personal loans. See amortization schedule and total interest payable.',
  keywords: ['EMI calculator', 'loan EMI', 'home loan EMI', 'car loan EMI', 'monthly installment calculator'],
};

export default function EMIPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/finance" className="hover:text-brand-sapphire">Finance</a> / <span className="text-brand-black dark:text-white">EMI Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">EMI Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate your Equated Monthly Installment for any loan amount, interest rate, and tenure.</p>

          <EMICalculator />

          <section className="mt-16 prose dark:prose-invert max-w-none">
            <h2>What is EMI?</h2>
            <p>EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs apply to both interest and principal each month.</p>
            <h2>EMI Formula</h2>
            <p>EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]</p>
            <p>Where P = Principal, R = Monthly interest rate, N = Number of monthly installments.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

