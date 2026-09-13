'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useAppStore } from '@/lib/store';

export function TDEECalculator() {
  const { locale, dict } = useI18n();

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<{ tdee: number; cut: number; maintain: number; bulk: number } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age), af = parseFloat(activity);
    if (!w || !h || !a) return;
    const bmr = gender === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = Math.round(bmr * af);
    setResult({ tdee, cut: tdee - 500, maintain: tdee, bulk: tdee + 500 });
    addToHistory({ calculatorId: 'tdee', calculatorTitle: 'TDEE Calculator', inputs: { gender, age: a, weight: w, height: h, activity: af }, result: { TDEE: `${tdee} cal/day` } });
  };

  return (
    <CalculatorActions calculatorId="tdee" result={result ? { TDEE: `${result.tdee} cal/day` } : null} inputs={{ gender, age, weight, height, activity }}>
      <div className="glass-card p-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
            <div className="flex gap-2">
              {(['male', 'female'] as const).map((g) => (
                <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${gender === g ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>{g.charAt(0).toUpperCase() + g.slice(1)}</button>
              ))}
            </div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" /></div>
          <div className="sm:col-span-2">
            <SegmentedControl label="Activity Level" value={activity} onChange={(v) => setActivity(v)} options={[{value:'1.2',label:'Sedentary'},{value:'1.375',label:'Light'},{value:'1.55',label:'Mod'},{value:'1.725',label:'Active'},{value:'1.9',label:'Extra'}]} />
          </div>
        </div>
        <motion.button
          onClick={calculate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full text-center"
        >Calculate TDEE</motion.button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-green-500/10 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Cut (Lose Fat)</p>
              <p className="font-display text-2xl font-bold text-green-600">{result.cut}</p>
              <p className="text-xs text-gray-500">cal/day</p>
            </div>
            <div className="p-5 rounded-xl bg-brand-sapphire/10 text-center border-2 border-brand-sapphire/30">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Maintain</p>
              <p className="font-display text-2xl font-bold text-brand-sapphire">{result.maintain}</p>
              <p className="text-xs text-gray-500">cal/day (TDEE)</p>
            </div>
            <div className="p-5 rounded-xl bg-brand-gold/10 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Bulk (Gain Muscle)</p>
              <p className="font-display text-2xl font-bold text-brand-gold">{result.bulk}</p>
              <p className="text-xs text-gray-500">cal/day</p>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

