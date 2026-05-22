import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-4">About SHIVARKAA CALCULATE</h1>
          <p className="text-gray-700 dark:text-gray-300 leading-7 mb-6">
            SHIVARKAA CALCULATE is a modern calculation operating system built for finance, health, science, engineering, education, and everyday decisions.
          </p>
          <div className="glass-card p-6">
            <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              Make reliable calculations fast, understandable, visual, and accessible globally with premium UX and scalable calculator architecture.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

