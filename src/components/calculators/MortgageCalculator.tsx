'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function MortgageCalculator() {
  const [principal, setPrincipal] = useState('5000000');
  const [rate, setRate] = useState('7.5');
  const [years, setYears] = useState('20');
  const [downPayment, setDownPayment] = useState('1000000');
  const [result, setResult] = useState<{ monthly: number; totalInterest: number; totalAmount: number; loanAmount: number } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const price = parseFloat(principal);
    const dp = parseFloat(downPayment);
    const annualRate = parseFloat(rate);
    const y = parseFloat(years);
    if (!price || !annualRate || !y) return;

    const P = price - (dp || 0);
    const R = annualRate / 12 / 100;
    const N = y * 12;
    const monthly = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = monthly * N;
    const totalInterest = totalAmount - P;

    const res = { monthly: Math.round(monthly), totalInterest: Math.round(totalInterest), totalAmount: Math.round(totalAmount), loanAmount: Math.round(P) };
    setResult(res);
    addToHistory({ calculatorId: 'mortgage', calculatorTitle: 'Mortgage Calculator', inputs: { price, downPayment: dp, rate: annualRate, years: y }, result: { 'Monthly Payment': `₹${fmt(res.monthly)}`, 'Total Interest': `₹${fmt(res.totalInterest)}` } });
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);
  const chartData = result ? [{ name: 'Principal', value: result.loanAmount }, { name: 'Interest', value: result.totalInterest }] : [];

  return (
    <CalculatorActions calculatorId="mortgage" result={result ? { 'Monthly Payment': `₹${fmt(result.monthly)}`, 'Total Interest': `₹${fmt(result.totalInterest)}` } : null} inputs={{ principal, rate, years, downPayment }}>
      <div className="glass-card p-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Property Price (₹)</label>
            <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Down Payment (₹)</label>
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loan Tenure (Years)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
        </div>
        <button onClick={calculate} className="btn-primary w-full text-center">Calculate Mortgage</button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-brand-sapphire/10 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Monthly Payment</p>
                <p className="font-display text-xl font-bold text-brand-sapphire">₹{fmt(result.monthly)}</p>
              </div>
              <div className="p-4 rounded-xl bg-brand-gold/10 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Interest</p>
                <p className="font-display text-xl font-bold text-brand-gold">₹{fmt(result.totalInterest)}</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Loan Amount</p>
                <p className="font-display text-xl font-bold text-green-600">₹{fmt(result.loanAmount)}</p>
              </div>
              <div className="p-4 rounded-xl bg-brand-indigo/10 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Cost</p>
                <p className="font-display text-xl font-bold text-brand-indigo">₹{fmt(result.totalAmount)}</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    <Cell fill="#0F52BA" /><Cell fill="#C47A2C" />
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

