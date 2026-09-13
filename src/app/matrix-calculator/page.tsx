import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MatrixCalculator } from '@/components/calculators/MatrixCalculator';

export const metadata: Metadata = {
  title: 'Matrix Calculator — Real Calculator 365',
  description: 'Perform matrix operations, calculate determinants, rank, inverse, transpose, and more.',
};

export default function MatrixPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/math" className="hover:text-brand-sapphire">Math</a> / <span className="text-brand-black dark:text-white">Matrix Calculator</span>
          </nav>
          <h1 className="font-display text-4xl font-bold mb-3">Matrix Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Perform matrix operations, calculate determinants, rank, inverse, transpose, and more.</p>

          <MatrixCalculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
