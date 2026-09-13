'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function AgeCalculator() {
  const { locale, dict } = useI18n();

  const [dob, setDob] = useState('');
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    setResult({ years, months, days, totalDays });
  };

  return (
    <div className="glass-card p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
      </div>
      <motion.button
        onClick={calculate}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full text-center"
      >Calculate Age</motion.button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-brand-sapphire/10 text-center">
            <p className="font-display text-3xl font-bold text-brand-sapphire">{result.years}</p>
            <p className="text-xs text-gray-500">Years</p>
          </div>
          <div className="p-4 rounded-xl bg-brand-gold/10 text-center">
            <p className="font-display text-3xl font-bold text-brand-gold">{result.months}</p>
            <p className="text-xs text-gray-500">Months</p>
          </div>
          <div className="p-4 rounded-xl bg-brand-indigo/10 text-center">
            <p className="font-display text-3xl font-bold text-brand-indigo">{result.days}</p>
            <p className="text-xs text-gray-500">Days</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-center">
            <p className="font-display text-3xl font-bold">{result.totalDays.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Days</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

