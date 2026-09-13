'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { AnimatedResultCard, ResultFrame } from '@/components/ui/AnimatedResultCard';
import { useAppStore } from '@/lib/store';
import { useRef } from 'react';

const round = (n: number, d = 2) => Number(n.toFixed(d));
const toNum = (v: string) => (v === '' || v === undefined ? 0 : Number(v) || 0);

type Mode = '2d' | '3d';

const SHAPES_2D = [
  { label: 'Rectangle', value: 'rectangle' },
  { label: 'Square', value: 'square' },
  { label: 'Triangle', value: 'triangle' },
  { label: 'Circle', value: 'circle' },
  { label: 'Semicircle', value: 'semicircle' },
  { label: 'Parallelogram', value: 'parallelogram' },
  { label: 'Trapezoid', value: 'trapezoid' },
  { label: 'Rhombus', value: 'rhombus' },
  { label: 'Kite', value: 'kite' },
  { label: 'Ellipse', value: 'ellipse' },
  { label: 'Regular Polygon', value: 'regular-polygon' },
];

const SHAPES_3D = [
  { label: 'Cube', value: 'cube' },
  { label: 'Cuboid', value: 'cuboid' },
  { label: 'Cylinder', value: 'cylinder' },
  { label: 'Sphere', value: 'sphere' },
  { label: 'Hemisphere', value: 'hemisphere' },
  { label: 'Cone', value: 'cone' },
  { label: 'Prism', value: 'prism' },
  { label: 'Pyramid', value: 'pyramid' },
  { label: 'Triangular Prism', value: 'triangular-prism' },
  { label: 'Square Pyramid', value: 'square-pyramid' },
];

function defaultShape(mode: Mode) {
  return mode === '2d' ? 'rectangle' : 'cube';
}

