'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);
  const { addToHistory } = useAppStore();

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;

    let bmi: number;
    if (unit === 'metric') {
      bmi = w / ((h / 100) ** 2);
    } else {
      bmi = (w / (h ** 2)) * 703;
    }

    let category: string;
    let color: string;
    if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-500'; }
    else if (bmi < 25) { category = 'Normal Weight'; color = 'text-green-500'; }
    else if (bmi < 30) { category = 'Overweight'; color = 'text-yellow-500'; }
    else { category = 'Obese'; color = 'text-red-500'; }

    const bmiRounded = Math.round(bmi * 10) / 10;
    setResult({ bmi: bmiRounded, category, color });

    addToHistory({
      calculatorId: 'bmi',
      calculatorTitle: 'BMI Calculator',
      inputs: { weight: w, height: h, unit },
      result: { bmi: bmiRounded, category },
    });
  };

  return (
    <CalculatorActions
      calculatorId="bmi"
      result={result ? { bmi: result.bmi, category: result.category } : null}
      inputs={{ weight, height, unit }}
    >
      <div className="glass-card p-8">
        {/* Unit Toggle */}
        <div className="flex gap-2 mb-6">
          {(['metric', 'imperial'] as const).map((u) => (
            <button
              key={u}
              onClick={() => { setUnit(u); setResult(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${unit === u ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
            >
              {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lbs/in)'}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? '70' : '154'}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === 'metric' ? '175' : '69'}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
            />
          </div>
        </div>

        <button onClick={calculate} className="btn-primary w-full text-center">
          Calculate BMI
        </button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-xl bg-gray-50 dark:bg-gray-800 text-center"
          >
            <p className="text-sm text-gray-500 mb-1">Your BMI</p>
            <p className={`font-display text-5xl font-bold ${result.color}`}>{result.bmi}</p>
            <p className={`font-semibold mt-2 ${result.color}`}>{result.category}</p>

            {/* Visual scale */}
            <div className="mt-6 h-3 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-black rounded-full shadow"
                style={{ left: `${Math.min(Math.max((result.bmi - 15) / 25 * 100, 0), 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}
