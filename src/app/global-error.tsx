'use client';

import Link from 'next/link';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen flex flex-col items-center justify-center px-4">
        <main className="text-center">
          <h1 className="font-display text-8xl font-black text-brand-sapphire mb-4">500</h1>
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">An unexpected error occurred. Try refreshing the page or go back home.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-bold bg-brand-sapphire text-white hover:bg-blue-700 transition-colors shadow-lg">↻ Try Again</button>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg">← Go to Homepage</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
