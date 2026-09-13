'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'number' | 'text' | 'date';
  min?: string;
  max?: string;
  step?: string;
  placeholder?: string;
  suffix?: string;
  prefix?: string;
  showRange?: boolean;
  rangeMin?: number;
  rangeMax?: number;
  rangeStep?: number;
  helpText?: string;
}

export function ModernInput({
  label,
  value,
  onChange,
  type = 'number',
  min,
  max,
  step,
  placeholder,
  suffix,
  prefix,
  showRange = false,
  rangeMin = 0,
  rangeMax = 100,
  rangeStep = 1,
  helpText,
}: ModernInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const numericValue = parseFloat(value) || 0;

  return (
    <div className="space-y-3">
      {/* Label with live value */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase">
          {label}
        </label>
        {suffix && value && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-brand-sapphire to-blue-600 text-white text-sm font-bold shadow-md"
          >
            {prefix}{numericValue.toLocaleString('en-IN')}{suffix}
          </motion.div>
        )}
      </div>

      {/* Range Slider */}
      {showRange && type === 'number' && (
        <div className="relative">
          <input
            type="range"
            min={rangeMin}
            max={rangeMax}
            step={rangeStep}
            value={value || rangeMin}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-3 rounded-full appearance-none cursor-pointer transition-all
              bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200
              dark:from-gray-700 dark:via-gray-700 dark:to-gray-700
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gradient-to-br
              [&::-webkit-slider-thumb]:from-brand-sapphire
              [&::-webkit-slider-thumb]:to-blue-700
              [&::-webkit-slider-thumb]:shadow-xl
              [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:active:cursor-grabbing
              [&::-webkit-slider-thumb]:active:scale-95
              [&::-moz-range-thumb]:w-6
              [&::-moz-range-thumb]:h-6
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-gradient-to-br
              [&::-moz-range-thumb]:from-brand-sapphire
              [&::-moz-range-thumb]:to-blue-700
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:shadow-xl
              [&::-moz-range-thumb]:cursor-grab"
            style={{
              background: `linear-gradient(to right,
                #0F52BA 0%,
                #0F52BA ${((numericValue - rangeMin) / (rangeMax - rangeMin)) * 100}%,
                rgb(229 231 235) ${((numericValue - rangeMin) / (rangeMax - rangeMin)) * 100}%,
                rgb(229 231 235) 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            <span>{rangeMin.toLocaleString('en-IN')}</span>
            <span>{rangeMax.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Text Input with modern glass effect */}
      <motion.div
        animate={{
          scale: isFocused ? 1.005 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative group"
      >
        <div className={`
          relative overflow-hidden rounded-2xl
          transition-all duration-300
          ${isFocused
            ? 'shadow-2xl shadow-brand-sapphire/20 dark:shadow-brand-sapphire/40'
            : 'shadow-md'
          }
        `}>
          {/* Gradient border effect */}
          <div className={`
            absolute inset-0 rounded-2xl p-[2px]
            bg-gradient-to-br transition-opacity duration-300
            ${isFocused
              ? 'from-brand-sapphire via-blue-500 to-brand-indigo opacity-100'
              : 'from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 opacity-100'
            }
          `}>
            <div className="h-full w-full rounded-2xl bg-white dark:bg-gray-900" />
          </div>

          {/* Input wrapper */}
          <div className="relative">
            {prefix && (
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-bold text-base pointer-events-none z-10">
                {prefix}
              </div>
            )}

            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              min={min}
              max={max}
              step={step}
              placeholder={placeholder}
              className={`
                relative w-full px-5 py-4 text-lg font-semibold
                bg-transparent
                text-gray-900 dark:text-white
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:outline-none
                transition-all duration-200
                ${prefix ? 'pl-10' : ''}
                ${suffix && !showRange ? 'pr-16' : ''}
              `}
            />

            {suffix && !showRange && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-bold text-base pointer-events-none">
                {suffix}
              </div>
            )}
          </div>
        </div>

        {/* Glow effect on focus */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-sapphire/20 to-blue-500/20 blur-xl -z-10"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Help Text */}
      {helpText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 pl-1">
          💡 {helpText}
        </p>
      )}
    </div>
  );
}
