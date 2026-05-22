'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

interface UniversalCalculatorProps {
  slug: string;
}

type Values = Record<string, string>;
type Result = Record<string, string | number>;

const numberFormat = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
const currency = (value: number) => `₹${numberFormat.format(value)}`;
const round = (value: number, decimals = 2) => Number(value.toFixed(decimals));
const toNum = (values: Values, key: string, fallback = 0) => {
  const parsed = Number(values[key]);
  return Number.isFinite(parsed) ? parsed : fallback;
};
const daysBetween = (start: Date, end: Date) => Math.round((end.getTime() - start.getTime()) / 86_400_000);
const parseFraction = (raw: string) => {
  const parts = raw.split('/').map(Number);
  const n = parts[0];
  const d = parts.length > 1 ? parts[1] : 1;
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) throw new Error('Invalid fraction');
  return { n, d };
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const simplifyFraction = (n: number, d: number) => {
  const g = gcd(n, d);
  const sn = n / g;
  const sd = d / g;
  return sd === 1 ? `${sn}` : `${sn}/${sd}`;
};

const CONFIG: Record<string, {
  id: string;
  title: string;
  defaults: Values;
  fields: Array<{ key: string; label: string; type?: 'number' | 'date' | 'select' | 'text'; options?: Array<{ label: string; value: string }> }>;
  formula: (values: Values) => Result;
  insight: (result: Result) => string;
}> = {
  'inflation-calculator': {
    id: 'inflation',
    title: 'Inflation Calculator',
    defaults: { amount: '100000', rate: '6', years: '10' },
    fields: [
      { key: 'amount', label: 'Current Amount (₹)', type: 'number' },
      { key: 'rate', label: 'Inflation Rate (%/year)', type: 'number' },
      { key: 'years', label: 'Years', type: 'number' },
    ],
    formula: (v) => {
      const amount = toNum(v, 'amount');
      const rate = toNum(v, 'rate') / 100;
      const years = toNum(v, 'years');
      const future = amount * Math.pow(1 + rate, years);
      return { 'Future Cost': currency(future), 'Purchasing Power Lost': currency(future - amount), 'Multiplier': `${round(future / amount)}x` };
    },
    insight: () => 'Inflation compounds over time, so long-term savings should target returns above inflation.',
  },
  'retirement-calculator': {
    id: 'retirement',
    title: 'Retirement Calculator',
    defaults: { current: '500000', monthly: '25000', returnRate: '10', years: '25' },
    fields: [
      { key: 'current', label: 'Current Savings (₹)', type: 'number' },
      { key: 'monthly', label: 'Monthly Investment (₹)', type: 'number' },
      { key: 'returnRate', label: 'Expected Return (%/year)', type: 'number' },
      { key: 'years', label: 'Years to Retirement', type: 'number' },
    ],
    formula: (v) => {
      const current = toNum(v, 'current');
      const monthly = toNum(v, 'monthly');
      const r = toNum(v, 'returnRate') / 12 / 100;
      const n = toNum(v, 'years') * 12;
      const futureCurrent = current * Math.pow(1 + r, n);
      const futureSip = r ? monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : monthly * n;
      const corpus = futureCurrent + futureSip;
      return { 'Retirement Corpus': currency(corpus), 'Total Invested': currency(current + monthly * n), 'Estimated Gains': currency(corpus - current - monthly * n) };
    },
    insight: () => 'Increasing monthly contributions early has an outsized impact because every contribution compounds longer.',
  },
  'tax-calculator': {
    id: 'tax',
    title: 'Tax Calculator',
    defaults: { income: '1200000', deductions: '150000' },
    fields: [
      { key: 'income', label: 'Annual Income (₹)', type: 'number' },
      { key: 'deductions', label: 'Deductions (₹)', type: 'number' },
    ],
    formula: (v) => {
      const taxable = Math.max(0, toNum(v, 'income') - toNum(v, 'deductions'));
      const slabs = [
        { upto: 300000, rate: 0 }, { upto: 600000, rate: 0.05 }, { upto: 900000, rate: 0.1 },
        { upto: 1200000, rate: 0.15 }, { upto: 1500000, rate: 0.2 }, { upto: Infinity, rate: 0.3 },
      ];
      let last = 0, tax = 0;
      for (const slab of slabs) {
        const slabAmount = Math.max(0, Math.min(taxable, slab.upto) - last);
        tax += slabAmount * slab.rate;
        last = slab.upto;
        if (taxable <= slab.upto) break;
      }
      const cess = tax * 0.04;
      return { 'Taxable Income': currency(taxable), 'Estimated Tax': currency(tax + cess), 'Monthly Tax': currency((tax + cess) / 12) };
    },
    insight: () => 'This calculator uses progressive slabs with 4% cess for planning estimates. Confirm jurisdiction-specific rules before filing.',
  },
  'salary-calculator': {
    id: 'salary',
    title: 'Salary Calculator',
    defaults: { annual: '1200000', bonus: '100000', taxRate: '12' },
    fields: [
      { key: 'annual', label: 'Annual Base Salary (₹)', type: 'number' },
      { key: 'bonus', label: 'Annual Bonus (₹)', type: 'number' },
      { key: 'taxRate', label: 'Estimated Tax Rate (%)', type: 'number' },
    ],
    formula: (v) => {
      const gross = toNum(v, 'annual') + toNum(v, 'bonus');
      const tax = gross * toNum(v, 'taxRate') / 100;
      return { 'Gross Annual': currency(gross), 'Net Annual': currency(gross - tax), 'Net Monthly': currency((gross - tax) / 12) };
    },
    insight: () => 'Use net monthly salary for budgeting, not gross CTC.',
  },
  'profit-margin-calculator': {
    id: 'profit-margin',
    title: 'Profit Margin Calculator',
    defaults: { revenue: '1000000', cost: '650000' },
    fields: [
      { key: 'revenue', label: 'Revenue (₹)', type: 'number' },
      { key: 'cost', label: 'Total Cost (₹)', type: 'number' },
    ],
    formula: (v) => {
      const revenue = toNum(v, 'revenue');
      const cost = toNum(v, 'cost');
      const profit = revenue - cost;
      return { 'Net Profit': currency(profit), 'Profit Margin': `${round((profit / revenue) * 100)}%`, 'Markup': `${round((profit / cost) * 100)}%` };
    },
    insight: () => 'Margin is profit divided by revenue; markup is profit divided by cost. They are not the same metric.',
  },
  'water-intake-calculator': {
    id: 'water-intake', title: 'Water Intake Calculator', defaults: { weight: '70', activity: '45' },
    fields: [{ key: 'weight', label: 'Weight (kg)', type: 'number' }, { key: 'activity', label: 'Exercise Minutes/Day', type: 'number' }],
    formula: (v) => {
      const liters = toNum(v, 'weight') * 0.035 + toNum(v, 'activity') * 0.012;
      return { 'Daily Water': `${round(liters)} L`, 'Glasses (250ml)': Math.ceil(liters / 0.25), 'Hydration Target': `${round(liters * 1000)} ml` };
    }, insight: () => 'Increase intake in hot climates or on high-sweat training days.',
  },
  'protein-calculator': {
    id: 'protein', title: 'Protein Calculator', defaults: { weight: '70', goal: 'muscle' },
    fields: [{ key: 'weight', label: 'Weight (kg)', type: 'number' }, { key: 'goal', label: 'Goal', type: 'select', options: [{ label: 'General health', value: 'general' }, { label: 'Fat loss', value: 'loss' }, { label: 'Muscle gain', value: 'muscle' }] }],
    formula: (v) => {
      let multiplier = 1;
      if (v.goal === 'muscle') multiplier = 1.8;
      if (v.goal === 'loss') multiplier = 1.6;
      const grams = toNum(v, 'weight') * multiplier;
      return { 'Protein Target': `${round(grams)} g/day`, 'Per Meal (4 meals)': `${round(grams / 4)} g`, 'Goal Multiplier': `${multiplier} g/kg` };
    }, insight: () => 'Spread protein across meals to improve satiety and muscle protein synthesis.',
  },
  'ideal-weight-calculator': {
    id: 'ideal-weight', title: 'Ideal Weight Calculator', defaults: { height: '175', gender: 'male' },
    fields: [{ key: 'height', label: 'Height (cm)', type: 'number' }, { key: 'gender', label: 'Gender', type: 'select', options: [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }] }],
    formula: (v) => {
      const inches = toNum(v, 'height') / 2.54;
      const base = v.gender === 'male' ? 50 : 45.5;
      const kg = base + 2.3 * Math.max(0, inches - 60);
      return { 'Ideal Weight': `${round(kg)} kg`, 'Healthy Range': `${round(kg * 0.9)}–${round(kg * 1.1)} kg`, Formula: 'Devine' };
    }, insight: () => 'Ideal weight formulas are estimates; body composition and medical context matter more than a single target.',
  },
  'pregnancy-calculator': {
    id: 'pregnancy', title: 'Pregnancy Calculator', defaults: { lmp: new Date().toISOString().slice(0, 10) },
    fields: [{ key: 'lmp', label: 'Last Menstrual Period', type: 'date' }],
    formula: (v) => {
      const lmp = new Date(v.lmp);
      const due = new Date(lmp); due.setDate(due.getDate() + 280);
      const today = new Date();
      const week = Math.max(0, Math.floor(daysBetween(lmp, today) / 7));
      return { 'Estimated Due Date': due.toLocaleDateString(), 'Pregnancy Week': `${week} weeks`, 'Days Remaining': Math.max(0, daysBetween(today, due)) };
    }, insight: () => 'Due dates are estimates. Medical ultrasound dating can be more accurate depending on pregnancy stage.',
  },
  'fraction-calculator': {
    id: 'fraction', title: 'Fraction Calculator', defaults: { a: '1/2', b: '1/3', operation: 'add' },
    fields: [{ key: 'a', label: 'First Fraction', type: 'text' }, { key: 'operation', label: 'Operation', type: 'select', options: [{ label: 'Add', value: 'add' }, { label: 'Subtract', value: 'subtract' }, { label: 'Multiply', value: 'multiply' }, { label: 'Divide', value: 'divide' }] }, { key: 'b', label: 'Second Fraction', type: 'text' }],
    formula: (v) => {
      const A = parseFraction(v.a); const B = parseFraction(v.b);
      let n = 0, d = 1;
      if (v.operation === 'add') { n = A.n * B.d + B.n * A.d; d = A.d * B.d; }
      if (v.operation === 'subtract') { n = A.n * B.d - B.n * A.d; d = A.d * B.d; }
      if (v.operation === 'multiply') { n = A.n * B.n; d = A.d * B.d; }
      if (v.operation === 'divide') { n = A.n * B.d; d = A.d * B.n; }
      return { Result: simplifyFraction(n, d), Decimal: round(n / d, 6) };
    }, insight: () => 'Fractions are simplified using the greatest common divisor.',
  },
  'matrix-calculator': {
    id: 'matrix', title: 'Matrix Calculator', defaults: { a: '1', b: '2', c: '3', d: '4' },
    fields: ['a', 'b', 'c', 'd'].map((key) => ({ key, label: `Matrix value ${key.toUpperCase()}`, type: 'number' as const })),
    formula: (v) => {
      const a = toNum(v, 'a'), b = toNum(v, 'b'), c = toNum(v, 'c'), d = toNum(v, 'd');
      const det = a * d - b * c;
      return { Determinant: det, Trace: a + d, Invertible: det === 0 ? 'No' : 'Yes' };
    }, insight: () => 'A 2×2 matrix is invertible only when its determinant is not zero.',
  },
  'probability-calculator': {
    id: 'probability', title: 'Probability Calculator', defaults: { a: '0.4', b: '0.3' },
    fields: [{ key: 'a', label: 'P(A)', type: 'number' }, { key: 'b', label: 'P(B)', type: 'number' }],
    formula: (v) => {
      const a = toNum(v, 'a'), b = toNum(v, 'b');
      return { 'P(A and B)': round(a * b, 4), 'P(A or B)': round(a + b - a * b, 4), 'P(not A)': round(1 - a, 4) };
    }, insight: () => 'These results assume independent events unless otherwise stated.',
  },
  'force-calculator': {
    id: 'force', title: 'Force Calculator', defaults: { mass: '10', acceleration: '9.81' },
    fields: [{ key: 'mass', label: 'Mass (kg)', type: 'number' }, { key: 'acceleration', label: 'Acceleration (m/s²)', type: 'number' }],
    formula: (v) => ({ Force: `${round(toNum(v, 'mass') * toNum(v, 'acceleration'))} N`, Formula: 'F = m × a' }), insight: () => 'Newton’s second law relates force, mass, and acceleration.',
  },
  'velocity-calculator': {
    id: 'velocity', title: 'Velocity Calculator', defaults: { distance: '100', time: '9.58' },
    fields: [{ key: 'distance', label: 'Distance (m)', type: 'number' }, { key: 'time', label: 'Time (s)', type: 'number' }],
    formula: (v) => ({ Velocity: `${round(toNum(v, 'distance') / toNum(v, 'time'))} m/s`, 'km/h': round((toNum(v, 'distance') / toNum(v, 'time')) * 3.6) }), insight: () => 'Average velocity is displacement divided by time.',
  },
  'density-calculator': {
    id: 'density', title: 'Density Calculator', defaults: { mass: '1000', volume: '1' },
    fields: [{ key: 'mass', label: 'Mass (kg)', type: 'number' }, { key: 'volume', label: 'Volume (m³)', type: 'number' }],
    formula: (v) => ({ Density: `${round(toNum(v, 'mass') / toNum(v, 'volume'))} kg/m³`, Formula: 'ρ = m / V' }), insight: () => 'Density is useful for identifying materials and fluid behavior.',
  },
  'ohms-law-calculator': {
    id: 'ohms-law', title: "Ohm's Law Calculator", defaults: { current: '2', resistance: '10' },
    fields: [{ key: 'current', label: 'Current (A)', type: 'number' }, { key: 'resistance', label: 'Resistance (Ω)', type: 'number' }],
    formula: (v) => ({ Voltage: `${round(toNum(v, 'current') * toNum(v, 'resistance'))} V`, Power: `${round(Math.pow(toNum(v, 'current'), 2) * toNum(v, 'resistance'))} W` }), insight: () => 'Ohm’s law: voltage equals current multiplied by resistance.',
  },
  'voltage-drop-calculator': {
    id: 'voltage-drop', title: 'Voltage Drop Calculator', defaults: { current: '20', length: '50', resistance: '0.008' },
    fields: [{ key: 'current', label: 'Current (A)', type: 'number' }, { key: 'length', label: 'One-way Length (m)', type: 'number' }, { key: 'resistance', label: 'Cable Resistance (Ω/m)', type: 'number' }],
    formula: (v) => {
      const drop = 2 * toNum(v, 'current') * toNum(v, 'length') * toNum(v, 'resistance');
      return { 'Voltage Drop': `${round(drop)} V`, 'Drop at 230V': `${round((drop / 230) * 100)}%` };
    }, insight: () => 'Keep voltage drop within local electrical code limits, commonly 3–5%.',
  },
  'concrete-calculator': {
    id: 'concrete', title: 'Concrete Calculator', defaults: { length: '5', width: '4', depth: '0.15' },
    fields: [{ key: 'length', label: 'Length (m)', type: 'number' }, { key: 'width', label: 'Width (m)', type: 'number' }, { key: 'depth', label: 'Depth (m)', type: 'number' }],
    formula: (v) => {
      const volume = toNum(v, 'length') * toNum(v, 'width') * toNum(v, 'depth');
      return { 'Concrete Volume': `${round(volume)} m³`, 'With 10% Waste': `${round(volume * 1.1)} m³`, 'Approx. Bags (50kg)': Math.ceil(volume * 48) };
    }, insight: () => 'Add waste margin for uneven ground, spillage, and batching differences.',
  },
  'pipe-flow-calculator': {
    id: 'pipe-flow', title: 'Pipe Flow Calculator', defaults: { diameter: '100', velocity: '2' },
    fields: [{ key: 'diameter', label: 'Pipe Diameter (mm)', type: 'number' }, { key: 'velocity', label: 'Fluid Velocity (m/s)', type: 'number' }],
    formula: (v) => {
      const radius = toNum(v, 'diameter') / 1000 / 2;
      const flow = Math.PI * radius * radius * toNum(v, 'velocity');
      return { 'Flow Rate': `${round(flow, 4)} m³/s`, 'Liters/second': `${round(flow * 1000)} L/s`, 'Liters/minute': `${round(flow * 60000)} L/min` };
    }, insight: () => 'Flow rate equals pipe area multiplied by fluid velocity.',
  },
  'date-difference-calculator': {
    id: 'date-difference', title: 'Date Difference Calculator', defaults: { start: '2026-01-01', end: '2026-12-31' },
    fields: [{ key: 'start', label: 'Start Date', type: 'date' }, { key: 'end', label: 'End Date', type: 'date' }],
    formula: (v) => {
      const days = Math.abs(daysBetween(new Date(v.start), new Date(v.end)));
      return { Days: days, Weeks: round(days / 7), Months: round(days / 30.4375) };
    }, insight: () => 'Month calculations use the average Gregorian month length.',
  },
  'working-days-calculator': {
    id: 'working-days', title: 'Working Days Calculator', defaults: { start: '2026-01-01', end: '2026-01-31' },
    fields: [{ key: 'start', label: 'Start Date', type: 'date' }, { key: 'end', label: 'End Date', type: 'date' }],
    formula: (v) => {
      const start = new Date(v.start); const end = new Date(v.end);
      let work = 0, total = 0;
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) { total++; const day = d.getDay(); if (day !== 0 && day !== 6) work++; }
      return { 'Working Days': work, 'Weekend Days': total - work, 'Total Days': total };
    }, insight: () => 'This excludes Saturday and Sunday but does not subtract public holidays.',
  },
  'cgpa-calculator': {
    id: 'cgpa', title: 'CGPA Calculator', defaults: { s1: '8.2', s2: '8.5', s3: '9.0', s4: '8.8' },
    fields: ['s1', 's2', 's3', 's4'].map((key, index) => ({ key, label: `Semester ${index + 1} GPA`, type: 'number' as const })),
    formula: (v) => {
      const vals = Object.values(v).map(Number).filter(Number.isFinite);
      const cgpa = vals.reduce((a, b) => a + b, 0) / vals.length;
      return { CGPA: round(cgpa), Percentage: `${round(cgpa * 9.5)}%`, Semesters: vals.length };
    }, insight: () => 'Many institutions use CGPA × 9.5 as an approximate percentage conversion.',
  },
  'ai-equation-solver': {
    id: 'ai-equation', title: 'AI Equation Solver', defaults: { prompt: 'Explain 2x + 5 = 15' },
    fields: [{ key: 'prompt', label: 'Equation / Question', type: 'text' }],
    formula: (v) => ({ 'AI Solution': `Parsed request: ${v.prompt}`, Explanation: 'Move constants to the right side, isolate the variable, then verify by substitution.' }), insight: () => 'This local AI-style assistant provides deterministic guidance and can be connected to an LLM API later.',
  },
  'ai-finance-advisor': {
    id: 'ai-finance', title: 'AI Finance Advisor', defaults: { income: '100000', savings: '20000', goal: 'retirement' },
    fields: [{ key: 'income', label: 'Monthly Income (₹)', type: 'number' }, { key: 'savings', label: 'Monthly Savings (₹)', type: 'number' }, { key: 'goal', label: 'Goal', type: 'text' }],
    formula: (v) => {
      const ratio = toNum(v, 'savings') / toNum(v, 'income');
      return { 'Savings Rate': `${round(ratio * 100)}%`, Recommendation: ratio >= 0.2 ? 'Strong savings rate' : 'Try to move toward 20% savings', Goal: v.goal };
    }, insight: () => 'A 20%+ savings rate gives more flexibility for long-term investing and emergency funds.',
  },
  'ai-health-insights': {
    id: 'ai-health', title: 'AI Health Insights', defaults: { bmi: '23', sleep: '7', steps: '8000' },
    fields: [{ key: 'bmi', label: 'BMI', type: 'number' }, { key: 'sleep', label: 'Sleep (hours)', type: 'number' }, { key: 'steps', label: 'Daily Steps', type: 'number' }],
    formula: (v) => ({ BMI: toNum(v, 'bmi'), Sleep: `${toNum(v, 'sleep')} hrs`, Insight: toNum(v, 'steps') >= 8000 ? 'Activity target achieved' : 'Increase daily steps gradually' }), insight: () => 'Health insights are educational and not medical advice.',
  },
  'ai-math-tutor': {
    id: 'ai-tutor', title: 'AI Math Tutor', defaults: { topic: 'quadratic equations' },
    fields: [{ key: 'topic', label: 'Topic', type: 'text' }],
    formula: (v) => ({ Topic: v.topic, Plan: 'Definition → worked example → practice problem → check answer', Tip: 'Write each algebraic step explicitly.' }), insight: () => 'The tutor flow is designed to teach the concept, not just return an answer.',
  },
};

