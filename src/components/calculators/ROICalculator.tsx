'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function ROICalculator() {
  const { locale, dict } = useI18n();

  const [invested, setInvested] = useState('100000');
  const [returned, setReturned] = useState('150000');
  const [yearsHeld, setYearsHeld] = useState('3');
  const [result, setResult] = useState<{ roi: number; gain: number; annualized: number } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const inv = parseFloat(invested);
    const ret = parseFloat(returned);
    const y = parseFloat(yearsHeld);
    if (!inv || !ret) return;

    const gain = ret - inv;
    const roi = (gain / inv) * 100;
    const annualized = y > 0 ? (Math.pow(ret / inv, 1 / y) - 1) * 100 : roi;

    const res = { roi: Math.round(roi * 100) / 100, gain: Math.round(gain), annualized: Math.round(annualized * 100) / 100 };
    setResult(res);
    addToHistory({ calculatorId: 'roi', calculatorTitle: 'ROI Calculator', inputs: { invested: inv, returned: ret, years: y }, result: { ROI: `${res.roi}%`, Gain: `₹${new Intl.NumberFormat('en-IN').format(res.gain)}` } });
  };

  const chartData = result ? [
    { name: 'Invested', amount: parseFloat(invested) },
    { name: 'Returned', amount: parseFloat(returned) },
    { name: 'Gain', amount: result.gain },
  ] : [];

  return (
    <CalculatorActions calculatorId="roi" result={result ? { ROI: `${result.roi}%`, Gain: `₹${result.gain}`, Annualized: `${result.annualized}%` } : null} inputs={{ invested, returned, yearsHeld }}>
      <div className="glass-card p-8">
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount Invested (₹)</label>
            <input type="number" value={invested} onChange={(e) => setInvested(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount Returned (₹)</label>
            <input type="number" value={returned} onChange={(e) => setReturned(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Years Held</label>
            <input type="number" value={yearsHeld} onChange={(e) => setYearsHeld(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
        </div>
        <motion.button
          onClick={calculate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full text-center"
        >Calculate ROI</motion.button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-green-500/10 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total ROI</p>
                <p className={`font-display text-2xl font-bold ${result.roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>{result.roi}%</p>
              </div>
              <div className="p-4 rounded-xl bg-brand-sapphire/10 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Net Gain/Loss</p>
                <p className={`font-display text-2xl font-bold ${result.gain >= 0 ? 'text-brand-sapphire' : 'text-red-500'}`}>₹{new Intl.NumberFormat('en-IN').format(result.gain)}</p>
              </div>
              <div className="p-4 rounded-xl bg-brand-gold/10 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Annualized ROI</p>
                <p className="font-display text-2xl font-bold text-brand-gold">{result.annualized}%</p>
              </div>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#0F52BA" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

