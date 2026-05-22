'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [waist, setWaist] = useState('85');
  const [neck, setNeck] = useState('38');
  const [height, setHeight] = useState('175');
  const [hip, setHip] = useState('95');
  const [result, setResult] = useState<{ bodyFat: number; category: string; leanMass: number; fatMass: number } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const w = parseFloat(waist), n = parseFloat(neck), h = parseFloat(height), hp = parseFloat(hip);
    if (!w || !n || !h) return;

    // US Navy Method
    let bf: number;
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      if (!hp) return;
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }

    bf = Math.round(bf * 10) / 10;
    let category: string;
    if (gender === 'male') {
      if (bf < 6) category = 'Essential Fat';
      else if (bf < 14) category = 'Athletes';
      else if (bf < 18) category = 'Fitness';
      else if (bf < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bf < 14) category = 'Essential Fat';
      else if (bf < 21) category = 'Athletes';
      else if (bf < 25) category = 'Fitness';
      else if (bf < 32) category = 'Average';
      else category = 'Obese';
    }

    const weight = 70; // approximate
    const fatMass = Math.round(weight * bf / 100 * 10) / 10;
    const leanMass = Math.round((weight - fatMass) * 10) / 10;

    setResult({ bodyFat: bf, category, leanMass, fatMass });
    addToHistory({ calculatorId: 'body-fat', calculatorTitle: 'Body Fat Calculator', inputs: { gender, waist: w, neck: n, height: h }, result: { 'Body Fat': `${bf}%`, Category: category } });
  };

  return (
    <CalculatorActions calculatorId="body-fat" result={result ? { 'Body Fat': `${result.bodyFat}%`, Category: result.category } : null} inputs={{ gender, waist, neck, height, hip }}>
      <div className="glass-card p-8">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Using the U.S. Navy Method. Measurements in centimeters.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
            <div className="flex gap-2">
              {(['male', 'female'] as const).map((g) => (
                <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${gender === g ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>{g.charAt(0).toUpperCase() + g.slice(1)}</button>
              ))}
            </div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Waist (cm)</label><input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Neck (cm)</label><input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          {gender === 'female' && (
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hip (cm)</label><input type="number" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          )}
        </div>
        <button onClick={calculate} className="btn-primary w-full text-center">Calculate Body Fat</button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
            <div className="p-6 rounded-xl bg-brand-sapphire/10 mb-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Body Fat Percentage</p>
              <p className="font-display text-5xl font-bold text-brand-sapphire">{result.bodyFat}%</p>
              <p className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-300">{result.category}</p>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

