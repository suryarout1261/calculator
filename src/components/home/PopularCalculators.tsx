'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import { CALCULATORS, useAppStore } from '@/lib/store';
import { useI18n } from '@/components/LocaleProvider';

const popularIds = ['emi', 'bmi', 'age', 'percentage', 'sip', 'compound-interest', 'scientific', 'gpa'];
const calculators = CALCULATORS.filter((c) => popularIds.includes(c.id));

export function PopularCalculators() {
  const { toggleFavorite, favorites } = useAppStore();
  const { dict } = useI18n();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl font-bold mb-2">{dict.popular.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{dict.popular.subtitle}</p>
          </div>
          <Link href="/calculators" className="hidden sm:flex items-center gap-1 text-brand-sapphire font-medium text-sm hover:underline">
            {dict.popular.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {calculators.map((calc, i) => (
            <motion.div
              key={calc.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={calc.href} className="glass-card p-5 block group hover:shadow-xl transition-all duration-300 relative">
                <button
                  onClick={(e) => { e.preventDefault(); toggleFavorite(calc.id); }}
                  className="absolute top-3 right-3 p-1"
                >
                  <Heart className={`w-4 h-4 transition ${favorites.includes(calc.id) ? 'text-red-500 fill-red-500' : 'text-gray-300 hover:text-red-400'}`} />
                </button>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold">{calc.category}</span>
                <h3 className="font-semibold mt-2 mb-1 group-hover:text-brand-sapphire transition-colors">{calc.title}</h3>
                <p className="text-sm text-gray-500">{calc.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
