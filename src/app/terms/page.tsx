import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert">
          <h1>Terms of Service</h1>
          <p>By using SHIVARKAA CALCULATE, you agree to use calculators as informational tools and verify critical decisions with qualified professionals.</p>
          <h2>No Professional Advice</h2>
          <p>Finance, health, tax, engineering, and legal outputs are estimates and should not replace expert consultation.</p>
          <h2>Acceptable Use</h2>
          <p>Do not abuse, scrape, overload, or attempt to compromise the platform.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

