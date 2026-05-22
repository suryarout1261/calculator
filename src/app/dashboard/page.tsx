'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, Heart, Clock, Crown, Trash2, Star } from 'lucide-react';
import { useAuthStore, useAppStore, CALCULATORS } from '@/lib/store';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { format } from 'date-fns';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const favorites = useAppStore((s) => s.favorites);
  const history = useAppStore((s) => s.history);
  const clearHistory = useAppStore((s) => s.clearHistory);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !user) router.push('/login');
  }, [user, router, hydrated]);

  if (!hydrated || !user) return null;

  const favCalcs = CALCULATORS.filter((c) => favorites.includes(c.id));

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Welcome, {user.name}!</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Your personal calculation dashboard</p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-10">
            <div className="glass-card p-5 text-center">
              <Calculator className="w-6 h-6 mx-auto mb-2 text-brand-sapphire" />
              <p className="font-display text-2xl font-bold text-gray-900 dark:text-white">{history.length}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Calculations</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <p className="font-display text-2xl font-bold text-gray-900 dark:text-white">{favorites.length}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Favorites</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Crown className="w-6 h-6 mx-auto mb-2 text-brand-gold" />
              <p className="font-display text-2xl font-bold text-gray-900 dark:text-white">{user.isPremium ? 'Active' : 'Free'}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Plan</p>
            </div>
            <div className="glass-card p-5 text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <p className="font-display text-2xl font-bold text-gray-900 dark:text-white">{user.isPremium ? '∞' : `${Math.max(0, 10 - history.filter(h => h.timestamp > Date.now() - 86400000).length)}/10`}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Today&apos;s Limit</p>
            </div>
          </div>

          {/* Premium CTA */}
          {!user.isPremium && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-sapphire text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg flex items-center gap-2"><Crown className="w-5 h-5 text-brand-gold" /> Upgrade to Premium</h3>
                  <p className="text-sm text-white/70 mt-1">Unlimited calculations, AI features, no ads, exports & more.</p>
                </div>
                <Link href="/pricing" className="btn-gold">View Plans</Link>
              </div>
            </motion.div>
          )}

          {/* Favorites */}
          <section className="mb-10">
            <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-red-500" /> Favorite Calculators</h2>
            {favCalcs.length === 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">No favorites yet. Click the ♥ icon on any calculator to add it here.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {favCalcs.map((c) => (
                  <Link key={c.id} href={c.href} className="glass-card p-4 hover:shadow-lg transition text-sm font-medium text-gray-900 dark:text-white hover:text-brand-sapphire">
                    {c.title}
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* History */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Clock className="w-5 h-5 text-gray-500" /> Recent Calculations</h2>
              {history.length > 0 && (
                <button onClick={clearHistory} className="text-xs text-red-500 flex items-center gap-1 hover:underline"><Trash2 className="w-3 h-3" /> Clear</button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">No calculations yet. Start using any calculator to see your history here.</p>
            ) : (
              <div className="space-y-2">
                {history.slice(0, 20).map((h) => (
                  <Link key={h.id} href={CALCULATORS.find(c => c.id === h.calculatorId)?.href || '/calculators'} className="glass-card p-4 flex items-center justify-between hover:shadow-lg transition-all">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{h.calculatorTitle}</p>
                      <p className="text-xs text-gray-500">{format(h.timestamp, 'MMM d, yyyy h:mm a')}</p>
                    </div>
                    <div className="text-right max-w-[50%]">
                      <p className="text-sm font-mono text-brand-sapphire truncate">
                        {Object.values(h.result).slice(0, 2).join(' | ')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

