'use client';

import { motion } from 'framer-motion';
import { Check, Gift, Sparkles, Heart, Zap } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';

const features = [
  { text: 'Unlimited calculations', icon: Zap },
  { text: '120+ professional calculators', icon: Sparkles },
  { text: 'All features unlocked', icon: Gift },
  { text: 'No registration required', icon: Heart },
  { text: 'Dark mode support', icon: Sparkles },
  { text: 'Mobile optimized', icon: Zap },
  { text: 'Export & share results', icon: Gift },
  { text: 'Ad-supported (keeps it free!)', icon: Heart },
];

const categories = [
  { name: 'Finance', count: 16, emoji: '💰' },
  { name: 'Health & Fitness', count: 14, emoji: '💪' },
  { name: 'Mathematics', count: 9, emoji: '🔢' },
  { name: 'Science', count: 8, emoji: '🔬' },
  { name: 'Engineering', count: 5, emoji: '⚙️' },
  { name: 'Date & Time', count: 4, emoji: '📅' },
  { name: 'Education', count: 4, emoji: '🎓' },
  { name: 'Conversions', count: 7, emoji: '🔄' },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl">
                <Gift className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl font-bold mb-4 gradient-text"
            >
              100% Free Forever
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6"
            >
              All 120+ professional calculators. All features. Completely free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium"
            >
              <Heart className="w-5 h-5" />
              No sign-in, no premium, no hassle — all handled by ads 🎉
            </motion.div>
          </div>

          {/* Main Free Plan Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-brand-sapphire via-blue-600 to-brand-indigo shadow-2xl">
              {/* Animated Background Elements */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold text-white mb-2">
                  Everything You Need
                </h2>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-display text-6xl font-bold text-white">$0</span>
                  <span className="text-2xl text-white/80">forever</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.05 }}
                        className="flex items-center gap-3 text-white"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </motion.div>
                    );
                  })}
                </div>

                <Link href="/calculators" className="block w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 rounded-xl bg-white text-brand-sapphire font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    Start Calculating Now →
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-center mb-8">
              All Categories Included
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cat.count}+ calculators
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Is it really 100% free?',
                  a: 'Yes! Every single calculator and feature is completely free. We show ads to cover our costs and keep the service free for everyone.',
                },
                {
                  q: 'Do I need to create an account?',
                  a: 'No account required! Just visit any calculator and start using it immediately. All features are accessible without sign-in.',
                },
                {
                  q: 'Are there any hidden fees or limitations?',
                  a: 'Absolutely none. All 120+ calculators are completely unlimited. No hidden fees, no feature locks.',
                },
                {
                  q: 'How do you make money?',
                  a: 'We display non-intrusive ads on calculator pages. This keeps the service free while covering our hosting and development costs.',
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="glass-card p-6"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
