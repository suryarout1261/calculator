'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Heart, ArrowRight } from 'lucide-react';
import { CalculatorMeta, useAppStore, useAuthStore } from '@/lib/store';

export function CategoryPageClient({ calculators }: { calculators: CalculatorMeta[] }) {
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [sort, setSort] = useState<'name' | 'popular'>('popular');
  const { toggleFavorite, favorites } = useAppStore();
  const user = useAuthStore((s) => s.user);

  let filtered = calculators;
  if (filter === 'free') filtered = filtered.filter((c) => !c.isPremium);
  if (filter === 'premium') filtered = filtered.filter((c) => c.isPremium);
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {(['all', 'free', 'premium'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === f ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
            {f === 'all' ? 'All' : f === 'free' ? 'Free' : '⭐ Premium'}
          </button>
        ))}
        <select value={sort} onChange={(e) => setSort(e.target.value as 'name' | 'popular')}
          className="ml-auto px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 border-0 outline-none">
          <option value="popular">Sort: Popular</option>
          <option value="name">Sort: A-Z</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((calc, i) => (
          <motion.div key={calc.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Link href={calc.isPremium && !user?.isPremium ? '/pricing' : calc.href}
              className="glass-card p-5 block group hover:shadow-xl transition-all duration-300 relative">
              {calc.isPremium && (
                <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">
                  <Lock className="w-3 h-3" /> PRO
                </span>
              )}
              <h3 className="font-semibold text-sm group-hover:text-brand-sapphire transition-colors pr-12">{calc.title}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-3">{calc.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">{calc.category}</span>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.preventDefault(); toggleFavorite(calc.id); }}
                    className={`p-1 rounded ${favorites.includes(calc.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}>
                    <Heart className="w-3.5 h-3.5" fill={favorites.includes(calc.id) ? 'currentColor' : 'none'} />
                  </button>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-sapphire transition" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