const ALIASES: Record<string, string> = {
  'length-converter': 'unit-converter',
  'weight-converter': 'unit-converter',
  'temperature-converter': 'unit-converter',
};

export function UniversalCalculator({ slug }: UniversalCalculatorProps) {
  const config = CONFIG[slug] || CONFIG[ALIASES[slug]];
  const [values, setValues] = useState<Values>(config?.defaults ?? { value: '1' });
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const { addToHistory } = useAppStore();

  const renderedTitle = config?.title ?? 'Smart Calculator';
  const actionId = config?.id ?? slug.replaceAll(/-calculator|-converter|-solver/g, '');
  const fields = config?.fields ?? [{ key: 'value', label: 'Value', type: 'number' as const }];
  const explanation = useMemo(() => result && config ? config.insight(result) : '', [result, config]);

  const calculate = () => {
    if (!config) return;
    setError('');
    try {
      const output = config.formula(values);
      setResult(output);
      addToHistory({ calculatorId: actionId, calculatorTitle: renderedTitle, inputs: values, result: output });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Please enter valid inputs.');
      setResult(null);
    }
  };

  if (!config) {
    return (
      <div className="glass-card p-8 text-center">
        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Calculator unavailable</h3>
        <p className="text-gray-600 dark:text-gray-400">This tool is not registered yet.</p>
      </div>
    );
  }

  return (
    <CalculatorActions calculatorId={actionId} result={result} inputs={values}>
      <div className="glass-card p-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  value={values[field.key] ?? ''}
                  onChange={(e) => setValues((current) => ({ ...current, [field.key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
                >
                  {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              ) : (
                <input
                  type={field.type ?? 'number'}
                  value={values[field.key] ?? ''}
                  onChange={(e) => setValues((current) => ({ ...current, [field.key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
                />
              )}
            </div>
          ))}
        </div>

        {error && <p className="mb-4 rounded-lg bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{error}</p>}
        <button onClick={calculate} className="btn-primary w-full text-center">Calculate</button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="p-5 rounded-xl bg-brand-sapphire/10 text-center border border-brand-sapphire/10">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{key}</p>
                  <p className="font-display text-xl font-bold text-brand-sapphire break-words">{String(value)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-800 p-5">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Formula Insight</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}



