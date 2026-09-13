'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface AppleSelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  helpText?: string;
}

export function AppleSelect({ label, value, options, onChange, helpText }: AppleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(options.findIndex((o) => o.value === value));
      }
      return;
    }
    if (e.key === 'Escape') { setIsOpen(false); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const opt = options[focusedIndex];
      if (opt) { onChange(opt.value); setIsOpen(false); }
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase">
          {label}
        </label>
      )}
      <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
        {/* Trigger button */}
        <button
          type="button"
          onClick={() => { setIsOpen(!isOpen); setFocusedIndex(Math.max(0, options.findIndex((o) => o.value === value))); }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`
            w-full flex items-center justify-between
            px-5 py-4 rounded-2xl text-left
            text-base font-semibold text-gray-900 dark:text-white
            bg-white dark:bg-gray-900
            transition-all duration-300
            ${isOpen
              ? 'shadow-2xl shadow-brand-sapphire/20 ring-2 ring-brand-sapphire/50'
              : 'shadow-md hover:shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-brand-sapphire/40'
            }
          `}
        >
          <div>
            <span>{selected?.label ?? 'Select...'}</span>
            {selected?.description && (
              <span className="block text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">
                {selected.description}
              </span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className="absolute z-20 top-full left-0 right-0 mt-2 py-2 rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-700 max-h-64 overflow-y-auto origin-top"
                role="listbox"
              >
                {options.map((opt, i) => {
                  const isSelected = opt.value === value;
                  const isFocused = i === focusedIndex;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setFocusedIndex(i)}
                      onClick={() => { onChange(opt.value); setIsOpen(false); }}
                      className={`
                        w-full flex items-center justify-between px-5 py-3 text-left transition-colors
                        ${isFocused ? 'bg-brand-sapphire/10 dark:bg-brand-sapphire/20' : ''}
                      `}
                    >
                      <div>
                        <span className={`text-sm font-semibold ${isSelected ? 'text-brand-sapphire' : 'text-gray-900 dark:text-gray-100'}`}>
                          {opt.label}
                        </span>
                        {opt.description && (
                          <span className="block text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">
                            {opt.description}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                        >
                          <Check className="w-4 h-4 text-brand-sapphire" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {helpText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 pl-1">💡 {helpText}</p>
      )}
    </div>
  );
}
