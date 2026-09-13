'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';
import { ModernInput } from '@/components/ui/ModernInput';
import { FreeBanner } from '@/components/ui/FreeBanner';

export function EMICalculator() {
  const { locale, dict } = useI18n();

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
    { name: 'Principal', value: parseFloat(principal), fill: '#0F52BA' },
    { name: 'Interest', value: result.totalInterest, fill: '#C47A2C' },
  ] : [];

  return (
    <CalculatorActions
      calculatorId="emi"
      result={result ? { 'Monthly EMI': `₹${fmt(result.emi)}`, 'Total Interest': `₹${fmt(result.totalInterest)}`, 'Total Amount': `₹${fmt(result.totalAmount)}` } : null}
      inputs={{ principal, rate, tenure }}
    >
      <FreeBanner />

      <div className="glass-card p-8">
        {/* SEO-friendly intro */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Calculate Your EMI Instantly
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your loan amount, interest rate, and tenure to calculate your Equated Monthly Installment (EMI).
            Get instant results with detailed breakdowns of principal and interest components.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <ModernInput
            label="Loan Amount"
            value={principal}
            onChange={setPrincipal}
            type="number"
            prefix="₹"
            showRange
            rangeMin={100000}
            rangeMax={50000000}
            rangeStep={100000}
            helpText="Enter the total loan amount you wish to borrow"
          />

          <ModernInput
            label="Interest Rate (per annum)"
            value={rate}
            onChange={setRate}
            type="number"
            suffix="%"
            showRange
            rangeMin={1}
            rangeMax={30}
            rangeStep={0.1}
            helpText="Annual interest rate charged by the lender"
          />

          <ModernInput
            label="Loan Tenure"
            value={tenure}
            onChange={setTenure}
            type="number"
            suffix="years"
            showRange
            rangeMin={1}
            rangeMax={30}
            rangeStep={1}
            helpText="Duration of the loan repayment period"
          />
        </div>

        <motion.button
          onClick={calculate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full text-center text-lg font-semibold shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #0F52BA 0%, #1F1F4D 100%)',
            borderRadius: '0.75rem',
            color: '#fff',
            padding: '0.875rem 1.5rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px -5px rgba(15, 82, 186, 0.4)',
          }}
        >
          Calculate EMI
        </motion.button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            {/* Results Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-brand-sapphire to-blue-600 text-white text-center"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                <p className="text-xs uppercase tracking-wider opacity-90 mb-2 relative z-10">Monthly EMI</p>
                <p className="font-display text-3xl font-bold relative z-10">₹{fmt(result.emi)}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-brand-gold to-amber-600 text-white text-center"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                <p className="text-xs uppercase tracking-wider opacity-90 mb-2 relative z-10">Total Interest</p>
                <p className="font-display text-3xl font-bold relative z-10">₹{fmt(result.totalInterest)}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-brand-indigo to-purple-600 text-white text-center"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                <p className="text-xs uppercase tracking-wider opacity-90 mb-2 relative z-10">Total Amount</p>
                <p className="font-display text-3xl font-bold relative z-10">₹{fmt(result.totalAmount)}</p>
              </motion.div>
            </div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Principal vs Interest Breakdown
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => typeof value === 'number' ? `₹${fmt(value)}` : ''} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* SEO-friendly explanation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Understanding Your EMI
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Your monthly EMI of ₹{fmt(result.emi)} includes both principal repayment and interest charges.
                Over {tenure} years, you'll pay a total of ₹{fmt(result.totalAmount)}, which includes
                ₹{fmt(result.totalInterest)} in interest charges. The EMI amount remains constant throughout
                the loan tenure, making budgeting easier.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}
