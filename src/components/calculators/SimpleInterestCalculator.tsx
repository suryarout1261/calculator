'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('8');
  const [time, setTime] = useState('5');
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const P = parseFloat(principal), R = parseFloat(rate), T = parseFloat(time);
    if (!P || !R || !T) return;
    const interest = (P * R * T) / 100;
    setResult({ interest: Math.round(interest), total: Math.round(P + interest) });
    addToHistory({ calculatorId: 'simple-interest', calculatorTitle: 'Simple Interest Calculator', inputs: { principal: P, rate: R, time: T }, result: { Interest: `₹${Math.round(interest)}`, Total: `₹${Math.round(P + interest)}` } });
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

  return (
    <CalculatorActions calculatorId="simple-interest" result={result ? { Interest: `₹${fmt(result.interest)}`, Total: `₹${fmt(result.total)}` } : null} inputs={{ principal, rate, time }}>
      <div className="glass-card p-8">
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Principal (₹)</label><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rate (%/year)</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.5" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time (years)</label><input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
        </div>
        <button onClick={calculate} className="btn-primary w-full text-center">Calculate</button>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-brand-gold/10 text-center"><p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Interest Earned</p><p className="font-display text-2xl font-bold text-brand-gold">₹{fmt(result.interest)}</p></div>
            <div className="p-5 rounded-xl bg-brand-sapphire/10 text-center"><p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Amount</p><p className="font-display text-2xl font-bold text-brand-sapphire">₹{fmt(result.total)}</p></div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

