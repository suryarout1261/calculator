import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p>SHIVARKAA CALCULATE stores local preferences such as theme, favorites, and calculation history in your browser for convenience.</p>
          <h2>Calculation Data</h2>
          <p>Most calculations run client-side. Saved history is stored locally unless a future authenticated sync feature is enabled.</p>
          <h2>Analytics</h2>
          <p>Production deployments may use privacy-conscious analytics to improve performance and content quality.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

