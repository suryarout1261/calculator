'use client';

import { useI18n } from '@/components/LocaleProvider';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { ArrowRightLeft, Sparkles } from 'lucide-react';

interface UnitCategoryConfig {
  label: string;
  defaultFrom: string;
  defaultTo: string;
  conversions: Record<string, number>;
  unitLabels?: Record<string, string>;
}

const units: Record<string, UnitCategoryConfig> = {
  weight: {
    label: 'Weight',
    defaultFrom: 'kilogram',
    defaultTo: 'lbs',
    conversions: {
      kilogram: 1,
      lbs: 2.20462262,
      pound: 2.20462262,
      gram: 1000,
      milligram: 1000000,
      ounce: 35.27396,
      ton: 0.001,
      stone: 0.157473,
    },
    unitLabels: {
      kilogram: 'Kilogram (kg)',
      lbs: 'Pounds (lbs)',
      pound: 'Pound (lb)',
      gram: 'Gram (g)',
      milligram: 'Milligram (mg)',
      ounce: 'Ounce (oz)',
      ton: 'Metric Ton (t)',
      stone: 'Stone (st)',
    },
  },
  length: {
    label: 'Length',
    defaultFrom: 'meter',
    defaultTo: 'foot',
    conversions: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      mile: 0.000621371,
      yard: 1.09361,
      foot: 3.28084,
      inch: 39.3701,
    },
    unitLabels: {
      meter: 'Meter (m)',
      kilometer: 'Kilometer (km)',
      centimeter: 'Centimeter (cm)',
      millimeter: 'Millimeter (mm)',
      mile: 'Mile (mi)',
      yard: 'Yard (yd)',
      foot: 'Feet (ft)',
      inch: 'Inch (in)',
    },
  },
  temperature: {
    label: 'Temperature',
    defaultFrom: 'celsius',
    defaultTo: 'fahrenheit',
    conversions: {
      celsius: 1,
      fahrenheit: 1,
      kelvin: 1,
    },
    unitLabels: {
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      kelvin: 'Kelvin (K)',
    },
  },
};

export function UnitConverter({ slug, initialCategory }: { slug?: string; initialCategory?: string }) {
  const { locale } = useI18n();

  const getInitialCategory = () => {
    if (initialCategory && units[initialCategory]) return initialCategory;
    if (slug === 'weight-converter') return 'weight';
    if (slug === 'temperature-converter') return 'temperature';
    if (slug === 'length-converter') return 'length';
    return 'weight';
  };

  const initialCat = getInitialCategory();
  const [category, setCategory] = useState(initialCat);
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(units[initialCat].defaultFrom);
  const [toUnit, setToUnit] = useState(units[initialCat].defaultTo);
  const [result, setResult] = useState<string | null>(null);

  // Sync category if slug changes
  useEffect(() => {
    const cat = getInitialCategory();
    setCategory(cat);
    setFromUnit(units[cat].defaultFrom);
    setToUnit(units[cat].defaultTo);
  }, [slug, initialCategory]);

  const calculateConversion = useCallback((val: string, from: string, to: string, cat: string) => {
    const v = parseFloat(val);
    if (isNaN(v)) return null;

    if (cat === 'temperature') {
      let res: number;
      if (from === 'celsius' && to === 'fahrenheit') res = (v * 9) / 5 + 32;
      else if (from === 'fahrenheit' && to === 'celsius') res = ((v - 32) * 5) / 9;
      else if (from === 'celsius' && to === 'kelvin') res = v + 273.15;
      else if (from === 'kelvin' && to === 'celsius') res = v - 273.15;
      else if (from === 'fahrenheit' && to === 'kelvin') res = ((v - 32) * 5) / 9 + 273.15;
      else if (from === 'kelvin' && to === 'fahrenheit') res = ((v - 273.15) * 9) / 5 + 32;
      else res = v;
      return String(parseFloat(res.toFixed(4)));
    } else {
      const convs = units[cat].conversions;
      if (!convs[from] || !convs[to]) return null;
      const baseValue = v / convs[from];
      const converted = baseValue * convs[to];
      return String(parseFloat(converted.toFixed(6)));
    }
  }, []);

  // Live conversion update
  useEffect(() => {
    const res = calculateConversion(value, fromUnit, toUnit, category);
    setResult(res);
  }, [value, fromUnit, toUnit, category, calculateConversion]);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    setFromUnit(units[newCat].defaultFrom);
    setToUnit(units[newCat].defaultTo);
  };

  const handleSwapUnits = () => {
    const currentFrom = fromUnit;
    const currentTo = toUnit;
    setFromUnit(currentTo);
    setToUnit(currentFrom);
  };

  const currentUnitConfig = units[category] || units.weight;
  const unitList = Object.keys(currentUnitConfig.conversions);

  const getLabel = (u: string) => currentUnitConfig.unitLabels?.[u] || u;

  return (
    <CalculatorActions
      calculatorId="unit-converter"
      result={result ? { Result: `${result} ${getLabel(toUnit)}` } : null}
      inputs={{ value, fromUnit, toUnit, category }}
    >
      <div className="glass-card p-4 sm:p-8">
        {/* Category Selector Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {Object.entries(units).map(([k, u]) => (
            <button
              key={k}
              type="button"
              onClick={() => handleCategoryChange(k)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                category === k
                  ? 'bg-brand-sapphire text-white shadow-brand-sapphire/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>

        {/* Inputs Layout */}
        <div className="space-y-6 mb-8">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase mb-2">
              Value to Convert
            </label>
            <input
              type="number"
              inputMode="decimal"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter number..."
              className="w-full px-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50 focus:border-brand-sapphire transition shadow-inner"
            />
          </div>

          {/* Unit Selection Grid with Swap Button */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
            {/* From Unit */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase mb-2">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                aria-label="From unit"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50 transition cursor-pointer"
              >
                {unitList.map((u) => (
                  <option key={u} value={u}>
                    {getLabel(u)}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center pt-0 md:pt-6">
              <button
                type="button"
                onClick={handleSwapUnits}
                title="Swap units"
                aria-label="Swap units"
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-brand-sapphire/10 text-gray-700 dark:text-gray-300 hover:text-brand-sapphire border border-gray-200 dark:border-gray-700 transition shadow-sm"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            {/* To Unit */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase mb-2">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                aria-label="To unit"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50 transition cursor-pointer"
              >
                {unitList.map((u) => (
                  <option key={u} value={u}>
                    {getLabel(u)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick selection pill chips for fast mobile selection */}
          <div>
            <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Quick Target Units
            </span>
            <div className="flex flex-wrap gap-2">
              {unitList.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setToUnit(u)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    toUnit === u
                      ? 'bg-brand-sapphire text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  → {getLabel(u)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Result Display */}
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-brand-sapphire/10 via-blue-500/5 to-transparent border border-brand-sapphire/20 text-center shadow-inner"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sapphire/10 text-brand-sapphire text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Live Result
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {value} {getLabel(fromUnit)} =
            </p>
            <p className="font-display text-3xl sm:text-4xl font-extrabold text-brand-sapphire tracking-tight my-1 break-words">
              {result}
            </p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1">
              {getLabel(toUnit)}
            </p>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

