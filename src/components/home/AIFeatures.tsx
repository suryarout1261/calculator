'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, TrendingUp, Dumbbell, BookOpen } from 'lucide-react';
import { useI18n } from '@/components/LocaleProvider';

const features = [
  { icon: Brain, title: 'AI Equation Solving', desc: 'Type any equation and get step-by-step solutions powered by AI.' },
  { icon: Sparkles, title: 'AI Formula Explanation', desc: 'Understand any formula with intelligent plain-language breakdowns.' },
  { icon: TrendingUp, title: 'AI Financial Insights', desc: 'Get personalized investment and loan recommendations.' },
  { icon: Dumbbell, title: 'AI Fitness Recommendations', desc: 'Custom workout and nutrition plans based on your metrics.' },
  { icon: BookOpen, title: 'AI Learning Assistant', desc: 'Interactive math tutoring and concept explanations.' },
];

export function AIFeatures() {
  const { dict } = useI18n();

  return (
    <section className="py-24 bg-gradient-to-br from-brand-indigo to-brand-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/20 text-brand-gold text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> {dict.ai.badge}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {dict.ai.title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {dict.ai.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <f.icon className="w-8 h-8 text-brand-gold mb-4" />
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

