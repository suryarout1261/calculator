import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AgeCalculator } from '@/components/calculators/AgeCalculator';

export const metadata: Metadata = {
  title: 'Age Calculator — Calculate Exact Age in Years, Months, Days',
  description: 'Free age calculator. Find your exact age in years, months, days, hours, and minutes from your date of birth.',
};

export default function AgePage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/date-time" className="hover:text-brand-sapphire">Date & Time</a> / <span className="text-brand-black dark:text-white">Age Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">Age Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate your exact age from your date of birth.</p>
          <AgeCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}

