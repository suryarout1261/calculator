'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';
import { AppleSlider } from '@/components/ui/AppleSlider';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { ColorRange, BMI_ZONES } from '@/components/ui/ColorRange';
import { AnimatedResultCard, ResultFrame } from '@/components/ui/AnimatedResultCard';
import { Scale, Ruler, Activity } from 'lucide-react';
import { useI18n } from '@/components/LocaleProvider';
import { FreeBanner } from '@/components/ui/FreeBanner';

export function BMICalculator() {
  const { locale, dict } = useI18n();
  const calcDict = dict.calculators?.['bmi'] || { label: 'BMI Calculator', description: 'Calculate Body Mass Index', button: 'Calculate', result: {}, inputs: {} };

  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const { addToHistory } = useAppStore();

  // Real-time calculation (no button needed)
  const result = useMemo(() => {
    if (!weight || !height) return null;
    let bmi: number;
    if (unit === 'metric') {
      bmi = weight / ((height / 100) ** 2);
    } else {
      bmi = (weight / (height ** 2)) * 703;
    }
    const bmiRounded = Math.round(bmi * 10) / 10;
    let category: string;
    const catMap = { en: { under: 'Underweight', normal: 'Normal Weight', over: 'Overweight', obese: 'Obese' }, es: { under: 'Bajo peso', normal: 'Peso normal', over: 'Sobrepeso', obese: 'Obeso' }, ja: { under: '低体重', normal: '普通体重', over: '過体重', obese: '肥満' }, fr: { under: 'Insuffisant', normal: 'Normal', over: 'Surpoids', obese: 'Obèse' }, de: { under: 'Untergewicht', normal: 'Normalgewicht', over: 'Übergewicht', obese: 'Adipös' }, pt: { under: 'Abaixo do peso', normal: 'Peso normal', over: 'Sobrepeso', obese: 'Obeso' }, ko: { under: '저체중', normal: '정상체중', over: '과체중', obese: '비만' }, it: { under: 'Sottopeso', normal: 'Peso normale', over: 'Sovrappeso', obese: 'Obeso' } };
    const m = (catMap as any)[locale] || (catMap as any).en;
    if (bmiRounded < 18.5) category = m.under;
    else if (bmiRounded < 25) category = m.normal;
    else if (bmiRounded < 30) category = m.over;
    else category = m.obese;

    const [heightM] = unit === 'metric' ? [height / 100] : [height * 0.0254];
    const healthyMin = Math.round(18.5 * ((heightM) ** 2));
    const healthyMax = Math.round(24.9 * ((heightM) ** 2));

    return { bmi: bmiRounded, category, healthyMin, healthyMax };
  }, [weight, height, unit]);

  // Save to history on value change (debounced)
  useEffect(() => {
    if (!result || !weight || !height) return;
    const t = setTimeout(() => {
      addToHistory({
        calculatorId: 'bmi',
        calculatorTitle: calcDict.label,
        inputs: { weight, height, unit },
        result: { bmi: result.bmi, category: result.category },
      });
    }, 1200);
    return () => clearTimeout(t);
  }, [result, weight, height, unit, addToHistory]);

  const weightRange = unit === 'metric' ? { min: 30, max: 200, step: 0.5, suffix: ' kg' } : { min: 65, max: 440, step: 0.5, suffix: ' lbs' };
  const heightRange = unit === 'metric' ? { min: 120, max: 220, step: 1, suffix: ' cm' } : { min: 48, max: 87, step: 1, suffix: ' in' };

  return (
    <CalculatorActions
      calculatorId="bmi"
      result={result ? { bmi: result.bmi, category: result.category } : null}
      inputs={{ weight, height, unit }}
    >
      <FreeBanner />

      <div className="glass-card p-4 sm:p-8">
        {/* SEO-friendly intro */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-gray-900 dark:text-white mb-3 tracking-tight">
            Body Mass Index — Live
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {locale === 'es' ? 'Arrastra los controles y observa tu IMC al instante.' : locale === 'ja' ? 'スライダーを動かすとBMIが更新されます。' : locale === 'fr' ? 'Déplacez les curseurs et observez votre IMC.' : locale === 'de' ? 'Ziehe die Regler und beobachte dein BMI.' : locale === 'pt' ? 'Arraste os controles e veja seu IMC.' : locale === 'ko' ? '슬라이더를 움직이면 BMI가 업데이트됩니다.' : locale === 'it' ? 'Sposta i cursori e guarda il BMI.' : 'Drag sliders to see your BMI update instantly.'}
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="mb-8">
          <SegmentedControl
            label={locale === 'es' ? 'Unidades' : locale === 'ja' ? '単位' : locale === 'fr' ? 'Unités' : locale === 'de' ? 'Einheiten' : locale === 'pt' ? 'Unidades' : locale === 'ko' ? '단위' : locale === 'it' ? 'Unità' : 'Units'}
            value={unit}
            onChange={(v) => setUnit(v)}
            options={[
              { value: 'metric', label: 'Metric', icon: <Scale className="w-4 h-4" /> },
              { value: 'imperial', label: 'Imperial', icon: <Ruler className="w-4 h-4" /> },
            ]}
          />
        </div>

        {/* Inputs */}
        <motion.div layout className="space-y-8 mb-2">
          <AppleSlider
            label={(calcDict.inputs as any)?.Weight || (locale === 'es' ? 'Peso' : locale === 'ja' ? '体重' : locale === 'fr' ? 'Poids' : locale === 'de' ? 'Gewicht' : locale === 'pt' ? 'Peso' : locale === 'ko' ? '체중' : locale === 'it' ? 'Peso' : 'Weight')}
            value={weight}
            onChange={setWeight}
            min={weightRange.min}
            max={weightRange.max}
            step={weightRange.step}
            suffix={weightRange.suffix}
            helpText={`Healthy weight for ${height}${heightRange.suffix}${result ? `: ${result.healthyMin}–${result.healthyMax}${weightRange.suffix}` : ''}`}
          />
          <AppleSlider
            label={(calcDict.inputs as any)?.Height || (locale === 'es' ? 'Altura' : locale === 'ja' ? '身長' : locale === 'fr' ? 'Taille' : locale === 'de' ? 'Größe' : locale === 'pt' ? 'Altura' : locale === 'ko' ? '키' : locale === 'it' ? 'Altezza' : 'Height')}
            value={height}
            onChange={setHeight}
            min={heightRange.min}
            max={heightRange.max}
            step={heightRange.step}
            suffix={heightRange.suffix}
          />
        </motion.div>

        {/* Result */}
        <ResultFrame show={!!result} delay={0.1}>
          <motion.div layout className="mt-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <AnimatedResultCard
                label={(calcDict.result as any)?.['Your BMI'] || (locale === 'es' ? 'Tu IMC' : locale === 'ja' ? 'あなたのBMI' : locale === 'fr' ? 'Votre IMC' : locale === 'de' ? 'Dein BMI' : locale === 'pt' ? 'Seu IMC' : locale === 'ko' ? '당신의 BMI' : locale === 'it' ? 'Il tuo BMI' : 'Your BMI')}
                value={result?.bmi ?? 0}
                icon={<Activity className="w-3.5 h-3.5" />}
                badge={result?.category}
                badgeColor="bg-brand-sapphire/10 text-brand-sapphire"
                gradient="from-brand-sapphire/10 to-blue-500/5"
              />
              <AnimatedResultCard
                label="Healthy Range"
                value={`${result?.healthyMin ?? 0}–${result?.healthyMax ?? 0}`}
                suffix={weightRange.suffix}
                gradient="from-green-500/10 to-emerald-500/5"
                delay={0.1}
              />
            </div>

            {/* Segmented color range */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
                className="rounded-2xl p-4 sm:p-6 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 shadow-lg"
              >
                <ColorRange
                  label={locale === 'es' ? 'Escala IMC' : locale === 'ja' ? 'BMIスケール' : locale === 'fr' ? 'Échelle IMC' : locale === 'de' ? 'BMI-Skala' : locale === 'pt' ? 'Escala IMC' : locale === 'ko' ? 'BMI 스케일' : locale === 'it' ? 'Scala BMI' : 'BMI Scale'}
                  value={result.bmi}
                  min={10}
                  max={45}
                  zones={BMI_ZONES}
                  markerLabel={`${result.bmi} — ${result.category}`}
                />
              </motion.div>
            )}
          </motion.div>
        </ResultFrame>
      </div>
    </CalculatorActions>
  );
}