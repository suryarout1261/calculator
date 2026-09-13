'use client';

import { motion } from 'framer-motion';
import {
  DollarSign, Heart, Calculator, Beaker, Cog, BarChart3,
  Briefcase, Clock, ArrowLeftRight, GraduationCap, Brain, Flame
} from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/store';
import { useI18n } from '@/components/LocaleProvider';
import { format } from '@/lib/i18n';

const categoryIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  finance: { icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
  health: { icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
  math: { icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  science: { icon: Beaker, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  engineering: { icon: Cog, color: 'text-gray-500', bg: 'bg-gray-500/10' },
  'date-time': { icon: Clock, color: 'text-teal-500', bg: 'bg-teal-500/10' },
  education: { icon: GraduationCap, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  conversion: { icon: ArrowLeftRight, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  ai: { icon: Brain, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
};

export function CategoryGrid() {
  const { dict } = useI18n();

  return (
    <section id="categories" className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {dict.categories.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {format(dict.categories.subtitle, { n: CATEGORIES.length })}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => {
            const style = categoryIcons[cat.id] || { icon: Calculator, color: 'text-gray-500', bg: 'bg-gray-500/10' };
            const Icon = style.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={cat.href}
                  className="glass-card p-6 flex flex-col items-center text-center gap-3 hover:scale-[1.03] transition-transform duration-300 group"
                >
                  <div className={`p-3 rounded-xl ${style.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${style.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm">{dict.categoryLabels[cat.id] ?? cat.label}</h3>
                  <span className="text-xs text-gray-500">{cat.count}+ {dict.categories.tools}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
