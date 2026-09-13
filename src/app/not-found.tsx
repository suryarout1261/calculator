import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-8xl font-black text-brand-sapphire mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">The calculator or page you are looking for does not exist. Check the URL or return home.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-bold bg-brand-sapphire text-white hover:bg-blue-700 transition-colors shadow-lg">← Go to Homepage</Link>
      </main>
      <Footer />
    </>
  );
}
