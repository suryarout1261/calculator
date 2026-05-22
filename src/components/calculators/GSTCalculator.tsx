'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function GSTCalculator() {
  const [amount, setAmount] = useState('10000');
  const [gstRate, setGstRate] = useState('18');
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [result, setResult] = useState<{ gstAmount: number; totalAmount: number; originalAmount: number } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const amt = parseFloat(amount);
    const r = parseFloat(gstRate);
    if (!amt || !r) return;

    let gstAmount: number, totalAmount: number, originalAmount: number;
    if (mode === 'exclusive') {
      gstAmount = amt * (r / 100);
      totalAmount = amt + gstAmount;
      originalAmount = amt;
    } else {
      originalAmount = amt / (1 + r / 100);
      gstAmount = amt - originalAmount;
      totalAmount = amt;
    }

    const res = { gstAmount: Math.round(gstAmount * 100) / 100, totalAmount: Math.round(totalAmount * 100) / 100, originalAmount: Math.round(originalAmount * 100) / 100 };
    setResult(res);
    addToHistory({ calculatorId: 'gst', calculatorTitle: 'GST Calculator', inputs: { amount: amt, gstRate: r, mode }, result: { 'GST Amount': `₹${res.gstAmount}`, Total: `₹${res.totalAmount}` } });
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(n);

  return (
    <CalculatorActions calculatorId="gst" result={result ? { 'GST Amount': `₹${fmt(result.gstAmount)}`, Total: `₹${fmt(result.totalAmount)}` } : null} inputs={{ amount, gstRate, mode }}>
      <div className="glass-card p-8">
        <div className="flex gap-2 mb-6">
          {(['exclusive', 'inclusive'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${mode === m ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
              GST {m === 'exclusive' ? 'Exclusive' : 'Inclusive'}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'exclusive' ? 'Amount (before GST)' : 'Amount (with GST)'}</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GST Rate (%)</label>
            <select value={gstRate} onChange={(e) => setGstRate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50">
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
        </div>
        <button onClick={calculate} className="btn-primary w-full text-center">Calculate GST</button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Original Amount</p>
              <p className="font-display text-xl font-bold text-gray-900 dark:text-white">₹{fmt(result.originalAmount)}</p>
            </div>
            <div className="p-4 rounded-xl bg-brand-gold/10 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">GST ({gstRate}%)</p>
              <p className="font-display text-xl font-bold text-brand-gold">₹{fmt(result.gstAmount)}</p>
            </div>
            <div className="p-4 rounded-xl bg-brand-sapphire/10 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
              <p className="font-display text-xl font-bold text-brand-sapphire">₹{fmt(result.totalAmount)}</p>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

