'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function BMRCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [formula, setFormula] = useState<'mifflin' | 'harris'>('mifflin');
  const [result, setResult] = useState<{ bmr: number; sedentary: number; light: number; moderate: number; active: number } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age);
    if (!w || !h || !a) return;

    let bmr: number;
    if (formula === 'mifflin') {
      bmr = gender === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    } else {
      bmr = gender === 'male' ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * a : 447.593 + 9.247 * w + 3.098 * h - 4.330 * a;
    }

    bmr = Math.round(bmr);
    setResult({ bmr, sedentary: Math.round(bmr * 1.2), light: Math.round(bmr * 1.375), moderate: Math.round(bmr * 1.55), active: Math.round(bmr * 1.725) });
    addToHistory({ calculatorId: 'bmr', calculatorTitle: 'BMR Calculator', inputs: { gender, age: a, weight: w, height: h, formula }, result: { BMR: `${bmr} cal/day` } });
  };

  return (
    <CalculatorActions calculatorId="bmr" result={result ? { BMR: `${result.bmr} cal/day` } : null} inputs={{ gender, age, weight, height }}>
      <div className="glass-card p-8">
        <div className="flex gap-2 mb-4">
          {(['mifflin', 'harris'] as const).map((f) => (
            <button key={f} onClick={() => setFormula(f)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${formula === f ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
              {f === 'mifflin' ? 'Mifflin-St Jeor' : 'Harris-Benedict'}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
            <div className="flex gap-2">
              {(['male', 'female'] as const).map((g) => (
                <button key={g} onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${gender === g ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
        </div>
        <button onClick={calculate} className="btn-primary w-full text-center">Calculate BMR</button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="p-6 rounded-xl bg-brand-sapphire/10 text-center mb-6">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Your Basal Metabolic Rate</p>
              <p className="font-display text-4xl font-bold text-brand-sapphire">{result.bmr}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">calories/day</p>
            </div>
            <h4 className="font-semibold text-sm mb-3 text-gray-700 dark:text-gray-300">Daily Calories by Activity Level:</h4>
            <div className="space-y-2">
              {[
                { label: 'Sedentary (office job)', value: result.sedentary },
                { label: 'Lightly Active (1-3 days)', value: result.light },
                { label: 'Moderately Active (3-5 days)', value: result.moderate },
                { label: 'Very Active (6-7 days)', value: result.active },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{row.label}</span>
                  <span className="font-mono font-bold text-sm text-gray-900 dark:text-white">{row.value} cal</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

