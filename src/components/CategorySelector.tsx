'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CALCULATORS } from '@/lib/store';
import { CalculatorRenderer } from '@/app/[slug]/CalculatorRenderer';

interface SubCalculator {
  id: string;
  title: string;
  href: string;
  slug: string;
  description: string;
}

interface ParentCategory {
  id: string;
  label: string;
  subcategories: SubCalculator[];
}

const toSub = (c: (typeof CALCULATORS)[number], strip: RegExp): SubCalculator => ({
  id: c.id,
  title: c.title.replace(strip, ''),
  href: c.href,
  slug: c.href.replace(/^\//, ''),
  description: c.description,
});

/**
 * Two-level category selector.
 * Level 1 picks a parent category; level 2 slides in that category's calculators.
 * Fully data-driven — derived from the CALCULATORS registry in @/lib/store.
 */
const PARENT_CATEGORIES: ParentCategory[] = [
  {
    id: 'mathematics',
    label: 'Mathematics',
    subcategories: CALCULATORS.filter((c) => c.category === 'math').map((c) => toSub(c, / Calculator$| Solver$/)),
  },
  {
    id: 'finance',
    label: 'Finance',
    subcategories: CALCULATORS.filter((c) => c.category === 'finance').map((c) => toSub(c, / Calculator$/)),
  },
  {
    id: 'health',
    label: 'Health',
    subcategories: CALCULATORS.filter((c) => c.category === 'health').map((c) => toSub(c, / Calculator$| Tracker$/)),
  },
  {
    id: 'date-time',
    label: 'Date & Time',
    subcategories: CALCULATORS.filter((c) => c.category === 'date-time').map((c) => toSub(c, / Calculator$| Converter$/)),
  },
  {
    id: 'conversions',
    label: 'Conversions',
    subcategories: CALCULATORS.filter((c) => c.category === 'conversion').map((c) => toSub(c, / Converter$/)),
  },
];

// Apple-style spring: fast settle, slight overshoot
const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 34, mass: 0.9 } as const;

interface CategorySelectorProps {
  /** Called when a sub-calculator is selected (no page navigation). */
  onCalculatorSelect?: (calc: SubCalculator) => void;
  /** Initially active parent category id. */
  defaultCategory?: string;
  /** Render the selected calculator below the selector. Default: true. */
  renderCalculator?: boolean;
}

export function CategorySelector({
  onCalculatorSelect,
  defaultCategory,
  renderCalculator = true,
}: CategorySelectorProps) {
  const [activeParent, setActiveParent] = useState(defaultCategory || PARENT_CATEGORIES[0].id);
  const [activeCalculator, setActiveCalculator] = useState<SubCalculator | null>(null);

  const currentCategory =
    PARENT_CATEGORIES.find((cat) => cat.id === activeParent) || PARENT_CATEGORIES[0];

  // Reset the sub-selection whenever the parent category changes
  useEffect(() => {
    setActiveCalculator(null);
  }, [activeParent]);

  const handleCalculatorClick = (calc: SubCalculator) => {
    setActiveCalculator(calc);
    onCalculatorSelect?.(calc);
  };

  return (
    <div className="w-full space-y-4">
      {/* Level 1 — Parent Categories */}
      <div
        role="tablist"
        aria-label="Calculator categories"
        className="flex gap-2 overflow-x-auto scrollbar-hide"
      >
        {PARENT_CATEGORIES.map((category) => {
          const isActive = activeParent === category.id;
          return (
            <button
              key={category.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveParent(category.id)}
              className={`relative shrink-0 px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap
                transition-colors duration-200 focus-visible:outline-2
                ${isActive
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              {isActive && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-xl shadow-lg bg-gradient-to-br from-brand-sapphire to-brand-indigo"
                  transition={PILL_SPRING}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Level 2 — Sub-calculators (slides when the parent changes) */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeParent}
          role="tablist"
          aria-label={`${currentCategory.label} calculators`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="flex gap-2 overflow-x-auto scrollbar-hide"
        >
          {currentCategory.subcategories.map((calc) => {
            const isActive = activeCalculator?.id === calc.id;
            return (
              <button
                key={calc.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCalculatorClick(calc)}
                className={`relative shrink-0 px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap
                  transition-colors duration-200 focus-visible:outline-2
                  ${isActive
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="calculator-pill"
                    className="absolute inset-0 rounded-lg shadow-md bg-brand-gold"
                    transition={PILL_SPRING}
                  />
                )}
                <span className="relative z-10">{calc.title}</span>
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Selected calculator, rendered in place — no page reload */}
      {renderCalculator && (
        <AnimatePresence mode="wait">
          {activeCalculator && (
            <motion.div
              key={activeCalculator.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="pt-4"
            >
              <CalculatorRenderer slug={activeCalculator.slug} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
