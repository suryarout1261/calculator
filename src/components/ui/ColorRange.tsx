'use client';

import { motion } from 'framer-motion';

interface RangeZone {
  min: number;
  max: number;
  color: string;
  bgColor: string;
  label: string;
}

interface ColorRangeProps {
  value: number;
  min: number;
  max: number;
  zones: RangeZone[];
  label?: string;
  showLabels?: boolean;
  height?: string;
  showMarker?: boolean;
  markerLabel?: string;
}

function getZoneForValue(value: number, zones: RangeZone[]): RangeZone | null {
  for (const z of zones) {
    if (value >= z.min && value <= z.max) return z;
  }
  return zones[zones.length - 1] ?? null;
}

function getMarkerPosition(value: number, min: number, max: number): number {
  return Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
}

export function ColorRange({
  value,
  min,
  max,
  zones,
  label,
  showLabels = true,
  height = 'h-4',
  showMarker = true,
  markerLabel,
}: ColorRangeProps) {
  const position = getMarkerPosition(value, min, max);
  const activeZone = getZoneForValue(value, zones);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wide">
            {label}
          </span>
          {activeZone && (
            <motion.span
              key={activeZone.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="text-xs font-bold px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: activeZone.bgColor, color: activeZone.color }}
            >
              {activeZone.label}
            </motion.span>
          )}
        </div>
      )}

      {/* Segmented bar */}
      <div className={`relative ${height} rounded-full overflow-hidden flex overflow-x-clip`}>
        {zones.map((zone, i) => {
          const zoneWidth = ((zone.max - zone.min) / (max - min)) * 100;
          return (
            <motion.div
              key={i}
              className={`${height} transition-opacity duration-300`}
              style={{
                width: `${zoneWidth}%`,
                backgroundColor: zone.bgColor,
                opacity: activeZone?.label === zone.label ? 1 : 0.55,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.32, 0.72, 0, 1] }}
            />
          );
        })}

        {/* Marker */}
        {showMarker && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-10"
            initial={{ left: '0%' }}
            animate={{ left: `${position}%` }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            <div className="relative -translate-x-1/2">
              <div className="w-5 h-5 rounded-full bg-white dark:bg-gray-100 border-2 border-gray-800 dark:border-gray-700 shadow-xl" />
              {markerLabel && (
                <div
                  className="absolute -top-8 -translate-x-1/2 whitespace-nowrap max-w-[90vw] text-xs font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-2 py-0.5 rounded-md shadow-lg"
                  style={{ left: `clamp(20%, ${position}%, 80%)` }}
                >
                  {markerLabel}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Zone labels */}
      {showLabels && (
        <div className="flex justify-between">
          {zones.map((zone, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.bgColor }} />
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                {zone.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Pre-defined zone configs for common calculators */
export const BMI_ZONES: RangeZone[] = [
  { min: 10, max: 18.5, color: '#2563eb', bgColor: '#dbeafe', label: 'Underweight' },
  { min: 18.5, max: 25, color: '#16a34a', bgColor: '#dcfce7', label: 'Normal' },
  { min: 25, max: 30, color: '#ca8a04', bgColor: '#fef9c3', label: 'Overweight' },
  { min: 30, max: 45, color: '#dc2626', bgColor: '#fee2e2', label: 'Obese' },
];

export const BODY_FAT_MALE_ZONES: RangeZone[] = [
  { min: 2, max: 6, color: '#dc2626', bgColor: '#fee2e2', label: 'Essential' },
  { min: 6, max: 14, color: '#2563eb', bgColor: '#dbeafe', label: 'Athletic' },
  { min: 14, max: 18, color: '#16a34a', bgColor: '#dcfce7', label: 'Fitness' },
  { min: 18, max: 25, color: '#ca8a04', bgColor: '#fef9c3', label: 'Average' },
  { min: 25, max: 40, color: '#dc2626', bgColor: '#fee2e2', label: 'Obese' },
];

export const BODY_FAT_FEMALE_ZONES: RangeZone[] = [
  { min: 10, max: 14, color: '#dc2626', bgColor: '#fee2e2', label: 'Essential' },
  { min: 14, max: 21, color: '#2563eb', bgColor: '#dbeafe', label: 'Athletic' },
  { min: 21, max: 25, color: '#16a34a', bgColor: '#dcfce7', label: 'Fitness' },
  { min: 25, max: 32, color: '#ca8a04', bgColor: '#fef9c3', label: 'Average' },
  { min: 32, max: 45, color: '#dc2626', bgColor: '#fee2e2', label: 'Obese' },
];

export const HEART_RATE_ZONES: RangeZone[] = [
  { min: 40, max: 96, color: '#6b7280', bgColor: '#f3f4f6', label: 'Warm-up' },
  { min: 96, max: 115, color: '#2563eb', bgColor: '#dbeafe', label: 'Fat Burn' },
  { min: 115, max: 134, color: '#16a34a', bgColor: '#dcfce7', label: 'Cardio' },
  { min: 134, max: 153, color: '#ca8a04', bgColor: '#fef9c3', label: 'Hard' },
  { min: 153, max: 191, color: '#dc2626', bgColor: '#fee2e2', label: 'Peak' },
];
