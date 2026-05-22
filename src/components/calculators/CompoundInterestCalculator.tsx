'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('8');
  const [years, setYears] = useState('10');
  const [compound, setCompound] = useState('12');
  const [result, setResult] = useState<{ total: number; interest: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = parseFloat(compound);
    if (!P || !r || !t || !n) return;

    const total = P * Math.pow(1 + r / n, n * t);
    setResult({ total: Math.round(total), interest: Math.round(total - P) });
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

  return (
    <div className="glass-card p-8">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Principal Amount (₹)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Annual Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.5"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Time (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Compounding Frequency</label>
          <select value={compound} onChange={(e) => setCompound(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50">
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      <button onClick={calculate} className="btn-primary w-full text-center">Calculate</button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-green-500/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Total Amount</p>
            <p className="font-display text-2xl font-bold text-green-600">₹{fmt(result.total)}</p>
          </div>
          <div className="p-5 rounded-xl bg-brand-gold/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Total Interest Earned</p>
            <p className="font-display text-2xl font-bold text-brand-gold">₹{fmt(result.interest)}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

