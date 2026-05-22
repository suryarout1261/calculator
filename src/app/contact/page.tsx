import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8">Questions, feedback, partnerships, or enterprise calculators? Reach out to us.</p>
          <div className="glass-card p-6 space-y-4">
            <p className="text-gray-800 dark:text-gray-200"><strong>Email:</strong> support@shivarkaa.com</p>
            <p className="text-gray-800 dark:text-gray-200"><strong>Business:</strong> partnerships@shivarkaa.com</p>
            <p className="text-gray-800 dark:text-gray-200"><strong>Response time:</strong> 1–2 business days</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

