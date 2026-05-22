'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorActions } from './CalculatorActions';
import { useAppStore } from '@/lib/store';

export function AlgebraSolver() {
  const [equation, setEquation] = useState('2x + 5 = 15');
  const [result, setResult] = useState<{ solution: string; steps: string[] } | null>(null);
  const { addToHistory } = useAppStore();

  const solve = () => {
    const eq = equation.trim();
    if (!eq) return;

    try {
      // Parse linear equations: ax + b = c or ax = c or x + b = c
      const steps: string[] = [];
      let solution = '';

      // Handle format: ax + b = c
      const match1 = eq.match(/^(-?\d*\.?\d*)?\s*x\s*([+-]\s*\d+\.?\d*)?\s*=\s*(-?\d+\.?\d*)$/);
      // Handle format: c = ax + b
      const match2 = eq.match(/^(-?\d+\.?\d*)\s*=\s*(-?\d*\.?\d*)?\s*x\s*([+-]\s*\d+\.?\d*)?$/);
      // Handle format: ax + b = cx + d
      const match3 = eq.match(/^(-?\d*\.?\d*)?\s*x\s*([+-]\s*\d+\.?\d*)?\s*=\s*(-?\d*\.?\d*)?\s*x\s*([+-]\s*\d+\.?\d*)?$/);

      if (match1) {
        const a = match1[1] ? parseFloat(match1[1]) || 1 : 1;
        const b = match1[2] ? parseFloat(match1[2].replace(/\s/g, '')) : 0;
        const c = parseFloat(match1[3]);

        steps.push(`Original: ${a === 1 ? '' : a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${c}`);
        if (b !== 0) {
          steps.push(`Subtract ${b > 0 ? b : `(${b})`} from both sides: ${a === 1 ? '' : a}x = ${c - b}`);
        }
        if (a !== 1) {
          steps.push(`Divide both sides by ${a}: x = ${(c - b) / a}`);
        }
        const x = (c - b) / a;
        solution = `x = ${Math.round(x * 10000) / 10000}`;
        steps.push(`Solution: ${solution}`);
      } else if (match2) {
        const c = parseFloat(match2[1]);
        const a = match2[2] ? parseFloat(match2[2]) || 1 : 1;
        const b = match2[3] ? parseFloat(match2[3].replace(/\s/g, '')) : 0;
        const x = (c - b) / a;
        steps.push(`Rearrange: ${a === 1 ? '' : a}x = ${c} - ${b}`);
        steps.push(`x = ${c - b} / ${a}`);
        solution = `x = ${Math.round(x * 10000) / 10000}`;
        steps.push(`Solution: ${solution}`);
      } else {
        // Try quadratic: ax² + bx + c = 0
        const quadMatch = eq.match(/^(-?\d*\.?\d*)?\s*x\^?2?\s*([+-]\s*\d*\.?\d*)?\s*x?\s*([+-]\s*\d+\.?\d*)?\s*=\s*0$/);
        if (quadMatch) {
          const a = quadMatch[1] ? parseFloat(quadMatch[1]) || 1 : 1;
          const b = quadMatch[2] ? parseFloat(quadMatch[2].replace(/\s/g, '')) : 0;
          const c = quadMatch[3] ? parseFloat(quadMatch[3].replace(/\s/g, '')) : 0;
          const discriminant = b * b - 4 * a * c;
          steps.push(`Quadratic: ${a}x² + ${b}x + ${c} = 0`);
          steps.push(`Discriminant: b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`);
          if (discriminant >= 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            steps.push(`x = (-b ± √D) / 2a`);
            solution = discriminant === 0 ? `x = ${Math.round(x1 * 1000) / 1000}` : `x₁ = ${Math.round(x1 * 1000) / 1000}, x₂ = ${Math.round(x2 * 1000) / 1000}`;
          } else {
            solution = 'No real solutions (complex roots)';
          }
          steps.push(`Solution: ${solution}`);
        } else {
          // Simple evaluation: try basic arithmetic
          steps.push(`Attempting to solve: ${eq}`);
          solution = 'Enter a linear equation like "2x + 5 = 15" or "3x - 7 = 20"';
          steps.push('Supported: ax + b = c, quadratic ax² + bx + c = 0');
        }
      }

      setResult({ solution, steps });
      addToHistory({ calculatorId: 'algebra', calculatorTitle: 'Algebra Solver', inputs: { equation: eq }, result: { Solution: solution } });
    } catch {
      setResult({ solution: 'Could not parse equation', steps: ['Please enter a valid equation'] });
    }
  };

  return (
    <CalculatorActions calculatorId="algebra" result={result ? { Solution: result.solution } : null} inputs={{ equation }}>
      <div className="glass-card p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter Equation</label>
          <input type="text" value={equation} onChange={(e) => setEquation(e.target.value)}
            placeholder="e.g., 2x + 5 = 15"
            className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-mono focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50"
            onKeyDown={(e) => e.key === 'Enter' && solve()}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Supports: linear (2x + 5 = 15), quadratic (x² - 5x + 6 = 0)</p>
        </div>
        <button onClick={solve} className="btn-primary w-full text-center">Solve Equation</button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="p-6 rounded-xl bg-brand-sapphire/10 text-center mb-6">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Solution</p>
              <p className="font-display text-3xl font-bold text-brand-sapphire font-mono">{result.solution}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 text-gray-700 dark:text-gray-300">Step-by-Step:</h4>
              <div className="space-y-2">
                {result.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-sapphire/20 text-brand-sapphire text-xs flex items-center justify-center font-bold">{i + 1}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorActions>
  );
}

