'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { CalculatorMeta, useAppStore } from '@/lib/store';
import { FreeBanner } from '@/components/ui/FreeBanner';

export function CategoryPageClient({ calculators }: { calculators: CalculatorMeta[] }) {
  const [filter, setFilter] = useState<'all' | 'popular'>('all');
  const [sort, setSort] = useState<'name' | 'popular'>('popular');
  const { toggleFavorite, favorites } = useAppStore();

  let filtered = calculators;
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      <FreeBanner />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'name' | 'popular')}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 outline-none focus:border-brand-sapphire dark:focus:border-brand-gold transition-colors"
          >
            <option value="popular">Most Popular</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} calculators
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((calc, i) => (
          <motion.div
            key={calc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
          >
            <Link
              href={calc.href}
              className="glass-card p-6 block group hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-sapphire/5 to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-base group-hover:text-brand-sapphire dark:group-hover:text-brand-gold transition-colors pr-8">
                    {calc.title}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(calc.id);
                    }}
                    className={`shrink-0 p-2 rounded-lg transition-all duration-200 ${
                      favorites.includes(calc.id)
                        ? 'text-red-500 bg-red-50 dark:bg-red-500/10'
                        : 'text-gray-300 hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={favorites.includes(calc.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {calc.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                    {calc.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-sapphire dark:group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* SEO Content */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No calculators found in this category.</p>
        </div>
      )}
    </div>
  );
}
