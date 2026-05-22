'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Smartphone, Target, Globe } from 'lucide-react';

const stats = [
  { icon: Zap, label: 'Instant Results', value: '<50ms' },
  { icon: Target, label: 'Scientific Precision', value: '15+ decimals' },
  { icon: Smartphone, label: 'Mobile Optimized', value: '100% responsive' },
  { icon: Shield, label: 'Secure & Private', value: 'No data stored' },
  { icon: Globe, label: 'Global Users', value: '190+ countries' },
];

export function TrustSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Built for Performance & Trust</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enterprise-grade infrastructure delivering instant, accurate calculations worldwide.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6"
            >
              <s.icon className="w-8 h-8 text-brand-sapphire mx-auto mb-3" />
              <p className="font-display font-bold text-xl mb-1">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

