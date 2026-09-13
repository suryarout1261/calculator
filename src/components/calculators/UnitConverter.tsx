'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { CalculatorActions } from './CalculatorActions';

const units: Record<string, { label: string; conversions: Record<string, number> }> = {
  length: { label: 'Length', conversions: { meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 } },
  weight: { label: 'Weight', conversions: { kilogram: 1, gram: 1000, milligram: 1000000, pound: 2.20462, ounce: 35.274, ton: 0.001 } },
  temperature: { label: 'Temperature', conversions: { celsius: 1, fahrenheit: 1, kelvin: 1 } },
};

export function UnitConverter() {
  const { locale, dict } = useI18n();

  const [category, setCategory] = useState('length');
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;

    if (category === 'temperature') {
      let res: number;
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') res = v * 9 / 5 + 32;
      else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') res = (v - 32) * 5 / 9;
      else if (fromUnit === 'celsius' && toUnit === 'kelvin') res = v + 273.15;
      else if (fromUnit === 'kelvin' && toUnit === 'celsius') res = v - 273.15;
      else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') res = (v - 32) * 5 / 9 + 273.15;
      else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') res = (v - 273.15) * 9 / 5 + 32;
      else res = v;
      setResult(String(Math.round(res * 10000) / 10000));
    } else {
      const convs = units[category].conversions;
      const baseValue = v / convs[fromUnit];
      const converted = baseValue * convs[toUnit];
      setResult(String(Math.round(converted * 10000) / 10000));
    }
  };

  const unitList = Object.keys(units[category].conversions);

  return (
    <CalculatorActions calculatorId="unit-converter" result={result ? { Result: `${result} ${toUnit}` } : null} inputs={{ value, fromUnit, toUnit }}>
      <div className="glass-card p-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {Object.entries(units).map(([k, u]) => (
            <button key={k} onClick={() => { setCategory(k); setFromUnit(Object.keys(u.conversions)[0]); setToUnit(Object.keys(u.conversions)[1]); setResult(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${category === k ? 'bg-brand-sapphire text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
              {u.label}
            </button>
          ))}
        </div>
        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase mb-2">Value</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase mb-2">From</label>
            <div className="overflow-x-auto w-full">
              <SegmentedControl options={unitList.map(u => ({value: u, label: u}))} value={fromUnit} onChange={(v) => setFromUnit(v)} size="md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase mb-2">To</label>
            <div className="overflow-x-auto w-full">
              <SegmentedControl options={unitList.map(u => ({value: u, label: u}))} value={toUnit} onChange={(v) => setToUnit(v)} size="md" />
            </div>
          </div>
        </div>
        <motion.button
          onClick={convert}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full text-center"
        >Convert</motion.button>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-xl bg-brand-sapphire/10 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{value} {fromUnit} =</p>
            <p className="font-display text-4xl font-bold text-brand-sapphire">{result}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{toUnit}</p>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

