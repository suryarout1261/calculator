'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { AnimatedResultCard, ResultFrame } from '@/components/ui/AnimatedResultCard';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useAppStore } from '@/lib/store';

const MAX_SEMESTERS = 8;

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

type Semester = { gpa: string; credits: string };

type Mode = 'simple' | 'credit';

export function CGPACalculator() {
  const { addToHistory } = useAppStore();
  const [mode, setMode] = useState<Mode>('credit');
  const [semesters, setSemesters] = useState<Semester[]>([
    { gpa: '8.2', credits: '20' },
    { gpa: '8.5', credits: '22' },
    { gpa: '9.0', credits: '24' },
    { gpa: '8.8', credits: '21' },
  ]);

  const addSemester = useCallback(() => {
    if (semesters.length >= MAX_SEMESTERS) return;
    setSemesters((prev) => [...prev, { gpa: '', credits: '' }]);
  }, [semesters.length]);

  const removeLast = useCallback(() => {
    if (semesters.length <= 1) return;
    setSemesters((prev) => prev.slice(0, -1));
  }, [semesters.length]);

  const updateSemester = useCallback((index: number, key: 'gpa' | 'credits', value: string) => {
    setSemesters((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }, []);

  const resetCalculator = useCallback(() => {
    setSemesters([
      { gpa: '8.2', credits: '20' },
      { gpa: '8.5', credits: '22' },
      { gpa: '9.0', credits: '24' },
      { gpa: '8.8', credits: '21' },
    ]);
    setMode('credit');
  }, []);

  const loadExample = useCallback(() => {
    setMode('credit');
    setSemesters([
      { gpa: '9.1', credits: '20' },
      { gpa: '8.4', credits: '24' },
      { gpa: '7.8', credits: '22' },
      { gpa: '9.3', credits: '21' },
      { gpa: '8.0', credits: '20' },
      { gpa: '8.6', credits: '24' },
      { gpa: '7.5', credits: '21' },
      { gpa: '9.0', credits: '23' },
    ]);
  }, []);

  // Validation + live results
  const filled = useMemo(() => {
    return semesters.map((s) => {
      const gpaRaw = s.gpa.trim();
      const credRaw = s.credits.trim();
      const gpa = gpaRaw === '' ? NaN : parseFloat(gpaRaw);
      const credits = credRaw === '' ? NaN : parseFloat(credRaw);
      return { gpaRaw, credRaw, gpa, credits, valid: !isNaN(gpa) && !isNaN(credits) };
    });
  }, [semesters]);

  const errors = useMemo(() => {
    const errs: string[] = [];
    filled.forEach((f, i) => {
      if (f.gpaRaw === '' && f.credRaw === '') return; // ignore fully empty
      if (f.gpaRaw !== '' && (isNaN(f.gpa) || f.gpa < 0 || f.gpa > 10)) errs.push(`Semester ${i + 1}: GPA must be 0–10`);
      if (f.credRaw !== '' && (isNaN(f.credits) || f.credits <= 0)) errs.push(`Semester ${i + 1}: Credits must be positive`);
    });
    return errs;
  }, [filled]);

  const result = useMemo(() => {
    const validSemesters = filled.filter((f) => f.gpaRaw !== '' || f.credRaw !== '');
    // Only count semesters that have at least GPA filled (for simple) or both (for credit)
    const usable = validSemesters.filter((f) => {
      if (f.gpaRaw === '') return false; // needs GPA at minimum
      if (mode === 'credit' && f.credRaw === '') return false;
      return true;
    });
    if (usable.length === 0) return null;

    if (mode === 'simple') {
      const gp = usable.map((f) => f.gpa);
      const cgpa = gp.reduce((a, b) => a + b, 0) / gp.length;
      const percentage = (cgpa - 0.75) * 10;
      return {
        CGPA: round2(cgpa),
        Percentage: `${round2(percentage)}%`,
        'Semesters Counted': usable.length,
      };
    }

    // Credit-based
    let sumWeighted = 0;
    let sumCredits = 0;
    for (const f of usable) {
      const g = f.gpa;
      const c = f.credits;
      if (isNaN(g) || isNaN(c)) continue;
      sumWeighted += g * c;
      sumCredits += c;
    }
    if (sumCredits === 0) return null;
    const cgpa = sumWeighted / sumCredits;
    const percentage = (cgpa - 0.75) * 10;
    return {
      CGPA: round2(cgpa),
      Percentage: `${round2(percentage)}%`,
      'Semesters Counted': usable.length,
      'Total Credits': Math.round(sumCredits),
    };
  }, [mode, filled]);

  // Save to history when result changes and valid
  useMemo(() => {
    if (result && errors.length === 0 && semesters.length > 0) {
      const inputs: Record<string, string> = { mode };
      semesters.forEach((s, i) => {
        inputs[`s${i + 1}_gpa`] = s.gpa;
        if (mode === 'credit') inputs[`s${i + 1}_credits`] = s.credits;
      });
      addToHistory({
        calculatorId: 'cgpa',
        calculatorTitle: 'CGPA Calculator',
        inputs,
        result: result as any,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, errors.length, mode, semesters, addToHistory]);

  const isCredit = mode === 'credit';

  const calcResult: Record<string, string | number> | null = result ? {
    CGPA: result.CGPA,
    Percentage: result.Percentage,
    'Semesters Counted': result['Semesters Counted'],
    ...(isCredit && result['Total Credits'] !== undefined ? { 'Total Credits': result['Total Credits'] } : {}),
  } : null;

  return (
    <CalculatorActions calculatorId="cgpa" result={calcResult} inputs={{ mode, ...Object.fromEntries(semesters.map((s, i) => [`s${i + 1}`, `${s.gpa},${isCredit ? s.credits : ''}`])) }}>
      <div className="glass-card p-6 md:p-8">
        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-1">
            CGPA Calculator
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage up to 8 semesters. Toggle between Simple CGPA and Credit-Based CGPA.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6">
          <SegmentedControl
            label="Calculation Mode"
            options={[
              { label: 'Simple CGPA', value: 'simple' },
              { label: 'Credit-Based CGPA', value: 'credit' },
            ]}
            value={mode}
            onChange={(v: string) => setMode(v as Mode)}
          />
        </div>

        {/* Semester management */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={addSemester}
            disabled={semesters.length >= MAX_SEMESTERS}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-sapphire text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            + Add Semester
          </button>
          <button
            onClick={removeLast}
            disabled={semesters.length <= 1}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            − Remove Last
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
            {semesters.length} / {MAX_SEMESTERS} semesters
          </span>
        </div>

        {/* Semester inputs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {semesters.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
              className="rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-md border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white">Semester {idx + 1}</h3>
                <span className="text-xs text-gray-400">{idx + 1}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor={`gpa-${idx}`} className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">GPA (0–10)</label>
                  <input
                    id={`gpa-${idx}`}
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={s.gpa}
                    onChange={(e) => updateSemester(idx, 'gpa', e.target.value)}
                    placeholder="e.g. 8.5"
                    className="w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50 transition-all"
                  />
                </div>
                {isCredit && (
                  <div className="space-y-1">
                    <label htmlFor={`cred-${idx}`} className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">Credits</label>
                    <input
                      id={`cred-${idx}`}
                      type="number"
                      step="1"
                      min="1"
                      value={s.credits}
                      onChange={(e) => updateSemester(idx, 'credits', e.target.value)}
                      placeholder="e.g. 22"
                      className="w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50 transition-all"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300 space-y-1">
            {errors.map((e, i) => (
              <div key={i}>• {e}</div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={resetCalculator}
            className="px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
          >
            Reset Calculator
          </button>
          <button
            onClick={loadExample}
            className="px-4 py-2.5 rounded-xl text-sm font-bold bg-brand-sapphire/10 text-brand-sapphire hover:bg-brand-sapphire/20 transition-colors shadow-sm border border-brand-sapphire/20"
          >
            Example Values
          </button>
        </div>

        {/* Results */}
        <ResultFrame show={!!result && errors.length === 0} delay={0.1}>
          <div className="mt-2 space-y-6">
            {result && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <AnimatedResultCard label="CURRENT CGPA" value={String(result.CGPA)} delay={0} gradient="from-brand-sapphire/10 to-blue-500/5" />
                <AnimatedResultCard label="PERCENTAGE" value={String(result.Percentage)} delay={0.05} gradient="from-emerald-500/10 to-teal-500/5" />
                <AnimatedResultCard label="SEMESTERS COUNTED" value={String(result['Semesters Counted'])} delay={0.1} gradient="from-amber-400/10 to-orange-500/5" />
                {isCredit && (
                  <AnimatedResultCard label="TOTAL CREDITS" value={String(result['Total Credits'] ?? '—')} delay={0.15} gradient="from-violet-500/10 to-purple-500/5" />
                )}
              </div>
            )}
          </div>
        </ResultFrame>

        {/* Formula Insight */}
        <div className="rounded-2xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mt-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Formula Insight</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <h5 className="font-bold text-brand-sapphire dark:text-brand-sapphire mb-1">Simple CGPA</h5>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Average of all semester GPAs.</p>
              <div className="font-mono text-xs text-brand-sapphire bg-brand-sapphire/10 dark:bg-brand-sapphire/20 rounded-lg px-2 py-2 mt-2 whitespace-pre-wrap">CGPA = (GPA₁ + GPA₂ + ... + GPAₙ) / n</div>
            </div>
            <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <h5 className="font-bold text-brand-sapphire dark:text-brand-sapphire mb-1">Credit-Based CGPA</h5>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Weighted average using semester credits.</p>
              <div className="font-mono text-xs text-brand-sapphire bg-brand-sapphire/10 dark:bg-brand-sapphire/20 rounded-lg px-2 py-2 mt-2 whitespace-pre-wrap">CGPA = Σ(GPA × Credits) / Σ(Credits)</div>
            </div>
            <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <h5 className="font-bold text-brand-sapphire dark:text-brand-sapphire mb-1">Percentage (Indian)</h5>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Converts CGPA to approximate percentage.</p>
              <div className="font-mono text-xs text-brand-sapphire bg-brand-sapphire/10 dark:bg-brand-sapphire/20 rounded-lg px-2 py-2 mt-2 whitespace-pre-wrap">Percentage = (CGPA − 0.75) × 10</div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorActions>
  );
}
