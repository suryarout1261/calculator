'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function LoanCalculator() {
  const [amount, setAmount] = useState('500000');
  const [rate, setRate] = useState('10');
  const [years, setYears] = useState('5');
  const [result, setResult] = useState<{ monthly: number; totalInterest: number; total: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(amount), r = parseFloat(rate) / 12 / 100, n = parseFloat(years) * 12;
    if (!P || !r || !n) return;
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    setResult({ monthly: Math.round(monthly), totalInterest: Math.round(total - P), total: Math.round(total) });
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

  return (
    <div className="glass-card p-8">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Loan Amount (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tenure (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
      </div>
      <button onClick={calculate} className="btn-primary w-full text-center">Calculate</button>
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-brand-sapphire/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Monthly Payment</p>
            <p className="font-display text-xl font-bold text-brand-sapphire">₹{fmt(result.monthly)}</p>
          </div>
          <div className="p-4 rounded-xl bg-brand-gold/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Total Interest</p>
            <p className="font-display text-xl font-bold text-brand-gold">₹{fmt(result.totalInterest)}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-center">
            <p className="text-xs text-gray-500 mb-1">Total Amount</p>
            <p className="font-display text-xl font-bold">₹{fmt(result.total)}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

