'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface AppleSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  showValue?: boolean;
  helpText?: string;
  editableInput?: boolean;
  showSteppers?: boolean;
}

export function AppleSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = '',
  prefix = '',
  showValue = true,
  helpText,
  editableInput = true,
  showSteppers = true,
}: AppleSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));
  const trackRef = useRef<HTMLDivElement>(null);

  const precision = step.toString().includes('.') ? step.toString().split('.')[1].length : (step < 1 ? 1 : 0);

  const cleanNumber = useCallback(
    (v: number) => {
      const clamped = Math.min(Math.max(v, min), max);
      return parseFloat(clamped.toFixed(precision));
    },
    [min, max, precision]
  );

  // Sync internal string input when value changes externally (and user isn't currently typing)
  useEffect(() => {
    if (!isFocused) {
      setInputValue(String(value));
    }
  }, [value, isFocused]);

  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;
      const x = clientX - rect.left;
      const pct = Math.min(Math.max(x / rect.width, 0), 1);
      const raw = min + pct * (max - min);
      const stepsCount = Math.round((raw - min) / step);
      const stepped = min + stepsCount * step;
      const finalVal = cleanNumber(stepped);
      onChange(finalVal);
    },
    [min, max, step, cleanNumber, onChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      setIsDragging(true);
      setShowBubble(true);
      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      updateFromClientX(e.clientX);
    },
    [isDragging, updateFromClientX]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isDragging) {
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {}
        setIsDragging(false);
        setTimeout(() => setShowBubble(false), 600);
      }
    },
    [isDragging]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawStr = e.target.value;
    // Allow empty or partial inputs like "-" or "7."
    setInputValue(rawStr);
    const parsed = parseFloat(rawStr);
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min), max);
      onChange(parseFloat(clamped.toFixed(precision)));
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed)) {
      setInputValue(String(value));
    } else {
      const finalVal = cleanNumber(parsed);
      onChange(finalVal);
      setInputValue(String(finalVal));
    }
  };

  const handleStepDelta = (delta: number) => {
    const newVal = cleanNumber(value + delta * step);
    onChange(newVal);
    setInputValue(String(newVal));
  };

  useEffect(() => {
    if (isDragging) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          handleStepDelta(1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          handleStepDelta(-1);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDragging, handleStepDelta]);

  const formattedValue = (v: number) => {
    if (precision > 0) return v.toFixed(precision);
    return v.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-3">
      {/* Label + live value / editable input box */}
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
        <label className="text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase">
          {label}
        </label>

        {showValue && (
          editableInput ? (
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl p-1 shadow-sm focus-within:ring-2 focus-within:ring-brand-sapphire/50 focus-within:border-brand-sapphire transition">
              {showSteppers && (
                <button
                  type="button"
                  onClick={() => handleStepDelta(-1)}
                  disabled={value <= min}
                  aria-label={`Decrease ${label}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="flex items-center px-1">
                {prefix && <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-0.5">{prefix}</span>}
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*[.]?[0-9]*"
                  value={inputValue}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  aria-label={`${label} input`}
                  className="w-16 sm:w-20 text-center font-bold text-base sm:text-lg text-gray-900 dark:text-white bg-transparent outline-none focus:ring-0 p-0"
                />
                {suffix && (
                  <span className="text-xs font-bold text-brand-sapphire dark:text-blue-400 ml-1 select-none">
                    {suffix.trim()}
                  </span>
                )}
              </div>
              {showSteppers && (
                <button
                  type="button"
                  onClick={() => handleStepDelta(1)}
                  disabled={value >= max}
                  aria-label={`Increase ${label}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <motion.span
              key={value}
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-brand-sapphire to-blue-600 text-white text-sm font-bold shadow-md"
            >
              {prefix}{formattedValue(value)}{suffix}
            </motion.span>
          )
        )}
      </div>

      {/* Slider Track (Optimized for both touch & pointer precision) */}
      <div className="relative py-4 touch-none select-none" style={{ touchAction: 'none' }}>
        {/* Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
              className="absolute -top-2 z-20 pointer-events-none"
              style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
            >
              <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap">
                {prefix}{formattedValue(value)}{suffix}
              </div>
              <div className="w-2 h-2 bg-gray-900 dark:bg-white rotate-45 mx-auto -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Track Container */}
        <div
          ref={trackRef}
          className="relative h-4 rounded-full cursor-pointer group flex items-center"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          tabIndex={0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault();
              handleStepDelta(1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault();
              handleStepDelta(-1);
            }
          }}
          onFocus={() => setShowBubble(true)}
          onBlur={() => { if (!isDragging) setTimeout(() => setShowBubble(false), 400); }}
        >
          {/* Background Bar */}
          <div className="absolute inset-x-0 h-3 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors" />

          {/* Active Fill Bar */}
          <motion.div
            className="absolute left-0 h-3 rounded-full bg-gradient-to-r from-brand-sapphire to-blue-500 pointer-events-none"
            layout
            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            style={{ width: `${percentage}%` }}
          />

          {/* Draggable Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 pointer-events-none"
            style={{ left: `${percentage}%` }}
            animate={{
              scale: isDragging ? 1.2 : 1,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className={`
              w-7 h-7 rounded-full bg-white dark:bg-gray-100
              shadow-xl shadow-brand-sapphire/30
              border-[3px] border-brand-sapphire
              transition-shadow duration-200
              ${isDragging ? 'shadow-2xl shadow-brand-sapphire/60 ring-4 ring-brand-sapphire/20' : 'group-hover:shadow-lg group-hover:shadow-brand-sapphire/40'}
              cursor-grab active:cursor-grabbing
            `} />
          </motion.div>
        </div>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
        <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
      </div>

      {/* Help text */}
      {helpText && (
        <p className="text-xs text-gray-500 dark:text-gray-400 pl-1">💡 {helpText}</p>
      )}
    </div>
  );
}
