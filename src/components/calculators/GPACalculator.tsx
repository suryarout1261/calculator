'use client';

import { useI18n } from '@/components/LocaleProvider';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Course { name: string; credits: string; grade: string; }

const gradePoints: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0,
};

export function GPACalculator() {
  const { locale, dict } = useI18n();

  const [courses, setCourses] = useState<Course[]>([
    { name: '', credits: '3', grade: 'A' },
    { name: '', credits: '3', grade: 'B+' },
    { name: '', credits: '4', grade: 'A-' },
  ]);
  const [gpa, setGpa] = useState<number | null>(null);

  const update = (i: number, field: keyof Course, value: string) => {
    const c = [...courses]; c[i][field] = value; setCourses(c);
  };

  const calculate = () => {
    let totalPoints = 0, totalCredits = 0;
    courses.forEach((c) => {
      const cr = parseFloat(c.credits) || 0;
      totalPoints += cr * (gradePoints[c.grade] ?? 0);
      totalCredits += cr;
    });
    setGpa(totalCredits ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0);
  };

  return (
    <div className="glass-card p-8">
      <div className="space-y-3 mb-6">
        {courses.map((c, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <input placeholder="Course name" value={c.name} onChange={(e) => update(i, 'name', e.target.value)}
              className="col-span-5 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
            <input type="number" placeholder="Credits" value={c.credits} onChange={(e) => update(i, 'credits', e.target.value)}
              className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" />
            <select value={c.grade} onChange={(e) => update(i, 'grade', e.target.value)}
              className="col-span-3 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50">
              {Object.keys(gradePoints).map((g) => <option key={g}>{g}</option>)}
            </select>
            <button onClick={() => setCourses(courses.filter((_, j) => j !== i))} className="col-span-2 p-2 text-red-400 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setCourses([...courses, { name: '', credits: '3', grade: 'A' }])}
        className="flex items-center gap-1 text-sm text-brand-sapphire font-medium mb-6">
        <Plus className="w-4 h-4" /> Add Course
      </button>

      <motion.button
        onClick={calculate}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full text-center"
      >Calculate GPA</motion.button>

      {gpa !== null && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center p-6 rounded-xl bg-brand-sapphire/10">
          <p className="text-sm text-gray-500 mb-1">Your GPA</p>
          <p className="font-display text-5xl font-bold text-brand-sapphire">{gpa.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">out of 4.00</p>
        </motion.div>
      )}
    </div>
  );
}

