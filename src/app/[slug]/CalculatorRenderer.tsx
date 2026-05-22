'use client';

import dynamic from 'next/dynamic';

const MortgageCalculator = dynamic(() => import('@/components/calculators/MortgageCalculator').then(m => ({ default: m.MortgageCalculator })));
const ROICalculator = dynamic(() => import('@/components/calculators/ROICalculator').then(m => ({ default: m.ROICalculator })));
const GSTCalculator = dynamic(() => import('@/components/calculators/GSTCalculator').then(m => ({ default: m.GSTCalculator })));
const BMRCalculator = dynamic(() => import('@/components/calculators/BMRCalculator').then(m => ({ default: m.BMRCalculator })));
const TDEECalculator = dynamic(() => import('@/components/calculators/TDEECalculator').then(m => ({ default: m.TDEECalculator })));
const BodyFatCalculator = dynamic(() => import('@/components/calculators/BodyFatCalculator').then(m => ({ default: m.BodyFatCalculator })));
const AlgebraSolver = dynamic(() => import('@/components/calculators/AlgebraSolver').then(m => ({ default: m.AlgebraSolver })));
const SimpleInterestCalc = dynamic(() => import('@/components/calculators/SimpleInterestCalculator').then(m => ({ default: m.SimpleInterestCalculator })));
const UnitConverter = dynamic(() => import('@/components/calculators/UnitConverter').then(m => ({ default: m.UnitConverter })));
const UniversalCalculator = dynamic(() => import('@/components/calculators/UniversalCalculator').then(m => ({ default: m.UniversalCalculator })));

const calculatorMap: Record<string, React.ComponentType> = {
  'mortgage-calculator': MortgageCalculator,
  'roi-calculator': ROICalculator,
  'gst-calculator': GSTCalculator,
  'bmr-calculator': BMRCalculator,
  'tdee-calculator': TDEECalculator,
  'body-fat-calculator': BodyFatCalculator,
  'algebra-solver': AlgebraSolver,
  'simple-interest-calculator': SimpleInterestCalc,
  'unit-converter': UnitConverter,
  'length-converter': UnitConverter,
  'weight-converter': UnitConverter,
  'temperature-converter': UnitConverter,
};

export function CalculatorRenderer({ slug }: { slug: string }) {
  const Component = calculatorMap[slug];

  if (!Component) {
    return <UniversalCalculator slug={slug} />;
  }

  return <Component />;
}


