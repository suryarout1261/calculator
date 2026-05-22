'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function CalorieCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('25');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<{ maintain: number; lose: number; gain: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age), af = parseFloat(activity);
    if (!w || !h || !a) return;

    // Mifflin-St Jeor
    let bmr: number;
    if (gender === 'male') bmr = 10 * w + 6.25 * h - 5 * a + 5;
    else bmr = 10 * w + 6.25 * h - 5 * a - 161;

    const maintain = Math.round(bmr * af);
    setResult({ maintain, lose: maintain - 500, gain: maintain + 500 });
  };

  return (
    <div className="glass-card p-8">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <div className="flex gap-2">
            {(['male', 'female'] as const).map((g) => (
              <button key={g} onClick={() => setGender(g)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${gender === g ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-white/5'}`}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-2">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50">
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (1-3 days/week)</option>
            <option value="1.55">Moderately active (3-5 days/week)</option>
            <option value="1.725">Very active (6-7 days/week)</option>
            <option value="1.9">Extra active (very hard exercise)</option>
          </select>
        </div>
      </div>

      <button onClick={calculate} className="btn-primary w-full text-center">Calculate Calories</button>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-center">
            <p className="text-xs text-gray-500 mb-1">Maintain Weight</p>
            <p className="font-display text-2xl font-bold">{result.maintain}</p>
            <p className="text-xs text-gray-400">cal/day</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Lose Weight</p>
            <p className="font-display text-2xl font-bold text-green-600">{result.lose}</p>
            <p className="text-xs text-gray-400">cal/day</p>
          </div>
          <div className="p-4 rounded-xl bg-brand-gold/10 text-center">
            <p className="text-xs text-gray-500 mb-1">Gain Weight</p>
            <p className="font-display text-2xl font-bold text-brand-gold">{result.gain}</p>
            <p className="text-xs text-gray-400">cal/day</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

