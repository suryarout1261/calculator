import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PeriodTrackerApp } from '@/components/calculators/PeriodTracker';

export const metadata: Metadata = {
  title: 'Period Tracker — Cycle, Fertility & Ovulation Predictor',
  description: 'Track your menstrual cycle, predict next period, ovulation window, and fertility days with our intelligent period tracker.',
};

export default function PeriodTrackerPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a>{' / '}
            <a href="/category/health" className="hover:text-brand-sapphire">Health</a>{' / '}
            <span className="text-gray-900 dark:text-white">Period Tracker</span>
          </nav>
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Period Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Track your menstrual cycle, predict your next period, ovulation, and fertility window.</p>
          <PeriodTrackerApp />
        </div>
      </main>
      <Footer />
    </>
  );
}