export function GeometryCalculator() {
  const { addToHistory } = useAppStore();
  const historyRef = useRef(false);
  const [mode, setMode] = useState<Mode>('2d');
  const [shape, setShape] = useState('rectangle');

  const shapes = mode === '2d' ? SHAPES_2D : SHAPES_3D;

  // Input state
  const [inputs, setInputs] = useState<Record<string, string>>({
    length: '6', width: '4', side: '5', radius: '5', height: '4',
    base: '5', sideA: '3', sideB: '4', sideC: '5', base1: '6', base2: '4',
    side1: '3', side2: '5', slant: '5', a: '4', b: '3', d1: '6', d2: '4',
    s: '5', n: '5', h3: '6', r3: '3', hprism: '7', baseArea: '10',
  });

  const handleModeChange = (m: Mode) => {
    setMode(m);
    const def = defaultShape(m);
    setShape(def);
    // Optional reset of inputs; keep some common defaults for usability
  };

  const handleShapeChange = (s: string) => {
    setShape(s);
  };

  const update = (key: string, val: string) => setInputs((prev) => ({ ...prev, [key]: val }));

  // Calculate results
  const result = useMemo(() => {
    const s = shape;
    const pi = Math.PI;
    const to = (k: string) => toNum(inputs[k] ?? '');

    // 2D
    if (mode === '2d') {
      switch (s) {
        case 'rectangle': {
          const len = to('length'), wid = to('width');
          return { Area: round(len * wid, 4), Perimeter: round(2 * (len + wid), 4), Diagonal: round(Math.hypot(len, wid), 4) };
        }
        case 'square': {
          const sid = to('side');
          return { Area: round(sid * sid, 4), Perimeter: round(4 * sid, 4), Diagonal: round(sid * Math.SQRT2, 4) };
        }
        case 'triangle': {
          const a = to('sideA'), b = to('sideB'), c = to('sideC');
          if (a + b <= c || a + c <= b || b + c <= a) return { Error: 'Invalid triangle: sides violate triangle inequality' };
          const p = (a + b + c) / 2;
          const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
          return { Perimeter: round(a + b + c, 4), Area: round(area, 4) };
        }
        case 'circle': {
          const r = to('radius');
          return { Area: round(pi * r * r, 4), Circumference: round(2 * pi * r, 4), Diameter: round(2 * r, 4) };
        }
        case 'semicircle': {
          const r = to('radius');
          return { Area: round((pi * r * r) / 2, 4), Perimeter: round(pi * r + 2 * r, 4) };
        }
        case 'parallelogram': {
          const b = to('base'), h = to('height'), sid = to('side');
          return { Area: round(b * h, 4), Perimeter: round(2 * (b + sid), 4) };
        }
        case 'trapezoid': {
          const b1 = to('base1'), b2 = to('base2'), h = to('height'), s1 = to('side1'), s2 = to('side2');
          return { Area: round(((b1 + b2) / 2) * h, 4), Perimeter: round(b1 + b2 + s1 + s2, 4) };
        }
        case 'rhombus': {
          const d1 = to('d1'), d2 = to('d2'), s = to('side');
          return { Area: round((d1 * d2) / 2, 4), Perimeter: round(4 * s, 4) };
        }
        case 'kite': {
          const d1 = to('d1'), d2 = to('d2'), a = to('a'), b = to('b');
          return { Area: round((d1 * d2) / 2, 4), Perimeter: round(2 * (a + b), 4) };
        }
        case 'ellipse': {
          const a = to('a'), b = to('b');
          return { Area: round(pi * a * b, 4) };
        }
        case 'regular-polygon': {
          const n = to('n'), s = to('s');
          const area = (n * s * s) / (4 * Math.tan(pi / n));
          return { Area: round(area, 4), Perimeter: round(n * s, 4) };
        }
        default: return { Note: 'Select a 2D shape' };
      }
    }

    // 3D
    switch (s) {
      case 'cube': {
        const sid = to('side');
        return { Volume: round(sid * sid * sid, 4), 'TSA': round(6 * sid * sid, 4), LSA: round(4 * sid * sid, 4), 'Space Diagonal': round(sid * Math.sqrt(3), 4) };
      }
      case 'cuboid': {
        const len = to('length'), wid = to('width'), h = to('height');
        return { Volume: round(len * wid * h, 4), TSA: round(2 * (len * wid + wid * h + h * len), 4), LSA: round(2 * h * (len + wid), 4), Diagonal: round(Math.sqrt(len * len + wid * wid + h * h), 4) };
      }
      case 'cylinder': {
        const r = to('radius'), h = to('height');
        return { Volume: round(pi * r * r * h, 4), TSA: round(2 * pi * r * (r + h), 4), LSA: round(2 * pi * r * h, 4) };
      }
      case 'sphere': {
        const r = to('radius');
        return { Volume: round((4 / 3) * pi * r * r * r, 4), 'Surface Area': round(4 * pi * r * r, 4) };
      }
      case 'hemisphere': {
        const r = to('radius');
        return { Volume: round((2 / 3) * pi * r * r * r, 4), TSA: round(3 * pi * r * r, 4), LSA: round(2 * pi * r * r, 4) };
      }
      case 'cone': {
        const r = to('radius'), h = to('height'), sl = to('slant');
        return { Volume: round((1 / 3) * pi * r * r * h, 4), 'Surface Area (TSA)': round(pi * r * (r + sl), 4), LSA: round(pi * r * sl, 4) };
      }
      case 'prism': {
        const baseArea = to('baseArea'), h = to('h3');
        return { Volume: round(baseArea * h, 4), 'TSA': round(2 * baseArea + 2 * Math.sqrt(3) * Math.sqrt(baseArea) * h, 4) };
      }
      case 'pyramid': {
        const baseArea = to('baseArea'), h = to('h3');
        return { Volume: round((baseArea * h) / 3, 4), TSA: round(baseArea + 4 * Math.sqrt(baseArea) * h / 2, 4) };
      }
      case 'triangular-prism': {
        const len = to('length'), sideA = to('sideA'), sideB = to('sideB'), sideC = to('sideC');
        const s = (sideA + sideB + sideC) / 2;
        const triArea = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
        return { Volume: round(triArea * len, 4), TSA: round(2 * triArea + (sideA + sideB + sideC) * len, 4) };
      }
      case 'square-pyramid': {
        const s = to('side'), h = to('h3');
        const sl = Math.sqrt(h * h + (s / 2) * (s / 2));
        return { Volume: round((s * s * h) / 3, 4), TSA: round(s * s + 2 * s * sl, 4) };
      }
      default: return { Note: 'Select a 3D shape' };
    }
  }, [mode, shape, inputs]);

  // Save to history when result changes meaningfully
  const hasError = 'Error' in result;
  if (!hasError && !historyRef.current) {
    historyRef.current = true;
    addToHistory({ calculatorId: 'geometry', calculatorTitle: 'Geometry Calculator', inputs: { mode, shape, ...inputs }, result: result as any });
  } else if (hasError) {
    historyRef.current = false;
  }

  // Formula insight per shape
  const insight = useMemo(() => {
    const s = shape;
    const f2d: Record<string, string> = {
      rectangle: 'A = L × W  |  P = 2(L + W)  |  d = √(L² + W²)',
      square: 'A = s²  |  P = 4s  |  d = s√2',
      triangle: 'A = √[s(s-a)(s-b)(s-c)]  |  P = a+b+c',
      circle: 'A = πr²  |  C = 2πr  |  d = 2r',
      semicircle: 'A = ½πr²  |  P = πr + 2r',
      parallelogram: 'A = b·h  |  P = 2(b + s)',
      trapezoid: 'A = ½(b₁ + b₂)h  |  P = b₁ + b₂ + s₁ + s₂',
      rhombus: 'A = ½d₁d₂  |  P = 4s',
      kite: 'A = ½d₁d₂  |  P = 2(a + b)',
      ellipse: 'A = πab',
      'regular-polygon': 'A = ns²/(4tan(π/n))  |  P = ns',
    };
    const f3d: Record<string, string> = {
      cube: 'Volume = a³  |  TSA = 6a²  |  LSA = 4a²  |  Diagonal = a√3',
      cuboid: 'Volume = lwh  |  TSA = 2(lw + lh + wh)  |  LSA = 2h(l + w)',
      cylinder: 'Volume = πr²h  |  TSA = 2πr(r + h)  |  LSA = 2πrh',
      sphere: 'Volume = 4/3πr³  |  SA = 4πr²',
      hemisphere: 'Volume = 2/3πr³  |  TSA = 3πr²  |  LSA = 2πr²',
      cone: 'Volume = ⅓πr²h  |  TSA = πr(r + l)  |  LSA = πrl',
      prism: 'Volume = Base Area × h  |  TSA = 2·Base + Lateral',
      pyramid: 'Volume = ⅓·Base·h  |  TSA = Base + Lateral',
      'triangular-prism': 'Volume = Triangle Area × Length  |  TSA = 2·Area + Lateral',
      'square-pyramid': 'Volume = ⅓s²h  |  TSA = s² + 2sl',
    };
    return (mode === '2d' ? f2d[s] : f3d[s]) || 'Select a shape';
  }, [mode, shape]);

  // Field definition per shape
  const fieldsForShape = useMemo(() => {
    const s = shape;
    if (mode === '2d') {
      switch (s) {
        case 'rectangle': return [
          { key: 'length', label: 'Length' }, { key: 'width', label: 'Width' },
        ];
        case 'square': return [{ key: 'side', label: 'Side' }];
        case 'triangle': return [
          { key: 'sideA', label: 'Side A' }, { key: 'sideB', label: 'Side B' }, { key: 'sideC', label: 'Side C' },
        ];
        case 'circle': return [{ key: 'radius', label: 'Radius' }];
        case 'semicircle': return [{ key: 'radius', label: 'Radius' }];
        case 'parallelogram': return [
          { key: 'base', label: 'Base' }, { key: 'height', label: 'Height' }, { key: 'side', label: 'Side' },
        ];
        case 'trapezoid': return [
          { key: 'base1', label: 'Base 1' }, { key: 'base2', label: 'Base 2' }, { key: 'height', label: 'Height' }, { key: 'side1', label: 'Side 1' }, { key: 'side2', label: 'Side 2' },
        ];
        case 'rhombus': return [
          { key: 'd1', label: 'Diagonal 1' }, { key: 'd2', label: 'Diagonal 2' }, { key: 'side', label: 'Side' },
        ];
        case 'kite': return [
          { key: 'd1', label: 'Diagonal 1' }, { key: 'd2', label: 'Diagonal 2' }, { key: 'a', label: 'Side A' }, { key: 'b', label: 'Side B' },
        ];
        case 'ellipse': return [
          { key: 'a', label: 'Semi-major Axis (a)' }, { key: 'b', label: 'Semi-minor Axis (b)' },
        ];
        case 'regular-polygon': return [
          { key: 'n', label: 'Number of Sides (n)' }, { key: 's', label: 'Side Length (s)' },
        ];
        default: return [];
      }
    } else {
      switch (s) {
        case 'cube': return [{ key: 'side', label: 'Side' }];
        case 'cuboid': return [
          { key: 'length', label: 'Length' }, { key: 'width', label: 'Width' }, { key: 'height', label: 'Height' },
        ];
        case 'cylinder': return [
          { key: 'radius', label: 'Radius' }, { key: 'height', label: 'Height' },
        ];
        case 'sphere': return [{ key: 'radius', label: 'Radius' }];
        case 'hemisphere': return [{ key: 'radius', label: 'Radius' }];
        case 'cone': return [
          { key: 'radius', label: 'Radius' }, { key: 'height', label: 'Height' }, { key: 'slant', label: 'Slant Height' },
        ];
        case 'prism': return [
          { key: 'baseArea', label: 'Base Area' }, { key: 'h3', label: 'Height' },
        ];
        case 'pyramid': return [
          { key: 'baseArea', label: 'Base Area' }, { key: 'h3', label: 'Height' },
        ];
        case 'triangular-prism': return [
          { key: 'sideA', label: 'Side A' }, { key: 'sideB', label: 'Side B' }, { key: 'sideC', label: 'Side C' }, { key: 'length', label: 'Length' },
        ];
        case 'square-pyramid': return [
          { key: 'side', label: 'Base Side' }, { key: 'h3', label: 'Height' },
        ];
        default: return [];
      }
    }
  }, [mode, shape]);

  return (
    <CalculatorActions calculatorId="geometry" result={result as any} inputs={{ mode, shape, ...inputs } as any}>
      <div className="glass-card p-6 md:p-8">
        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-1">Geometry Calculator</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Calculate area, perimeter, volume, and more for 2D and 3D shapes.</p>
        </div>

        {/* Top-level 2D / 3D toggle */}
        <div className="mb-6">
          <SegmentedControl
            label="Shape Mode"
            options={[
              { label: '2D Shapes', value: '2d' },
              { label: '3D Shapes', value: '3d' },
            ]}
            value={mode}
            onChange={(v: string) => handleModeChange(v as Mode)}
            size="md"
          />
        </div>

        {/* Shape dropdown — updates based on mode */}
        <div className="mb-6">
          <label htmlFor="geometry-shape" className="text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase block mb-2">Shape</label>
          <select
            id="geometry-shape"
            value={shape}
            onChange={(e) => handleShapeChange(e.target.value)}
            className="w-full px-5 py-3 rounded-2xl text-base font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50 transition-all"
          >
            {shapes.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Dynamic inputs — 2-column desktop, 1-column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {fieldsForShape.map((f) => (
            <div key={f.key} className="space-y-2">
              <label htmlFor={`geo-${f.key}`} className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{f.label}</label>
              <input
                id={`geo-${f.key}`}
                type="number"
                step="0.01"
                value={inputs[f.key] ?? ''}
                onChange={(e) => update(f.key, e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-base font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50 transition-all"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <ResultFrame show={Object.keys(result).length > 0 && !('Error' in result && result.Error === 'Invalid triangle: sides violate triangle inequality')} delay={0.1}>
          <div className="mt-4">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(result).map(([key, value], i) => (
                <AnimatedResultCard
                  key={key}
                  label={key}
                  value={String(value)}
                  delay={i * 0.05}
                  gradient="from-brand-sapphire/10 to-blue-500/5"
                />
              ))}
            </div>
          </div>
        </ResultFrame>

        {/* Formula Insight — only current shape formulas, bold & prominent */}
        <div className="rounded-2xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 mt-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide">Formula Insight</h4>
          <div className="font-extrabold text-xl md:text-2xl text-brand-sapphire dark:text-brand-sapphire font-mono leading-snug whitespace-pre-line bg-brand-sapphire/10 dark:bg-brand-sapphire/20 rounded-xl px-4 py-3">{insight}</div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Formulas shown correspond to the selected {mode === '2d' ? '2D' : '3D'} shape only.</p>
        </div>
      </div>
    </CalculatorActions>
  );
}
