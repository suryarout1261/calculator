import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategorySelector } from '@/components/CategorySelector';

export const metadata: Metadata = {
  title: 'Category Selector Demo — Real Calculator 365',
  description: 'Interactive two-level category selector with smooth animations',
};

export default function CategorySelectorDemoPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Category Selector
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A modern two-level navigation system with Apple-like fluid motion.
              Select a category, then choose your calculator.
            </p>
          </div>

          {/* Category Selector Component */}
          <div className="max-w-5xl mx-auto mb-12">
            <CategorySelector />
          </div>

          {/* Features Grid */}
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-brand-sapphire/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-sapphire" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Fluid Animations
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                200-300ms transitions with spring physics for natural, responsive motion
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Mobile Optimized
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Horizontal scrolling with snap points for perfect touch navigation
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Data-Driven
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically syncs with your calculator registry—add once, appears everywhere
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Active States
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clear visual feedback with gradient backgrounds and smooth scale transforms
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Dark Mode Ready
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Seamless dark/light theme support with glassmorphism effects
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Reusable Component
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drop into any page with optional callbacks for custom behavior
              </p>
            </div>
          </div>

          {/* Implementation Note */}
          <div className="max-w-5xl mx-auto mt-12 glass-card p-8">
            <h2 className="font-display text-2xl font-bold mb-4">Implementation</h2>
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <p>
                The CategorySelector component uses <strong>Framer Motion</strong> for smooth animations
                and <strong>Zustand store</strong> for centralized calculator data.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-xs font-mono">
{`import { CategorySelector } from '@/components/CategorySelector';

// Basic usage
<CategorySelector />

// With custom callback
<CategorySelector
  onCalculatorSelect={(href) => router.push(href)}
  defaultCategory="finance"
/>`}
                </pre>
              </div>
              <p className="text-xs text-gray-500">
                The component automatically adapts to mobile with horizontal scrolling and snap points.
                No additional configuration needed.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
