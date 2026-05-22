import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CalorieCalculator } from '@/components/calculators/CalorieCalculator';

export const metadata: Metadata = {
  title: 'Calorie Calculator — Daily Calorie Needs Calculator',
  description: 'Free calorie calculator to determine your daily caloric needs based on age, gender, height, weight, and activity level.',
};

export default function CaloriePage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/health" className="hover:text-brand-sapphire">Health</a> / <span className="text-brand-black dark:text-white">Calorie Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">Calorie Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Estimate daily calories needed to maintain, lose, or gain weight.</p>
          <CalorieCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}

