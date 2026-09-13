'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
}: SegmentedControlProps<T>) {
  const instanceId = useId();
  const selectedIndex = options.findIndex((o) => o.value === value);
  const count = options.length;
  const segmentWidth = 100 / count;

  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2.5 px-4',
    lg: 'text-base py-3 px-6',
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 shadow-inner w-full overflow-x-auto sm:overflow-visible" style={{ minHeight: '48px', scrollbarWidth: 'thin' }}>
        {/* Active pill — dynamic width and position based on option count */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-xl bg-white dark:bg-gray-700 shadow-md z-0"
          layoutId={`segmented-bg-shared`}
          initial={false}
          animate={{
            left: `calc(${selectedIndex * (100/count)}% + 0.25rem)`,
            width: `calc(${100/count}% - 0.5rem)`,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />

        {/* Options */}
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`
                relative z-10 flex items-center justify-center gap-2 font-semibold transition-colors duration-200 py-3 px-2 whitespace-normal sm:whitespace-nowrap flex-shrink sm:flex-shrink-0
                ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}
              `}
              style={{ minHeight: '48px', flexBasis: `${segmentWidth}%`, minWidth: 0 }}
            >
              {opt.icon && (
                <motion.div
                  animate={{ scale: isSelected ? 1.05 : 1 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                >
                  {opt.icon}
                </motion.div>
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
