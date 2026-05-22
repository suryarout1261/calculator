'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function EMICalculator() {
  const [principal, setPrincipal] = useState('1000000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [result, setResult] = useState<{ emi: number; totalInterest: number; totalAmount: number } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const years = parseFloat(tenure);
    if (!P || !annualRate || !years) return;

    const R = annualRate / 12 / 100;
    const N = years * 12;
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    const res = { emi: Math.round(emi), totalInterest: Math.round(totalInterest), totalAmount: Math.round(totalAmount) };
    setResult(res);

    addToHistory({
      calculatorId: 'emi',
      calculatorTitle: 'EMI Calculator',
      inputs: { principal: P, rate: annualRate, tenure: years },
      result: { 'Monthly EMI': `₹${fmt(res.emi)}`, 'Total Interest': `₹${fmt(res.totalInterest)}` },
    });
  };

  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);

  const chartData = result ? [
    { name: 'Principal', value: parseFloat(principal) },
    { name: 'Interest', value: result.totalInterest },
  ] : [];

  return (
    <CalculatorActions
      calculatorId="emi"
      result={result ? { 'Monthly EMI': `₹${fmt(result.emi)}`, 'Total Interest': `₹${fmt(result.totalInterest)}`, 'Total Amount': `₹${fmt(result.totalAmount)}` } : null}
      inputs={{ principal, rate, tenure }}
    >
      <div className="glass-card p-8">
        <div className="space-y-6 mb-6">
          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Loan Amount (₹)</span><span className="text-brand-sapphire">₹{fmt(parseFloat(principal) || 0)}</span>
            </label>
            <input type="range" min="100000" max="50000000" step="100000" value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full accent-brand-sapphire" />
            <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Interest Rate (%)</span><span className="text-brand-sapphire">{rate}%</span>
            </label>
            <input type="range" min="1" max="30" step="0.1" value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full accent-brand-sapphire" />
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Loan Tenure (Years)</span><span className="text-brand-sapphire">{tenure} yrs</span>
            </label>
            <input type="range" min="1" max="30" step="1" value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full accent-brand-sapphire" />
            <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
        </div>

        <button onClick={calculate} className="btn-primary w-full text-center">Calculate EMI</button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-brand-sapphire/10 text-center">
                <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
                <p className="font-display text-2xl font-bold text-brand-sapphire">₹{fmt(result.emi)}</p>
              </div>
              <div className="p-4 rounded-xl bg-brand-gold/10 text-center">
                <p className="text-xs text-gray-500 mb-1">Total Interest</p>
                <p className="font-display text-2xl font-bold text-brand-gold">₹{fmt(result.totalInterest)}</p>
              </div>
              <div className="p-4 rounded-xl bg-brand-indigo/10 text-center">
                <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                <p className="font-display text-2xl font-bold text-brand-indigo">₹{fmt(result.totalAmount)}</p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    <Cell fill="#0F52BA" />
                    <Cell fill="#C47A2C" />
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

