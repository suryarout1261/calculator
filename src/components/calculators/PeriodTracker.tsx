'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Droplets, Heart, Moon, Activity, Sparkles } from 'lucide-react';

interface CycleEntry {
  startDate: string;
  cycleLength: number;
  periodLength: number;
}

export function PeriodTrackerApp() {
  const { locale, dict } = useI18n();

  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().slice(0, 10));
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [result, setResult] = useState<{
    nextPeriod: string; ovulationDate: string;
    fertileStart: string; fertileEnd: string;
    currentDay: number; phase: string;
    daysUntilPeriod: number;
  } | null>(null);

  const calculate = () => {
    const start = new Date(lastPeriod);
    const cycle = parseInt(cycleLength) || 28;
    const period = parseInt(periodLength) || 5;
    const today = new Date();

    const nextPeriod = new Date(start);
    nextPeriod.setDate(nextPeriod.getDate() + cycle);

    // If next period is in the past, advance
    while (nextPeriod < today) {
      nextPeriod.setDate(nextPeriod.getDate() + cycle);
      start.setDate(start.getDate() + cycle);
    }

    const ovulation = new Date(nextPeriod);
    ovulation.setDate(ovulation.getDate() - 14);

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    const daysSinceStart = Math.floor((today.getTime() - start.getTime()) / 86400000);
    const currentDay = daysSinceStart >= 0 ? daysSinceStart + 1 : 1;
    const daysUntilPeriod = Math.max(0, Math.floor((nextPeriod.getTime() - today.getTime()) / 86400000));

    let phase = 'Follicular';
    if (currentDay <= period) phase = 'Menstrual';
    else if (currentDay >= cycle - 14 - 5 && currentDay <= cycle - 14 + 1) phase = 'Fertile Window';
    else if (currentDay >= cycle - 14 - 1 && currentDay <= cycle - 14 + 1) phase = 'Ovulation';
    else if (currentDay > cycle - 14) phase = 'Luteal';

    setResult({
      nextPeriod: nextPeriod.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      ovulationDate: ovulation.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      fertileStart: fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fertileEnd: fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      currentDay,
      phase,
      daysUntilPeriod,
    });
  };

  const phaseColors: Record<string, string> = {
    'Menstrual': 'from-rose-400 to-pink-500',
    'Follicular': 'from-blue-400 to-indigo-500',
    'Fertile Window': 'from-green-400 to-emerald-500',
    'Ovulation': 'from-purple-400 to-violet-500',
    'Luteal': 'from-amber-400 to-orange-500',
  };

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <div className="glass-card p-8 bg-gradient-to-br from-pink-50/50 to-purple-50/50 dark:from-pink-950/20 dark:to-purple-950/20">
        <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-pink-500" /> Enter Your Cycle Details
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Period Start Date</label>
            <input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cycle Length (days)</label>
            <input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} min="21" max="40"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period Length (days)</label>
            <input type="number" value={periodLength} onChange={(e) => setPeriodLength(e.target.value)} min="2" max="10"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50" />
          </div>
        </div>
        <button onClick={calculate} className="w-full py-3 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl">
          Predict My Cycle
        </button>
      </div>

      {/* Results */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Current Phase Banner */}
          <div className={`rounded-2xl p-6 text-white bg-gradient-to-r ${phaseColors[result.phase] || 'from-gray-400 to-gray-500'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider">Current Phase</p>
                <p className="font-display text-2xl font-bold mt-1">{result.phase}</p>
                <p className="text-white/80 text-sm mt-1">Day {result.currentDay} of your cycle</p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-xs">Next Period In</p>
                <p className="font-display text-3xl font-bold">{result.daysUntilPeriod}</p>
                <p className="text-white/70 text-xs">days</p>
              </div>
            </div>
          </div>

          {/* Prediction Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 text-center border-t-4 border-pink-400">
              <Droplets className="w-6 h-6 mx-auto mb-2 text-pink-500" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Next Period</p>
              <p className="font-display text-sm font-bold text-gray-900 dark:text-white mt-1">{result.nextPeriod}</p>
            </div>
            <div className="glass-card p-5 text-center border-t-4 border-purple-400">
              <Moon className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Ovulation Day</p>
              <p className="font-display text-sm font-bold text-gray-900 dark:text-white mt-1">{result.ovulationDate}</p>
            </div>
            <div className="glass-card p-5 text-center border-t-4 border-green-400">
              <Heart className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Fertile Window</p>
              <p className="font-display text-sm font-bold text-gray-900 dark:text-white mt-1">{result.fertileStart} – {result.fertileEnd}</p>
            </div>
            <div className="glass-card p-5 text-center border-t-4 border-blue-400">
              <Activity className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Cycle Day</p>
              <p className="font-display text-2xl font-bold text-gray-900 dark:text-white mt-1">{result.currentDay}</p>
            </div>
          </div>

          {/* Cycle Visualization */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-gold" /> Cycle Overview
            </h3>
            <div className="flex h-6 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-400 to-pink-400" style={{ width: `${(parseInt(periodLength) / parseInt(cycleLength)) * 100}%` }} title="Menstrual" />
              <div className="bg-gradient-to-r from-blue-300 to-indigo-300" style={{ width: `${((parseInt(cycleLength) - 14 - 5 - parseInt(periodLength)) / parseInt(cycleLength)) * 100}%` }} title="Follicular" />
              <div className="bg-gradient-to-r from-green-300 to-emerald-400" style={{ width: `${(6 / parseInt(cycleLength)) * 100}%` }} title="Fertile" />
              <div className="bg-gradient-to-r from-purple-400 to-violet-400" style={{ width: `${(1 / parseInt(cycleLength)) * 100}%` }} title="Ovulation" />
              <div className="bg-gradient-to-r from-amber-300 to-orange-300 flex-1" title="Luteal" />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-500">
              <span>🩸 Period</span><span>📈 Follicular</span><span>💚 Fertile</span><span>🟣 Ovulation</span><span>🌙 Luteal</span>
            </div>
          </div>

          {/* Health Insights */}
          <div className="glass-card p-6 bg-gradient-to-br from-violet-50/50 to-pink-50/50 dark:from-violet-950/20 dark:to-pink-950/20">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-gold" /> Cycle Insights
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {result.phase === 'Menstrual' && <li>• Stay hydrated and rest well. Iron-rich foods can help replenish blood loss.</li>}
              {result.phase === 'Follicular' && <li>• Energy levels are rising. Great time for high-intensity workouts.</li>}
              {result.phase === 'Fertile Window' && <li>• Highest chance of conception. Track cervical mucus and basal temperature for accuracy.</li>}
              {result.phase === 'Ovulation' && <li>• Peak fertility day. Egg lives 12–24 hours after release.</li>}
              {result.phase === 'Luteal' && <li>• Progesterone rises. You may experience PMS symptoms. Magnesium-rich foods can help.</li>}
              <li>• Regular cycles of {cycleLength} days are within normal range (21–35 days).</li>
              <li>• Track symptoms monthly for better predictions over time.</li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}

