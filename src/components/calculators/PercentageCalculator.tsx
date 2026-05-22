'use client';

import { useState } from 'react';

export function PercentageCalculator() {
  const [a1, setA1] = useState(''); const [b1, setB1] = useState(''); const [r1, setR1] = useState('');
  const [a2, setA2] = useState(''); const [b2, setB2] = useState(''); const [r2, setR2] = useState('');
  const [a3, setA3] = useState(''); const [b3, setB3] = useState(''); const [r3, setR3] = useState('');

  return (
    <div className="space-y-6">
      {/* What is X% of Y */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">What is X% of Y?</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span>What is</span>
          <input type="number" value={a1} onChange={(e) => setA1(e.target.value)} className="w-24 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" placeholder="10" />
          <span>% of</span>
          <input type="number" value={b1} onChange={(e) => setB1(e.target.value)} className="w-28 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" placeholder="200" />
          <button onClick={() => setR1(String((parseFloat(a1) / 100) * parseFloat(b1) || ''))} className="btn-primary py-2 px-4 text-sm">Calculate</button>
          {r1 && <span className="font-bold text-brand-sapphire text-lg ml-2">= {r1}</span>}
        </div>
      </div>

      {/* X is what % of Y */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">X is what % of Y?</h3>
        <div className="flex flex-wrap items-center gap-2">
          <input type="number" value={a2} onChange={(e) => setA2(e.target.value)} className="w-24 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" placeholder="25" />
          <span>is what % of</span>
          <input type="number" value={b2} onChange={(e) => setB2(e.target.value)} className="w-28 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" placeholder="200" />
          <button onClick={() => setR2(String(Math.round((parseFloat(a2) / parseFloat(b2)) * 10000) / 100 || ''))} className="btn-primary py-2 px-4 text-sm">Calculate</button>
          {r2 && <span className="font-bold text-brand-sapphire text-lg ml-2">= {r2}%</span>}
        </div>
      </div>

      {/* Percentage change */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Percentage Change</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span>From</span>
          <input type="number" value={a3} onChange={(e) => setA3(e.target.value)} className="w-28 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" placeholder="100" />
          <span>to</span>
          <input type="number" value={b3} onChange={(e) => setB3(e.target.value)} className="w-28 px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-sapphire/50" placeholder="150" />
          <button onClick={() => setR3(String(Math.round(((parseFloat(b3) - parseFloat(a3)) / parseFloat(a3)) * 10000) / 100 || ''))} className="btn-primary py-2 px-4 text-sm">Calculate</button>
          {r3 && <span className={`font-bold text-lg ml-2 ${parseFloat(r3) >= 0 ? 'text-green-500' : 'text-red-500'}`}>= {r3}%</span>}
        </div>
      </div>
    </div>
  );
}

