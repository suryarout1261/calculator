'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';
import { AppleSlider } from '@/components/ui/AppleSlider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { ColorRange, BODY_FAT_MALE_ZONES, BODY_FAT_FEMALE_ZONES } from '@/components/ui/ColorRange';
import { AnimatedResultCard, ResultFrame } from '@/components/ui/AnimatedResultCard';
import { User, Flame, Dumbbell } from 'lucide-react';
import { FreeBanner } from '@/components/ui/FreeBanner';

export function BodyFatCalculator() {
  const { locale, dict } = useI18n();

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState(70);
  const [waist, setWaist] = useState(85);
  const [neck, setNeck] = useState(38);
  const [height, setHeight] = useState(175);
  const [hip, setHip] = useState(95);
  const { addToHistory } = useAppStore();

  const result = useMemo(() => {
    const w = waist, n = neck, h = height, hp = hip;
    if (!w || !n || !h || (gender === 'female' && !hp)) return null;

    // US Navy Method
    let bf: number;
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
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

    const fatMass = Math.round(weight * bf / 100 * 10) / 10;
    const leanMass = Math.round((weight - fatMass) * 10) / 10;

    return { bodyFat: bf, category, leanMass, fatMass };
  }, [gender, weight, waist, neck, height, hip]);

  useEffect(() => {
    if (!result || !waist || !neck || !height) return;
    const t = setTimeout(() => {
      addToHistory({
        calculatorId: 'body-fat',
        calculatorTitle: 'Body Fat Calculator',
        inputs: { gender, weight, waist, neck, height, hip },
        result: { 'Body Fat': `${result.bodyFat}%`, Category: result.category },
      });
    }, 1200);
    return () => clearTimeout(t);
  }, [result, gender, weight, waist, neck, height, hip, addToHistory]);

  const zones = gender === 'male' ? BODY_FAT_MALE_ZONES : BODY_FAT_FEMALE_ZONES;

  return (
    <CalculatorActions
      calculatorId="body-fat"
      result={result ? { 'Body Fat': `${result.bodyFat}%`, Category: result.category, 'Lean Mass': `${result.leanMass} kg` } : null}
      inputs={{ gender, weight, waist, neck, height, hip }}
    >
      <FreeBanner />

      <div className="glass-card p-8">
        {/* SEO intro */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Body Fat Percentage — Live
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Estimated using the U.S. Navy Method. Adjust measurements to see your body fat, lean mass, and fat mass update instantly.
          </p>
        </div>

        <motion.div layout className="mb-8">
          <SegmentedControl
            label="Gender"
            value={gender}
            onChange={(v) => setGender(v)}
            options={[
              { value: 'male', label: 'Male', icon: <User className="w-4 h-4" /> },
              { value: 'female', label: 'Female', icon: <User className="w-4 h-4" /> },
            ]}
          />
        </motion.div>

        <motion.div layout className="space-y-8">
          <AppleSlider label="Weight" value={weight} onChange={setWeight} min={40} max={160} step={0.5} suffix=" kg" helpText="Used to break down total into fat and lean mass" />
          <AppleSlider label="Height" value={height} onChange={setHeight} min={140} max={210} step={1} suffix=" cm" />
          <AppleSlider label="Neck" value={neck} onChange={setNeck} min={25} max={55} step={0.5} suffix=" cm" />
          <AppleSlider label="Waist" value={waist} onChange={setWaist} min={55} max={150} step={0.5} suffix=" cm" />
          {gender === 'female' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <AppleSlider label="Hip" value={hip} onChange={setHip} min={60} max={160} step={0.5} suffix=" cm" />
            </motion.div>
          )}
        </motion.div>

        <ResultFrame show={!!result} delay={0.1}>
          <motion.div layout className="mt-8 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <AnimatedResultCard
                label="Body Fat"
                value={result?.bodyFat ?? 0}
                suffix="%"
                icon={<Flame className="w-3.5 h-3.5" />}
                badge={result?.category}
                badgeColor="bg-red-500/10 text-red-500"
                gradient="from-red-500/10 to-rose-500/5"
              />
              <AnimatedResultCard
                label="Fat Mass"
                value={result?.fatMass ?? 0}
                suffix="kg"
                gradient="from-amber-500/10 to-yellow-500/5"
                delay={0.08}
              />
              <AnimatedResultCard
                label="Lean Mass"
                value={result?.leanMass ?? 0}
                suffix="kg"
                icon={<Dumbbell className="w-3.5 h-3.5" />}
                gradient="from-green-500/10 to-emerald-500/5"
                delay={0.16}
              />
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="rounded-2xl p-6 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 shadow-lg"
              >
                <ColorRange
                  label="Body Fat Scale"
                  value={result.bodyFat}
                  min={gender === 'male' ? 2 : 10}
                  max={gender === 'male' ? 40 : 45}
                  zones={zones}
                  markerLabel={`${result.bodyFat}% — ${result.category}`}
                />
              </motion.div>
            )}
          </motion.div>
        </ResultFrame>
      </div>
    </CalculatorActions>
  );
}