import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CalculatorsDirectory } from '@/components/home/CalculatorsDirectory';

export const metadata: Metadata = {
  title: 'All Calculators — Browse 100+ Free Online Calculators',
  description: 'Browse our complete collection of free online calculators for finance, health, math, science, engineering, business, and AI-powered tools.',
};

export default function CalculatorsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CalculatorsDirectory />
        </div>
      </main>
      <Footer />
    </>
  );
}
