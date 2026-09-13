'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedResultCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  sublabel?: string;
  color?: string;
  gradient?: string;
  icon?: ReactNode;
  delay?: number;
  badge?: string;
  badgeColor?: string;
}

export function AnimatedResultCard({
  label,
  value,
  suffix,
  sublabel,
  color = 'text-brand-sapphire',
  gradient = 'from-brand-sapphire/10 to-blue-500/5',
  icon,
  delay = 0,
  badge,
  badgeColor = 'bg-brand-sapphire/10 text-brand-sapphire',
}: AnimatedResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        duration: 0.35,
        ease: [0.32, 0.72, 0, 1],
      }}
      whileHover={{ y: -2 }}
      className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${gradient} border border-white/10 dark:border-gray-700/50 ring-1 ring-inset ring-white/20 dark:ring-gray-800`}
    >
      {/* Ambient glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-current opacity-10 blur-3xl" />

      <div className="relative flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            {icon}
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
            <AnimatedValue display={typeof value === 'number' ? value.toLocaleString('en-IN') : value} />
            {suffix && (
              <span className="text-lg sm:text-xl font-black text-gray-500 dark:text-gray-400">{suffix}</span>
            )}
          </div>
          {sublabel && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{sublabel}</p>
          )}
        </div>
        {badge && (
          <span className={`text-xs sm:text-sm font-black px-3 py-1.5 rounded-full whitespace-nowrap ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* Counts/slides to the new value with a smooth animation on change */
export function AnimatedValue({ display }: { display: string }) {
  return (
    <span className="font-display text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tabular-nums leading-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="inline-block"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* A shared result card that animates its whole frame in/out */
export function ResultFrame({ children, show, delay = 0 }: { children: ReactNode; show: boolean; delay?: number }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, scale: 0.98 }}
          animate={{ opacity: 1, height: 'auto', scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.98 }}
          transition={{ delay, duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="overflow-hidden"
        >
          <div className="spacious-result pt-1">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}