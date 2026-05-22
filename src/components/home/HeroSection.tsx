'use client';

import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { useSearchStore, CALCULATORS } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const popularCalcs = CALCULATORS.filter(c => ['bmi', 'emi', 'age', 'percentage', 'sip', 'compound-interest'].includes(c.id));

export function HeroSection() {
  const { openSearch } = useSearchStore();
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo/5 via-transparent to-brand-sapphire/5 dark:from-brand-indigo/20 dark:to-brand-sapphire/10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-sapphire/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sapphire/10 dark:bg-brand-sapphire/20 text-brand-sapphire text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Calculation Engine
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Calculate Anything.{' '}
            <span className="gradient-text">Instantly.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
            AI-powered calculators and intelligent tools for finance, health, science,
            engineering, business, and everyday life. Trusted by millions worldwide.
          </p>

          {/* Search Bar - Opens Command Palette */}
          <div className="max-w-2xl mx-auto mb-10">
            <button
              onClick={openSearch}
              className="w-full flex items-center gap-3 pl-5 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-left shadow-lg hover:shadow-xl transition-shadow group"
            >
              <Search className="w-5 h-5 text-gray-400 group-hover:text-brand-sapphire transition-colors" />
              <span className="flex-1 text-gray-400 text-lg">Search calculators... (e.g., BMI, EMI, Interest)</span>
              <kbd className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 font-mono">⌘K</kbd>
            </button>
          </div>

          {/* Popular Tags - Functional Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {popularCalcs.map((calc) => (
              <Link
                key={calc.id}
                href={calc.href}
                className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-brand-sapphire/10 hover:text-brand-sapphire dark:hover:bg-brand-sapphire/20 cursor-pointer transition-all"
              >
                {calc.title}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link href="/calculators" className="inline-flex items-center gap-2 btn-gold text-lg">
              Explore All Calculators <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
