import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CALCULATORS } from '@/lib/store';
import { CalculatorRenderer } from './CalculatorRenderer';

// This maps every calculator slug to a dynamic page
const seoData: Record<string, { title: string; description: string }> = {
  'mortgage-calculator': { title: 'Mortgage Calculator — Calculate Home Loan Payments', description: 'Free mortgage calculator. Estimate monthly payments, total interest, and amortization for your home loan.' },
  'roi-calculator': { title: 'ROI Calculator — Calculate Return on Investment', description: 'Free ROI calculator. Measure your investment returns, annualized ROI, and net gain/loss.' },
  'gst-calculator': { title: 'GST Calculator — Calculate GST Inclusive & Exclusive', description: 'Free GST calculator. Calculate GST amount, total price with tax, and reverse GST for any rate.' },
  'bmr-calculator': { title: 'BMR Calculator — Basal Metabolic Rate', description: 'Free BMR calculator using Mifflin-St Jeor and Harris-Benedict formulas. Know your daily calorie baseline.' },
  'tdee-calculator': { title: 'TDEE Calculator — Total Daily Energy Expenditure', description: 'Free TDEE calculator. Find your daily calorie needs based on activity level for cutting, maintaining, or bulking.' },
  'body-fat-calculator': { title: 'Body Fat Calculator — US Navy Method', description: 'Free body fat calculator using the US Navy method. Estimate body fat percentage from measurements.' },
  'algebra-solver': { title: 'Algebra Solver — Solve Equations Step by Step', description: 'Free algebra solver. Solve linear and quadratic equations with step-by-step solutions.' },
  'simple-interest-calculator': { title: 'Simple Interest Calculator', description: 'Calculate simple interest on principal amount for any rate and time period.' },
  'date-difference-calculator': { title: 'Date Difference Calculator', description: 'Calculate the number of days, weeks, months between two dates.' },
  'unit-converter': { title: 'Unit Converter — Convert Any Unit', description: 'Universal unit converter for length, weight, temperature, and more.' },
};

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seo = seoData[slug];
  const calc = CALCULATORS.find((c) => c.href === `/${slug}`);
  return {
    title: seo?.title || calc?.title || 'Calculator',
    description: seo?.description || calc?.description || 'Free online calculator',
  };
}

export function generateStaticParams() {
  const staticCalculatorPages = new Set([
    'age-calculator', 'bmi-calculator', 'calorie-calculator', 'compound-interest-calculator',
    'emi-calculator', 'gpa-calculator', 'loan-calculator', 'percentage-calculator',
    'scientific-calculator', 'sip-calculator',
  ]);
  const slugs = CALCULATORS
    .map((calculator) => calculator.href.replace(/^\//, ''))
    .filter((slug) => !staticCalculatorPages.has(slug));
  return slugs.map((slug) => ({ slug }));
}

export default async function DynamicCalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = CALCULATORS.find((c) => c.href === `/${slug}`);
  if (!calc) notFound();

  const category = calc.category;
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <a href="/" className="hover:text-brand-sapphire">Home</a>
            {' / '}
            <a href={`/category/${category}`} className="hover:text-brand-sapphire">{categoryLabel}</a>
            {' / '}
            <span className="text-gray-900 dark:text-white">{calc.title}</span>
          </nav>
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">{calc.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{calc.description}</p>
          <CalculatorRenderer slug={slug} />
        </div>
      </main>
      <Footer />
    </>
  );
}


