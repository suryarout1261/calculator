import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BMICalculator } from '@/components/calculators/BMICalculator';

export const metadata: Metadata = {
  title: 'BMI Calculator — Calculate Your Body Mass Index',
  description: 'Free online BMI calculator. Check your Body Mass Index instantly. Understand if you are underweight, normal, overweight, or obese with our accurate BMI tool.',
  keywords: ['BMI calculator', 'body mass index', 'BMI check', 'weight calculator', 'health calculator'],
};

export default function BMIPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <nav className="text-sm text-gray-500 mb-4">
              <a href="/" className="hover:text-brand-sapphire">Home</a> / <a href="/calculators/health" className="hover:text-brand-sapphire">Health</a> / <span className="text-brand-black dark:text-white">BMI Calculator</span>
            </nav>
            <h1 className="font-display text-4xl font-bold mb-3">BMI Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400">Calculate your Body Mass Index to assess whether your weight is healthy for your height.</p>
          </div>

          <BMICalculator />

          {/* SEO Content */}
          <section className="mt-16 prose dark:prose-invert max-w-none">
            <h2>What is BMI?</h2>
            <p>Body Mass Index (BMI) is a simple calculation using a person&apos;s height and weight. The formula is BMI = kg/m², where kg is weight in kilograms and m² is height in meters squared.</p>
            <h2>BMI Categories</h2>
            <ul>
              <li><strong>Underweight:</strong> BMI less than 18.5</li>
              <li><strong>Normal weight:</strong> BMI 18.5–24.9</li>
              <li><strong>Overweight:</strong> BMI 25–29.9</li>
              <li><strong>Obese:</strong> BMI 30 or greater</li>
            </ul>
            <h2>BMI Formula</h2>
            <p>BMI = Weight (kg) ÷ Height² (m²)</p>
            <p>For imperial units: BMI = [Weight (lbs) ÷ Height² (in²)] × 703</p>
          </section>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'BMI Calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
    </>
  );
}

