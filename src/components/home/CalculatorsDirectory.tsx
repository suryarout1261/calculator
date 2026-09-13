'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Sparkles, Heart, TrendingUp, ArrowRight } from 'lucide-react';
import { CALCULATORS, CATEGORIES, useAppStore, useSearchStore } from '@/lib/store';

const trending = ['emi', 'bmi', 'sip', 'compound-interest', 'percentage', 'calorie', 'tdee', 'age'];

export function CalculatorsDirectory() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { favorites, toggleFavorite } = useAppStore();
  const { openSearch } = useSearchStore();

  const filtered = useMemo(() => {
    let list = CALCULATORS;
    if (activeCategory !== 'all') list = list.filter((c) => c.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q) || c.tags.some((t) => t.includes(q)) || c.description.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeCategory]);

  const trendingCalcs = CALCULATORS.filter((c) => trending.includes(c.id));
  const favoriteCalcs = CALCULATORS.filter((c) => favorites.includes(c.id));

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sapphire/10 text-brand-sapphire text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" /> {CALCULATORS.length}+ Intelligent Calculators
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Calculator <span className="gradient-text">Directory</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Every calculation you need — finance, health, math, science, engineering, and AI-powered tools.
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search calculators... (e.g., EMI, BMI, Interest, Algebra)"
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50 text-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <button onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeCategory === 'all' ? 'bg-brand-sapphire text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
          All ({CALCULATORS.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeCategory === cat.id ? 'bg-brand-sapphire text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Trending Section */}
      {activeCategory === 'all' && !search && (
        <section className="mb-12">
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-gold" /> Trending Now
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {trendingCalcs.map((calc) => (
              <Link key={calc.id} href={calc.href}
                className="flex-shrink-0 glass-card px-5 py-3 hover:shadow-lg transition-all group">
                <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-sapphire whitespace-nowrap">{calc.title}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{calc.category}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Favorites Section */}
      {favoriteCalcs.length > 0 && activeCategory === 'all' && !search && (
        <section className="mb-12">
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" /> Your Favorites
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {favoriteCalcs.slice(0, 8).map((calc) => (
              <Link key={calc.id} href={calc.href}
                className="glass-card p-4 hover:shadow-lg transition-all text-sm font-medium text-gray-900 dark:text-white hover:text-brand-sapphire">
                {calc.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">{filtered.length} calculators found</p>
      </div>

      {/* Main Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((calc, i) => (
          <motion.div key={calc.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.02, 0.5) }}>
            <Link href={calc.href}
              className="glass-card p-5 block group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative h-full">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-6">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-brand-sapphire transition-colors">{calc.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{calc.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[10px] uppercase tracking-wider text-brand-gold font-semibold">{calc.category}</span>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.preventDefault(); toggleFavorite(calc.id); }}
                    className={`p-1 rounded ${favorites.includes(calc.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}>
                    <Heart className="w-3.5 h-3.5" fill={favorites.includes(calc.id) ? 'currentColor' : 'none'} />
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-sapphire transition" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No calculators match your search.</p>
          <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="btn-primary">Clear Filters</button>
        </div>
      )}
    </div>
  );
}

