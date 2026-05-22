'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Clock, Star, Lock, TrendingUp } from 'lucide-react';
import { useSearchStore, CALCULATORS } from '@/lib/store';

const TRENDING = ['BMI Calculator', 'EMI Calculator', 'Compound Interest', 'SIP Calculator', 'Age Calculator'];

export function CommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, query, setQuery, closeSearch, addRecentSearch, recentSearches, getResults } = useSearchStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const results = getResults();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useSearchStore.getState().openSearch();
      }
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeSearch]);

  const navigate = (href: string, title: string) => {
    addRecentSearch(title);
    closeSearch();
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = results.length > 0 ? results : [];
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, items.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && items[selectedIndex]) {
      navigate(items[selectedIndex].href, items[selectedIndex].title);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl px-4"
          >
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Input */}
              <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search calculators... (e.g., BMI, EMI, Interest)"
                  className="flex-1 px-3 py-4 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <kbd className="hidden sm:inline-flex px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-500 font-mono">ESC</kbd>
                <button onClick={closeSearch} className="ml-2 p-1"><X className="w-4 h-4 text-gray-400" /></button>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {query && results.length > 0 ? (
                  <div>
                    <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Results</p>
                    {results.map((r, i) => (
                      <button
                        key={r.id}
                        onClick={() => navigate(r.href, r.title)}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-colors ${
                          i === selectedIndex ? 'bg-brand-sapphire/10 dark:bg-brand-sapphire/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            {r.title}
                            {r.isPremium && <Lock className="w-3 h-3 text-brand-gold" />}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{r.description}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                ) : query && results.length === 0 ? (
                  <p className="text-center py-8 text-sm text-gray-600 dark:text-gray-400">No calculators found for &quot;{query}&quot;</p>
                ) : (
                  <div className="space-y-4 py-2">
                    {recentSearches.length > 0 && (
                      <div>
                        <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Recent</p>
                        {recentSearches.slice(0, 5).map((r) => (
                          <button key={r} onClick={() => setQuery(r)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                            <Clock className="w-3 h-3 text-gray-400" /> {r}
                          </button>
                        ))}
                      </div>
                    )}
                    <div>
                      <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Trending</p>
                      {TRENDING.map((t) => {
                        const calc = CALCULATORS.find((c) => c.title === t);
                        return calc ? (
                          <button key={t} onClick={() => navigate(calc.href, calc.title)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 text-left">
                            <Star className="w-3 h-3 text-brand-gold" /> {t}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-[10px] text-gray-400">
                <span>↑↓ Navigate · ↵ Select · Esc Close</span>
                <span>⌘K to search anytime</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


