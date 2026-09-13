'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
}: AppleSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return value;
      const rect = trackRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.min(Math.max(x / rect.width, 0), 1);
      const raw = min + pct * (max - min);
      const stepped = Math.round(raw / step) * step;
      return Math.min(Math.max(stepped, min), max);
    },
    [min, max, step, value]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setShowBubble(true);
      const newVal = getValueFromPosition(e.clientX);
      onChange(newVal);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [getValueFromPosition, onChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const newVal = getValueFromPosition(e.clientX);
      onChange(newVal);
    },
    [isDragging, getValueFromPosition, onChange]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setShowBubble(false), 800);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          onChange(Math.min(value + step, max));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          onChange(Math.max(value - step, min));
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDragging, value, step, min, max, onChange]);

  const formattedValue = (v: number) => {
    if (step < 1) return v.toFixed(step < 0.1 ? 1 : (step < 1 ? 1 : 0));
    return v.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-3">
      {/* Label + live value */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-900 dark:text-white tracking-wide uppercase">
          {label}
        </label>
        {showValue && (
          <motion.span
            key={value}
            initial={{ scale: 0.96, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-brand-sapphire to-blue-600 text-white text-sm font-bold shadow-md"
          >
            {prefix}{formattedValue(value)}{suffix}
          </motion.span>
        )}
      </div>

      {/* Slider Track */}
      <div className="relative py-4 touch-none select-none" style={{ touchAction: 'none' }}>
        {/* Bubble */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
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

        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-3 rounded-full cursor-pointer group"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          tabIndex={0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault();
              onChange(Math.min(value + step, max));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault();
              onChange(Math.max(value - step, min));
            }
          }}
          onFocus={() => setShowBubble(true)}
          onBlur={() => { if (!isDragging) setTimeout(() => setShowBubble(false), 600); }}
        >
          {/* Background */}
          <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors" />
          {/* Fill */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-sapphire to-blue-500"
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            style={{ width: `${percentage}%` }}
          />
          {/* Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            style={{ left: `${percentage}%` }}
            animate={{
              scale: isDragging ? 1.15 : 1,
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className={`
              w-7 h-7 rounded-full bg-white dark:bg-gray-100
              shadow-xl shadow-brand-sapphire/30
              border-[3px] border-brand-sapphire
              transition-shadow duration-200
              ${isDragging ? 'shadow-2xl shadow-brand-sapphire/50' : 'group-hover:shadow-lg group-hover:shadow-brand-sapphire/40'}
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
