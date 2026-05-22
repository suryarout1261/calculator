'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function SIPCalculator() {
  const [monthly, setMonthly] = useState('10000');
  const [rate, setRate] = useState('12');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<{ invested: number; returns: number; total: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(monthly);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(years) * 12;
    if (!P || !r || !n) return;

    const total = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = P * n;
    setResult({ invested: Math.round(invested), returns: Math.round(total - invested), total: Math.round(total) });
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

  return (
    <div className="glass-card p-8">
      <div className="space-y-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Monthly Investment (₹)</label>
          <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Expected Return Rate (% p.a.)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.5"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Time Period (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
      </div>

      <button onClick={calculate} className="btn-primary w-full text-center">Calculate Returns</button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-center">
            <p className="text-xs text-gray-500 mb-1">Invested</p>
            <p className="font-display text-xl font-bold">₹{fmt(result.invested)}</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Est. Returns</p>
            <p className="font-display text-xl font-bold text-green-600">₹{fmt(result.returns)}</p>
          </div>
          <div className="p-4 rounded-xl bg-brand-sapphire/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Total Value</p>
            <p className="font-display text-xl font-bold text-brand-sapphire">₹{fmt(result.total)}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

