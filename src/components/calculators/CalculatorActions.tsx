'use client';

import { useAppStore, useAuthStore, CALCULATORS, CalculationRecord } from '@/lib/store';
import { Heart, Share2, Download, Copy, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Props {
  calculatorId: string;
  children: React.ReactNode;
  result?: Record<string, string | number> | null;
  inputs?: Record<string, string | number>;
}

export function CalculatorActions({ calculatorId, children, result, inputs }: Props) {
  const { toggleFavorite, favorites, addToHistory } = useAppStore();
  const user = useAuthStore((s) => s.user);
  const calc = CALCULATORS.find((c) => c.id === calculatorId);
  const isFav = favorites.includes(calculatorId);

  const handleSaveResult = () => {
    if (!calc || !result || !inputs) return;
    addToHistory({ calculatorId, calculatorTitle: calc.title, inputs, result });
    toast.success('Saved to history!');
  };

  const handleCopy = () => {
    if (!result) return;
    const text = Object.entries(result).map(([k, v]) => `${k}: ${v}`).join('\n');
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: calc?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  const handleExport = () => {
    if (!user?.isPremium) { toast.error('Export is a Premium feature'); return; }
    if (!result || !inputs) return;
    const data = `${calc?.title}\n\nInputs:\n${Object.entries(inputs).map(([k,v]) => `${k}: ${v}`).join('\n')}\n\nResults:\n${Object.entries(result).map(([k,v]) => `${k}: ${v}`).join('\n')}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${calculatorId}-result.txt`; a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported!');
  };

  // Premium gate
  if (calc?.isPremium && !user?.isPremium) {
    return (
      <div className="glass-card p-8 text-center">
        <Lock className="w-12 h-12 text-brand-gold mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold mb-2">Premium Feature</h3>
        <p className="text-sm text-gray-500 mb-6">This calculator requires a Premium subscription for unlimited access.</p>
        <Link href="/pricing" className="btn-gold">Upgrade to Premium</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Action bar */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => toggleFavorite(calculatorId)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${isFav ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
          <Heart className="w-3.5 h-3.5" fill={isFav ? 'currentColor' : 'none'} />
          {isFav ? 'Favorited' : 'Favorite'}
        </button>
        <button onClick={handleShare} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
        {result && (
          <>
            <button onClick={handleCopy} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
            <button onClick={handleSaveResult} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-sapphire/10 text-brand-sapphire hover:bg-brand-sapphire/20 transition">
              Save
            </button>
            <button onClick={handleExport} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition">
              <Download className="w-3.5 h-3.5" /> Export {!user?.isPremium && '🔒'}
            </button>
          </>
        )}
      </div>
      {children}
    </div>
  );
}

